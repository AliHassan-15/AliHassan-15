#!/usr/bin/env python3
"""A snake glides the real contribution year. The grid stays readable underneath."""

import json
import os

from grid import month_labels, weeks_for
from svgutil import COPPER, MONO, MUTED, begin, esc, finish, write
from theme import FULL_W, GREEN

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "snake.svg")

CELL = 11
GAP = 3
STEP = CELL + GAP
DUR = 22
TRAIL = 14


def path_points(grid, left, top):
    points = []
    for col, column in enumerate(grid):
        rows = range(7) if col % 2 == 0 else range(6, -1, -1)
        for row in rows:
            cell = column[row]
            if cell is None:
                continue
            x = left + col * STEP + CELL / 2
            y = top + row * STEP + CELL / 2
            points.append((x, y))
    return points


def path_d(points):
    if not points:
        return ""
    commands = [f"M {points[0][0]:.1f} {points[0][1]:.1f}"]
    commands.extend(f"L {x:.1f} {y:.1f}" for x, y in points[1:])
    return " ".join(commands)


def render(data):
    grid = weeks_for(data["days"])
    cols = len(grid)
    grid_w = cols * STEP
    grid_h = 7 * STEP
    left = max(36, int((FULL_W - grid_w) / 2))
    top = 78
    height = top + grid_h + 28

    parts = begin(
        FULL_W,
        height,
        "Contribution snake walking the last year of GitHub activity",
        "snake",
        "loops",
    )
    parts.append(
        "<style>"
        ".cell{animation:cell .45s ease both}"
        "@keyframes cell{from{opacity:0}to{opacity:1}}"
        "</style>"
    )

    for index, name in month_labels(grid):
        x = left + index * STEP
        parts.append(
            f'<text x="{x}" y="64" fill="{MUTED}" font-family="{MONO}" font-size="11">{esc(name)}</text>'
        )

    for col, column in enumerate(grid):
        x = left + col * STEP
        for row, cell in enumerate(column):
            if cell is None:
                continue
            _, count, level = cell
            y = top + row * STEP
            color = GREEN[max(0, min(4, level))]
            delay = (col * 7 + row) * 0.004
            parts.append(
                f'<rect class="cell" x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="2.5" '
                f'fill="{color}" style="animation-delay:{delay:.3f}s">'
                f"<title>{count}</title></rect>"
            )

    points = path_points(grid, left, top)
    d = path_d(points)
    if points:
        step_time = DUR / len(points)
        # Soft glow, then the body, head last so it sits on top.
        parts.append(
            f'<circle r="11" fill="{COPPER}" opacity="0.18">'
            f'<animateMotion dur="{DUR}s" repeatCount="indefinite" path="{d}"/></circle>'
        )
        for index in range(TRAIL, 0, -1):
            radius = max(1.6, 6.4 - index * 0.34)
            opacity = max(0.08, 0.9 - index * 0.06)
            begin_at = -index * step_time
            parts.append(
                f'<circle r="{radius:.2f}" fill="{COPPER}" opacity="{opacity:.2f}">'
                f'<animateMotion dur="{DUR}s" begin="{begin_at:.3f}s" '
                f'repeatCount="indefinite" path="{d}"/></circle>'
            )
        parts.append(
            f'<circle r="4.6" fill="#f7f3ea">'
            f'<animateMotion dur="{DUR}s" repeatCount="indefinite" path="{d}"/></circle>'
        )
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    with open(SRC, encoding="utf-8") as handle:
        write(OUT, render(json.load(handle)))
