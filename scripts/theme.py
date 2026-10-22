"""Shared sizes and GitHub-dark colors. Cards are meant to sit on the profile page."""

FULL_W = 1060

# Portrait and record are a matched pair, so a 50/50 table keeps them level.
PAIR_W = 820
PAIR_H = 900

ART_X = 18
ART_TOP = 52
ART_BOTTOM = 40

PANEL = "#0d1117"
RAISED = "#161b22"
BONE = "#e6edf3"
MUTED = "#8b949e"
LINE = "#30363d"
GREEN_INK = "#3fb950"
BRIGHT = "#7ee787"
# Solid GitHub contribution boxes, empty through busiest.
GREEN = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
DOTS = ("#ff5f57", "#febc2e", "#28c840")

SANS = "ui-sans-serif, Segoe UI, Helvetica, Arial, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace"

USERNAME = "AliHassan-15"

# Backward-compatible names used by older imports.
COPPER = GREEN_INK
INK = BONE


def art_box():
    return (
        ART_X,
        ART_TOP,
        PAIR_W - ART_X * 2,
        PAIR_H - ART_TOP - ART_BOTTOM,
    )
