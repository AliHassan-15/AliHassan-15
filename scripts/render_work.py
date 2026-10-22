#!/usr/bin/env python3
"""Six selected systems. The README holds the clickable links."""

import os

from svgutil import begin, esc, finish, write
from theme import BONE, FULL_W, GREEN_INK, LINE, MONO, MUTED, RAISED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "work.svg")

WORK = [
    ("01", "DeepMed", "Voice-first AI healthcare platform.", "Team lead · clinical reports"),
    ("02", "HAULIX", "Fleet operations command center.", "Live tracking · routing · telemetry"),
    ("03", "RELAY", "Customer support workspace.", "Realtime inbox · AI reply drafts"),
    ("04", "Underwater Enhancement", "AttentionResUNet color restoration.", "PyTorch · FastAPI · ~22–24 dB"),
    ("05", "RouteWise ELD", "Hours-of-service trip planning.", "Django · React · rules engine"),
    ("06", "Brain Tumor MRI", "Three-class scan classification.", "1,000+ MRIs · reports under 200ms"),
]


def render():
    pad, gap = 18, 12
    card_w = (FULL_W - pad * 2 - gap) / 2
    card_h = 112
    top = 54
    height = top + 3 * card_h + 2 * gap + 18
    parts = begin(FULL_W, height, "Selected work", "ali@github ~ $ ./work.sh")
    for index, (number, title, summary, meta) in enumerate(WORK):
        col, row = index % 2, index // 2
        x = pad + col * (card_w + gap)
        y = top + row * (card_h + gap)
        delay = 0.05 + index * 0.07
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<rect x="{x:.1f}" y="{y}" width="{card_w:.1f}" height="{card_h}" rx="10" '
            f'fill="{RAISED}" stroke="{LINE}"/>'
        )
        parts.append(
            f'<text x="{x + 16:.1f}" y="{y + 26}" fill="{GREEN_INK}" font-family="{MONO}" '
            f'font-size="12">{esc(number)}</text>'
        )
        parts.append(
            f'<text x="{x + 16:.1f}" y="{y + 52}" fill="{BONE}" font-family="{SANS}" '
            f'font-size="18" font-weight="650">{esc(title)}</text>'
        )
        parts.append(
            f'<text x="{x + 16:.1f}" y="{y + 74}" fill="{MUTED}" font-family="{SANS}" '
            f'font-size="13">{esc(summary)}</text>'
        )
        parts.append(
            f'<text x="{x + 16:.1f}" y="{y + 96}" fill="{GREEN_INK}" font-family="{MONO}" '
            f'font-size="12">{esc(meta)}</text>'
        )
        parts.append("</g>")
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    write(OUT, render())
