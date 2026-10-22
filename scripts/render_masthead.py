#!/usr/bin/env python3
"""The nameplate. One short entrance, then it sits still."""

import os

from svgutil import BONE, COPPER, LINE, MONO, MUTED, SANS, begin, esc, finish, write
from theme import FULL_W

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "masthead.svg")
W, H = FULL_W, 176


def render():
    parts = begin(W, H, "Ali Hassan — software engineer")
    parts.append(
        "<style>"
        ".draw{stroke-dasharray:28;stroke-dashoffset:28;animation:draw .7s ease forwards}"
        "@keyframes draw{to{stroke-dashoffset:0}}"
        ".name{animation:reveal 1.05s cubic-bezier(.16,.84,.32,1) both}"
        "@keyframes reveal{from{opacity:0;clip-path:inset(0 100% 0 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}"
        "</style>"
    )
    parts.append(
        f'<line class="draw" x1="24" y1="36" x2="52" y2="36" stroke="{COPPER}" stroke-width="2"/>'
    )
    parts.append(
        f'<text class="rise" x="24" y="58" fill="{COPPER}" font-family="{MONO}" font-size="12" '
        f'style="animation-delay:.15s;letter-spacing:.18em">{esc("SOFTWARE ENGINEER")}</text>'
    )
    parts.append(
        f'<text class="name" x="22" y="108" fill="{BONE}" font-family="{SANS}" font-size="52" '
        f'font-weight="600">{esc("Ali Hassan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="24" y="140" fill="{MUTED}" font-family="{SANS}" font-size="16" '
        f'style="animation-delay:.35s">{esc("MERN  ·  Python  ·  Applied AI")}</text>'
    )
    parts.append(
        f'<text class="rise" x="{W - 24}" y="102" fill="{BONE}" font-family="{SANS}" font-size="15" '
        f'text-anchor="end" style="animation-delay:.45s">{esc("Lahore, Pakistan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="{W - 24}" y="126" fill="{COPPER}" font-family="{SANS}" font-size="14" '
        f'text-anchor="end" style="animation-delay:.55s">{esc("Open to engineering roles")}</text>'
    )
    parts.append(
        f'<rect class="rise" x="24" y="{H - 1}" width="{W - 48}" height="1" fill="{LINE}" '
        f'style="animation-delay:.2s"/>'
    )
    return finish(parts, W, H)


if __name__ == "__main__":
    write(OUT, render())
