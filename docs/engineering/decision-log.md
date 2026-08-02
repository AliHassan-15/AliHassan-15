# Decision Log

**Status:** Construction document (M1+)  
**Authority:** Engineering implementation — not Product Bible  
**Rule:** Record binding construction decisions: purpose, constraints, trade-offs, rejected approaches, revisit conditions.

Product meaning remains owned by `docs/product-bible/`. This log does not restate or amend it.

---

## D-ENG-001 — Companion platform

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M1 / G0 |
| **Decision** | Companion uses Next.js App Router + React + TypeScript |
| **Purpose** | Server Components by default; clear client-island boundaries; long-term maintainability |
| **Constraints** | Exactly two public surfaces; meaning must remain replaceable if the framework changes |
| **Rejected** | Client-first SPA; CMS-backed site; multi-framework demos |
| **Revisit** | Only under explicit owner approval if App Router ceases to serve Constitutional Compliance |

---

## D-ENG-002 — Package manager

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M1 |
| **Decision** | pnpm 10.14.0, pinned via root `packageManager` + workspace |
| **Purpose** | Deterministic installs; strict dependency layout; CI parity |
| **Rejected** | npm/yarn as primary; unpinned package manager |
| **Revisit** | Major pnpm breakage or org-standard change with migration note |

---

## D-ENG-003 — Repository topology

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M1 / G0 |
| **Decision** | Single repo: root README (entrance) + `docs/` + `content/` + `companion/` |
| **Purpose** | One product, two surfaces, shared content authority, no third public product |
| **Rejected** | Premature `packages/` monorepo theater; separate repos for Bible vs Companion in M1 |
| **Revisit** | When a real second consumer of shared packages appears |

---

## D-ENG-004 — Content authority without CMS

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M1 / G0 |
| **Decision** | Owned `content/` files are the sole product-truth store; no CMS in foundation |
| **Purpose** | Discovery honesty; replaceability; single authority |
| **Rejected** | Notion/CMS as source of truth; inventing M1 content |
| **Revisit** | Only with owner approval and an explicit replaceability plan |

---

## D-ENG-005 — M1 scope boundary

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M1 |
| **Decision** | M1 ships tooling, structure, CI, and engineering docs only |
| **Purpose** | Dependable foundation before visual, content, or experience work |
| **Rejected** | Tokens, components, routes, README rewrite, motion, 3D, audio, fake content |
| **Revisit** | Not applicable — later milestones own deferred work |

---

## D-ENG-006 — M2 construction provisional foundation literals

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M2 |
| **Decision** | Adopt restrained near-monochrome construction literals for primitives (color, space, type metrics, radius, border, elevation, opacity, layers, motion durations/easing) |
| **Purpose** | Enable a production token hierarchy without leaving Companion unstyled; keep Product Bible Deferred register (DL-01/02/03/06/08) unamended |
| **Constraints** | Values are engineering construction defaults, not constitutional locks; one identity across light/dark; grayscale-capable semantics; no neon/gaming/purple brand identity |
| **Rejected** | Inventing Product Bible lock of DL-*; dual brand themes; competing accents; Inter/Roboto/Arial/system-only stacks as identity |
| **Revisit** | When owner explicitly locks DL-01/02/03/06/08; migrate primitives under semantic stability |

---

## D-ENG-007 — Provisional typefaces (construction)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M2 |
| **Decision** | IBM Plex Sans + IBM Plex Mono via `next/font` → `--eos-font-sans` / `--eos-font-mono` |
| **Purpose** | Calm engineering typography hierarchy without Inter/system-default costume |
| **Constraints** | DL-01 remains Deferred as Product Bible lock |
| **Rejected** | Inter, Roboto, Arial, novelty display faces, fashion typography as identity |
| **Revisit** | Explicit DL-01 lock or owner typeface decision |

---

## D-ENG-008 — M3 UI primitives & layout

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M3 |
| **Decision** | Ship foundational presentation primitives + layout abstractions under `modules/presentation`; consume semantic tokens only; Server Components by default |
| **Purpose** | Reusable UI grammar for future surfaces without product pages or portfolio sections |
| **Constraints** | No navigation system; no forms library; no motion libraries; Card is structural only; `/internal/foundation` remains non-product |
| **Rejected** | shadcn/MUI copies; prop-explosion variants; magic-number spacing; public nav; marketing components |
| **Revisit** | When composite product components are required (post-M5) |

---

