"""SVG card chrome shared by every profile graphic."""

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


def finish(parts, w, h):
    parts.append(
        f'<rect x="0.5" y="0.5" width="{w - 1}" height="{h - 1}" rx="12" fill="none" stroke="{LINE}"/>'
    )
    parts.append("</svg>")
    return "".join(parts)


def write(path, svg):
    with open(path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(svg)
    print(f"wrote {path} ({len(svg)} bytes)")
