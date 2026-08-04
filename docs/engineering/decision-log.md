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

## D-ENG-044 — GitHub Pages public asset basePath restoration

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Release engineering |
| **Decision** | Route every `public/` asset through `assetUrl()` / `getBasePath()`; inject CSS grain via `--eos-asset-grain` from root layout; never hardcode root-absolute `/identity/*` or `/audio/*` |
| **Purpose** | Restore portrait, grain, signature, and ambient audio on the project Pages site without product redesign |
| **Constraints** | No UI/feature changes; localhost (empty basePath) and Pages (`/AliHassan-15`) must both work |
| **Rejected** | Redesign; feature removal; leaving CSS `url("/…")` root paths |
| **Revisit** | Custom domain with empty or alternate basePath |

---

## D-ENG-045 — Cinematic Rendering Foundation (Rebuild M0)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M0 |
| **Decision** | Resolve the implementation-mapping items long marked Deferred against Documents 06/19 (ML-03 libraries, ML-08 camera/3D scene implementations), 32 (SP-10), and 33 (AU-10) by adopting `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` for WebGL scenes, Framer Motion for UI choreography, and GSAP/ScrollTrigger for scroll-driven camera sequences — used only where Document 06 already permits 3D/camera depth (architecture visualization, spatial storytelling, environmental motion), never as decoration. Extend `modules/enhancement/spatial` with real capability gating (`probeSpatialCapability` now requires a live WebGL context, not just CSS `perspective` support) and a session-stable `SpatialTier` ("cinematic" \| "lite") probed once from GPU/renderer/core/memory signals, so scene budget degrades gracefully instead of a binary on/off. Add a shared `SceneCanvas` boundary so every future scene shares one fail-closed pattern: server and reduced-motion/save-data/no-WebGL visitors always render the independently-meaningful fallback. Add `--eos-cinematic-*` tokens (Document 16/31 primitive-tier extension) as a separate duration/easing vocabulary from `--eos-duration-*`, since Document 06 §0.4 treats UI-feedback timing and storytelling timing as distinct concerns. |
| **Purpose** | Give the entrance, project chapters, skills constellation, and journey (Rebuild M1–M6) a real rendering engine instead of CSS/SVG standing in for 3D, without touching any Locked product-bible principle — this decision lives entirely inside the Deferred implementation-mapping items those documents already delegated here |
| **Constraints** | No product-bible document edited (04/05/06/19/32/33 remain Locked/Immutable as authored); 3D usage stays inside Document 06 §4's whitelist (camera depth, architecture visualization, environmental storytelling, spatial navigation) and out of its blacklist (decorative objects, unjustified geometry); every scene ships a non-WebGL fallback that alone carries full meaning; existing `ambientEngine`/`AudioProvider` kept, not replaced |
| **Rejected** | Rewriting Documents 04/05/06/19/32/33 (they already permit this; SP-10/AU-10/ML-03/ML-08 explicitly delegate implementation mapping to this log); a second parallel design-token system (extended existing token layers instead); measuring device tier per-frame (session-stable probe only, for stability) |
| **Revisit** | If a future GPU/browser capability meaningfully changes the cheap WebGL2 probe's reliability; if Framer Motion/GSAP/R3F major versions require a migration |

---

## D-ENG-046 — Explorer Suite Scope Correction (Rebuild M0/M3)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M0, corrected at M3 |
| **Decision** | Correcting this entry's original text: `modules/presentation/eos/*` (Decision/Validation/Failure/Evolution/Pattern/Principle/KnowledgeGraph explorers, WalkthroughRoom, ReadingMode) and `modules/presentation/demonstration/*` are **not** standalone routes — there is no top-level meta-page for them; every one is composed directly inside `CaseStudyDocument.tsx` as embedded sections of each project's own case-study page (confirmed at Rebuild M3 by reading the actual composition, not assumed). There is therefore nothing route-level to remove. Scope becomes: keep all of it as real, evidence-backed case-study content; the rebuild's job is a visual re-skin (cinematic chapter template, Document 06-compliant motion) around this existing data layer, starting with the architecture section (`ArchitectureTopology` → 3D pipeline flythrough, M3) and extending outward at calibrated depth (M6). Nothing here is retired; nothing here is deleted. |
| **Purpose** | Keep the decision log honest against the real composition rather than an assumption made before reading `CaseStudyDocument.tsx` |
| **Constraints** | No confirmed evidence in `content/` is invented or reinterpreted; `ArchitectureTopology`'s accessible stage-extraction (`extractPipelineStages`) is reused by the new pipeline scene, not replaced. (See D-ENG-047 for the one narrow, non-inventive `content/` formatting edit this milestone required.) |
| **Rejected** | Leaving the original (inaccurate) "routes removed" claim standing |
| **Revisit** | Not applicable — this is a correction, not a pending decision |

