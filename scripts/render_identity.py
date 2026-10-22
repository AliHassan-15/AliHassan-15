#!/usr/bin/env python3
"""Record card that sits level with the portrait. Stats come from live data."""

import json
import os

from grid import human_date
from svgutil import begin, esc, finish, write
from theme import BONE, GREEN, GREEN_INK, LINE, MONO, MUTED, PAIR_H, PAIR_W, RAISED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "identity.svg")

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


def load():
    if not os.path.exists(SRC):
        return None
    with open(SRC, encoding="utf-8") as handle:
        return json.load(handle)


def tile(parts, x, y, w, h, label, value, caption, delay):
    parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
    parts.append(
        f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="10" '
        f'fill="{RAISED}" stroke="{LINE}"/>'
    )
    parts.append(
        f'<text x="{x + 16:.1f}" y="{y + 24:.1f}" fill="{MUTED}" font-family="{MONO}" '
        f'font-size="12">{esc(label)}</text>'
    )
    parts.append(
        f'<text x="{x + 16:.1f}" y="{y + 62:.1f}" fill="{GREEN_INK}" font-family="{SANS}" '
        f'font-size="32" font-weight="700">{esc(value)}</text>'
    )
    parts.append(
        f'<text x="{x + 16:.1f}" y="{y + h - 14:.1f}" fill="{MUTED}" font-family="{SANS}" '
        f'font-size="13">{esc(caption)}</text>'
    )
    parts.append("</g>")


def render():
    data = load()
    parts = begin(PAIR_W, PAIR_H, "Ali Hassan — role, record, and GitHub year", "ali@github ~ $ whoami")
    parts.append(
        f'<text class="rise" x="24" y="78" fill="{BONE}" font-family="{SANS}" '
        f'font-size="30" font-weight="650">{esc("Ali Hassan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="24" y="104" fill="{GREEN_INK}" font-family="{SANS}" font-size="15" '
        f'style="animation-delay:.06s">{esc("Software Engineer")}</text>'
    )

    y = 140
    delay = 0.1
    for key, value in FACTS:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="24" y="{y}" fill="{GREEN_INK}" font-family="{MONO}" font-size="14">{esc(key)}</text>'
        )
        parts.append(
            f'<text x="108" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="14">{esc(value)}</text>'
        )
        parts.append("</g>")
        y += 28
        delay += 0.04

    y += 8
    parts.append(f'<line x1="24" y1="{y}" x2="{PAIR_W - 24}" y2="{y}" stroke="{LINE}"/>')

    total = active = current = longest = best_count = 0
    best_when = "—"
    days = 1
    if data:
        total = data["total_contributions"]
        active = data["active_days"]
        current = data["current_streak"]["length"]
        longest = data["longest_streak"]["length"]
        best_count = data["best_day"]["count"]
        best_when = human_date(data["best_day"]["date"])
        days = max(1, len(data["days"]))
    avg = f"{(total / active):.1f}" if active else "0"

    tiles = [
        ("contributions", f"{total:,}", "last 12 months"),
        ("active days", str(active), f"of {days} days"),
        ("longest streak", f"{longest}d", "best run"),
        ("best day", str(best_count), best_when),
        ("current streak", f"{current}d", "today"),
        ("per active day", avg, "contributions"),
    ]
    gap = 12
    tile_w = (PAIR_W - 48 - gap) / 2
    tile_h = 96
    top = y + 16
    for index, spec in enumerate(tiles):
        col, row = index % 2, index // 2
        tile(
            parts,
            24 + col * (tile_w + gap),
            top + row * (tile_h + gap),
            tile_w,
            tile_h,
            *spec,
            0.28 + index * 0.05,
        )

    y = top + 3 * (tile_h + gap) + 8
    parts.append(
        f'<text class="rise" x="24" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="12" '
        f'style="animation-delay:.55s">{esc("experience")}</text>'
    )
    y += 26
    delay = 0.6
    for org, role, when in ROLES:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="24" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="14">{esc(org)}</text>'
        )
        parts.append(
            f'<text x="150" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="13">{esc(role)}</text>'
        )
        parts.append(
            f'<text x="{PAIR_W - 24}" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="13" '
            f'text-anchor="end">{esc(when)}</text>'
        )
        parts.append("</g>")
        y += 26
        delay += 0.04

    y += 8
    parts.append(f'<line x1="24" y1="{y}" x2="{PAIR_W - 24}" y2="{y}" stroke="{LINE}"/>')
    y += 28
    parts.append(
        f'<text class="rise" x="24" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="13" '
        f'style="animation-delay:.78s">{esc("TypeScript · Python · React · Next.js · Node")}</text>'
    )
    y += 24
    parts.append(
        f'<text class="rise" x="24" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="13" '
        f'style="animation-delay:.84s">{esc("Django · FastAPI · PyTorch · PostgreSQL · Docker")}</text>'
    )
    y += 28
    for index, color in enumerate(["#0d1117", "#3fb950", "#e6edf3", "#8b949e", *GREEN]):
        parts.append(
            f'<rect class="pop" x="{24 + index * 20}" y="{y}" width="14" height="14" rx="3" '
            f'fill="{color}" stroke="{LINE}" style="animation-delay:{0.9 + index * 0.03:.2f}s"/>'
        )
    return finish(parts, PAIR_W, PAIR_H)


if __name__ == "__main__":
    write(OUT, render())
