"""Small SVG helpers. Each file is its own document, so ids can stay simple."""

from theme import BONE, COPPER, FULL_W, GREEN, LINE, MONO, MUTED, PANEL, RAISED, SANS

CSS = """
.rise { animation: rise .55s cubic-bezier(.16,.84,.32,1) both; }
@keyframes rise {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .rise, .wipe, .cursor, .draw, .pop {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    stroke-dashoffset: 0 !important;
  }
}
"""


def esc(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def begin(w, h, title, label=None, aside=None):
    """Open a card. Returns a list of SVG chunks. Content starts below y=48 when labeled."""
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}" role="img">'
        ),
        f"<title>{esc(title)}</title>",
        f"<style>{CSS}</style>",
        (
            f'<defs><clipPath id="shell">'
            f'<rect width="{w}" height="{h}" rx="16"/>'
            f"</clipPath></defs>"
        ),
        '<g clip-path="url(#shell)">',
        f'<rect width="{w}" height="{h}" fill="{PANEL}"/>',
        f'<rect width="3" height="{h}" fill="{COPPER}"/>',
        (
            f'<rect x="16" y="1" width="{w - 32}" height="1" fill="#ffffff" opacity="0.07"/>'
        ),
    ]
    if label:
        parts.append(
            f'<text x="22" y="30" fill="{MUTED}" font-family="{MONO}" font-size="12">'
            f"{esc(label)}</text>"
        )
    if aside:
        parts.append(
            f'<text x="{w - 20}" y="30" fill="{MUTED}" '
            f'font-family="{MONO}" font-size="12" text-anchor="end">{esc(aside)}</text>'
        )
    if label:
        parts.append(
            f'<rect x="20" y="44" width="{w - 40}" height="1" fill="{LINE}"/>'
        )
    return parts


def finish(parts, w, h):
    parts.append("</g>")
    parts.append(
        f'<rect x="0.5" y="0.5" width="{w - 1}" height="{h - 1}" rx="16" '
        f'fill="none" stroke="{LINE}"/>'
    )
    parts.append("</svg>")
    return "".join(parts)


def write(path, svg):
    with open(path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(svg)
    print(f"wrote {path} ({len(svg)} bytes)")


# Re-exported for render scripts that want one import.
__all__ = ["FULL_W", "SANS", "MONO", "BONE", "MUTED", "COPPER", "LINE", "PANEL", "begin", "finish", "esc", "write"]
