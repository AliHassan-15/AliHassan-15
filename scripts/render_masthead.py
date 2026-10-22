#!/usr/bin/env python3
"""Compact nameplate. The contribution row below is the hero."""

import os

from svgutil import begin, esc, finish, write
from theme import BONE, FULL_W, GREEN_INK, LINE, MONO, MUTED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "masthead.svg")
W, H = FULL_W, 148


def render():
    parts = begin(W, H, "Ali Hassan, software engineer", "ali@github ~ $ whoami")
    parts.append(
        f'<text class="rise" x="28" y="78" fill="{BONE}" font-family="{SANS}" '
        f'font-size="40" font-weight="650">{esc("Ali Hassan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="28" y="108" fill="{GREEN_INK}" font-family="{SANS}" '
        f'font-size="16" style="animation-delay:.08s">{esc("Software Engineer")}</text>'
    )
    parts.append(
        f'<text class="rise" x="196" y="108" fill="{MUTED}" font-family="{SANS}" font-size="16" '
        f'style="animation-delay:.12s">{esc("·  MERN  ·  Python  ·  Applied AI")}</text>'
    )
    parts.append(
        f'<text class="rise" x="{W - 28}" y="78" fill="{BONE}" font-family="{SANS}" '
        f'font-size="15" text-anchor="end" style="animation-delay:.16s">{esc("Lahore, Pakistan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="{W - 28}" y="104" fill="{GREEN_INK}" font-family="{MONO}" '
        f'font-size="13" text-anchor="end" style="animation-delay:.2s">{esc("open to engineering roles")}</text>'
    )
    parts.append(
        f'<line class="draw" x1="28" y1="{H - 18}" x2="{W - 28}" y2="{H - 18}" stroke="{LINE}" stroke-width="1"/>'
    )
    return finish(parts, W, H)


if __name__ == "__main__":
    write(OUT, render())
