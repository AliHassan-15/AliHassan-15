#!/usr/bin/env python3
"""Render the portrait as monochrome ASCII that types itself once, then holds."""

import html
import os

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

from svgutil import begin, finish, write
from theme import BONE, GREEN_INK, LINE, MONO, MUTED, PAIR_H, PAIR_W, PANEL, art_box

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "assets", "source-prepped.png")
OUT = os.path.join(ROOT, "portrait.svg")
PREVIEW = os.path.join(ROOT, "assets", "portrait-preview.png")
DENSITY = os.path.join(ROOT, "assets", "ascii-density.png")

COLS = 100
RAMP = " .:-=+*#%@"
GAMMA = 1.22
CONTRAST = 1.18
WHITE_FLOOR = 0.94
INK = "#c9d1d9"


def rows_from_image():
    _, _, art_w, art_h = art_box()
    cell_ratio = 1.72
    rows = max(8, round(COLS * (art_h / art_w) / cell_ratio))
    image = Image.open(SRC).convert("L")
    image = ImageEnhance.Contrast(image).enhance(CONTRAST)
    image = image.resize((COLS, rows), Image.Resampling.LANCZOS)
    pixels = image.load()
    lines = []
    for y in range(rows):
        chars = []
        for x in range(COLS):
            lum = (pixels[x, y] / 255.0) ** GAMMA
            if lum >= WHITE_FLOOR:
                chars.append(" ")
                continue
            index = int((1.0 - lum) * (len(RAMP) - 1) + 0.5)
            chars.append(RAMP[max(0, min(len(RAMP) - 1, index))])
        lines.append("".join(chars))
    return lines, art_w, art_h


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
    row_dur = 2.6 / rows

    parts = begin(PAIR_W, PAIR_H, "ASCII portrait of Ali Hassan", "ali@github ~ $ ./portrait.sh")
    for index, line in enumerate(lines):
        y = y0 + index * cell_h
        baseline = y + cell_h * 0.78
        delay = index * row_dur
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
        parts.append(
            f'<rect x="{x0}" y="{y + 1:.2f}" width="2" height="{cell_h - 2:.2f}" '
            f'fill="{GREEN_INK}" opacity="0">'
            f'<animate attributeName="x" from="{x0}" to="{x0 + art_w:.1f}" '
            f'begin="{delay:.3f}s" dur="{row_dur:.3f}s" fill="freeze"/>'
            f'<set attributeName="opacity" to="0.95" begin="{delay:.3f}s"/>'
            f'<set attributeName="opacity" to="0" begin="{delay + row_dur:.3f}s"/>'
            f"</rect>"
        )

    foot_y = PAIR_H - 18
    parts.append(
        f'<line x1="18" y1="{PAIR_H - 36}" x2="{PAIR_W - 18}" y2="{PAIR_H - 36}" stroke="{LINE}"/>'
    )
    parts.append(
        f'<text x="22" y="{foot_y}" fill="{MUTED}" font-family="{MONO}" font-size="13">'
        f'whoami <tspan fill="{BONE}">Ali Hassan</tspan></text>'
    )
    parts.append(
        f'<rect x="168" y="{foot_y - 11}" width="8" height="13" fill="{GREEN_INK}">'
        f'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.51;1" '
        f'dur="1.1s" repeatCount="indefinite"/></rect>'
    )
    return finish(parts, PAIR_W, PAIR_H)


if __name__ == "__main__":
    write(OUT, render())
