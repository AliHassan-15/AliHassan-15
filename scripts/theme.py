"""Shared sizes and colors for the profile art."""

FULL_W = 900

PORTRAIT_W = 430
PORTRAIT_H = 640
IDENTITY_W = 470
IDENTITY_H = 640

# ASCII sampling box inside the portrait card.
ART_X = 22
ART_TOP = 54
ART_BOTTOM = 46

PANEL = "#101113"
RAISED = "#18191d"
BONE = "#f3efe6"
MUTED = "#8d877c"
FAINT = "#5e5a53"
COPPER = "#e0b07a"
LINE = "#2c2b28"
INK = "#101113"

# GitHub levels 0–4. Empty is quiet; the top end is luminous, not neon-noise.
GREEN = ["#16181c", "#17352a", "#1b6844", "#3fbe7c", "#c8f6dc"]

SANS = "ui-sans-serif, Segoe UI, Helvetica, Arial, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace"

USERNAME = "AliHassan-15"


def art_box():
    return (
        ART_X,
        ART_TOP,
        PORTRAIT_W - ART_X * 2,
        PORTRAIT_H - ART_TOP - ART_BOTTOM,
    )
