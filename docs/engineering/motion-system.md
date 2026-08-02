# Interaction & Motion System (Construction)

**Status:** Construction document (M7; trimmed in M9)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 06, 07, 18, 19 (and a11y/performance application law)  
**Surface:** Companion enhancement layer

---

## Ownership

| Path | Owns |
|------|------|
| `modules/enhancement/motion/` | Shared motion primitives, preference sync, view-transition helper |
| `styles/tokens/motion.css` | Duration collapse + capability attribute continuity |
| `styles/foundations/interaction.css` | Shared press opacity token |
| This document | Construction decisions for motion |

Pages do **not** own animation logic. They compose shared primitives.

Unused M7 scaffolding (`Disclosure`, `modules/enhancement/interaction/`) was removed in M9 — press/hover remain CSS-token driven on controls.

---

## Motion language (construction)

Communicative roles only:

| Primitive | Role |
|-----------|------|
| `PagePresence` | Entrance settle (opacity) |
| `Reveal` | Progressive section reveal + stagger |
| Control `:hover` / `:active` / `:focus-visible` | Focus + press feedback |
| `runViewTransition` | Theme continuity when API available |

Refused: bounce, elastic, overshoot, shake, spin, scroll hijack, particle loops, cinematic page theater.

---

## Reduced motion

| Channel | Behavior |
|---------|----------|
| `prefers-reduced-motion: reduce` | Durations → 0; reveal distance → 0; animations off |
| `html[data-eos-motion="reduce"]` | Same token collapse for JS-synced capability |
| Understanding | Content remains present with hierarchy; no motion-only meaning |

---

## Client islands

| Island | Why |
|--------|-----|
| `MotionProvider` | Syncs capability attribute |
| `ThemeToggle` | View transition on theme change |

`Reveal` / `PagePresence` remain Server-Component-safe (CSS-driven).

---

## Deferred

| Concern | Owner |
|---------|-------|
| Exact Product Bible motion recipe inventories | Docs 06 / 19 Deferred |
| Spatial / environmental / camera motion | M10 / Docs 32 |
| Audio | M11 / Doc 33 |
