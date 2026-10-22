#!/usr/bin/env python3
"""Compact nameplate. The contribution row below is the hero."""

import os

from svgutil import begin, esc, finish, write
from theme import BONE, BRIGHT, FULL_W, GREEN_INK, LINE, MUTED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "masthead.svg")
W, H = FULL_W, 292


def render():
    parts = begin(W, H, "Ali Hassan, full-stack developer and AI/ML engineer", "ali@github ~ $ whoami")
    parts.append(
        f'<text class="rise" x="28" y="88" fill="{BONE}" font-family="{SANS}" '
        f'font-size="40" font-weight="650">{esc("Ali Hassan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="28" y="122" font-family="{SANS}" font-size="16" style="animation-delay:.08s">'
        f'<tspan fill="{GREEN_INK}">{esc("Full-Stack Developer")}</tspan>'
        f'<tspan fill="{MUTED}">{esc("   ·   Python   ·   AI/ML")}</tspan>'
        f"</text>"
    )
    parts.append(
        f'<text class="rise" x="{W - 28}" y="88" fill="{BONE}" font-family="{SANS}" '
        f'font-size="15" text-anchor="end" style="animation-delay:.16s">{esc("Lahore, Pakistan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="{W - 28}" y="122" font-family="{SANS}" '
        f'font-size="16" text-anchor="end" style="animation-delay:.2s">'
        f'<tspan fill="{GREEN_INK}">{esc("open to engineering roles")}</tspan>'
        f'<tspan fill="{MUTED}">{esc("   ·   ")}</tspan>'
        f'<tspan fill="{BRIGHT}" text-decoration="underline">{esc("portfolio")}</tspan>'
        f"</text>"
    )
    parts.append(
        f'<line class="draw" x1="28" y1="148" x2="{W - 28}" y2="148" stroke="{LINE}" stroke-width="1"/>'
    )
    # The question is the only loud line. Everything above it stays quiet.
    parts.append(
        "<style>"
        ".blink{animation:blink 1.15s steps(1) infinite}"
        "@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}"
        "@media (prefers-reduced-motion:reduce){.blink{animation:none;opacity:1}}"
        "</style>"
    )
    parts.append(
        f'<text class="rise" x="28" y="190" fill="{MUTED}" font-family="{SANS}" font-size="15" '
        f'style="animation-delay:.32s">'
        f'{esc("I turn ideas into real-world products, from full-stack apps to AI-powered systems built to solve problems that matter.")}'
        f"</text>"
    )
    parts.append(
        f'<text class="rise" x="28" y="230" fill="{BONE}" font-family="{SANS}" font-size="16" '
        f'style="animation-delay:.48s">{esc("I build, I experiment, and I ship.")}</text>'
    )
    parts.append(
        f'<text class="rise" x="28" y="270" font-family="{SANS}" font-size="18" style="animation-delay:.66s">'
        f'<tspan fill="{BRIGHT}" font-weight="700" text-decoration="underline">'
        f'{esc("Got something ambitious in mind?")}</tspan>'
        f'<tspan fill="{GREEN_INK}">{esc("   Let’s build it together.")}</tspan>'
        f'<tspan class="blink" fill="{BRIGHT}"> ▍</tspan>'
        f"</text>"
    )
    return finish(parts, W, H)


if __name__ == "__main__":
    write(OUT, render())
