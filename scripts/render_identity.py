#!/usr/bin/env python3
"""Neofetch-style record. The story the contribution graph cannot tell."""

import os

from svgutil import BONE, COPPER, LINE, MONO, MUTED, SANS, begin, esc, finish, write
from theme import GREEN, IDENTITY_H, IDENTITY_W

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "identity.svg")

FACTS = [
    ("now", "Software engineer · MERN, Python, AI"),
    ("based", "Lahore, Pakistan"),
    ("school", "BS Computer Science, FAST-NUCES"),
    ("record", "Dean's List ×5 · CGPA 3.58"),
]

ROLES = [
    ("QBatch", "Full-stack intern", "2025"),
    ("Headstarter", "AI & LLM residency", "2024–25"),
    ("FAST-NUCES", "Teaching assistant · 300+", "2023–26"),
]

STACK = [
    "TypeScript · Python · SQL",
    "React · Next.js · Node · Django · FastAPI",
    "PyTorch · RAG · LangChain · PostgreSQL · Docker",
]

SWATCHES = ["#101113", "#e0b07a", "#f3efe6", "#8d877c", *GREEN]


def render():
    parts = begin(
        IDENTITY_W,
        IDENTITY_H,
        "Ali Hassan — role, experience, and stack",
        "ali@github",
        "whoami",
    )
    y = 86
    parts.append(
        f'<text class="rise" x="22" y="{y}" fill="{BONE}" font-family="{SANS}" '
        f'font-size="28" font-weight="600">{esc("Ali Hassan")}</text>'
    )
    y = 114
    parts.append(
        f'<text class="rise" x="22" y="{y}" fill="{COPPER}" font-family="{SANS}" '
        f'font-size="14" style="animation-delay:.08s">{esc("Software Engineer")}</text>'
    )

    y = 140
    delay = 0.16
    for key, value in FACTS:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="22" y="{y}" fill="{COPPER}" font-family="{MONO}" font-size="13">{esc(key)}</text>'
        )
        parts.append(
            f'<text x="92" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="13">{esc(value)}</text>'
        )
        parts.append("</g>")
        y += 28
        delay += 0.06

    y += 6
    parts.append(f'<rect x="22" y="{y}" width="{IDENTITY_W - 44}" height="1" fill="{LINE}"/>')
    y += 28
    parts.append(
        f'<text class="rise" x="22" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="11" '
        f'style="animation-delay:{delay:.2f}s">{esc("experience")}</text>'
    )
    y += 26
    delay += 0.08
    for org, role, when in ROLES:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="22" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="13">{esc(org)}</text>'
        )
        parts.append(
            f'<text x="132" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="12">{esc(role)}</text>'
        )
        parts.append(
            f'<text x="{IDENTITY_W - 22}" y="{y}" fill="{MUTED}" font-family="{MONO}" '
            f'font-size="12" text-anchor="end">{esc(when)}</text>'
        )
        parts.append("</g>")
        y += 26
        delay += 0.06

    y += 6
    parts.append(f'<rect x="22" y="{y}" width="{IDENTITY_W - 44}" height="1" fill="{LINE}"/>')
    y += 28
    parts.append(
        f'<text class="rise" x="22" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="11" '
        f'style="animation-delay:{delay:.2f}s">{esc("stack")}</text>'
    )
    y += 24
    delay += 0.06
    for line in STACK:
        parts.append(
            f'<text class="rise" x="22" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="12" '
            f'style="animation-delay:{delay:.2f}s">{esc(line)}</text>'
        )
        y += 22
        delay += 0.05

    y += 10
    parts.append(f'<rect x="22" y="{y}" width="{IDENTITY_W - 44}" height="1" fill="{LINE}"/>')
    y += 22
    for index, color in enumerate(SWATCHES):
        parts.append(
            f'<rect class="rise" x="{22 + index * 18}" y="{y}" width="12" height="12" rx="2" '
            f'fill="{color}" stroke="{LINE}" style="animation-delay:{delay + index * 0.03:.2f}s"/>'
        )
    y += 40
    parts.append(
        f'<text class="rise" x="22" y="{y}" fill="{COPPER}" font-family="{SANS}" font-size="13" '
        f'style="animation-delay:{delay + 0.2:.2f}s">{esc("Open to software engineering roles")}</text>'
    )
    return finish(parts, IDENTITY_W, IDENTITY_H)


if __name__ == "__main__":
    write(OUT, render())
