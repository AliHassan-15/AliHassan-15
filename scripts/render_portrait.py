#!/usr/bin/env python3
"""Render the portrait as monochrome ASCII that types itself once, then holds."""

import html
import os

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

from svgutil import BONE, COPPER, LINE, MONO, MUTED, PANEL, begin, finish, write
from theme import PORTRAIT_H, PORTRAIT_W, art_box

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "assets", "source-prepped.png")
OUT = os.path.join(ROOT, "portrait.svg")
PREVIEW = os.path.join(ROOT, "assets", "portrait-preview.png")

COLS = 78
RAMP = " .:-=+*#%@"
GAMMA = 0.78
CONTRAST = 1.28
WHITE_FLOOR = 0.84
INK = "#e7e1d6"


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
    canvas = Image.new("RGB", (PORTRAIT_W, PORTRAIT_H), PANEL)
    draw = ImageDraw.Draw(canvas)
    font_size = max(8, int(cell_h * 0.92))
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


def render():
    lines, art_w, art_h = rows_from_image()
    save_preview(lines, art_w, art_h)
    rows = len(lines)
    x0, y0, _, _ = art_box()
    cell_h = art_h / rows
    font_size = cell_h * 0.92
    row_dur = 3.4 / rows

    parts = begin(
        PORTRAIT_W,
        PORTRAIT_H,
        "ASCII portrait of Ali Hassan",
        "ali@github",
        "portrait",
    )
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
            f'fill="{COPPER}" opacity="0">'
            f'<animate attributeName="x" from="{x0}" to="{x0 + art_w:.1f}" '
            f'begin="{delay:.3f}s" dur="{row_dur:.3f}s" fill="freeze"/>'
            f'<set attributeName="opacity" to="0.95" begin="{delay:.3f}s"/>'
            f'<set attributeName="opacity" to="0" begin="{delay + row_dur:.3f}s"/>'
            f"</rect>"
        )

    foot_y = PORTRAIT_H - 20
    parts.append(
        f'<text x="22" y="{foot_y}" fill="{MUTED}" font-family="{MONO}" font-size="12">'
        f'whoami <tspan fill="{BONE}">Ali Hassan</tspan></text>'
    )
    parts.append(
        f'<rect x="148" y="{foot_y - 10}" width="7" height="12" fill="{COPPER}">'
        f'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" '
        f'dur="1.15s" repeatCount="indefinite"/></rect>'
    )
    parts.append(
        f'<rect x="20" y="{PORTRAIT_H - 40}" width="{PORTRAIT_W - 40}" height="1" fill="{LINE}"/>'
    )
    return finish(parts, PORTRAIT_W, PORTRAIT_H)


if __name__ == "__main__":
    write(OUT, render())
