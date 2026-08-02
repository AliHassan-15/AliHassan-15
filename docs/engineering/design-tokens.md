# Design Tokens (Construction)

**Status:** Construction document (M2)  
**Authority:** Engineering implementation — not Product Bible  
**Implements in construction:** Documents 05, 14, 16, 31 (apply-only)  
**Literals:** Provisional — see D-ENG-006 / D-ENG-007. Product Bible DL-01/02/03/06/08 remain Deferred.

---

## Hierarchy

```text
Primitive  (styles/tokens/primitives.css)
    ↓
Semantic   (styles/tokens/semantic.css)  ← light/dark remap here
    ↓
Contextual (styles/tokens/contextual.css)
    ↓
Component consumption (typed refs in modules/presentation/tokens)
```

Product UI must consume semantic or contextual tokens only.

Typed CSS-variable references: `companion/modules/presentation/tokens`.

---

## Themes

- Attribute: `data-theme="light" | "dark"` on `<html>`
- Bootstrap script resolves system preference before paint
- `ThemeProvider` owns runtime preference (`system` | `light` | `dark`)
- Persistence: Deferred to a later milestone

One identity; environmental remapping only.

---

## Global styles

Entry: `companion/styles/global.css`

Includes: tokens, modern reset, base surfaces, typography roles, focus-visible, selection, restrained scrollbars, subtle atmosphere.

---

## Internal validation

Route: `/internal/foundation`

- `robots: noindex,nofollow`
- Not a public product surface
- Theme control + token swatches for verification only

---

## Deferred

| Concern | Milestone |
|---------|-----------|
| Product UI components | M3 |
| Interaction patterns | M3 / M7 |
| README System | M4 |
| Companion L1 pages / nav | M5 |
| Theme persistence | later |
| Formal DL-* Product Bible lock | owner decision |
| Motion choreography | M7 |
