#!/usr/bin/env python3
"""Pull the public contribution calendar and write data/contributions.json.

GitHub serves the same markup the profile page uses at
https://github.com/users/<username>/contributions. No token.
"""

import datetime
import json
import os
import re
import sys

import requests
from bs4 import BeautifulSoup

from theme import USERNAME

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(HERE, "..", "data", "contributions.json")
URL = f"https://github.com/users/{os.environ.get('GH_PROFILE_USER', USERNAME)}/contributions"


def fetch_days():
    response = requests.get(
        URL,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; profile-art/1.0)",
            "Accept": "text/html",
        },
        timeout=30,
    )
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    cells = soup.select("td.ContributionCalendar-day")
    if not cells:
        print("No contribution cells found. GitHub markup may have changed.", file=sys.stderr)
        sys.exit(1)

    days = []
    for cell in cells:
        date = cell.get("data-date")
        if not date:
            continue
        tooltip = None
        cell_id = cell.get("id")
        if cell_id:
            tooltip = soup.find("tool-tip", attrs={"for": cell_id})
        text = tooltip.get_text(" ", strip=True) if tooltip else ""
        if re.search(r"no contributions", text, re.I):
            count = 0
        else:
            match = re.search(r"(\d+)\s+contribution", text, re.I)
            count = int(match.group(1)) if match else 0
        days.append(
            {
                "date": date,
                "count": count,
                "level": int(cell.get("data-level") or 0),
            }
        )
    days.sort(key=lambda day: day["date"])
    return days


def current_streak(days):
    index = len(days) - 1
    if index >= 0 and days[index]["count"] == 0:
        index -= 1
    length = 0
    end = index
    while index >= 0 and days[index]["count"] > 0:
        length += 1
        index -= 1
    if length == 0:
        return {"length": 0, "start": None, "end": None}
    return {
        "length": length,
        "start": days[index + 1]["date"],
        "end": days[end]["date"],
    }


def longest_streak(days):
    best = run = 0
    start = end = None
    run_start = None
    for index, day in enumerate(days):
        if day["count"] > 0:
            if run == 0:
                run_start = index
            run += 1
            if run > best:
                best = run
                start = days[run_start]["date"]
                end = day["date"]
        else:
            run = 0
    return {"length": best, "start": start, "end": end}


def build(days):
    total = sum(day["count"] for day in days)
    active = sum(1 for day in days if day["count"] > 0)
    best = max(days, key=lambda day: day["count"])
    user = os.environ.get("GH_PROFILE_USER", USERNAME)
    return {
        "username": user,
        "generated_at": datetime.datetime.now(datetime.timezone.utc).strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        ),
        "range": {"start": days[0]["date"], "end": days[-1]["date"]},
        "total_contributions": total,
        "active_days": active,
        "current_streak": current_streak(days),
        "longest_streak": longest_streak(days),
        "best_day": {"date": best["date"], "count": best["count"]},
        "days": days,
    }


if __name__ == "__main__":
    days = fetch_days()
    data = build(days)
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8", newline="\n") as handle:
        json.dump(data, handle, indent=2)
        handle.write("\n")
    streak = data["current_streak"]["length"]
    longest = data["longest_streak"]["length"]
    print(
        f"wrote {OUT_PATH}: {data['total_contributions']} contributions, "
        f"current streak {streak}, longest {longest}"
    )