---

## D-ENG-047 — DeepMed Architecture Stage Annotation (Rebuild M3)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M3 |
| **Decision** | `content/evidence/projects/deepmed.json`'s `caseStudy.architecture.value` already narrates an ordered clinical pipeline in prose ("voice intake produces a structured patient report; sentiment/urgency extraction and severity scoring feed adaptive scheduling; appointment booking and pharmacy pickup follow") but `extractPipelineStages` (used by `ArchitectureTopology`/`PipelineFlythrough`) only recognizes an explicit `stages: a, b, c.` clause — the exact pattern `content/evidence/projects/codebase-rag.json` already uses. Appended `stages: Voice intake, Structured patient report, Sentiment/urgency extraction, Severity scoring, Adaptive scheduling, Appointment booking, Pharmacy pickup.` to the end of the same sentence, using only noun phrases already present in that sentence, in the same order, with `status`/`confidence`/`provenance` all unchanged. Without this, DeepMed's `ArchitectureTopology` returns `null` and M3 (explicitly scoped "against DeepMed's pipeline") has no confirmed data to render against. |
| **Purpose** | Make an already-confirmed, already-ordered claim machine-extractable for the new 3D pipeline flythrough, without adding a single fact not already in the confirmed sentence |
| **Constraints** | Zero new nouns introduced beyond what the sentence already names; zero change to `status`/`confidence`/`provenance`; this is reformatting for extractability, not the "add missing/deferred fields" work explicitly frozen until after launch (email, LinkedIn, tech stacks, live demo links, etc. remain untouched) |
| **Rejected** | Hardcoding DeepMed's stage list inside a component (would silently drift from `content/` and violate the single-source-of-truth content system); inventing stage names not already in the sentence |
| **Revisit** | If Document 02 (`docs/product-bible/02-identity-specification.md`) §18.3.1 is ever revised, re-check this `stages:` clause still matches its source sentence |

---

