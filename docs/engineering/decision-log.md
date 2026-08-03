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

---

## D-ENG-024 — Premium engineering presence (P45)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P45 |
| **Decision** | Craftsmanship-only pass: quieter atmosphere/field (minutes-scale breathe), softer graphite light, quieter registration marks, ~15% lower motion budget (opacity-first), museum-walk camera (no rotate spectacle), flatter topology figure, refined type/reading cadence and mechanical controls |
| **Purpose** | Raise perceived product quality until the Companion feels inevitable and engineering-grade — not animated or decorative |
| **Constraints** | No new routes/content/architecture; no new colors/glow/neon; no decorative 3D; effects that only look cool are removed or quieted |
| **Rejected** | Cinematic camera tricks; bounce/overshoot motion; louder marks; glass/blur spectacle |
| **Revisit** | Only if real visitor feedback shows remaining motion still draws attention |

---

## D-ENG-025 — Interactive architecture inspection (P46)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P46 |
| **Decision** | Upgrade `ArchitectureTopology` from passive stage figure to an inspection tool: radiogroup stage selection + inspection plate fed only by confirmed architecture prose, provenance, and existing Atlas see-also; align Codebase RAG content to Identity `stages:` list so the tool mounts |
| **Purpose** | Let visitors inspect confirmed pipeline structure like an operating system — explain engineering, not watch animation |
| **Constraints** | No invented nodes/pipelines/ADRs; no new libraries; Document 32 removable/fail-closed spatial rules unchanged; one experience until additional stage-listed architectures are Discovery-confirmed |
| **Rejected** | Speculative stage descriptions; fabricated topology graphs; WebGL; stage-to-component invention |
| **Revisit** | When Discovery confirms structured topology assets or additional stage-listed architectures |

---

## D-ENG-026 — Engineering Decision Explorer (P47)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P47 |
| **Decision** | Upgrade decision lineage into an Engineering Decision Explorer: radiogroup of confirmed ADRs + inspection plate (Decision → Reason → Trade-offs → Constraints → Validation → Related architecture → Related systems → Evidence → Artifacts) fed only by `decisionLineages`, case-study tradeoffs/constraints, Atlas network, and provenance; Evidence Inspector remains on selected lineage steps; surface Atlas decisions/architecture in Engineering network; structure Codebase RAG ADR-01 from already-confirmed Identity/README evidence |
| **Purpose** | Architecture answers what exists; Decision Explorer answers why — without inventing ADRs or trade-offs |
| **Constraints** | No new routes/libraries/colors/motion language; Missing/Deferred never upgraded; no speculative ADRs |
| **Rejected** | Decision dashboards; card grids; fabricated trade-offs; decorative decision graphs |
| **Revisit** | When additional ADRs are Discovery-structured without invention |

---

## D-ENG-027 — Engineering Validation Explorer (P48)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P48 |
| **Decision** | Add Engineering Validation Explorer after Decision Explorer: radiogroup of Atlas-confirmed validation methods (case-file methodology fallback) + inspection plate (objective → method → why → evidence → outcome → limitations → related architecture/ADR/systems → artifacts → confidence → provenance); Missing/Deferred stay honest; reuse Decision Explorer inspection CSS language |
| **Purpose** | Complete the engineering triad — architecture (how), decisions (why), validation (how confidence was earned) |
| **Constraints** | No new routes/libraries/colors/tokens/Atlas model changes; no invented benchmarks; server-built serializable inspections for the client radiogroup |
| **Rejected** | Charts; KPI dashboards; fabricated percentages; decorative lab UI |
| **Revisit** | When Discovery confirms additional structured validation methods |

---

## D-ENG-028 — Failure & Resilience Explorer (P49)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P49 |
| **Decision** | Add Failure & Resilience Explorer after Validation: radiogroup of Atlas-confirmed failure scenarios (case-file failureModes fallback) + inspection plate (failure → why → detection → mitigation → recovery → limitation → related architecture/decision/validation/systems → evidence → provenance → confidence); Missing/Deferred stay honest; reuse Decision Explorer inspection CSS |
| **Purpose** | Complete the engineering inspection quartet — architecture, decisions, validation, failure under real-world constraints |
| **Constraints** | No invented failure scenarios; no new routes/libraries/colors/tokens; server-built serializable inspections |
| **Rejected** | Warning graphics; charts; speculative outage theater |
| **Revisit** | When Discovery confirms additional structured failure entries |

---

