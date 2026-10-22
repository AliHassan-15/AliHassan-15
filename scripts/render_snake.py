#!/usr/bin/env python3
"""A snake with eyes that starts short and grows each time it eats a green box.

It turns up, down, left, and right, taking the shortest safe path to the nearest
green box. The real year stays on the heatmap and the stats card.
"""

import json
import math
import os
from collections import deque

from grid import weeks_for
from svgutil import begin, finish, write
from theme import FULL_W, GREEN, MONO, MUTED

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "snake.svg")

# Leave room for a quiet caption on each side of the board.
SIDE = 78
COLS = 34
ROWS = 11
CELL = 22
GAP = 4
STEP = CELL + GAP
DUR = 18
START = 3
MAX_LEN = 18
# The first board used 40px cells. The snake scales with the boxes.
SCALE = CELL / 40
# Seconds per cell. Higher is slower.
STEP_SEC = 0.12


def load():
    with open(SRC, encoding="utf-8") as handle:
        return json.load(handle)


def board_from(days):
    """A denser field. Real active weeks stay bright, and quiet weeks get food too."""
    source = weeks_for(days)
    levels = [[0 for _ in range(ROWS)] for _ in range(COLS)]
    if source:
        for col in range(COLS):
            start = int(col * len(source) / COLS)
            stop = max(start + 1, int((col + 1) * len(source) / COLS))
            for row in range(ROWS):
                real = 0
                if row < 7:
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


def neighbors(cell):
    col, row = cell
    for dc, dr in ((1, 0), (0, 1), (-1, 0), (0, -1)):
        nxt = (col + dc, row + dr)
        if 0 <= nxt[0] < COLS and 0 <= nxt[1] < ROWS:
            yield nxt


def shortest(start, goals, blocked):
    """Steps from the cell after start through the nearest goal."""
    if not goals:
        return None
    queue = deque([start])
    prev = {start: None}
    found = None
    while queue:
        cur = queue.popleft()
        if cur in goals and cur != start:
            found = cur
            break
        for nxt in neighbors(cur):
            if nxt in prev or nxt in blocked:
                continue
            prev[nxt] = cur
            queue.append(nxt)
    if found is None:
        return None
    steps = []
    cur = found
    while cur != start:
        steps.append(cur)
        cur = prev[cur]
    steps.reverse()
    return steps


def can_reach_tail(body):
    if len(body) <= 2:
        return True
    return shortest(body[-1], {body[0]}, set(body) - {body[0]}) is not None


def chase(body, food):
    """First step toward the nearest food, or away from the tail when that bite would trap it."""
    if len(body) < 2:
        return None
    tail = body[0]
    neck = body[-2]
    blocked = set(body)
    blocked.discard(tail)
    steps = shortest(body[-1], food, blocked) if food else None
    if steps:
        sim = deque(body)
        virtual = set(food)
        for nxt in steps:
            grow = nxt in virtual and len(sim) < MAX_LEN
            sim.append(nxt)
            virtual.discard(nxt)
            if not grow:
                sim.popleft()
        if can_reach_tail(sim):
            return steps[0]
    # No safe bite. Step into the open cell farthest from the tail so a lane opens.
    dist = {tail: 0}
    queue = deque([tail])
    while queue:
        cur = queue.popleft()
        for nxt in neighbors(cur):
            if nxt in dist or nxt in blocked:
                continue
            dist[nxt] = dist[cur] + 1
            queue.append(nxt)
    best = None
    for nxt in neighbors(body[-1]):
        if nxt == neck or nxt in blocked:
            continue
        score = dist.get(nxt, -1)
        if best is None or score > best[0]:
            best = (score, nxt)
    return None if best is None else best[1]


def seek_cells(levels):
    """Steer into the nearest green box, one cell at a time, the way a player would."""
    food = {(col, row) for col in range(COLS) for row in range(ROWS) if levels[col][row] > 0}
    body = deque((col, 0) for col in range(START))
    for cell in body:
        food.discard(cell)
    trail = list(body)
    grew = []
    guard = 0
    limit = COLS * ROWS * 8

    def advance(nxt, allow_grow):
        will_grow = allow_grow and nxt in food and len(body) < MAX_LEN
        body.append(nxt)
        if will_grow:
            grew.append(len(trail))
        else:
            body.popleft()
        trail.append(nxt)
        food.discard(nxt)

    while food and guard < limit:
        guard += 1
        nxt = chase(body, food)
        if nxt is None:
            break
        advance(nxt, True)
    home = (START - 1, 0)
    while body[-1] != home and guard < limit:
        guard += 1
        nxt = chase(body, {home})
        if nxt is None or nxt == body[-1]:
            break
        advance(nxt, False)
    eaten = sum(1 for cell in set(trail) if levels[cell[0]][cell[1]] > 0)
    print(f"snake path {len(trail)} steps, ate {eaten}, left {len(food)}")
    return trail, grew


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


def appear_anim(path_index, count):
    step = max(0, path_index - (START - 1))
    start = min(0.9, max(0.04, step / (count - 1)))
    mid = min(0.96, start + 0.012)
    return (
        f'<animate attributeName="opacity" values="0;0;1;1;0" '
        f'keyTimes="0;{start:.4f};{mid:.4f};0.985;1" dur="{DUR}s" repeatCount="indefinite"/>'
    )


