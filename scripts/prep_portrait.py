#!/usr/bin/env python3
"""Isolate the portrait, lift facial contrast, and crop it for the ASCII card.

The daily workflow does not run this. Rebuild only when the source photo changes:

    python scripts/prep_portrait.py
"""

import os
import sys

import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "assets", "pic.png")
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "assets", "source-prepped.png")

# art box aspect: width / height
sys.path.insert(0, HERE)
from theme import art_box  # noqa: E402


def cut_subject(path):
    image = Image.open(path).convert("RGBA")
    try:
        from rembg import new_session, remove

        print("removing background…")
        # u2netp is the small model (~4MB). The default model is about 1GB.
        session = new_session("u2netp")
        return remove(image, session=session)
    except Exception as error:
        print(f"background removal skipped ({error})")
        return image


def main():
    _, _, art_w, art_h = art_box()
    aspect = art_w / art_h

    cut = cut_subject(SRC)
    rgb = np.array(cut.convert("RGB"))
    alpha = np.array(cut.split()[-1])
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)

    smooth = cv2.medianBlur(gray, 3)
    smooth = cv2.bilateralFilter(smooth, 9, 70, 70)
    clahe = cv2.createCLAHE(clipLimit=2.4, tileGridSize=(8, 8))
    smooth = clahe.apply(smooth)

    subject = alpha > 110
    if subject.sum() < 100:
        subject = np.ones(alpha.shape, dtype=bool)
        alpha = np.full(alpha.shape, 255, np.uint8)

    sample = smooth[subject]
    lo, hi = np.percentile(sample, [2, 94])
    if hi <= lo:
        hi = lo + 1
    tone = np.clip((smooth.astype(np.float32) - lo) / (hi - lo), 0, 1)

    fine = cv2.GaussianBlur(smooth, (0, 0), 1.2).astype(np.float32)
    coarse = cv2.GaussianBlur(smooth, (0, 0), 5.0).astype(np.float32)
    edges = np.clip((coarse - fine) / 36.0, 0, 1)
    drawn = np.clip(tone - 0.28 * edges, 0, 1)
    # Skin must stay gray, not white, or the ASCII face becomes an empty hole.
    # Keep skin dark enough that the face survives at profile size, lighter than the suit.
    drawn = np.clip(drawn * 0.46 + 0.03, 0, 1)

    hard = np.where(alpha > 110, alpha, 0).astype(np.uint8)
    mask = cv2.GaussianBlur(hard.astype(np.float32) / 255.0, (0, 0), 0.6)
    painted = drawn * mask + (1.0 - mask)
    painted = (painted * 255).astype(np.uint8)

    ys, xs = np.where(alpha > 20)
    top, bottom = int(ys.min()), int(ys.max())
    left, right = int(xs.min()), int(xs.max())
    box_h = max(1, bottom - top)

    # Seated frame: hair through the hands, so the taller card is a full portrait.
    head_top = top
    head_bottom = top + int(box_h * 0.98)
    head_h = max(1, head_bottom - head_top)
    cx = (left + right) // 2
    cy = head_top + head_h // 2

    crop_h = int(head_h * 1.06)
    crop_w = int(round(crop_h * aspect))
    x0 = cx - crop_w // 2
    y0 = cy - crop_h // 2

    canvas = np.full((crop_h, crop_w), 255, np.uint8)
    src_x0, src_y0 = max(x0, 0), max(y0, 0)
    src_x1 = min(x0 + crop_w, painted.shape[1])
    src_y1 = min(y0 + crop_h, painted.shape[0])
    dst_x0, dst_y0 = src_x0 - x0, src_y0 - y0
    canvas[dst_y0 : dst_y0 + (src_y1 - src_y0), dst_x0 : dst_x0 + (src_x1 - src_x0)] = (
        painted[src_y0:src_y1, src_x0:src_x1]
    )

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    Image.fromarray(canvas, mode="L").save(OUT)
    print(f"wrote {OUT} {canvas.shape[1]}x{canvas.shape[0]}")


if __name__ == "__main__":
    main()
