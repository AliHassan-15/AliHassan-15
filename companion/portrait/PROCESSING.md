# EOS Portrait Asset Processing — P55

## Source policy

- `raw/` holds user-provided originals. **Never overwrite.**
- `processed/` holds working intermediates.
- `exports/` holds web-ready artifacts.
- `companion/public/identity/` receives deployable copies of exports.

## Inventory (intake 2026-08-03)

| Asset            | Source filename               | Size                      | Notes                                       |
| ---------------- | ----------------------------- | ------------------------- | ------------------------------------------- |
| Primary portrait | `Primary portrait.png`        | 1024×1536 RGBA            | Below ideal 3000px longest edge; used as-is |
| Front secondary  | `front secondary potrait.png` | identical hash to primary | Duplicate — not exported separately         |
| Left secondary   | `left secondary potrait.png`  | 1024×1536 RGB             | Near-white studio backdrop keyed to alpha   |
| Right secondary  | `right.png`                   | 1024×1536 RGB             | Near-white studio backdrop keyed to alpha   |
| Signature        | `Signature.png`               | 1536×1024 RGBA            | Already transparent; converted to dark ink  |
| Grain PNG        | `grain texture pic 2nd.png`   | 1536×1024 RGB             | Soft desaturated overlay                    |
| Grain SVG        | `film_grain_texture.svg`      | 2048 viewBox              | Procedural fallback                         |

## Processing steps

Run from `companion/`:

```bash
python portrait/process_assets.py
```

1. **Primary** — crop to upper specimen (~2%–68% height, slight horizontal inset) to favor face over shirt graphic; export full + specimen; write `portrait-primary.png` and `portrait-primary-md.png`.
2. **Left / Right** — near-white backdrop → alpha; same specimen crop; export `portrait-left.png`, `portrait-right.png`.
3. **Signature** — bright strokes → dark ink on transparent; trim bbox; thumbnail to ≤640px wide → `signature.png`.
4. **Grain** — grayscale + tiny blur → `grain.png`; copy `grain.svg`.

## Re-run

Safe to re-run: overwrites `processed/`, `exports/`, and `public/identity/` only. Leaves `raw/` untouched.
