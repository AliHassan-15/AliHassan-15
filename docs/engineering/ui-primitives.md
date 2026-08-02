# UI Primitives (Construction)

**Status:** Construction document (M3)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 15, 17, 20 (apply-only)

---

## Ownership

| Area | Path | Owns | Never owns |
|------|------|------|------------|
| Primitives | `modules/presentation/primitives` | Smallest interface meanings | Product content, IA, navigation systems |
| Layout | `modules/presentation/layout` | Spatial arrangement contracts | Route trees, page composition as product |
| Theme | `modules/presentation/theme` | Light/dark preference plumbing | Brand forks, persistence (deferred) |
| Tokens | `modules/presentation/tokens` | Typed semantic CSS var refs | Primitive leakage into product UI |

---

## Consumption rule

Components use **semantic / contextual tokens only**.

Spacing, color, type, radius, elevation, motion durations: token variables — never magic numbers.

---

## Validation

`/internal/foundation` — internal only (`noindex`). Not Product A. Not Product B.

---

## Deferred

| Concern | Milestone |
|---------|-----------|
| README System | M4 |
| Companion L1 pages / navigation | M5 |
| Content model | M6 |
| Motion choreography | M7 |
| Form controls library | later as needed |
| Theme persistence | later |
