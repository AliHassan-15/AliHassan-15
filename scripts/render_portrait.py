#!/usr/bin/env python3
"""Render the portrait as monochrome ASCII that types itself once, then holds."""

import html
import os

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from svgutil import begin, finish, write
from theme import BONE, BRIGHT, GREEN_INK, LINE, MONO, MUTED, PAIR_H, PAIR_W, PANEL, art_box

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "assets", "source-prepped.png")
OUT = os.path.join(ROOT, "portrait.svg")
PREVIEW = os.path.join(ROOT, "assets", "portrait-preview.png")
DENSITY = os.path.join(ROOT, "assets", "ascii-density.png")

COLS = 108
RAMP = " .+*#"
WHITE_FLOOR = 0.90
INK = "#e6edf3"
# The face is drawn slowly so a reload lands on the features, then the rest follows.
FACE_TIME = 3.6
BODY_TIME = 1.6


def focus_crop(gray, aspect):
    """Zoom toward the head without stretching, so the glasses and beard survive."""
    mask = gray < 242
    ys, xs = np.where(mask)
    if len(ys) < 50:
        return gray
    top, bottom = int(ys.min()), int(ys.max())
    left, right = int(xs.min()), int(xs.max())
    subject_h = max(1, bottom - top)
    # Hair-to-chin is about a third of this seated photo. Give it half the frame.
    crop_h = int(subject_h * 0.34 / 0.50)
    crop_h = max(32, min(crop_h, gray.shape[0]))
    crop_w = int(round(crop_h * aspect))
    crop_w = max(32, min(crop_w, gray.shape[1]))
    crop_h = max(32, min(int(round(crop_w / aspect)), gray.shape[0]))
    cx = (left + right) // 2
    y0 = max(0, top - int(crop_h * 0.03))
    y0 = min(y0, gray.shape[0] - crop_h)
    x0 = min(max(0, cx - crop_w // 2), gray.shape[1] - crop_w)
    return gray[y0 : y0 + crop_h, x0 : x0 + crop_w]


def carve_features(gray):
    """Trace glasses, eyes, and beard so they stay dark after the image is reduced."""
    face_rows = max(8, int(gray.shape[0] * 0.62))
    face = gray[:face_rows].copy()
    edges = cv2.Canny(face, 28, 90)
    edges = cv2.dilate(edges, np.ones((2, 2), np.uint8), iterations=1)
    face[edges > 0] = np.minimum(face[edges > 0], 18)
    # Pupils and the beard are already dark. Keep them from washing out.
    dark = face < 70
    face[dark] = np.minimum(face[dark], 12)
    out = gray.copy()
    out[:face_rows] = face
    return out


def rows_from_image():
    _, _, art_w, art_h = art_box()
    aspect = art_w / art_h
    cell_ratio = 1.72
    rows = max(8, round(COLS * (art_h / art_w) / cell_ratio))
    gray = np.array(Image.open(SRC).convert("L"))
    gray = carve_features(focus_crop(gray, aspect))
    image = Image.fromarray(gray, mode="L").resize((COLS, rows), Image.Resampling.LANCZOS)
    pixels = np.array(image).astype(np.float32) / 255.0
    lines = []
    for y in range(rows):
        chars = []
        for x in range(COLS):
            lum = float(pixels[y, x])
            if lum >= WHITE_FLOOR:
                chars.append(" ")
                continue
            # Four solid tones. Fine ramps turn the face into noise at profile size.
            if lum >= 0.72:
                chars.append(".")
            elif lum >= 0.50:
                chars.append("+")
            elif lum >= 0.30:
                chars.append("*")
            else:
                chars.append("#")
        lines.append("".join(chars))
    return lines, art_w, art_h


def row_clock(lines):
    """Face rows take most of the opening, so the reload is about the portrait."""
    content = [index for index, line in enumerate(lines) if line.strip()]
    if not content:
        return [0.0] * len(lines), [0.02] * len(lines)
    face_cut = content[0] + max(1, int((content[-1] - content[0]) * 0.46))
    face_rows = [index for index in content if index <= face_cut]
    body_rows = [index for index in content if index > face_cut]
    face_dur = FACE_TIME / max(1, len(face_rows))
    body_dur = BODY_TIME / max(1, len(body_rows))
    delays = []
    durations = []
    clock = 0.15
    for index, line in enumerate(lines):
        if not line.strip():
            dur = 0.008
        elif index <= face_cut:
            dur = face_dur
        else:
            dur = body_dur
        delays.append(clock)
        durations.append(dur)
        clock += dur
    return delays, durations


def save_preview(lines, art_w, art_h):
    rows = len(lines)
    cols = len(lines[0])
    cell_w = art_w / cols
    cell_h = art_h / rows
    canvas = Image.new("RGB", (PAIR_W, PAIR_H), PANEL)
    draw = ImageDraw.Draw(canvas)
    font_size = max(7, int(min(cell_h * 0.8, cell_w / 0.55)))
    try:
        font = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", font_size)
    except OSError:
        font = ImageFont.load_default()
    x0, y0, _, _ = art_box()
    for row, line in enumerate(lines):
        baseline = y0 + row * cell_h
        for col, char in enumerate(line):
            if char == " ":
                continue
            draw.text((x0 + col * cell_w, baseline), char, fill=INK, font=font)
    canvas.save(PREVIEW)
    print(f"wrote {PREVIEW}")
    cell = 6
    density = Image.new("RGB", (cols * cell, rows * cell), PANEL)
    pixels = density.load()
    for row, line in enumerate(lines):
        for col, char in enumerate(line):
            level = RAMP.find(char)
            shade = 13 if level < 0 else int(18 + (level / (len(RAMP) - 1)) * 220)
            for dy in range(cell):
                for dx in range(cell):
                    pixels[col * cell + dx, row * cell + dy] = (shade, shade, shade)
    density.save(DENSITY)
    print(f"wrote {DENSITY}")


def render():
    lines, art_w, art_h = rows_from_image()
    save_preview(lines, art_w, art_h)
    rows = len(lines)
    x0, y0, _, _ = art_box()
    cell_h = art_h / rows
    font_size = cell_h * 0.92
    delays, durations = row_clock(lines)
    content = [index for index, line in enumerate(lines) if line.strip()]
    face_cut = content[0] + int((content[-1] - content[0]) * 0.46) if content else 0

    parts = begin(PAIR_W, PAIR_H, "ASCII portrait of Ali Hassan", "ali@github ~ $ ./portrait.sh")
    for index, line in enumerate(lines):
        y = y0 + index * cell_h
        baseline = y + cell_h * 0.78
        delay = delays[index]
        row_dur = max(0.01, durations[index])
        safe = html.escape(line)
        parts.append(
            f'<clipPath id="row{index}">'
            f'<rect x="{x0}" y="{y:.2f}" width="0" height="{cell_h:.2f}">'
            f'<animate attributeName="width" from="0" to="{art_w:.1f}" '
            f'begin="{delay:.3f}s" dur="{row_dur:.3f}s" fill="freeze"/>'
            f"</rect></clipPath>"
        )
        parts.append(
            f'<text clip-path="url(#row{index})" xml:space="preserve" '
            f'x="{x0}" y="{baseline:.2f}" fill="{INK}" font-family="{MONO}" '
            f'font-size="{font_size:.2f}" textLength="{art_w:.1f}" lengthAdjust="spacing">'
            f"{safe}</text>"
        )
        cursor_w = 3.2 if index <= face_cut else 2
        cursor_fill = BRIGHT if index <= face_cut else GREEN_INK
        parts.append(
            f'<rect x="{x0}" y="{y + 0.6:.2f}" width="{cursor_w}" height="{max(1, cell_h - 1.2):.2f}" '
            f'fill="{cursor_fill}" opacity="0">'
            f'<animate attributeName="x" from="{x0}" to="{x0 + art_w:.1f}" '
            f'begin="{delay:.3f}s" dur="{row_dur:.3f}s" fill="freeze"/>'
            f'<set attributeName="opacity" to="1" begin="{delay:.3f}s"/>'
            f'<set attributeName="opacity" to="0" begin="{delay + row_dur:.3f}s"/>'
            f"</rect>"
        )

    foot_size = 28
    _, art_top, _, art_h = art_box()
    foot_y = PAIR_H - 16
    try:
        foot_font = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", foot_size)
        label_w = foot_font.getlength("whoami Ali Hassan")
    except OSError:
        label_w = foot_size * 0.62 * 17
    cursor_x = 24 + label_w + 12
    parts.append(
        f'<line x1="18" y1="{art_top + art_h + 12:.0f}" x2="{PAIR_W - 18}" y2="{art_top + art_h + 12:.0f}" stroke="{LINE}"/>'
    )
    parts.append(
        f'<text x="24" y="{foot_y}" fill="{MUTED}" font-family="{MONO}" font-size="{foot_size}">'
        f'whoami <tspan fill="{BONE}" font-weight="650">Ali Hassan</tspan></text>'
    )
    parts.append(
        f'<rect x="{cursor_x:.1f}" y="{foot_y - 22}" width="14" height="26" fill="{GREEN_INK}">'
        f'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.51;1" '
        f'dur="1.1s" repeatCount="indefinite"/></rect>'
    )
    return finish(parts, PAIR_W, PAIR_H)


if __name__ == "__main__":
    write(OUT, render())