def eat_anim(color, path_index, count):
    """The box goes dark when the head lands on it, then the board refills for the next loop."""
    step = max(0, path_index - (START - 1))
    start = min(0.94, max(0.02, step / (count - 1)))
    mid = min(0.965, start + 0.012)
    empty = GREEN[0]
    return (
        f'<animate attributeName="fill" values="{color};{color};{empty};{empty};{color}" '
        f'keyTimes="0;{start:.4f};{mid:.4f};0.985;1" dur="{DUR}s" repeatCount="indefinite"/>'
    )


def cell_center(col, row, left, top):
    return left + col * STEP + CELL / 2, top + row * STEP + CELL / 2


def side_caption(x, y, label, rotate):
    """A quiet vertical line in the empty margin beside the board."""
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" fill="{MUTED}" font-family="{MONO}" font-size="11" '
        f'letter-spacing="1.4" text-anchor="middle" '
        f'transform="rotate({rotate} {x:.1f} {y:.1f})">{label}</text>'
    )


def render(data):
    global DUR
    levels = board_from(data["days"])
    grid_w = COLS * STEP
    left = max(SIDE, int((FULL_W - grid_w) / 2))
    top = 46
    height = top + ROWS * STEP + 18
    trail, grew = seek_cells(levels)
    points = []
    arrival = {}
    for index, (col, row) in enumerate(trail):
        x, y = cell_center(col, row, left, top)
        points.append((x, y, levels[col][row] if index >= START else 0))
        arrival.setdefault((col, row), index)
    count = len(points)
    DUR = max(22.0, round((count - 1) * STEP_SEC, 2))
    grows = grew
    opening = set(trail[:START])
    mid_y = top + (ROWS * STEP) / 2
    left_x = left / 2
    right_x = left + grid_w + (FULL_W - left - grid_w) / 2

    parts = begin(FULL_W, height, "Snake eating green contribution boxes", "ali@github ~ $ ./snake.sh")
    parts.append(side_caption(left_x, mid_y, "less is more", -90))
    parts.append(side_caption(right_x, mid_y, "build · ship", 90))
    parts.append(f'<path id="route" d="{path_d(points)}" fill="none"/>')

    box = CELL - 4
    corner = max(3, round(5 * SCALE))
    for row in range(ROWS):
        for col in range(COLS):
            x, y = cell_center(col, row, left, top)
            origin_x = x - box / 2
            origin_y = y - box / 2
            level = levels[col][row]
            cell = (col, row)
            # The cells under the starting snake are already eaten.
            if cell in opening or level <= 0:
                color = GREEN[0]
                extra = ""
            else:
                color = GREEN[max(0, min(4, level))]
                extra = eat_anim(color, arrival[cell], count) if cell in arrival else ""
            parts.append(
                f'<rect x="{origin_x:.1f}" y="{origin_y:.1f}" width="{box}" height="{box}" rx="{corner}" '
                f'fill="{color}">{extra}</rect>'
            )

    # Tail first, so the head and its eyes paint on top.
    stroke = max(1.25, 2 * SCALE)
    for index in range(MAX_LEN - 1, 0, -1):
        radius = max(16 * SCALE, 27 * SCALE - index * 0.7 * SCALE)
        shade = index / MAX_LEN
        red = int(126 + (14 - 126) * shade)
        green = int(231 + (68 - 231) * shade)
        blue = int(135 + (41 - 135) * shade)
        color = f"#{red:02x}{green:02x}{blue:02x}"
        if index >= START and index - START < len(grows):
            hidden = appear_anim(grows[index - START], count)
            shown = "0"
        else:
            hidden = ""
            shown = "1"
        parts.append(
            f'<g opacity="{shown}">{motion(index, count, False)}'
            f'<circle r="{radius:.1f}" fill="{color}" stroke="#0d1117" stroke-width="{stroke:.2f}"/>'
            f"{hidden}</g>"
        )

    parts.append(
        f"<g>{motion(0, count, True)}"
        f'<ellipse cx="{4 * SCALE:.1f}" cy="0" rx="{30 * SCALE:.1f}" ry="{22 * SCALE:.1f}" fill="#7ee787"/>'
        f'<ellipse cx="{4 * SCALE:.1f}" cy="0" rx="{30 * SCALE:.1f}" ry="{22 * SCALE:.1f}" fill="none" stroke="#0d1117" stroke-width="{stroke:.2f}"/>'
        f'<circle cx="{18 * SCALE:.1f}" cy="{-7 * SCALE:.1f}" r="{5.4 * SCALE:.1f}" fill="#f4fff8"/>'
        f'<circle cx="{18 * SCALE:.1f}" cy="{7 * SCALE:.1f}" r="{5.4 * SCALE:.1f}" fill="#f4fff8"/>'
        f'<circle cx="{19.8 * SCALE:.1f}" cy="{-7 * SCALE:.1f}" r="{2.6 * SCALE:.1f}" fill="#0d1117"/>'
        f'<circle cx="{19.8 * SCALE:.1f}" cy="{7 * SCALE:.1f}" r="{2.6 * SCALE:.1f}" fill="#0d1117"/>'
        f'<circle cx="{20.8 * SCALE:.1f}" cy="{-8.1 * SCALE:.1f}" r="{SCALE:.1f}" fill="#ffffff"/>'
        f'<circle cx="{20.8 * SCALE:.1f}" cy="{5.9 * SCALE:.1f}" r="{SCALE:.1f}" fill="#ffffff"/>'
        f'<polygon points="{28 * SCALE:.1f},{-1.6 * SCALE:.1f} {38 * SCALE:.1f},0 {28 * SCALE:.1f},{1.6 * SCALE:.1f}" fill="#f85149"/>'
        f"</g>"
    )
    return finish(parts, FULL_W, height)


if __name__ == "__main__":
    write(OUT, render(load()))
