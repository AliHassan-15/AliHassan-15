#!/usr/bin/env python3
"""Filled contribution calendar. Every day is a solid box."""

import json
import os
import random

from grid import human_date, month_labels, weeks_for
from svgutil import begin, esc, finish, write
from theme import BONE, FULL_W, GREEN, GREEN_INK, MONO, MUTED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "contributions.svg")

CELL = 15
GAP = 4
STEP = CELL + GAP
WEEKDAYS = {1: "Mon", 3: "Wed", 5: "Fri"}


def render(data):
    grid = weeks_for(data["days"])
    cols = max(1, len(grid))
    grid_w = cols * STEP
    left = max(46, int((FULL_W - grid_w) / 2))
    top = 72
    legend_y = top + 7 * STEP + 8
    stats_y = legend_y + 34
    height = stats_y + 22

    parts = begin(
        FULL_W,
        height,
        f"{data['total_contributions']:,} contributions in the last year",
        "ali@github ~ $ ./contributions.sh",
    )
    for index, name in month_labels(grid):
        parts.append(
            f'<text x="{left + index * STEP}" y="58" fill="{MUTED}" font-family="{MONO}" '
            f'font-size="12">{esc(name)}</text>'
        )
    for row, name in WEEKDAYS.items():
        y = top + row * STEP + CELL * 0.78
        parts.append(
            f'<text x="{left - 32}" y="{y:.1f}" fill="{MUTED}" font-family="{MONO}" font-size="11">'
            f"{esc(name)}</text>"
        )

    # A light random scatter on quiet days only — no stripes. Real busy days stay honest.
    rng = random.Random(data.get("total_contributions", 0) * 97 + 13)
    for col, column in enumerate(grid):
        for row, cell in enumerate(column):
            if cell is None:
                continue
            date, count, level = cell
            shade = level
            if shade == 0 and rng.random() < 0.11:
                shade = 1 if rng.random() < 0.75 else 2
            x = left + col * STEP
            y = top + row * STEP
            color = GREEN[max(0, min(4, shade))]
            delay = col * 0.01 + row * 0.02
            noun = "contribution" if count == 1 else "contributions"
            parts.append(
                f'<rect class="pop" x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="3" '
                f'fill="{color}" style="animation-delay:{delay:.3f}s">'
                f"<title>{esc(date)}: {count} {noun}</title></rect>"
            )

    legend_x = left + grid_w - len(GREEN) * 18 - 28
    parts.append(
        f'<text x="{legend_x - 6}" y="{legend_y + 12}" fill="{MUTED}" font-family="{MONO}" '
        f'font-size="12" text-anchor="end">Less</text>'
    )
    for level, color in enumerate(GREEN):
        parts.append(
            f'<rect x="{legend_x + level * 18}" y="{legend_y}" width="14" height="14" rx="3" fill="{color}"/>'
        )
    parts.append(
        f'<text x="{legend_x + len(GREEN) * 18 + 6}" y="{legend_y + 12}" fill="{MUTED}" '
        f'font-family="{MONO}" font-size="12">More</text>'
    )

    total = data["total_contributions"]
    current = data["current_streak"]["length"]
    longest = data["longest_streak"]["length"]
    best = data["best_day"]
    pieces = [f'<tspan fill="{BONE}" font-weight="700">{total:,}</tspan> contributions']
    if current:
        pieces.append(f'current <tspan fill="{GREEN_INK}" font-weight="700">{current}d</tspan>')
    pieces.append(f'longest <tspan fill="{GREEN_INK}" font-weight="700">{longest}d</tspan>')
    pieces.append(
        f'best <tspan fill="{BONE}" font-weight="700">{best["count"]}</tspan> · {esc(human_date(best["date"]))}'
    )
    parts.append(
        f'<text x="24" y="{stats_y}" fill="{MUTED}" font-family="{SANS}" font-size="15">'
        + '<tspan>   ·   </tspan>'.join(pieces)
        + "</text>"
    )
    return finish(parts, FULL_W, height, dust=False)


if __name__ == "__main__":
    with open(SRC, encoding="utf-8") as handle:
        write(OUT, render(json.load(handle)))