## D-ENG-029 — Engineering Evolution Explorer (P50)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P50 |
| **Decision** | Add Engineering Evolution Explorer after Failure & Resilience: radiogroup of Atlas-confirmed evolution milestones (case-file timeline fallback) + inspection plate (milestone → date → why → what changed → impact → trade-offs → validation/ADR/architecture/failure/systems → evidence → artifacts → provenance → confidence); Missing/Deferred stay honest; reuse Decision Explorer inspection CSS |
| **Purpose** | Show engineering evolution through confirmed chronology—not a Git history viewer |
| **Constraints** | No invented milestones/dates; no new routes/libraries/colors/tokens; server-built serializable inspections |
| **Rejected** | Commit browsers; speculative roadmaps; timeline theater |
| **Revisit** | When Discovery confirms additional structured evolution entries |

---

## D-ENG-030 — Engineering Pattern Explorer (P51)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P51 |
| **Decision** | Add Engineering Pattern Explorer after Evolution: radiogroup of confirmed cross-project patterns (≥2 projectIds from engineering-patterns.json) scoped to the current case study + inspection plate; Atlas overlap derives related systems/architecture/decisions/validations/failures; Benefits/Trade-offs stay Missing when not separately confirmed; reuse Decision Explorer inspection CSS |
| **Purpose** | Make recurring engineering principles inspectable without inventing patterns |
| **Constraints** | No new routes/libraries/colors; no speculative patterns; server-built serializable inspections |
| **Rejected** | Pattern libraries as decoration; single-project “patterns”; invented benefits/trade-offs |
| **Revisit** | When Discovery confirms additional cross-project patterns |

---

## D-ENG-031 — Engineering Principles Explorer (P52)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P52 |
| **Decision** | Add Engineering Principles Explorer after Patterns: radiogroup of Atlas systems with ≥3 confirmed projectIds (title/summary reused as principle/rationale) + inspection plate linking architecture, decisions, validation, failure, evolution, patterns, and Atlas; no invented philosophy; Benefits not fabricated; reuse Decision Explorer inspection CSS |
| **Purpose** | Make engineering beliefs inspectable only where three or more projects already confirm the Atlas system |
| **Constraints** | No new routes/libraries/colors; no speculative principles; server-built serializable inspections |
| **Rejected** | Invented credo; single/dual-project “principles”; philosophy theater |
| **Revisit** | When Discovery confirms additional Atlas systems with ≥3 projects |

---

## D-ENG-032 — Engineering Knowledge Graph (P53)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P53 |
| **Decision** | Add Engineering Knowledge Graph after Principles: editorial radiogroup of confirmed entity kinds (Project, Architecture, Decision, Validation, Failure, Evolution, Pattern, Principle, Atlas System) + inspection plate (Entity → Description → Connected → Incoming → Outgoing → Supporting projects → References → Provenance → Confidence); edges only from Atlas membership, related* ids, decision referencedAgainBy, Atlas relationship chains, patterns, and engineering references — never invent nodes/edges; reuse Decision Explorer inspection CSS; no force/WebGL/decorative graph |
| **Purpose** | Make the connective tissue of EOS inspectable without duplicating prose or inventing relationships |
| **Constraints** | No new routes/libraries/colors/motion; no homepage/README changes; server-built serializable inspections; Missing stays Missing |
| **Rejected** | Force-directed graphs; mind-map theater; speculative edges between explorer layers |
| **Revisit** | Prefer expanding real evidence and projects over additional inspection UI layers |

---

## D-ENG-033 — Engineering Arrival System (P54)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P54 |
| **Decision** | Redesign arrival only: ~750ms inhabited silence before environment breathing; three independent museum light masses (far/mid/near, opacity only); quieter larger engineering field; museum dolly camera (no rotate/zoom/shake) with independent FG/MG/BG planes; typography already present and settles by illumination; architecture as distant continuous infrastructure; softer presence plate; ambient fade 1.5s after arrival silence; reduced motion freezes environment |
| **Purpose** | Visitors feel they enter a premium engineering institution before reading — refinement over spectacle |
| **Constraints** | No page/nav/typography/color/Atlas redesign; no WebGL/canvas/particles/libraries; CSS-first; no bounce/elastic/spin |
| **Rejected** | Hero fade-from-nothing; theatrical reveals; cyberpunk/glow/bloom; force spectacle |
| **Revisit** | Later portrait / constellation / timeline phases build on this arrival foundation |

---

## D-ENG-034 — Engineering Portrait System (P55)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P55 |
| **Decision** | Introduce Engineering Portrait as a suspended titanium specimen plate after arrival silence: user-provided primary cutout (processed specimen crop), registration carrier, serial plate (AH / EOS-P-01), minimal legend (name / title / opportunity); AH monogram retained quieter; signature as dossier footer mask; ambient grain overlay from provided texture; asset pipeline `portrait/raw|processed|exports` + `public/identity`; no avatar circle, glow, scan, or orbit |
| **Purpose** | Meet the engineer as an engineered artifact inside EOS — not a profile photo |
| **Constraints** | No invented portrait; no AI face; primary source below ideal 3000px (1024×1536 used as-is); shirt graphic cropped via specimen framing; reduced motion freezes reveal |
| **Rejected** | Circular avatars; LinkedIn styling; holograms; scanning beams; replacing AH identity |
| **Revisit** | When a ≥3000px primary portrait and cleaner wardrobe plate are available |

