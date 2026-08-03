# SVG Engineering System

Reusable GitHub-compatible SVG assets for the EOS entrance (Product A).

## Language

Registration corners · calibration ticks · engineering plates · drafting frames · hairline construction.

Graphite / titanium / slate only. No RGB. No neon. No gradients. No filters.

## Theme pairs

Every asset ships as `-light.svg` and `-dark.svg`.

Use GitHub classes:

```html
<img src="readme/assets/svg/NAME-light.svg" alt="" class="gh-light-mode-only" />
<img src="readme/assets/svg/NAME-dark.svg" alt="" class="gh-dark-mode-only" />
```

Decorative marks use empty `alt`; meaning stays in surrounding Markdown.

## Catalog

| Asset | Role |
|-------|------|
| `hero-*` | Entrance drafting field + AH serial plate |
| `monogram-*` | AH machined monogram plate |
| `divider-*` / `mark-*` | Primary engineering divider |
| `section-divider-*` | Quieter section rule |
| `header-*` | Section headers (philosophy, focus, selected, …) |
| `plate-*` | Location, availability, status, focus, contact, signature, quote |
| `grid-field-*` | Sparse drafting background |
| `calibration-marks-*` | Standalone tick / corner set |
| `connector-*` | Vertical timeline connector |
| `footer-plate-*` | Entrance footer rule |
| `label-system-*` | Compact system label |

## Rebuild

```bash
node readme/assets/svg/build-system.mjs
```

Geometry is authored in `build-system.mjs`. Outputs are clean SVG only.
