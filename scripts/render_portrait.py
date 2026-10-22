#!/usr/bin/env python3
"""Render the portrait as monochrome ASCII that types, holds, then types again."""

import html
import os

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from svgutil import begin, finish, write
from theme import BONE, BRIGHT, GREEN_INK, LINE, MONO, MUTED, PAIR_H, PAIR_W, PANEL, art_box

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
PHOTO = os.path.join(ROOT, "assets", "pic.png")
OUT = os.path.join(ROOT, "portrait.svg")
PREVIEW = os.path.join(ROOT, "assets", "portrait-preview.png")
DENSITY = os.path.join(ROOT, "assets", "ascii-density.png")

COLS = 104
RAMP = " .:-=+*#%@"
WHITE_FLOOR = 0.93
INK = "#e6edf3"
# The head is drawn a little slower, then the seated portrait finishes.
FACE_TIME = 2.8
BODY_TIME = 2.2
CELL_RATIO = 1.72
# Hold the finished portrait before the typing loop starts again.
HOLD = 4.0


def ambient_backdrop(parts, x0, y0, art_w, art_h):
    """Soft green glow that keeps breathing behind the ASCII."""
    cx = x0 + art_w / 2
    cy = y0 + art_h * 0.36
    parts.append(
        f'<defs><clipPath id="artClip">'
        f'<rect x="{x0}" y="{y0}" width="{art_w:.1f}" height="{art_h:.1f}" rx="4"/>'
        f"</clipPath></defs>"
    )
    parts.append(f'<g clip-path="url(#artClip)">')
    parts.append(
        f'<g transform="translate({cx:.1f} {cy:.1f})">'
        f'<animateTransform attributeName="transform" type="scale" values="1;1.06;1" '
        f'dur="9s" repeatCount="indefinite" additive="sum"/>'
        f'<circle cx="0" cy="0" r="130" fill="#0e4429" opacity="0.28">'
        f'<animate attributeName="r" values="105;145;105" dur="7s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values="0.16;0.38;0.16" dur="7s" repeatCount="indefinite"/>'
        f"</circle>"
        f'<circle cx="-110" cy="95" r="78" fill="#006d32" opacity="0.18">'
        f'<animate attributeName="r" values="60;95;60" dur="8.5s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values="0.1;0.26;0.1" dur="8.5s" repeatCount="indefinite"/>'
        f"</circle>"
        f'<circle cx="120" cy="140" r="68" fill="#26a641" opacity="0.12">'
        f'<animate attributeName="r" values="50;82;50" dur="10s" begin="1.2s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values="0.06;0.2;0.06" dur="10s" begin="1.2s" repeatCount="indefinite"/>'
        f"</circle>"
        f"</g>"
    )
    parts.append("</g>")


def frac(time, cycle):
    return max(0.0, min(1.0, time / cycle))


def key_times(*times):
    """Strictly increasing keyTimes that always end at 1."""
    cleaned = []
    last = -1.0
    for index, value in enumerate(times):
        stamp = float(value)
        if index == len(times) - 1:
            stamp = 1.0
        elif stamp <= last:
            stamp = min(0.999, last + 0.0005)
        cleaned.append(f"{stamp:.4f}")
        last = stamp
    return ";".join(cleaned)


def seated_plate(cols, rows):
    """Fill the card. Trim the wall above and the desk below, and take the same slice off both sides."""
    color = cv2.cvtColor(np.array(Image.open(PHOTO).convert("RGB")), cv2.COLOR_RGB2GRAY)
    height, width = color.shape
    # Shoulder band, above the desk, so the crop is centered on the body and not the laptop.
    band = color[int(height * 0.55) : int(height * 0.68)]
    xs = np.where(band < 200)[1]
    center = int((xs.min() + xs.max()) / 2) if len(xs) else width // 2
    # Hair begins near 8% and the hands end near 91%. A small equal pad keeps the head off the chrome.
    y0 = int(round(height * 0.045))
    y1 = int(round(height * 0.935))
    aspect = cols / (rows * CELL_RATIO)
    crop_w = min(width, int(round((y1 - y0) * aspect)))
    x0 = int(center - crop_w / 2)
    x0 = max(0, min(x0, width - crop_w))
    plate = color[y0:y1, x0 : x0 + crop_w].astype(np.float32)
    wall = plate >= 206
    plate[wall] = 255
    blur = cv2.GaussianBlur(plate, (0, 0), 1.3)
    plate = np.clip(plate - np.clip(blur - plate, 0, None) * 0.9, 0, 255)
    subject = plate < 250
    plate[subject] = np.clip(plate[subject] * 0.56 + 4, 0, 255)
    small = cv2.resize(plate.astype(np.uint8), (cols, rows), interpolation=cv2.INTER_AREA)
    return carve_features(small)


