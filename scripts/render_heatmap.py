#!/usr/bin/env python3
"""Animated contribution calendar from data/contributions.json."""

import json
import os

from grid import human_date, month_labels, weeks_for
from svgutil import BONE, COPPER, MONO, MUTED, SANS, begin, esc, finish, write
from theme import FULL_W, GREEN

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "heatmap.svg")

CELL = 11
GAP = 3
STEP = CELL + GAP
WEEKDAYS = {1: "Mon", 3: "Wed", 5: "Fri"}


def render(data):
    grid = weeks_for(data["days"])
    cols = len(grid)
    grid_w = cols * STEP
    grid_h = 7 * STEP
    left = max(36, int((FULL_W - grid_w) / 2))
    top = 78
    legend_y = top + grid_h + 8
    stats_y = legend_y + 36
    height = stats_y + 28

    parts = begin(
        FULL_W,
        height,
        f"{data['total_contributions']:,} contributions in the last year",
        "contributions",
        "refreshed daily",
    )
    parts.append(
        "<style>"
        ".cell{animation:cell .4s cubic-bezier(.16,.84,.32,1) both}"
        "@keyframes cell{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}"
        "</style>"
    )

    for index, name in month_labels(grid):
        x = left + index * STEP
        parts.append(
            f'<text x="{x}" y="64" fill="{MUTED}" font-family="{MONO}" font-size="11">{esc(name)}</text>'
        )

    for row, name in WEEKDAYS.items():
        y = top + row * STEP + CELL * 0.8
        parts.append(
            f'<text x="{left - 30}" y="{y:.1f}" fill="{MUTED}" font-family="{MONO}" font-size="10">'
            f"{esc(name)}</text>"
        )

    for col, column in enumerate(grid):
        x = left + col * STEP
        for row, cell in enumerate(column):
            if cell is None:
                continue
            date, count, level = cell
            y = top + row * STEP
            delay = col * 0.012 + row * 0.028
            color = GREEN[max(0, min(4, level))]
            noun = "contribution" if count == 1 else "contributions"
            parts.append(
                f'<rect class="cell" x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="2.5" '
                f'fill="{color}" style="animation-delay:{delay:.3f}s">'
                f"<title>{esc(date)}: {count} {noun}</title></rect>"
            )

    legend_x = left + grid_w - (len(GREEN) * 14) - 36
    parts.append(
        f'<text x="{legend_x - 8}" y="{legend_y + 10}" fill="{MUTED}" font-family="{MONO}" '
        f'font-size="11" text-anchor="end">Less</text>'
    )
    for level, color in enumerate(GREEN):
        parts.append(
            f'<rect x="{legend_x + level * 14}" y="{legend_y}" width="10" height="10" rx="2" fill="{color}"/>'
        )
    parts.append(
        f'<text x="{legend_x + len(GREEN) * 14 + 4}" y="{legend_y + 10}" fill="{MUTED}" '
        f'font-family="{MONO}" font-size="11">More</text>'
    )

    total = data["total_contributions"]
    current = data["current_streak"]["length"]
    longest = data["longest_streak"]["length"]
    best = data["best_day"]
    dot = f'<tspan fill="{MUTED}">    ·    </tspan>'
    pieces = [
        f'<tspan fill="{BONE}" font-weight="600">{total:,}</tspan> contributions this year',
    ]
    if current:
        pieces.append(
            f'current streak <tspan fill="{COPPER}" font-weight="600">{current} days</tspan>'
        )
    pieces.append(
        f'longest streak <tspan fill="{COPPER}" font-weight="600">{longest} days</tspan>'
    )
    pieces.append(
        f'best day <tspan fill="{BONE}" font-weight="600">{best["count"]}</tspan>'
        f'  ·  {esc(human_date(best["date"]))}'
    )
    parts.append(
        f'<text x="22" y="{stats_y}" fill="{MUTED}" font-family="{SANS}" font-size="14">'
        f"{dot.join(pieces)}</text>"
    )
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    with open(SRC, encoding="utf-8") as handle:
        write(OUT, render(json.load(handle)))
