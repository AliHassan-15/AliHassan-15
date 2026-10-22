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


def seated_plate(cols, rows):
    """Place the whole photo in the card, centered, so both shoulders stay even."""
    color = cv2.cvtColor(np.array(Image.open(PHOTO).convert("RGB")), cv2.COLOR_RGB2GRAY)
    # The studio wall is the light flat field. Skin, suit, laptop, and desk stay.
    wall = color >= 206
    plate = color.astype(np.float32)
    plate[wall] = 255
    # A light edge lift so the glasses and beard keep their shape. Not a line drawing.
    blur = cv2.GaussianBlur(plate, (0, 0), 1.3)
    plate = np.clip(plate - np.clip(blur - plate, 0, None) * 0.9, 0, 255)
    subject = plate < 250
    # Skin in the photo is almost as light as the wall. Pull it down so the face has a shape.
    plate[subject] = np.clip(plate[subject] * 0.56 + 4, 0, 255)

    photo_rows = max(8, round(cols * (color.shape[0] / color.shape[1]) / CELL_RATIO))
    photo_rows = min(photo_rows, rows)
    resized = cv2.resize(plate.astype(np.uint8), (cols, photo_rows), interpolation=cv2.INTER_AREA)
    canvas = np.full((rows, cols), 255, np.uint8)
    y0 = max(0, (rows - photo_rows) // 2)
    canvas[y0 : y0 + photo_rows, :] = resized
    return canvas


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