def carve_features(plate):
    """Separate the brows, glasses, eyes, nose, and mustache from the skin."""
    # Values land on distinct ramp characters: skin '+', frame '#', pupil '@', mustache '%'.
    skin = 150
    brow = 24
    frame = 42
    lens = 178
    pupil = 6
    stache = 20

    def ink(y, x, value):
        if 0 <= y < plate.shape[0] and 0 <= x < plate.shape[1]:
            plate[y, x] = value

    # Brows sit on their own row, with the outer end lifted so each one arches.
    for x in range(38, 46):
        ink(20, x, brow)
    ink(19, 37, brow)
    ink(19, 38, brow)
    for x in range(53, 62):
        ink(20, x, brow)
    ink(19, 60, brow)
    ink(19, 61, brow)
    for x in range(46, 53):
        ink(20, x, skin)
    for x in range(36, 64):
        if plate[21, x] < 130:
            plate[21, x] = skin

    def lens_at(x0, x1, pupil_x):
        for y in (22, 23, 24):
            for x in range(x0, x1 + 1):
                on_frame = y in (22, 24) or x in (x0, x1)
                ink(y, x, frame if on_frame else lens)
        # Drop the corners so the rim reads as a round frame, not a box.
        for y in (22, 24):
            ink(y, x0, skin)
            ink(y, x1, skin)
        ink(23, pupil_x, pupil)
        ink(23, pupil_x + 1, pupil)
        ink(23, pupil_x + 2, 214)

    lens_at(37, 45, 40)
    lens_at(53, 61, 56)
    for y in (22, 23, 24):
        for x in range(46, 53):
            ink(y, x, skin)
    for x in range(48, 51):
        ink(23, x, frame)

    # A light ridge with a shadow on each side, then two nostrils.
    for y in (25, 26, 27):
        ink(y, 47, 96)
        ink(y, 48, 188)
        ink(y, 49, 188)
        ink(y, 50, 96)
    for x, value in ((46, 16), (47, 110), (48, 168), (49, 168), (50, 110), (51, 16)):
        ink(28, x, value)

    # The mustache was three rows tall. Keep the middle row and open the lip above it.
    for x in range(43, 57):
        ink(29, x, skin)
        ink(30, x, stache)
        if plate[31, x] < 90:
            plate[31, x] = 118
    return plate


def rows_from_image():
    _, _, art_w, art_h = art_box()
    rows = max(8, round(COLS * (art_h / art_w) / CELL_RATIO))
    pixels = seated_plate(COLS, rows).astype(np.float32) / 255.0
    lines = []
    for y in range(rows):
        chars = []
        for x in range(COLS):
            lum = float(pixels[y, x])
            if lum >= WHITE_FLOOR:
                chars.append(" ")
                continue
            shaped = lum ** 1.05
            index = int((1.0 - shaped) * (len(RAMP) - 1) + 0.5)
            chars.append(RAMP[max(0, min(len(RAMP) - 1, index))])
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
    typed = delays[-1] + durations[-1] if delays else FACE_TIME + BODY_TIME
    cycle = typed + HOLD

    parts = begin(PAIR_W, PAIR_H, "ASCII portrait of Ali Hassan", "ali@github ~ $ ./portrait.sh")
    ambient_backdrop(parts, x0, y0, art_w, art_h)
    for index, line in enumerate(lines):
        y = y0 + index * cell_h
        baseline = y + cell_h * 0.78
        delay = delays[index]
        row_dur = max(0.01, durations[index])
        safe = html.escape(line)
        t_open = frac(delay, cycle)
        t_done = frac(delay + row_dur, cycle)
        t_hold = frac(typed + HOLD * 0.88, cycle)
        width_times = key_times(0, t_open, t_done, t_hold, 1)
        parts.append(
            f'<clipPath id="row{index}">'
            f'<rect x="{x0}" y="{y:.2f}" width="0" height="{cell_h:.2f}">'
            f'<animate attributeName="width" values="0;0;{art_w:.1f};{art_w:.1f};0" '
            f'keyTimes="{width_times}" dur="{cycle:.3f}s" repeatCount="indefinite" '
            f'calcMode="linear"/>'
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
            f'<animate attributeName="x" values="{x0};{x0};{x0 + art_w:.1f};{x0 + art_w:.1f};{x0}" '
            f'keyTimes="{width_times}" dur="{cycle:.3f}s" repeatCount="indefinite" '
            f'calcMode="linear"/>'
            f'<animate attributeName="opacity" values="0;0;1;0;0" '
            f'keyTimes="{key_times(0, t_open, min(t_open + 0.001, t_done), t_done, 1)}" '
            f'dur="{cycle:.3f}s" repeatCount="indefinite"/>'
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