## D-ENG-048 — Calibrated-Depth Pipeline Annotation Across Remaining Projects (Rebuild M6)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M6 |
| **Decision** | Read all 9 non-DeepMed project files under `content/evidence/projects/` and applied the same non-inventive `stages:` annotation (D-ENG-047's pattern) only where confirmed `caseStudy.architecture.value` prose already states an explicit ordered sequence: `underwater-image-enhancement.json` ("Inference lifecycle: upload bytes → decode/resize/normalize [-1,1] → forward pass → PNG response" — appended `stages: Upload bytes, Decode/resize/normalize, Forward pass, PNG response.`), `routerefuel.json` (already a full arrow-chain request lifecycle — appended `stages: Client request, Geocode, Drive route, Load corridor stations, Pick cheapest reachable stop, Return geometry and totals.`), and `brain-tumor-classification.json` ("Streamlit app.py loads saved weights..., runs inference on uploaded scans, and produces saliency visualizations" — appended `stages: Load saved weights, Run inference on uploaded scans, Produce saliency visualizations.`). `codebase-rag.json` already had a `stages:` clause from before this rebuild. The remaining five (`routewise-eld`, `stellar-web-manager`, `gamestore`, `flashcards-generator`, `private-client-construction`) were left untouched: their architecture prose describes components/boundaries (or is entirely Deferred, per `private-client-construction`'s D-03), not an explicit temporal sequence — annotating an order onto them would invent structure the confirmed text does not state. Their case-study pages keep the flat accessible `EvidenceField` prose (as they did before this rebuild); `ArchitectureTopology`/`PipelineFlythrough` correctly render nothing for them since `extractPipelineStages` returns `null`. This realizes D-ENG-046's "extending outward at calibrated depth" without any code change — `ArchitectureTopology` already degrades to `null` safely (verified before this milestone against these same five projects). |
| **Purpose** | Give every project whose confirmed evidence already contains an explicit ordered pipeline a real 3D pipeline flythrough (5 of 10 projects: DeepMed, Codebase RAG, Underwater Image Enhancement, RouteRefuel, Brain Tumor Classification), while refusing to invent sequence for the other 5 — matching the plan's explicit instruction that M6 calibrate depth to actual evidence, not treat every project identically |
| **Constraints** | Zero new nouns introduced beyond each sentence's own content; zero change to any `status`/`confidence`/`provenance` field; no project's case-study prose rewritten, only the same `stages:` suffix pattern appended once per qualifying architecture sentence; content-gap work (missing roles, tech stacks, live demos, etc.) remains untouched per the rebuild's frozen-content agreement |
| **Rejected** | Annotating all 9 remaining projects uniformly regardless of whether their prose states an order (would invent pipelines for component-list-style architecture text); building a separate "components boundary" 3D visualization type for the 5 projects without a stated sequence (out of scope for M6 — no plan requirement, and would need new design work rather than reusing the existing extractable-evidence pattern) |
| **Revisit** | If any of the 5 untouched projects' `content/` architecture prose is later rewritten to state an explicit sequence, re-run this same calibration check |

---

## D-ENG-049 — Ambient Audio Coverage Verification + Trailing-Slash Fix (Rebuild M7)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M7 |
| **Decision** | Audited `AudioProvider`/`ambientEngine`/`resolveAmbientRoom` against every route added or changed in M1–M6 and confirmed the existing room-mixing design already covers all of them without new code, because rooms are resolved per-route (not per-widget): `/` (entrance particles, WebGL architecture graph, portrait orbit, Milky Way constellation) → `arrival`; `/journey` (station flythrough) → `journey`; `/archive/[slug]` (all 10 project pipeline chapters, including the 5 with the new `PipelineFlythrough`) → `case-study`; `/archive` → `evidence`; `/atlas` → `atlas`; footer intersection on any page → `footer`. `AudioProvider` (root `app/(site)/layout.tsx`) and `FloatingNav`'s `SoundToggle` (Rebuild M2) already wrap/appear on every route, so mute-by-default and the visible toggle are already sound. Found and fixed one real bug while auditing: `resolveAmbientRoom`'s `pathname === \"/archive\"` exact-match check could silently fail to match against a router-supplied `\"/archive/\"` given this site's `trailingSlash: true` static-export config, falling through to the `arrival` default instead of `evidence`. Added a `normalizeRoomPath` helper (strips a trailing slash except for the root path) so every comparison in `resolveAmbientRoom` is trailing-slash-safe regardless of Next.js router behavior. |
| **Purpose** | Verify — not assume — that the room-mixing system Document 33 already specifies actually reaches every new cinematic surface from M1–M6, and fix the one real routing correctness gap found during that verification |
| **Constraints** | No new audio layers, rooms, or assets invented; `ambientEngine`'s imperative fade/settle/fail-closed behavior (Rebuild-M0-kept, pre-existing) untouched; fix is routing-logic only, isolated to `resolveAmbientRoom` |
| **Rejected** | Adding new `AmbientRoomId` values per cinematic feature (constellation, pipeline flythrough, journey stations) — Document 33 treats ambient sound as room-level atmosphere, not per-widget sound effects, and every new feature already lives inside an existing room's route; per-widget sound cues (out of scope, not requested by the plan) |
| **Revisit** | If a future route is added outside the current six rooms, extend `resolveAmbientRoom` and `AMBIENT_ENVIRONMENT.rooms` together |

---

