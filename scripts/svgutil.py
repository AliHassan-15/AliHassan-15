"""SVG card chrome shared by every profile graphic."""

import random

from theme import DOTS, LINE, MONO, MUTED, PANEL, RAISED

CSS = """
.rise { animation: rise .5s cubic-bezier(.16,.84,.32,1) both; }
.pop { transform-box: fill-box; transform-origin: center; animation: pop .42s cubic-bezier(.16,.84,.32,1) both; }
.draw { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: draw 1s ease forwards; }
@keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes pop { from { opacity: 0; transform: scale(.35); } to { opacity: 1; transform: none; } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .rise, .pop, .draw { animation: none !important; opacity: 1 !important; transform: none !important; stroke-dashoffset: 0 !important; }
}
"""


def esc(value):
    return str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def dust_layer(w, h, seed=11):
    """Tiny light-gray dust that wanders and twinkles over the card body."""
    rng = random.Random(seed)
    shades = ("#8b949e", "#aab1ba", "#c9d1d9", "#e6edf3")
    top = 46
    left, right = 8, w - 8
    bottom = h - 8
    area = max(1, (right - left) * (bottom - top))
    count = max(32, min(90, area // 14000))
    parts = [
        f'<defs><clipPath id="dustClip">'
        f'<rect x="0" y="{top}" width="{w}" height="{max(1, bottom - top)}"/>'
        f"</clipPath></defs>",
        '<g clip-path="url(#dustClip)">',
    ]
    for index in range(count):
        px = rng.uniform(left, right)
        py = rng.uniform(top, bottom)
        waypoints = [(px, py)]
        for _ in range(3):
            nx = min(right, max(left, waypoints[-1][0] + rng.uniform(-32, 32)))
            ny = min(bottom, max(top, waypoints[-1][1] + rng.uniform(-40, 40)))
            waypoints.append((nx, ny))
        waypoints.append((px, py))
        xs = ";".join(f"{point[0]:.1f}" for point in waypoints)
        ys = ";".join(f"{point[1]:.1f}" for point in waypoints)
        radius = rng.uniform(0.8, 1.7)
        opacity = rng.uniform(0.28, 0.55)
        move_dur = rng.uniform(14, 26)
        twinkle = index % 4 != 0
        if twinkle:
            blink_dur = rng.uniform(2.0, 5.0)
            blink_values = f"0.06;{opacity:.2f};0.1;{opacity:.2f};0.04;{opacity:.2f}"
            blink_times = "0;0.18;0.34;0.55;0.72;1"
        else:
            blink_dur = move_dur
            blink_values = f"{opacity:.2f};{opacity * 0.65:.2f};{opacity:.2f}"
            blink_times = "0;0.5;1"
        parts.append(
            f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{radius:.2f}" '
            f'fill="{rng.choice(shades)}" opacity="{opacity:.2f}">'
            f'<animate attributeName="cx" values="{xs}" dur="{move_dur:.1f}s" '
            f'begin="{(index * 0.31) % move_dur:.1f}s" repeatCount="indefinite" calcMode="linear"/>'
            f'<animate attributeName="cy" values="{ys}" dur="{move_dur * 1.1:.1f}s" '
            f'begin="{(index * 0.47) % move_dur:.1f}s" repeatCount="indefinite" calcMode="linear"/>'
            f'<animate attributeName="opacity" values="{blink_values}" keyTimes="{blink_times}" '
            f'dur="{blink_dur:.1f}s" begin="{(index * 0.59) % blink_dur:.1f}s" repeatCount="indefinite"/>'
            f"</circle>"
        )
    parts.append("</g>")
    return parts


def begin(w, h, title, prompt):
    """Terminal window. Content starts under the title bar at y=46."""
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}" role="img">'
        ),
        f"<title>{esc(title)}</title>",
        f"<style>{CSS}</style>",
        f'<rect width="{w}" height="{h}" rx="12" fill="{PANEL}"/>',
        f'<rect width="{w}" height="38" rx="12" fill="{RAISED}"/>',
        f'<rect y="20" width="{w}" height="18" fill="{RAISED}"/>',
        f'<line x1="0" y1="38" x2="{w}" y2="38" stroke="{LINE}"/>',
    ]
    for index, color in enumerate(DOTS):
        parts.append(f'<circle cx="{18 + index * 16}" cy="19" r="5" fill="{color}"/>')
    parts.append(
        f'<text x="{w / 2}" y="24" fill="{MUTED}" font-family="{MONO}" font-size="13" '
        f'text-anchor="middle">{esc(prompt)}</text>'
    )
    return parts


def finish(parts, w, h, dust=True, seed=None):
    if dust:
        parts.extend(dust_layer(w, h, seed=(w * 17 + h) if seed is None else seed))
    parts.append(
        f'<rect x="0.5" y="0.5" width="{w - 1}" height="{h - 1}" rx="12" fill="none" stroke="{LINE}"/>'
    )
    parts.append("</svg>")
    return "".join(parts)


def write(path, svg):
    with open(path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(svg)
    print(f"wrote {path} ({len(svg)} bytes)")
