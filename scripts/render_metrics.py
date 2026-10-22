#!/usr/bin/env python3
"""Four proof points, in one short bar."""

import os

from svgutil import begin, esc, finish, write
from theme import FULL_W, GREEN_INK, LINE, MUTED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "metrics.svg")
W, H = FULL_W, 108

METRICS = [
    ("5", "Dean's List"),
    ("300+", "Students mentored"),
    ("10+", "LLMs fine-tuned"),
    ("6", "Apps deployed"),
]


def render():
    parts = begin(W, H, "Dean's List, teaching, models, and shipped apps", "ali@github ~ $ ./record.sh")
    slot = W / len(METRICS)
    for index, (value, label) in enumerate(METRICS):
        cx = slot * index + slot / 2
        delay = 0.06 + index * 0.08
        if index:
            parts.append(f'<rect x="{slot * index:.1f}" y="54" width="1" height="36" fill="{LINE}"/>')
        parts.append(
            f'<text class="rise" x="{cx:.1f}" y="72" text-anchor="middle" fill="{GREEN_INK}" '
            f'font-family="{SANS}" font-size="26" font-weight="700" '
            f'style="animation-delay:{delay:.2f}s">{esc(value)}</text>'
        )
        parts.append(
            f'<text class="rise" x="{cx:.1f}" y="92" text-anchor="middle" fill="{MUTED}" '
            f'font-family="{SANS}" font-size="13" style="animation-delay:{delay + 0.05:.2f}s">'
            f"{esc(label)}</text>"
        )
    return finish(parts, W, H)


if __name__ == "__main__":
    write(OUT, render())
