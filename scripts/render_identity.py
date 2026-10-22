#!/usr/bin/env python3
"""Stats card that sits level with the portrait. Numbers and the monthly bars are live."""

import datetime
import json
import os

from grid import human_date
from svgutil import begin, esc, finish, write
from theme import BONE, GREEN_INK, LINE, MONO, MUTED, PAIR_H, PAIR_W, RAISED, SANS

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
SRC = os.path.join(ROOT, "data", "contributions.json")
OUT = os.path.join(ROOT, "identity.svg")

FACTS = [
    ("stack", "MERN · Python · AI/ML · DevOps"),
    ("based", "Lahore, Pakistan"),
    ("uni", "BS Computer Science, FAST-NUCES"),
    ("record", "Dean's List ×5 · CGPA 3.57/4.00"),
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


def months_of(data):
    buckets = {}
    for day in data["days"]:
        key = day["date"][:7]
        buckets[key] = buckets.get(key, 0) + int(day["count"])
    rows = []
    for key in sorted(buckets):
        year, month = key.split("-")
        label = datetime.date(int(year), int(month), 1).strftime("%b")
        rows.append((label, buckets[key]))
    return rows


def chart(parts, data, top):
    """Monthly bars. The tallest month carries its real total, the way a stats card does."""
    rows = months_of(data) if data else []
    bottom = PAIR_H - 36
    parts.append(
        f'<rect x="24" y="{top}" width="{PAIR_W - 48}" height="{bottom - top}" rx="12" '
        f'fill="{RAISED}" stroke="{LINE}"/>'
    )
    parts.append(
        f'<text x="44" y="{top + 28}" fill="{MUTED}" font-family="{MONO}" font-size="13">'
        f'{esc("contributions / month")}</text>'
    )
    if not rows:
        return
    peak = max(count for _, count in rows) or 1
    plot_top = top + 78
    plot_bottom = bottom - 36
    plot_h = max(40, plot_bottom - plot_top)
    inner_left = 44
    inner_right = PAIR_W - 44
    slot = (inner_right - inner_left) / len(rows)
    bar_w = min(36, slot * 0.62)
    for index, (label, count) in enumerate(rows):
        bar_h = 0 if count <= 0 else max(6, plot_h * (count / peak))
        x = inner_left + index * slot + (slot - bar_w) / 2
        y = plot_bottom - bar_h
        color = "#7ee787" if count == peak and count > 0 else "#3fb950"
        delay = 0.15 + index * 0.05
        parts.append(f'<g><title>{esc(label)} · {count}</title>')
        if count > 0:
            parts.append(
                f'<rect x="{x:.1f}" y="{y:.1f}" width="{bar_w:.1f}" height="{bar_h:.1f}" rx="5" fill="{color}">'
                f'<animate attributeName="height" from="0" to="{bar_h:.1f}" dur="0.7s" '
                f'begin="{delay:.2f}s" fill="freeze"/>'
                f'<animate attributeName="y" from="{plot_bottom:.1f}" to="{y:.1f}" dur="0.7s" '
                f'begin="{delay:.2f}s" fill="freeze"/>'
                f"</rect>"
            )
            if count == peak:
                parts.append(
                    f'<text x="{x + bar_w / 2:.1f}" y="{y - 10:.1f}" fill="{GREEN_INK}" '
                    f'font-family="{SANS}" font-size="14" font-weight="700" text-anchor="middle">'
                    f"{count:,}</text>"
                )
        parts.append(
            f'<text x="{x + bar_w / 2:.1f}" y="{plot_bottom + 20:.1f}" fill="{MUTED}" '
            f'font-family="{MONO}" font-size="12" text-anchor="middle">{esc(label)}</text>'
        )
        parts.append("</g>")


def render():
    data = load()
    parts = begin(PAIR_W, PAIR_H, "Ali Hassan — year in contributions", "ali@github ~ $ ./stats.sh")
    # Quiet continuous glow behind the card so the pair feels alive next to the portrait.
    parts.append(
        f'<circle cx="{PAIR_W - 120}" cy="220" r="90" fill="{GREEN_INK}" opacity="0.05">'
        f'<animate attributeName="r" values="70;110;70" dur="8s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values="0.03;0.09;0.03" dur="8s" repeatCount="indefinite"/>'
        f"</circle>"
        f'<circle cx="140" cy="{PAIR_H - 180}" r="120" fill="{GREEN_INK}" opacity="0.04">'
        f'<animate attributeName="r" values="95;140;95" dur="10s" begin="1s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values="0.02;0.07;0.02" dur="10s" begin="1s" repeatCount="indefinite"/>'
        f"</circle>"
    )
    parts.append(
        f'<text class="rise" x="24" y="74" fill="{BONE}" font-family="{SANS}" '
        f'font-size="30" font-weight="650">{esc("Ali Hassan")}</text>'
    )
    parts.append(
        f'<text class="rise" x="24" y="114" fill="{GREEN_INK}" font-family="{SANS}" font-size="24" '
        f'style="animation-delay:.06s">{esc("Full-Stack Developer · AI/ML Engineer")}</text>'
    )

    y = 164
    delay = 0.1
    for key, value in FACTS:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="24" y="{y}" fill="{GREEN_INK}" font-family="{MONO}" font-size="24">{esc(key)}</text>'
        )
        parts.append(
            f'<text x="168" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="24">{esc(value)}</text>'
        )
        parts.append("</g>")
        y += 40
        delay += 0.04

    y += 10
    for org, role, when in ROLES:
        parts.append(f'<g class="rise" style="animation-delay:{delay:.2f}s">')
        parts.append(
            f'<text x="24" y="{y}" fill="{BONE}" font-family="{MONO}" font-size="22">{esc(org)}</text>'
        )
        parts.append(
            f'<text x="210" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="22">{esc(role)}</text>'
        )
        parts.append(
            f'<text x="{PAIR_W - 24}" y="{y}" fill="{MUTED}" font-family="{MONO}" font-size="22" '
            f'text-anchor="end">{esc(when)}</text>'
        )
        parts.append("</g>")
        y += 36
        delay += 0.04

    y += 16
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

    # Streaks, volume, then the best day beside the average.
    span = "—"
    long_span = "—"
    if data:
        span = f"{human_date(data['current_streak']['start'])} – {human_date(data['current_streak']['end'])}"
        long_span = f"{human_date(data['longest_streak']['start'])} – {human_date(data['longest_streak']['end'])}"
        if data["current_streak"]["length"] <= 1:
            span = human_date(data["current_streak"]["end"])
    share = f"{round(100 * active / days)}% of the year" if days else "—"
    def day_word(count):
        return f"{count} day" if count == 1 else f"{count} days"

    tiles = [
        ("current streak", day_word(current), span),
        ("longest streak", day_word(longest), long_span),
        ("contributions", f"{total:,}", "in the last year"),
        ("active days", f"{active} / {days}", share),
        ("best day", str(best_count), best_when),
        ("avg / active day", avg, "contributions"),
    ]
    gap = 12
    tile_w = (PAIR_W - 48 - gap) / 2
    tile_h = 104
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

    chart_top = top + 3 * (tile_h + gap) + 16
    chart(parts, data, chart_top)
    return finish(parts, PAIR_W, PAIR_H)


if __name__ == "__main__":
    write(OUT, render())