---

## D-ENG-035 — Engineering Capability Atlas (P56)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P56 |
| **Decision** | Add Engineering Capability Atlas on home (System 03) between Philosophy and Archive gate: deterministic SVG blueprint lanes (System / Architecture / Technology / Validation) + radiogroup + inspection plate; nodes derived only from Atlas systems/architecture/validationIndex and confirmed project technologies (aliased into architecture when labels match); edges from Atlas related* fields and ≥2 shared projects; no force simulation, badges, percentages, or invented capabilities; Escape closes plate; mobile uses editorial list |
| **Purpose** | Replace list/skill-theater with inspectable capability evidence connected to Atlas, ADRs, validation, failures, and knowledge-graph project links |
| **Constraints** | No D3/WebGL/Canvas; no new libraries; Missing stays Missing; DeepMed/RouteWise deferred stacks remain excluded from technology invention |
| **Rejected** | LinkedIn skill bars; glowing constellation theater; fake edges; percentage proficiency |
| **Revisit** | When D-11/D-12 stacks become confirmed, fold them via the same derivation path |

---

## D-ENG-036 — Engineering Walkthrough Mode (P57)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P57 |
| **Decision** | Elevate flagship case studies into guided engineering walkthroughs: left walkthrough navigator (rooms from confirmed evidence only), hash deep links (`#validation` etc.), quiet room emphasis (opacity/scale ≈220ms, ≤10px drift), IntersectionObserver scroll sync; coordinate existing ArchitectureTopology / Decision / Validation / Failure explorers and Evidence Inspector open state — no invented stages, ADRs, metrics, or diagrams; CSS-first, no WebGL/Canvas/Three.js |
| **Purpose** | Visitors inspect systems as engineering rooms rather than scrolling a marketing document |
| **Constraints** | No homepage/Atlas/README/nav/typography/color redesign; Missing/Deferred stay honest; reuse explorers; reduced motion disables camera/transitions |
| **Rejected** | Decorative animation theater; invented pipeline chapters; progress bars/glow pills; separate walkthrough pages |
| **Revisit** | When Discovery confirms additional flagship architecture stages suitable as explicit chapter stops |

---

## D-ENG-037 — Engineering Journey (P58)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P58 |
| **Decision** | Add `/journey` L2 room: horizontal causal stations derived only from confirmed Atlas evolution steps; each station plate links projects, architecture, ADRs, validation, Atlas systems, capability ids, knowledge-graph deep links, and evidence; connections from chronology, shared systems/architecture/capabilities, and Atlas relationship chains; Capability Atlas reuses controlled selection for sync; hash deep links (`#2024-retrieval` etc.); Archive/Atlas footer cross-links only — no homepage or primary-nav redesign |
| **Purpose** | Visitors understand how engineering practice evolved (what changed), not a resume timeline of when things happened |
| **Constraints** | No invented years/projects/stations/skills; Missing stays Missing; CSS-first; no WebGL/Canvas; reduced motion disables drift; reuse Capability Atlas / Atlas / explorers via links + sync |
| **Rejected** | Resume/portfolio timeline theater; invented Frontend→AI station ladder without evidence; homepage System block; decorative connections |
| **Revisit** | When Discovery confirms additional evolution steps or explicit causal station taxonomy |

---

## D-ENG-038 — Living Architecture World (P59)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P59 |
| **Decision** | Introduce shared `EngineeringProvider` / focus context across EOS: ArchitectureTopology stages become hash-addressable (`#ingestion`); Decision / Validation / Failure / Knowledge / Capability / Journey / Walkthrough publish and consume one focus object with confirmed related refs only; quiet opacity/hairline sync + optional Engineering World Panel; site layout mounts provider + world root — no explorer redesign, no invented nodes |
| **Purpose** | Make Architecture, Journey, Capabilities, Atlas, Walkthrough, and explorers feel like views of one engineering model |
| **Constraints** | No Three.js/WebGL/Canvas/D3; no homepage/nav/typography redesign; Missing stays Missing; connections only from existing confirmed links |
| **Rejected** | Decorative networks; competing selection buses; glow/pulse focus theater; fabricated pipeline stages |
| **Revisit** | When more projects author explicit `stages:` lists suitable as addresses |

---

