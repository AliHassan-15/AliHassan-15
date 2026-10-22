#!/usr/bin/env python3
"""Rebuild the profile art.

    python scripts/build_all.py            # everything, including the portrait
    python scripts/build_all.py live       # contributions, heatmap, snake
    python scripts/build_all.py portrait   # photo prep and ASCII card only
"""

import runpy
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

STATIC = [
    "render_masthead.py",
    "render_metrics.py",
    "render_identity.py",
    "render_work.py",
]
PORTRAIT = [
    "prep_portrait.py",
    "render_portrait.py",
]
LIVE = [
    "fetch_contributions.py",
    "render_heatmap.py",
    "render_snake.py",
    "render_identity.py",
]


def run(names):
    for name in names:
        print(f"\n— {name}")
        sys.argv = [str(HERE / name)]
        runpy.run_path(str(HERE / name), run_name="__main__")


if __name__ == "__main__":
    choice = sys.argv[1] if len(sys.argv) > 1 else "all"
    if choice == "live":
        run(LIVE)
    elif choice == "portrait":
        run(PORTRAIT)
    elif choice == "static":
        run(STATIC)
    else:
        run(STATIC + PORTRAIT + LIVE)
