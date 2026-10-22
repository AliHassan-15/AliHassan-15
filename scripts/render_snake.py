#!/usr/bin/env python3
"""Snake-game pass over the real contribution grid.

The board is solid boxes. A snake of green boxes hops cell to cell, turns at
the end of each row, and bites the square it lands on.
"""

import json
import os

from grid import month_labels, snake_route, weeks_for
from svgutil import begin, esc, finish, write
from theme import FULL_W, GREEN, MONO, MUTED

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "snake.svg")

CELL = 16
GAP = 4
STEP = CELL + GAP
DUR = 16
TRAIL = 18


def path_d(points):
    if not points:
        return ""
    head = f"M {points[0][0]:.1f} {points[0][1]:.1f}"
    rest = " ".join(f"L {x:.1f} {y:.1f}" for x, y, _ in points[1:])
    return f"{head} {rest}"


def mix(a, b, t):
    def ch(color):
        return int(color[1:3], 16), int(color[3:5], 16), int(color[5:7], 16)

    left, right = ch(a), ch(b)
    rgb = tuple(int(left[i] + (right[i] - left[i]) * t) for i in range(3))
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def render(data):
    grid = weeks_for(data["days"])
    cols = max(1, len(grid))
    grid_w = cols * STEP
    left = max(28, int((FULL_W - grid_w) / 2))
    top = 68
    height = top + 7 * STEP + 22
    points = snake_route(grid, left, top, STEP, CELL)

    parts = begin(
        FULL_W,
        height,
        "Contribution snake eating the year's activity",
        "ali@github ~ $ ./snake.sh",
    )
    for index, name in month_labels(grid):
        parts.append(
            f'<text x="{left + index * STEP}" y="56" fill="{MUTED}" font-family="{MONO}" '
            f'font-size="12">{esc(name)}</text>'
        )

    # One visit clock, shared by the bite on each cell and the snake body.
    step_time = DUR / max(1, len(points))
    for index, (x, y, cell) in enumerate(points):
        level = 0 if cell is None else max(0, min(4, cell[2]))
        base = GREEN[level]
        bite = "#d2ffe0" if level else "#1f8a45"
        box = CELL - 1
        origin_x = x - CELL / 2
        origin_y = y - CELL / 2
        begin_at = index * step_time
        parts.append(
            f'<rect x="{origin_x:.1f}" y="{origin_y:.1f}" width="{box}" height="{box}" rx="3" fill="{base}">'
            f'<animate attributeName="fill" values="{base};{bite};{base}" keyTimes="0;0.08;0.22" '
            f'dur="{DUR}s" begin="{begin_at:.3f}s" repeatCount="indefinite"/>'
            f"</rect>"
        )

    route = path_d(points)
    parts.append(f'<path id="route" d="{route}" fill="none" stroke="none"/>')
    # Tail first, head last, so the head sits on top. Discrete hops = snake-game steps.
    for index in range(TRAIL, -1, -1):
        size = 15 if index == 0 else max(8, 14 - index * 0.28)
        offset = size / 2
        color = "#f0fff4" if index == 0 else mix("#7ee787", "#0e4429", index / TRAIL)
        opacity = 1 if index == 0 else max(0.35, 0.95 - index * 0.03)
        begin_at = -index * step_time
        parts.append(
            f'<rect x="-{offset:.2f}" y="-{offset:.2f}" width="{size:.2f}" height="{size:.2f}" '
            f'rx="3" fill="{color}" opacity="{opacity:.2f}">'
            f'<animateMotion dur="{DUR}s" begin="{begin_at:.3f}s" repeatCount="indefinite" '
            f'calcMode="discrete"><mpath href="#route"/></animateMotion></rect>'
        )
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    with open(SRC, encoding="utf-8") as handle:
        write(OUT, render(json.load(handle)))