## D-ENG-050 — README Regeneration Scope Finding (Rebuild M8)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M8 |
| **Decision** | Audited `companion/scripts/generate-readme.ts`, `README.md`, and all 56 files under `readme/assets/svg/` against the M0–M7 rebuild and found no visual mismatch to fix: the README's drafting-plate SVG system already uses the exact same graphite hex values as `companion/styles/tokens/primitives.css` (confirmed unchanged by this rebuild — `git diff` on the token files is empty, since the existing palette already matched the "graphite cinematic" brief before M0 started), and `pnpm readme:check` passed against the unmodified README both before and after this audit. Cinematic motion, 3D, and audio — the actual subject of this rebuild — have no static-SVG equivalent and GitHub renders no JS/WebGL, so Document 06's storytelling layer correctly has nothing to regenerate here. The one real staleness found: the hardcoded "Engineering Companion" section copy in `generate-readme.ts` still described the Companion in pre-rebuild terms ("Atlas, Journey, Architecture, Demonstrations, Evidence, and Case Studies as one continuous product") without mentioning the cinematic entrance, 3D pipeline flythroughs, or skills constellation actually shipped in M1–M6. Updated that copy to name the real destination accurately, regenerated `README.md` via `pnpm readme:generate`, and reverified `pnpm readme:check` passes. |
| **Purpose** | Confirm the plan's "kept lean, since GitHub renders no JS/CSS" instruction was correct rather than assumed, and fix the one place where the README's own product description had drifted out of date against the shipped Companion |
| **Constraints** | No SVG asset files touched (their palette already matches; regenerating them with no actual visual change would be pure churn); no project evidence/content touched — the edited copy describes this repository's own built product (which this rebuild has direct authority over), not a claim about any of the ten case-study projects, so it is not subject to the evidence/provenance rules that govern `content/` |
| **Rejected** | Redesigning the 56 README SVGs from scratch (no design defect found — would be motion-less churn against an already-correct palette); leaving the stale Companion description standing |
| **Revisit** | If `companion/styles/tokens/primitives.css` palette values are ever changed, re-audit `readme/assets/svg/*.svg` for drift at that time |

---