## D-ENG-039 — Engineering Demonstrations (P60)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P60 |
| **Decision** | Add optional Engineering Demonstration after flagship walkthrough: keyboard scrubber + inspection plate built only when confirmed architecture `stages:` exist; stage selection publishes `architecture-stage` focus through EngineeringContext so Topology / Decision / Validation / Failure / Knowledge / Capability synchronize; related links only when stage name appears in confirmed lineage/validation/failure/Atlas text — otherwise Missing; no duplicated ArchitectureTopology figure |
| **Purpose** | Let visitors inspect how confirmed pipeline stages operate without inventing demo theater |
| **Constraints** | Flagship only; no homepage/Atlas/Journey/Capability/nav redesign; CSS-first; reduced motion disables scale/opacity transitions; Supporting projects unchanged |
| **Rejected** | Invented DeepMed Speech→… stages; decorative scrubbers; fake screenshots/metrics; duplicating explorer prose |
| **Revisit** | When additional flagships author explicit `stages:` lists in confirmed architecture |

---

## D-ENG-040 — Spatial Ambient Audio (P61)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P61 |
| **Decision** | Elevate Companion audio to multi-layer spatial ambient (base / air / mechanical / resonance) with room weight profiles (arrival, atlas, case-study, evidence, journey, footer), 800ms settle silence, 5s crossfades (instant under reduced motion), master ≈0.17, preference persistence, lazy load only after opt-in; Ambient control remains muted-by-default; four user-provided Ogg loops from `assets/audio/` ship under `companion/public/audio/` with all layers `shipped: true` — no AI/royalty-free substitutes |
| **Purpose** | Make the Companion feel inhabited without soundtrack theater |
| **Constraints** | No autoplay with sound; reduced-data downloads nothing; no external audio libraries; no homepage/nav/typography redesign |
| **Rejected** | Background music; EDM/cinematic/game beds; invented ambience; equalizer UI |
| **Revisit** | Loudness / loop-seam polish if field listening finds issues; swap individual layer files without changing engine contract |

---

## D-ENG-041 — Engineering Materials & Optical Finish (P62)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P62 |
| **Decision** | Final visual craftsmanship pass only: quieter border alphas, glow/atmosphere/grain/field densities, registration mark opacities and lengths, divider end-ticks, portrait/case-study/capability construction marks, shell washes, editorial link underlines, secondary/ghost button acknowledgement, scrollbar hover, caption line-height rhythm (1.2), body widow/orphan unity; no new routes/components/colors/content/architecture/motion language/audio/nav |
| **Purpose** | Make every surface feel precision-machined graphite without announcing what changed |
| **Constraints** | CSS-first; no additional runtime; contrast/focus/reduced-motion preserved; nothing new becomes visible |
| **Rejected** | Redesign; glass/neumorphism; glow bloom; theatrical hover; decorative effects |
| **Revisit** | Field pixel audit after deploy; further quieting only if a surface still announces |

---

## D-ENG-042 — Unified Engineering Product (P63)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | P63 |
| **Decision** | Final integration pass: EngineeringContext as single focus/hash source with room memory (`eos-engineering-room`, `eos-engineering-focus`), Atlas/Journey/case-study short hash aliases (`#validation`→`#atlas-validation`, `#systems`, `#reasoning`→`#decisions`), walkthrough hash restores focus, Journey drops duplicate hash bus, chrome exposes Journey + shared orientation labels, PagePresence settle 0.98/180ms (local override only), README lobby↔Companion continuity copy, motion preference mirrored to storage; no new explorers/routes/models/redesign |
| **Purpose** | Make GitHub → Companion → Atlas → Journey → Case Studies → Demonstrations → Evidence feel like one engineering product |
| **Constraints** | No invented evidence; no decorative transitions; no homepage/hero/architecture/identity redesign; audio preference unchanged |
| **Rejected** | Breadcrumbs; marketing headings; competing selection buses; cinematic transitions |
| **Revisit** | Field check of header density with full Atlas/Journey labels; deeper resume UX only if surprising |

---

## D-ENG-043 — GitHub Pages deployment (release engineering)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-03 |
| **Milestone** | Release engineering |
| **Decision** | Migrate Companion hosting from Vercel to GitHub Pages: Next.js `output: "export"`, `trailingSlash: true`, `basePath`/`assetPrefix` via `NEXT_PUBLIC_BASE_PATH=/AliHassan-15`, production URL `https://alihassan-15.github.io/AliHassan-15`, Pages workflow build→verify→deploy `companion/out`; remove `vercel.json` and Vercel CLI pack deploy; update identity/README destination links only |
| **Purpose** | Publish the frozen engineering product without platform lock-in |
| **Constraints** | No product/redesign/motion/content changes; header tokens retained in config for verification (Pages cannot apply Next runtime headers) |
| **Rejected** | Product edits under the guise of deploy; silent feature removal |
| **Revisit** | Custom domain; optional header injection if Pages/CDN later supports it |

