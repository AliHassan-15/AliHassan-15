#!/usr/bin/env python3
"""Four flagship systems. Links live in the README, because images cannot be clicked."""

import os

from svgutil import BONE, COPPER, LINE, MONO, MUTED, RAISED, SANS, begin, esc, finish, write
from theme import FULL_W

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "work.svg")

WORK = [
    (
        "01",
        "DeepMed",
        "Voice-first AI healthcare platform.",
        "Team lead · clinical reports · QA suite public",
    ),
    (
        "02",
        "HAULIX",
        "Real-time fleet operations command center.",
        "Tracking · routing · live telemetry",
    ),
    (
        "03",
        "RELAY",
        "Real-time customer support workspace.",
        "Inbox · AI briefs · reply drafts",
    ),
    (
        "04",
        "Underwater Enhancement",
        "AttentionResUNet clarity and color restoration.",
        "PyTorch · FastAPI · React · ~22–24 dB",
    ),
]


def render():
    pad, gap = 20, 12
    card_w = (FULL_W - pad * 2 - gap) / 2
    card_h = 132
    top = 60
    height = int(top + card_h * 2 + gap + 20)
    parts = begin(
        FULL_W,
        height,
        "Selected work: DeepMed, HAULIX, RELAY, Underwater Enhancement",
        "selected work",
        "four systems",
    )
    for index, (number, title, summary, meta) in enumerate(WORK):
        col, row = index % 2, index // 2
        x = pad + col * (card_w + gap)
        y = top + row * (card_h + gap)
        delay = 0.08 + index * 0.1
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<rect x="{x:.1f}" y="{y}" width="{card_w:.1f}" height="{card_h}" rx="12" '
            f'fill="{RAISED}" stroke="{LINE}"/>'
        )
        parts.append(
            f'<text x="{x + 18:.1f}" y="{y + 28}" fill="{COPPER}" font-family="{MONO}" '
            f'font-size="12">{esc(number)}</text>'
        )
        parts.append(
            f'<text x="{x + 18:.1f}" y="{y + 58}" fill="{BONE}" font-family="{SANS}" '
            f'font-size="20" font-weight="600">{esc(title)}</text>'
        )
        parts.append(
            f'<text x="{x + 18:.1f}" y="{y + 84}" fill="{MUTED}" font-family="{SANS}" '
            f'font-size="13">{esc(summary)}</text>'
        )
        parts.append(
            f'<text x="{x + 18:.1f}" y="{y + 110}" fill="{COPPER}" font-family="{MONO}" '
            f'font-size="12">{esc(meta)}</text>'
        )
        parts.append("</g>")
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    write(OUT, render())