## D-ENG-009 — Provisional layout breakpoint

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M3 |
| **Decision** | Grid multi-column activation at `min-width: 48rem` (construction provisional) |
| **Purpose** | Responsive layout without inventing a locked Product Bible breakpoint system |
| **Constraints** | Document 20 breakpoints remain Deferred as constitutional lock |
| **Rejected** | Fashion breakpoint theaters; per-page private breakpoint scales |
| **Revisit** | Owner layout breakpoint decision |

---

## D-ENG-010 — README entrance section order (construction)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M4 |
| **Decision** | Production README order: Identity → Engineering philosophy → Selected confirmed work → Evidence → Companion invitation |
| **Purpose** | Apply Doc 10 entrance experiential order under GitHub constraints without recreating Companion depth |
| **Constraints** | Identity-locked lines exact; Discovery-confirmed repos only; Companion invited as unshipped destination; IA-02 remains Deferred as Product Bible lock |
| **Rejected** | Badge walls; emoji/GIF theater; invented metrics; mini-Companion architecture sections; false shipped-Companion URL |
| **Revisit** | Explicit IA-02 owner lock or Companion public URL when Discovery status changes |

---

## D-ENG-011 — Companion L1 route composition (construction)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M5 |
| **Decision** | Public L1 surface is `/` only (who / what / why). `/internal/*` remains non-product validation. No L2 routes in M5. |
| **Purpose** | Ship a calm Companion destination shell with orientation and README continuity before case-study depth |
| **Constraints** | IA-01 / IA-03 remain Deferred as Product Bible locks; Identity-locked lines only; no motion/spatial/audio; Server Components default |
| **Rejected** | Portfolio dashboard landing; giant nav; L2 case-study routes; fake completeness; third public surface |
| **Revisit** | G2 / IA-01 owner lock when expanding destination information architecture |

---

## D-ENG-012 — Content authority + runtime validation (M6)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-02 |
| **Milestone** | M6 |
| **Decision** | `content/` JSON is the sole truth store; Zod schemas in `modules/meaning/schema`; loaders in `modules/meaning/load`; README generated/checked from content; Companion reads via `getIdentity()` / project loaders |
| **Purpose** | Make accidental invention structurally hard; one contract for both surfaces; content-only project addition |
| **Constraints** | No CMS; no network; Discovery status never silently upgraded; Missing/Deferred omitted from presentation |
| **Rejected** | Hardcoded identity in components; README as second source of truth; inventing Deferred evidence; fake assets |
| **Revisit** | Only if a replaceable content transport is approved without changing ownership |

---

## D-ENG-013 — Interaction & motion infrastructure (M7)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M7 |
| **Decision** | Shared motion/interaction live under `modules/enhancement`; CSS-first reveal/presence; MotionProvider syncs reduced-motion capability; theme uses View Transitions when available; no motion libraries |
| **Purpose** | One calm motion language for L1; understanding survives reduced motion; pages compose primitives instead of owning choreography |
| **Constraints** | No bounce/elastic/parallax/scroll-hijack; no spatial/audio/case-study motion; Server Components default; GPU-friendly opacity/transform only |
| **Rejected** | Framer Motion as default; page-local animation hacks; cinematic entrance; ambient decorative loops |
| **Revisit** | When Product Bible locks exact motion inventories or L2 surfaces require new communicative roles |

---

## D-ENG-014 — Product Archive routes (M8)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M8 |
| **Decision** | L2 lives at `/archive` (index) and `/archive/[slug]` (case studies); routes + metadata generated from `content/evidence`; shared `CaseStudyDocument` / `ArchiveList`; disclose Missing/Deferred honestly |
| **Purpose** | Engineering library, not portfolio gallery; content-only project addition; L1↔L2 orientation |
| **Constraints** | IA-01 remains Deferred as Product Bible lock; no invented metrics/demos/diagrams; reuse M7 motion only; Server Components default |
| **Rejected** | Hardcoded per-project pages; marketing cards; hiding Missing evidence; Spatial/Audio/Research hubs |
| **Revisit** | Explicit IA-01 owner lock or additional L2 hubs under later milestones |

---

## D-ENG-015 — Cross-surface continuity & craft (M9)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M9 |
| **Decision** | Shared chrome + orientation from identity/routes; remove unused interaction/Disclosure packages; unify document CSS; metadata/sitemap parity; no new product domains |
| **Purpose** | One inevitable product across README ↔ Companion ↔ Archive ↔ case study; quieter craft; less dead weight |
| **Constraints** | No Spatial/Audio/Research/Lab/Writing/Timeline; no new public routes; no invented Discovery evidence; Server Components default |
| **Rejected** | Feature-rich polish theater; portfolio-default sections; page-local motion dialects; misleading home-only footer orientation |
| **Revisit** | When later milestones add surfaces that need continuity contracts extended |

