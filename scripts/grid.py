"""Turn a flat list of contribution days into Sunday-first weeks."""

import datetime


def weeks_for(days):
    """Return columns of 7 cells. A cell is (date, count, level) or None."""
    if not days:
        return []
    first = datetime.date.fromisoformat(days[0]["date"])
    lead = (first.weekday() + 1) % 7  # Sunday = 0
    column = [None] * lead
    grid = []
    for day in days:
        date = datetime.date.fromisoformat(day["date"])
        weekday = (date.weekday() + 1) % 7
        while len(column) < weekday:
            column.append(None)
        column.append((day["date"], int(day["count"]), int(day.get("level") or 0)))
        if len(column) == 7:
            grid.append(column)
            column = []
    if column:
        column.extend([None] * (7 - len(column)))
        grid.append(column)
    return grid


def month_labels(grid):
    """(column_index, short_name) for the first week that contains a new month."""
    labels = []
    seen = set()
    last_index = -10
    for index, column in enumerate(grid):
        for cell in column:
            if cell is None:
                continue
            date = datetime.date.fromisoformat(cell[0])
            key = (date.year, date.month)
            if key not in seen and date.day <= 7 and index - last_index >= 3:
                seen.add(key)
                labels.append((index, date.strftime("%b")))
                last_index = index
            break
    return labels


def snake_route(grid, left, top, step, cell):
    """Cell-center points in a snake-game path: across, turn, back across."""
    points = []
    columns = len(grid)
    for row in range(7):
        order = range(columns) if row % 2 == 0 else range(columns - 1, -1, -1)
        for col in order:
            x = left + col * step + cell / 2
            y = top + row * step + cell / 2
            points.append((x, y, grid[col][row]))
    return points


def human_date(iso):
    date = datetime.date.fromisoformat(iso)
    return date.strftime("%d %b %Y").lstrip("0")
