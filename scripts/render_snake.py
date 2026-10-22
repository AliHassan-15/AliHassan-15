#!/usr/bin/env python3
"""A snake with eyes that starts short and grows each time it eats a green box.

The board is a contribution-style grid with extra green boxes, so the snake
has a full field to eat. The real year stays on the heatmap and the stats card.
"""

import json
import math
import os

from grid import weeks_for
from svgutil import begin, finish, write
from theme import FULL_W, GREEN

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "snake.svg")

COLS = 18
ROWS = 7
CELL = 40
GAP = 10
STEP = CELL + GAP
DUR = 18
START = 3
MAX_LEN = 16


def load():
    with open(SRC, encoding="utf-8") as handle:
        return json.load(handle)


def board_from(days):
    """18 by 7 field. Real active weeks stay bright, and quiet weeks get food too."""
    source = weeks_for(days)
    levels = [[0 for _ in range(ROWS)] for _ in range(COLS)]
    if source:
        for col in range(COLS):
            start = int(col * len(source) / COLS)
            stop = max(start + 1, int((col + 1) * len(source) / COLS))
            for row in range(ROWS):
                real = 0
                for src_col in range(start, min(stop, len(source))):
                    cell = source[src_col][row]
                    if cell is not None:
                        real = max(real, cell[2])
                levels[col][row] = real
    filled = 0
    for col in range(COLS):
        for row in range(ROWS):
            wave = (
                math.sin(col * 0.62)
                + 0.75 * math.sin(col * 0.28 + row * 1.35)
                + 0.4 * math.sin(row * 0.85 + 0.6)
            )
            if wave < -0.05:
                food = 0
            elif wave < 0.4:
                food = 1
            elif wave < 0.9:
                food = 2
            elif wave < 1.25:
                food = 3
            else:
                food = 4
            real = levels[col][row]
            if real > 0:
                food = max(food, min(4, real + 1))
            levels[col][row] = food
            filled += int(food > 0)
    print(f"snake board {filled}/{COLS * ROWS} green boxes")
    return levels


def route(levels, left, top):
    points = []
    for row in range(ROWS):
        columns = range(COLS) if row % 2 == 0 else range(COLS - 1, -1, -1)
        for col in columns:
            x = left + col * STEP + CELL / 2
            y = top + row * STEP + CELL / 2
            points.append((x, y, levels[col][row]))
    return points


def path_d(points):
    head = f"M {points[0][0]:.1f} {points[0][1]:.1f}"
    rest = " ".join(f"L {x:.1f} {y:.1f}" for x, y, _level in points[1:])
    return f"{head} {rest}"


def motion(index, count, rotate):
    """Head opens a couple of cells in, so the starting body is already visible behind it."""
    times = []
    spots = []
    for step in range(count):
        if step == 0:
            times.append("0")
        elif step == count - 1:
            times.append("1")
        else:
            times.append(f"{step / (count - 1):.5f}")
        pos = step + (START - 1 - index)
        pos = max(0, min(count - 1, pos))
        spots.append("0" if pos == 0 else f"{pos / (count - 1):.5f}")
    spin = ' rotate="auto"' if rotate else ""
    return (
        f'<animateMotion dur="{DUR}s" repeatCount="indefinite" calcMode="discrete"{spin} '
        f'keyPoints="{";".join(spots)}" keyTimes="{";".join(times)}">'
        f'<mpath href="#route"/></animateMotion>'
    )


def grow_times(points):
    """Meals that add a segment, spread across the whole loop so the snake keeps lengthening."""
    meals = [
        index
        for index, (_x, _y, level) in enumerate(points)
        if level > 0 and index >= START + 2
    ]
    needed = MAX_LEN - START
    if not meals or needed <= 0:
        return []
    stride = max(1, len(meals) // needed)
    chosen = []
    for meal in meals[::stride]:
        if len(chosen) >= needed:
            break
        if not chosen or meal > chosen[-1]:
            chosen.append(meal)
    return chosen


def appear_anim(path_index, count):
    step = max(0, path_index - (START - 1))
    start = min(0.9, max(0.04, step / (count - 1)))
    mid = min(0.96, start + 0.012)
    return (
        f'<animate attributeName="opacity" values="0;0;1;1;0" '
        f'keyTimes="0;{start:.4f};{mid:.4f};0.985;1" dur="{DUR}s" repeatCount="indefinite"/>'
    )


def eat_anim(color, path_index, count):
    start = min(0.94, path_index / count)
    mid = min(0.97, start + 0.01)
    empty = GREEN[0]
    return (
        f'<animate attributeName="fill" values="{color};{color};{empty};{empty};{color}" '
        f'keyTimes="0;{start:.4f};{mid:.4f};0.985;1" dur="{DUR}s" repeatCount="indefinite"/>'
    )


def render(data):
    levels = board_from(data["days"])
    grid_w = COLS * STEP
    left = max(28, int((FULL_W - grid_w) / 2))
    top = 28
    height = top + ROWS * STEP + 18
    points = route(levels, left, top)
    count = len(points)
    grows = grow_times(points)

    parts = begin(FULL_W, height, "Snake eating green contribution boxes", "ali@github ~ $ ./snake.sh")
    parts.append(f'<path id="route" d="{path_d(points)}" fill="none"/>')

    box = CELL - 4
    for index, (x, y, level) in enumerate(points):
        origin_x = x - box / 2
        origin_y = y - box / 2
        # The opening cells are already under the snake, so they read as eaten.
        if index < START:
            color = GREEN[0]
            extra = ""
        else:
            color = GREEN[max(0, min(4, level))]
            extra = eat_anim(color, index, count) if level else ""
        parts.append(
            f'<rect x="{origin_x:.1f}" y="{origin_y:.1f}" width="{box}" height="{box}" rx="7" '
            f'fill="{color}">{extra}</rect>'
        )

    # Tail first, so the head and its eyes paint on top.
    for index in range(MAX_LEN - 1, 0, -1):
        radius = max(16, 27 - index * 0.7)
        shade = index / MAX_LEN
        red = int(126 + (14 - 126) * shade)
        green = int(231 + (68 - 231) * shade)
        blue = int(135 + (41 - 135) * shade)
        color = f"#{red:02x}{green:02x}{blue:02x}"
        if index >= START:
            hidden = appear_anim(grows[index - START], count)
            shown = "0"
        else:
            hidden = ""
            shown = "1"
        parts.append(
            f'<g opacity="{shown}">{motion(index, count, False)}'
            f'<circle r="{radius:.1f}" fill="{color}" stroke="#0d1117" stroke-width="2"/>'
            f"{hidden}</g>"
        )

    parts.append(
        f"<g>{motion(0, count, True)}"
        f'<ellipse cx="4" cy="0" rx="30" ry="22" fill="#7ee787"/>'
        f'<ellipse cx="4" cy="0" rx="30" ry="22" fill="none" stroke="#0d1117" stroke-width="2"/>'
        f'<circle cx="18" cy="-7" r="5.4" fill="#f4fff8"/>'
        f'<circle cx="18" cy="7" r="5.4" fill="#f4fff8"/>'
        f'<circle cx="19.8" cy="-7" r="2.6" fill="#0d1117"/>'
        f'<circle cx="19.8" cy="7" r="2.6" fill="#0d1117"/>'
        f'<circle cx="20.8" cy="-8.1" r="1" fill="#ffffff"/>'
        f'<circle cx="20.8" cy="5.9" r="1" fill="#ffffff"/>'
        f'<polygon points="28,-1.6 38,0 28,1.6" fill="#f85149"/>'
        f"</g>"
    )
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    write(OUT, render(load()))