---

## D-ENG-016 — Spatial system (M10)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M10 |
| **Decision** | Spatial lives in `modules/enhancement/spatial`; CSS structural depth only; one experience — pipeline topology when architecture text includes explicit `stages:`; fail-closed capability via `SpatialProvider`; no WebGL / Three.js |
| **Purpose** | Improve architecture-stage relationship understanding without spectacle; keep flat list as complete fallback |
| **Constraints** | Document 32 justification gate; Discovery honesty; reduced-motion / save-data / no-perspective → off; removable; no Audio; SP-* inventories remain Deferred |
| **Rejected** | Decorative 3D; particles; floating props; continuous GPU scenes; multiple spatial experiences; inventing topology without content stages |
| **Revisit** | When Discovery confirms structured topology assets or additional stage-listed architectures |

---

## D-ENG-017 — Audio system (M11)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M11 |
| **Decision** | Audio lives in `modules/enhancement/audio`; mute-default ambient architecture; `AudioProvider` + imperative `AmbientEngine` + `SoundToggle`; placeholder `/audio/ambient.ogg` path; lazy engine import; fail silent on autoplay/missing asset |
| **Purpose** | Optional atmosphere after silence succeeds; future tracks via config without app rewires |
| **Constraints** | Document 33 optionality; silence owned by Docs 02/10/12 (apply-only); no UI SFX; no autoplay audible sound; save-data / reduced-data fail-closed; AU-* inventories remain Deferred |
| **Rejected** | Music player; waveforms; click/hover sounds; narration; soundtrack branding; inventing audio assets |
| **Revisit** | When Document 25 assets provide governed ambient media |

---

## D-ENG-018 — Premium experience refinement (M12)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M12 |
| **Decision** | Craft-only pass: quieter chrome, calmer motion stack, case-study rule rhythm, neutral atmosphere, softened topology; no new domains or dependencies |
| **Purpose** | Make existing EOS surfaces feel inevitable — premium product, not portfolio theater |
| **Constraints** | Refine not redesign; preserve a11y / reduced-motion; no new pages; no decorative systems |
| **Rejected** | Feature additions; flashy gradients; glassmorphism; motion-for-its-own-sake; heavier chrome |
| **Revisit** | When later content depth requires reading-layout adjustments |

---

## D-ENG-019 — Production hardening (M13)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M13 |
| **Decision** | Ship error/not-found surfaces; `<main>` + primary nav landmark; archive h2 tiers; enhancement providers under `(site)`; `getSiteUrl()` + CI URL; audio fail resets Off; safe-area / dvh / touch targets; honest SEO without invented OG images |
| **Purpose** | Production-grade resilience and accessibility without expanding product scope |
| **Constraints** | No new public domains; no redesign; Discovery honesty; fail closed on enhancements |
| **Rejected** | Fake social imagery; requiring View Transitions; localhost baked into production metadata |
| **Revisit** | Theme preference persistence; governed ambient asset under Document 25 |

---

## D-ENG-020 — Security, verification & release confidence (M14)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M14 |
| **Decision** | Add minimal production security headers (CSP with honest inline allowances); automated `verify` / `verify:release` scripts; prod high+ dependency audit in CI; `pnpm.overrides` for Next transitive `sharp`/`postcss` until upstream clears; document posture + accepted risks in `security-and-verification.md` |
| **Purpose** | Prove public engineering claims with automation; make the repo handoff-ready without expanding product scope |
| **Constraints** | No features; no redesign; no security theater; document what cannot be proven |
| **Rejected** | Nonce-strict CSP before bootstrap rewrite; third-party SRI; auth/analytics/backend; inventing browser E2E suite prematurely |
| **Revisit** | Nonce CSP; HTTP header smoke; axe CI when a test harness is justified |

---

## D-ENG-021 — Production deployment & launch readiness (M15)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | M15 |
| **Decision** | Ship Companion on Vercel (`eos-companion` → `https://eos-companion.vercel.app`); document release/rollback in `release-and-launch.md`; CLI pack deploy for non-git trees; set `NEXT_PUBLIC_SITE_URL`; record companion destination in identity content; prepare `v1.0.0` |
| **Purpose** | Make EOS a real public product with reproducible release and recovery — not portfolio upload theater |
| **Constraints** | No features; no redesign; no new domains in-product beyond the live destination URL; Deferred inventories stay Deferred |
| **Rejected** | Inventing Lab/Writing/Research/Career; analytics; auth; custom domain purchase as a blocker for v1.0.0 |
| **Revisit** | Custom domain; Git-connected Root Directory=`companion` as primary path; stop net-new build pending real feedback |