## D-ENG-051 — Two-Level Lazy Split to Stop Three.js Loading Site-Wide (Rebuild M9)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M9 |
| **Decision** | A production build audit (`pnpm build`, then grepping every exported `out/**/*.html` for the Three.js chunk hashes) found `@react-three/fiber`'s reconciler (`rendererPackageName: "@react-three/fiber"`) present as an eager `<script async>` on literally every route, including `/404` and `/internal/foundation`, which render no scene at all — First Load JS was 358–398 kB on every page. Root cause: `SceneCanvas`'s `import()` split (D-ENG-045/046's M9 work) only deferred the `<Canvas>` boundary itself (`SceneCanvasInner`); the five scene wrappers (`HeroArchitectureScene`, `PortraitOrbitScene`, `PipelineFlythrough`, `ConstellationField`, `StationFlythrough`) still statically imported their scene-content components (`ArchitectureGraphScene`, `EntrancePortraitScene`, `PipelineScene`, `ConstellationScene`, `StationScene`) and passed them as JSX inside a children render-prop — so `@react-three/fiber`/`@react-three/drei`/`three` were bundled into the route chunk of every page using any wrapper (home, all 10 project chapters via `ArchitectureTopology`, `/atlas`, `/journey`). Because that is ≥2 route chunks referencing the same large vendor code, webpack's automatic commons-chunk splitting hoisted it into a shared bundle preloaded on every route regardless of whether that route needed it. Fixed by splitting each of the five wrappers into a `*Content.tsx` (statically imports `SceneCanvas` + the real scene, only ever reached via a runtime `import()`) and a thin wrapper (only imports `useSpatialCapability` directly — never the `spatial`/`entrance`/`capability` barrels — and fetches the `*Content` module via `import()` inside a `useEffect`, gated on `capability === "full"`, mirroring the `SceneCanvas`/`SceneCanvasInner` pattern exactly one level higher). Also switched every remaining barrel import that transitively reached a scene wrapper (`CaseStudyDocument.tsx`'s `ArchitectureTopology` import, `page.tsx`'s `HeroArchitectureScene`/`HeroTypography` imports, `EngineeringPortrait.tsx`'s `PortraitOrbitScene` import) to direct file imports, so no barrel re-export can reintroduce an eager dependency later. Post-fix build: First Load JS dropped to 125–158 kB on every route, and the Three.js chunk hashes no longer appear in any exported HTML file — confirmed by scripting a full scan of `out/**/*.html`. |
| **Purpose** | Make the fail-closed, capability-gated design already specified in Document 32 actually hold at the network level, not just the render level — a visitor whose capability probe resolves to `"off"`/`"lite"` must never pay for the Three.js download at all, on any route |
| **Constraints** | Zero change to any scene's visual behavior, camera, or fallback content — this is purely a module-graph/bundling fix; the render-prop `children={(tier) => ...}` API between each wrapper and `SceneCanvas` is preserved inside the new `*Content` file, so `SceneCanvas`/`SceneCanvasInner` themselves needed no changes |
| **Rejected** | Wrapping each scene wrapper in `next/dynamic()` instead of a manual `import()` — already rejected once in D-ENG-045/046 for the same reason (Next instruments `next/dynamic()` call sites to preload their chunk from every reachable page); consolidating all five scenes into one mega-lazy-module — rejected because it would force downloading e.g. the pipeline flythrough's code on the homepage before it's needed, the opposite of calibrated lazy-loading |
| **Revisit** | Any new hero scene added after this rebuild must follow the same two-file (`Xxx.tsx` thin wrapper + `XxxContent.tsx` real scene) pattern from the start, and must never be re-exported from the `spatial`, `entrance`, or `capability` barrels |

---

## D-ENG-052 — Closed Two Installed-but-Unused Foundation Gaps (Rebuild M5.1)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M5.1 |
| **Decision** | Audited M0's foundation promise ("R3F/drei/postprocessing... depth of field/bloom/grain" and "GSAP + ScrollTrigger... camera moves tied to scroll position") against the actual M1–M9 implementation and found both `@react-three/postprocessing` and `gsap` present in `package.json` since M0 but never imported anywhere in `modules/`. Closed both: (1) added `SceneEffects.tsx` (Bloom + Noise + Vignette via `EffectComposer`, gated `tier === "cinematic"` only) mounted once inside `SceneCanvasInner` so every hero scene gets the cinematic post-processing pass automatically, with zero per-scene duplication; (2) added `EntranceCameraRig.tsx`, a GSAP `ScrollTrigger`-scrubbed real 3D camera dolly (position.z push + position.y drop, straight-line only, no rotation) mounted inside `HeroArchitectureSceneContent`, scoped to the same scroll span (`window.innerHeight * 1.4`) `EntranceCamera`'s existing DOM-layer parallax already uses, so the WebGL and DOM layers move together. Deliberately did not add GSAP to `PipelineScene`'s stage-to-stage glide: that dolly is already interaction-driven (`activeIndex` from the accessible radiogroup, lerped via `useFrame`), which is the correct signal for a stage a visitor selects — GSAP ScrollTrigger's value is specifically for scroll-position-driven camera work, which only the entrance actually has. |
| **Purpose** | Verify — not assume — that every library the plan justified installing in M0 is actually load-bearing in the shipped experience, per the owner's M5.1 instruction to confirm the full brief (entrance, 3D, camera moves, transitions) is genuinely applied and fix anything that is not |
| **Constraints** | Both additions live entirely inside files already only reachable via the M9 lazy-`import()` boundary (`SceneCanvasInner`, `HeroArchitectureSceneContent`) — confirmed by rebuilding and re-checking First Load JS per route stayed unchanged (158 kB home, 125 kB archive, 121 kB atlas, 127 kB journey) and by re-running the full 239-check `verify:release` suite, both before and after, with identical pass counts; `lite` tier renders neither effect (Document 32's device-tier budget is preserved); reduced-motion visitors get neither the CSS parallax nor the GSAP dolly (both already fail closed) |
| **Rejected** | Adding GSAP to every scene "for completeness" — the plan itself says GSAP should be used "surgically... not sprinkled everywhere"; scrapping `@react-three/postprocessing` and doing a manual grain/vignette shader instead — the installed package already does this correctly and is already paid for in the same lazy chunk |
| **Revisit** | If a future milestone adds a genuinely scroll-driven sequence outside the entrance (e.g., a scroll-scrubbed camera through the journey stations rather than the current click-through), reuse `EntranceCameraRig`'s pattern rather than writing a third bespoke scroll-camera implementation |

---

## D-ENG-053 — M10 QA Gate Verified Green; Deploy Left as an Explicit User Action (Rebuild M10)

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M10 |
| **Decision** | Ran every check `.github/workflows/ci.yml` and `.github/workflows/pages.yml` run in CI, locally, in the same order, against the final M0–M9/M5.1 state: `pnpm typecheck` (clean), `pnpm lint` (clean), `pnpm format:check` (failed on 9 files on first run — see below, fixed, clean on rerun), `pnpm audit:deps` (`No known vulnerabilities found`), `pnpm build` (static export, 22/22 pages, First Load JS 105–158 kB across every route), `pnpm verify:release --require-build` (239/239 checks passed). The `format:check` failure was pre-existing drift on six files this rebuild never touched (`ArchitectureGraphScene.tsx`, `EntrancePortraitScene.tsx`, `PipelineScene.tsx`, `ConstellationScene.tsx`, `StationScene.tsx`, `FloatingNav.tsx`, `SiteShell.tsx`, `scripts/verify-release.ts`) plus this milestone's new `SceneEffects.tsx` — none had ever been run through `pnpm format`; fixed by running `pnpm format` once and reverifying `format:check` passes with zero remaining diffs. Did not run real cross-browser/device sessions (BrowserStack or otherwise): the site is not yet deployed to a public URL, and `pages.yml` only deploys on a push to `main`/`master` — pushing is the action that would make the site testable on real devices, and is a decision for the owner to make, not this rebuild to take unilaterally. Deploy readiness is therefore fully verified (identical checks to what CI runs, all green, locally reproduced); the actual `git push` to trigger deployment is deliberately left as the next explicit step for the owner. |
| **Purpose** | Give the owner a genuinely CI-equivalent, pre-flight-verified state before any push, rather than reporting "should be fine" without having run the same gate CI will run |
| **Constraints** | No `--no-verify`/hook-skipping; no production deploy or `git push` executed without an explicit user instruction to do so (git safety rules); dependency versions untouched by this audit — `pnpm audit:deps` reported clean without requiring any bump |
| **Rejected** | Running BrowserStack real-device sessions against the local static export via a tunnel — adds infrastructure complexity (BrowserStack Local binary, tunnel lifecycle) for a site that will be reachable at a real public URL within minutes of the owner's own push; better to test the real deployed artifact once it exists than a tunnel-fronted local copy |
| **Revisit** | After the owner pushes to `main`/`master` and `pages.yml` deploys, run a BrowserStack (or manual) cross-browser/device pass against the live `https://alihassan-15.github.io/AliHassan-15` URL — Safari/iOS (WebGL quirks), older Android Chrome (device-tier "lite" fallback), and one reduced-motion/no-WebGL browser profile are the three highest-value checks given this rebuild's fail-closed spatial design |

---

## D-ENG-054 — Fixed a Real Crash: `useState`'s Function-Value Special-Casing Broke Every Two-Level Lazy Scene Loader

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M9 (bug found post-milestone, during owner smoke-testing) |
| **Decision** | Fixed a genuine runtime crash affecting all six two-level lazy-loaded scene components introduced in D-ENG-051 (`SceneCanvas`→`SceneCanvasInner`, `HeroArchitectureScene`→`*Content`, `PipelineFlythrough`→`*Content`, `PortraitOrbitScene`→`*Content`, `ConstellationField`→`*Content`, `StationFlythrough`→`*Content`). Each wrapper resolves its scene component via a runtime `import()` and stores the reference with `setContent(module.default)` / `setInner(module.default)`. React's `useState` setter special-cases a bare function argument as a *lazy updater* — it calls that function with the previous state and stores the return value, rather than storing the function itself. Since `module.default` is a function, React was invoking the scene component itself (with the previous state, `null`, as its sole argument) instead of storing it as the new state value. For components with destructured required props (`HeroArchitectureSceneContent`, `PipelineFlythroughContent`, `StationFlythroughContent`, `ConstellationFieldContent`, `SceneCanvasInner`), this threw `TypeError: Cannot destructure property '…' of 'param' as it is null` on first resolution, crashing the route via the nearest error boundary. For the one component with no props (`PortraitOrbitSceneContent`), the spurious call succeeded and returned its rendered JSX tree, which then got stored as state and rendered as `<Content />` — producing `Element type is invalid: … got: <SceneCanvas />` (React's element-repr for an object it can't use as a component type). Fixed by wrapping every one of the six `set*(module.default)` calls in an updater function — `set*(() => module.default)` — which is the correct, standard way to store a function/component value in `useState`. Also hardened the five `*Content` components and `SceneCanvasInner` with an explicit `if (!props) return null;` guard as defense-in-depth against any future call with a missing/null argument (harmless for every real render, which always supplies a full props object). |
| **Purpose** | Every 3D scene on the site (entrance, portrait orbit, project pipelines, skills constellation, journey stations) was silently or loudly broken client-side for every visitor with WebGL — this was the single highest-priority defect blocking ship |
| **Constraints** | No visual/design changes — pure fix to the loading mechanics; verified `typecheck` (clean), `lint` (clean), `format:check` (clean), `build` (22/22 pages, First Load JS unchanged at 105–158 kB — confirms the two-level lazy split from D-ENG-051 is still intact), `verify:release` (239/239) |
| **Rejected** | Switching back to `React.lazy()`/`next/dynamic()` for these components — that was deliberately avoided in D-ENG-051 specifically because it caused Next.js to eagerly preload the Three.js bundle on every route; the manual `useState` + `import()` pattern is correct and necessary, it just needed the standard updater-function fix |
| **Revisit** | If any future scene component is added with this same fetch-and-store pattern, always use `set*(() => module.default)`, never `set*(module.default)` directly — worth calling out in a short contributor note if this codebase gains more than one maintainer |

---

## D-ENG-055 — Isolated Post-Processing Behind an Error Boundary After a Multi-Canvas WebGL-Context Crash on `/journey`

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M9 (bug found post-milestone, during owner smoke-testing) |
| **Decision** | Fixed a route-crashing error on `/journey`: `TypeError: Cannot read properties of null (reading 'alpha')`, thrown from `@react-three/postprocessing`'s `EffectComposer` constructor (`createBuffer`). `/journey` is the one page that mounts two independent cinematic `<Canvas>` scenes at once — `StationFlythrough` and the embedded `CapabilityAtlas`'s `ConstellationField` — each with its own `SceneEffects`/`EffectComposer`. `EffectComposer` probes for WebGL2 support by creating a second, throwaway canvas/context on construction; browsers cap the number of simultaneously live WebGL contexts a page may hold (commonly 8–16, lower on some GPUs/browsers), and two full scenes plus their probe contexts plus any in-flight contexts from React Strict Mode's dev-mode double-mount can exceed that cap, which surfaces as exactly this error — a well-documented upstream issue (`pmndrs/react-postprocessing` #97, #240, #311). Fixed by adding `SceneEffectsBoundary`, a small class-component error boundary wrapping `<SceneEffects>` inside `SceneCanvasInner`: if `EffectComposer` fails to construct for any reason (context exhaustion or otherwise), the boundary swallows the error and renders `null` instead of the effects pass, and the scene's own geometry/camera/particles continue rendering normally — the route itself no longer crashes. |
| **Purpose** | Treat post-processing exactly like every other spatial enhancement in this codebase (WebGL support, reduced motion, save-data, device tier): a layer that fails closed, never one that can take down a route |
| **Constraints** | No visual/design changes when the browser can actually support it — bloom/grain/vignette render identically for every visitor whose browser has headroom; verified `typecheck`, `lint`, `format:check` (all clean), `build` (22/22 pages, First Load JS unchanged), `verify:release` (239/239) |
| **Rejected** | Removing `SceneEffects` from one of the two `/journey` scenes to cut total context usage — changes the visual bar page-to-page for no clear reason and doesn't fix the same crash risk for any other visitor combination (e.g. two browser tabs open to different cinematic routes) that this boundary handles generally; downgrading `@react-three/postprocessing`/`postprocessing` to older versions cited in upstream issue threads — current versions (`@react-three/postprocessing@3.0.4`, `postprocessing@6.39.4`) are already newer than the versions those threads report fixes in, so the actual trigger here is context-count pressure, not a stale-library regression |
| **Revisit** | If a future page ends up mounting three or more simultaneous cinematic scenes, reconsider a shared/pooled `EffectComposer` instance rather than one per canvas — not needed today since no page exceeds two |

---

## D-ENG-056 — Capped Live `EffectComposer` Count at One Per Page After the Boundary Alone Proved Insufficient

| Field | Value |
|-------|-------|
| **Date** | 2026-08-04 |
| **Milestone** | Rebuild M9 (bug found post-milestone, during owner smoke-testing) |
| **Decision** | D-ENG-055's "no page exceeds two [simultaneous cinematic scenes]" premise was wrong: the homepage alone mounts *three* — `HeroArchitectureScene`, `EngineeringPortrait`'s `PortraitOrbitScene`, and `CapabilityAtlasSection`'s `ConstellationField` — and each independently builds its own `SceneEffects`/`EffectComposer`, so the same WebGL-context-exhaustion crash (`Cannot read properties of null (reading 'alpha')`) recurred on `/` itself, not just `/journey`. `SceneEffectsBoundary` (D-ENG-055) correctly stopped the crash from taking down the route, but it only contains the symptom per-scene — it does nothing to reduce the actual context pressure, so every cinematic scene on a multi-scene page was still silently losing its effects pass to a context-exhaustion race, and any page with even more simultaneous scenes in the future would only get worse. Added `useEffectsOwnership()`, a module-level singleton slot: the first `SceneEffects` to mount on a page claims a page-wide "ownership" flag and is the only one that renders `<EffectComposer>`; every other concurrently-mounted `SceneEffects` on the same page renders `null` for its effects layer (its scene's geometry/camera/particles are unaffected) and releases the slot on unmount so a later scene (e.g. after client-side navigation) can claim it. This caps live `EffectComposer` instances — and therefore the redundant WebGL2-probe contexts each one creates on construction — at exactly one for the whole page, regardless of how many cinematic scenes are mounted at once, which removes the root cause rather than only catching its failure. `SceneEffectsBoundary` is kept as defense-in-depth for the one scene that does own the slot. |
| **Purpose** | Fix the actual resource-pressure cause of the crash (unbounded per-scene `EffectComposer` count) rather than only containing its failure mode, after discovering the crash recurs on the homepage under the same mechanism as `/journey` |
| **Constraints** | No visual/design regression for the common case — whichever scene mounts first on a page (in practice the hero/primary scene) still gets the full bloom/grain/vignette treatment identically to before; verified `typecheck`, `lint`, `format:check` (all clean), `build` (22/22 pages), `verify:release` (239/239), plus a clean dev-server restart and a static production-build smoke test (`/`, `/journey/`, `/atlas/`, `/archive/deepmed/` all 200, zero server-side errors) |
| **Rejected** | Removing `SceneEffects` entirely from secondary scenes at the call site (e.g. never passing effects to `PortraitOrbitScene`) — hard-codes an assumption about which scene "deserves" the effect that may not hold on every route, and doesn't generalize to pages this rebuild didn't specifically audit; a shared/pooled single `EffectComposer` instance manually passed between canvases — R3F's `EffectComposer` is scoped to its own `<Canvas>`'s renderer/scene/camera and isn't designed to be shared across independent canvases, so this would require forking the library's internals for no benefit over the ownership-slot approach |
| **Revisit** | If a future design intentionally wants two scenes on the same page to both show bloom/grain simultaneously, this decision needs revisiting — the current slot is strictly one-at-a-time by design |


