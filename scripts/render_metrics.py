#!/usr/bin/env python3
"""Four proof points. Numbers count once; the final value is the fallback."""

import os

from svgutil import BONE, COPPER, LINE, MUTED, SANS, begin, esc, finish, write
from theme import FULL_W

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "metrics.svg")
W, H = FULL_W, 118

METRICS = [
    (5, "", "Dean's List honors"),
    (300, "+", "Students mentored"),
    (10, "+", "LLMs fine-tuned"),
    (6, "", "Apps deployed"),
]
FRAMES = 12
COUNT_DUR = 0.9


def render():
    parts = begin(W, H, "Selected record — Dean's List, teaching, models, and shipped apps")
    slot = W / len(METRICS)
    for index, (value, suffix, label) in enumerate(METRICS):
        cx = slot * index + slot / 2
        if index:
            parts.append(
                f'<rect x="{slot * index}" y="28" width="1" height="{H - 56}" fill="{LINE}"/>'
            )
        start = 0.12 + index * 0.08
        # Final value is visible even if animation never runs.
        parts.append(
            f'<text x="{cx}" y="62" text-anchor="middle" fill="{BONE}" '
            f'font-family="{SANS}" font-size="34" font-weight="600">'
            f"{value:,}{esc(suffix)}</text>"
        )
        for frame in range(FRAMES):
            progress = (frame + 1) / FRAMES
            eased = 1 - (1 - progress) ** 3
            shown = int(round(value * eased))
            t_on = start + COUNT_DUR * frame / FRAMES
            t_off = start + COUNT_DUR * (frame + 1) / FRAMES
            parts.append(
                f'<text x="{cx}" y="62" text-anchor="middle" opacity="0" fill="{BONE}" '
                f'font-family="{SANS}" font-size="34" font-weight="600">'
                f"{shown:,}{esc(suffix)}"
                f'<set attributeName="opacity" to="1" begin="{t_on:.3f}s"/>'
                f'<set attributeName="opacity" to="0" begin="{t_off:.3f}s"/>'
                f"</text>"
            )
        parts.append(
            f'<text class="rise" x="{cx}" y="88" text-anchor="middle" fill="{MUTED}" '
            f'font-family="{SANS}" font-size="13" style="animation-delay:{start:.2f}s">'
            f"{esc(label)}</text>"
        )
    parts.append(f'<rect x="0" y="0" width="3" height="{H}" fill="{COPPER}"/>')
    return finish(parts, W, H)


if __name__ == "__main__":
    write(OUT, render())
