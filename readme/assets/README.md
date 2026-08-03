# README assets

Entrance-only assets for Product A (GitHub profile).

## Layout

- `svg/` — EOS SVG engineering system (light/dark pairs)
- `svg/SYSTEM.md` — catalog, language, rebuild instructions
- `svg/build-system.mjs` — geometry source of truth

## Rules

- Engineering assets only — no portfolio illustrations
- No badge generators, no decorative animation
- Theme pairs required for GitHub light/dark
- Empty `alt` on structural marks; meaning stays in Markdown
- Same registration / calibration language as the Companion

## Rebuild

```bash
node readme/assets/svg/build-system.mjs
```
