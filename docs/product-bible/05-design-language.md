# Document 05 — Design Language

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  
**Authority:** Permanent visual grammar (principles) for the Engineering Operating System (EOS)  
**Immutability:** Future Product Bible documents may extend Design Language but must never contradict it. Conflict → stop and ask. Do not silently reconcile.  
**Depends on:** `00-vision.md`, `01-identity.md` (process), `02-identity-specification.md` (Approved / Locked), `03-discovery.md` (Approved / Locked — Immutable), `04-creative-direction.md` (Approved / Locked — Immutable)  
**Answers:** HOW the EOS should communicate visually (principles only)  
**Does not answer:** page layouts, screen compositions, navigation, motion, interaction mechanics, implementation, technology, README structure, Companion structure

---

## 0. Purpose and constitutional rules

### 0.1 Purpose

Design Language defines the permanent visual grammar of the Engineering Operating System.

It translates Vision, Identity, Discovery, and Creative Direction into visual principles that later documents and implementations must obey.

It does not invent personal preferences. It does not invent evidence. It does not invent Creative Direction.

### 0.2 Conflict rule

If any instruction conflicts with Vision, Identity, Discovery, or Creative Direction, stop immediately and ask. Do not silently reconcile.

### 0.3 Provenance rule

Every visual principle must be traceable to a prior constitutional document. If unsupported, mark **Deferred**.

### 0.4 Separation rule

If a topic belongs to Motion Language, Interaction Language, Information Architecture, README System, Companion Experience, Assets inventory, or Implementation, defer it.

This document must not define layouts, components, animations, interaction mechanics, or technology.

---

## 1. Visual philosophy

**Source:** Vision §6; Identity §26, §34; Creative Direction §5–§6, §9.

The visual language must communicate (Vision):

- confidence  
- precision  
- clarity  
- refinement  
- intelligence  
- calmness  

It must never communicate (Vision):

- chaos  
- excess  
- trend chasing  
- gimmicks  

Emotional qualities the visual system must support (Identity §26): calm confidence; precision; engineering discipline; intelligence; craftsmanship → premium perception; technical maturity; trustworthiness; curiosity; depth without unnecessary complexity; clarity without oversimplification; timelessness; purposefulness; quiet ambition; systems thinking.

Design = communication (Identity §34): every pixel reduces friction between understanding and engineering complexity.

Engineering first (Vision; Creative Direction): Visual design supports engineering. Engineering never supports decoration.

Purpose before beauty (Vision; Identity §34): understanding before decoration; never decorate without purpose.

Visitors should remember intentional detail and engineering discipline — not colors, effects, or trends (Identity §26).

Compliment targets:

- “Everything feels exactly as it should.” (Identity §26)  
- “Everything here feels considered.” (Identity §34)  
- Trusted because every visual decision felt disciplined — not “beautiful colors.” (Identity §30)

---

## 2. Visual hierarchy philosophy

**Source:** Identity §26, §29, §34; Vision Principle 2.

Perceived quality depends on hierarchy among: consistency, proportion, restraint, precision, typography, spacing, hierarchy (Identity §26).

Identity inherit principle: **hierarchy before density**.

Typography hierarchy (Identity §29): inevitable; calm strong hierarchy via proportion, spacing, rhythm, and contrast — not excessive size.

High quality when: obvious hierarchy; organized complexity (Identity §34).

Every visual decision must solve one of: explain, guide, reveal, organize, reinforce, delight appropriately. Never decorate without purpose (Vision Principle 2).

Concrete hierarchy scales, type sizes, and layout slots: **Deferred** (component / IA / implementation documents).

---

## 3. Typography philosophy

**Source:** Identity §29; Vision consistency principle.

Typography establishes trust before other systems (Identity §29).

It must communicate: authority without arrogance; precision without rigidity; technical maturity without coldness; editorial clarity without magazine-ness; engineering confidence without ego; calm intelligence; thoughtfulness; long-term quality; consistency; trust.

**Families by purpose (Identity §29):**

| Role | Rule |
|------|------|
| Sans | Clarity / modern engineering / product / system reading |
| Serif | Only when it improves long-form editorial/story — **never** EOS visual identity |
| Mono | Code / commands / technical artifacts — **never** replace reading type |

**Display:** architectural restraint; not marketing, fashion, agency, gaming, or AI-hero display.

**Reading jobs:** mission memorable; docs effortless; architecture rewards care; case studies sustain attention; scan + deep read; no typographic fatigue.

**Typographic density:** breathe; denser only when content is more technical; dense docs OK; dense presentation not.

**Consistency across:** English, terminology, numerals, code, math, architecture notation, terminal, tables, diagrams; seamless narrative ↔ artifact.

**Rhythm:** headings anticipate; body sustains; captions context; code integrated; cadence for scan / understand / reflect / explore.

**Anti-patterns (Identity §29):** ultra-rounded; novelty display; overly geometric cold fonts; fashion fonts; extreme condensed; decorative serifs; artificial handwriting; heavy italics; aggressive uppercase; inconsistent combinations; poor spacing; over-designed headings.

Typography is not personality; engineering is (Identity §29).

Compliment: forgot reading a website; felt like reading clear thinking (Identity §29).

Specific typeface selection, scale tokens, and README/GitHub font constraints: **Deferred** (Assets / implementation; GitHub constraints acknowledged by Vision entrance).

---

## 4. Color philosophy

**Source:** Identity §30; Vision §6; Identity soft prefs §24.3.

Color is information (Identity §30).

Foundation: near-monochrome + carefully controlled semantic accents.

Identity is established via type, hierarchy, spacing, light, and proportion **before** color.

**May communicate:** focus; interaction state; hierarchy; selection; status; health; AI vs infrastructure; architecture relationships; warn / success / fail / info; active context.

**Must never communicate:** personality; entertainment; luxury; novelty; noise; trendiness; attention-seeking; artificial excitement.

Restrained saturation; contrast from value; calm under complexity.

Light and dark = **one identity**; no extra brand colors per mode.

Semantic colors are utilitarian; accessibility over aesthetics.

**Grayscale test:** recognizable and understandable without color; color enhances, never compensates.

**Rhythm:** long neutrals; accents punctuate.

**Anti-patterns / never identity (Identity §30):** neon gradients; RGB; cyberpunk; generic AI purple+cyan; rainbow; oversaturated blues; glass glow; gaming lighting; gradient text/buttons; competing accents; brand overload; marketing explosions; random colorful illustrations; hot magenta; bright lime; highly saturated orange; pastel rainbow; festival; social-media highlight colors — only if required by real content, never as identity.

Soft preference (Identity §24.3): avoid highly saturated accents unless strongly justified; avoid dark interfaces that reduce readability.

Exact palette tokens, hex values, and theme implementation: **Deferred**.

---

## 5. Spacing philosophy

**Source:** Vision Principle 3; Identity §26, §29, §34.

Whitespace is valuable (Vision).

Whitespace exists for comprehension; breathe without emptiness (Identity §26).

Inevitable spacing; calm type; rhythmic information (Identity §34 high-quality when).

Hierarchy via proportion, spacing, rhythm, contrast — not excessive size (Identity §29).

Avoid extremely minimal layouts that hide useful information (Identity §24.3 soft preference).

Spacing scales, grid gutters, and component padding: **Deferred**.

---

## 6. Proportion

**Source:** Identity §26, §29.

Perceived quality includes proportion (Identity §26).

Quietly premium via invisible craft: clarity, rhythm, hierarchy, consistency, proportion, precision first (Identity §26).

Typographic hierarchy uses proportion (Identity §29).

Numeric proportion systems (modular scales, golden ratios as mandates): **Deferred** (unsupported as specific system).

---

## 7. Rhythm

**Source:** Identity §26, §29, §30, §34.

Designed feel prioritizes clarity / rhythm / hierarchy / consistency / proportion / precision (Identity §26).

Typographic rhythm: headings anticipate; body sustains; captions context; code integrated (Identity §29).

Color rhythm: long neutrals; accents punctuate (Identity §30).

High quality when: rhythmic information (Identity §34).

Motion rhythm belongs to Motion Language — **Deferred** here.

Whitespace is valuable. Silence is valuable. Pacing is valuable (Vision Principle 3).

Visitors remember intentional detail and engineering discipline — not colors/effects/trends (Identity §26).

---

## 8. Composition philosophy

**Source:** Identity §26, §34; Vision Purpose Before Beauty.

Density: information-rich, highly structured, intentionally spacious; progressive unfold; whitespace for comprehension; breathe without emptiness (Identity §26).

High quality when: organized complexity; obvious hierarchy; rhythmic information (Identity §34).

Inherit principles (Identity §34): hierarchy before density; systems before screens; understanding before decoration; purpose before beauty.

Non-digital disciplines shape organization not costume (Identity §26, §34).

This document does **not** define page layouts, screen compositions, hero arrangements, or section templates. Those belong to IA / Companion / README System — **Deferred**.

---

## 9. Grids philosophy

**Source:** Partial — Identity “highly structured” / information design; no explicit grid system stated.

Visual structure should feel highly structured and intentional (Identity §26).

Information design and technical publishing disciplines inform organization (Identity §34).

Explicit grid definitions (columns, breakpoints, README vs Companion grids): **Deferred**.

---

## 10. Visual density

**Source:** Identity §26, §29; Identity §24.3.

Density: information-rich, highly structured, intentionally spacious (Identity §26).

Typography: breathe; denser only when content more technical; dense docs OK; dense presentation not (Identity §29).

Inherit: hierarchy before density (Identity §34).

Avoid: overly dense layouts (Vision Forbidden List); extremely minimal layouts that hide useful information (Identity §24.3).

Mobile/desktop: same identity; desktop may denser exploration; mobile not a dumbed-down product (Identity §26).

---

## 11. Material philosophy

**Source:** Identity §30; soft prefs §24.3.

Believable materials; light-influenced (Identity §30).

Shadows and translucency serve spatial understanding (Identity §30).

Avoid excessive glassmorphism and purposeless glassmorphism (Identity §24.3, §34).

Material tokens and component surface recipes: **Deferred**.

---

## 12. Lighting philosophy

**Source:** Identity §26, §30, §31.

Themes: both light and dark; one identity; light = clarity / docs / analysis; dark = immersion / focus / depth; **only environmental lighting changes** (Identity §26).

No extra brand colors per mode (Identity §30).

Atmosphere is primarily visual/spatial; if it depends on sound, visual design failed (Identity §31).

Avoid gaming lighting; glass glow as identity (Identity §30).

Lighting implementation and 3D lighting setups: **Deferred** (Motion / 3D / implementation). Vision: 3D optional and must justify existence — visual depth principles only here.

---

## 13. Depth philosophy

**Source:** Identity §30; Vision §8 (constraint only).

Depth supports spatial understanding via light, shadow, and translucency when earned (Identity §30).

Vision 3D Constitution: 3D is optional; must justify existence; appropriate for camera depth, architecture visualization, environmental storytelling, spatial navigation; inappropriate for random floating objects, decorative planets, unrelated geometry, effects that reduce performance without improving understanding.

Decorative depth and unjustified 3D: refused.

3D systems, camera paths, and motion-in-depth: **Deferred** to Motion Language / implementation.

---

## 14. Texture philosophy

**Source:** Partial — Identity materials/light; visual noise bans.

Believable materials (Identity §30).

Avoid excessive noise; decorative wireframe textures as identity pattern (Identity §24.4).

Dedicated texture library / noise systems: **Deferred**.

---

## 15. Surfaces

**Source:** Identity §26, §30, §31.

Public visual surfaces operate under one identity across light and dark environments (Identity §26, §30).

Atmosphere qualities (visual): private refined engineering workspace — silence, space, presence, focus, confidence, depth, precision, maturity (Identity §31) — qualities, not costume.

Entrance (GitHub) and destination (Companion) share identity; depth of proof differs (Creative Direction; Identity §25.5). Visual grammar must remain one language across both — without this document defining either structure.

Surface component catalogs: **Deferred**.

---

## 16. Iconography philosophy

**Source:** Unsupported as a dedicated positive icon system in prior documents.

Refusals that apply when icons appear:

- Technology logo walls (Identity §24.2)  
- Logo collections (Identity §24.4)  
- Repetitive technology badges (Vision Forbidden List)  

Specific icon set, metaphor language, sizes, and positive icon doctrine: **Deferred** (DL-04).

---

## 17. Illustration philosophy

**Source:** Identity §26, §24.4, §30, §34.

Prefer real engineering imagery over decorative illustration (Identity §26 imagery priority).

Abstract only for systems / relationships / scale — not atmosphere for itself (Identity §26).

Refuse: AI-generated art as decoration; generic innovation illustrations; unrelated network meshes; simplistic metaphors that trivialize engineering; random colorful illustrations; AI clichés (neurons / particles / purple gradients / robots / decorative AI backgrounds) (Identity §24.4, §34).

Illustration style guides: **Deferred** beyond these constraints.

---

## 18. Imagery philosophy

**Source:** Identity §26; Discovery (evidence honesty); Vision Truth.

**Imagery priority (Identity §26):**

1. Real product UI  
2. Architecture diagrams  
3. System relationships  
4. Infrastructure visualization  
5. AI workflows  
6. Data-flow  
7. Technical illustrations  
8. Engineering docs  
9. Process visualization  

Portraits for authorship; engineering primary.

Portrait / photo policy: Discovery / Identity **Deferred (D-09)** — not decided here.

Imagery must represent real work (Vision Truth). Never fake production claims or decorative dashboards/charts without context (Identity §24.2, §24.4).

Asset packs and screenshot inventories: Discovery Disc-02/03 Missing/Deferred — Design Language does not invent them.

---

## 19. Diagrams philosophy

**Source:** Identity §18.1, §26, §9.9; Creative Direction storytelling; Discovery gaps.

Diagrams / walkthroughs / decision logs primary; repos and demos as evidence (Identity §18.1).

Architecture diagrams and system relationships are high-priority imagery (Identity §26).

Never decorate without purpose (Vision Principle 2).

Curated architecture diagram asset pack: Discovery **Disc-02 Deferred** — existence incomplete; principles above still bind future diagrams.

Diagram notation standards: **Deferred**.

---

## 20. Information visualization philosophy

**Source:** Identity §26, §30, §34; Vision Purpose Before Beauty.

Scientific visualization, information graphics, and data-flow visualization are legitimate when they improve understanding (Identity §26, §34).

Color in visualization remains informational and semantic (Identity §30).

Refuse vanity metrics without context; decorative dashboards/charts (Identity §24.4).

Chart libraries and viz implementation: **Deferred**.

---

## 21. Visual consistency

**Source:** Vision Principle 4; Identity §26, §29, §30; Creative Direction.

Spacing, typography, motion, color, layout, and language must feel like one team with one vision (Vision).

One identity across light/dark (Identity §26, §30).

Typographic consistency across narrative and artifacts (Identity §29).

Same identity on mobile and desktop (Identity §26).

Entrance and destination: same message, different depth — not different brands (Identity §25.5; Creative Direction).

Inconsistent design language is a hard ban (Identity §24.2).

---

## 22. Premium craftsmanship philosophy (visual)

**Source:** Identity §26, §31, §35; Vision Luxury Through Restraint.

Default atmosphere sentence (Identity §31):

> Quiet confidence expressed through timeless engineering craftsmanship.

Senior phrase (Identity §26):

> Engineering precision expressed through timeless product craftsmanship.

Also accurate (Identity §26):

- premium software product that happens to represent an engineer  
- editorial clarity shaped by systems thinking  
- quiet confidence through disciplined engineering  
- technical sophistication without visual ego  
- timeless digital craftsmanship grounded in engineering  
- complex systems communicated with exceptional clarity  

Designed feel (Identity §26): quietly premium via invisible craft; clarity/rhythm/hierarchy/consistency/proportion/precision first; timeless five-year confidence.

Compliment (Identity §26): “Everything feels exactly as it should.”

Perceived quality (Identity §26): refinement not complexity; intentional details; consistency, proportion, restraint, precision, typography, spacing, hierarchy.

Luxury Through Restraint (Vision): Luxury products rarely contain more. They contain only what deserves to remain.

Craftsmanship over speed; refine until complete rather than ship unfinished/generic (Identity §7).

Remembered for exceptional craft, not most effects or latest design trend (Identity §7).

Quality is cumulative decisions, not a finishing feature (Identity §35).

High quality when: craft deepens with use; nothing accidental; intentional decisions (Identity §34).

---

## 23. Accessibility implications for visual language

**Source:** Vision §13; Identity §30, §34; Creative Direction principles.

Accessibility is part of quality — baseline, not optional (Vision).

Visual implications stated in constitutions:

- Sufficient contrast (Vision)  
- Semantic structure (Vision)  
- Accessibility before aesthetics (Identity §34)  
- Semantic color: a11y over aesthetics (Identity §30)  
- Grayscale test: recognizable/understandable without color; color enhances, never compensates (Identity §30)  
- Avoid dark interfaces that reduce readability (Identity §24.3)  
- Reduced-motion mode (Vision) — motion specifications and reduced-motion behavior: **Deferred** to Motion Language / Accessibility implementation  

Keyboard navigation, labels, and responsive layout mechanics: Interaction / IA / implementation — **Deferred** as mechanics.

---

## 24. Desktop vs mobile visual consistency

**Source:** Identity §26.

Same identity on mobile and desktop.

Desktop may denser exploration.

Mobile must not be a dumbed-down product.

Breakpoint systems, responsive layout patterns, and README mobile rendering: **Deferred**.

---

## 25. Timelessness principles

**Source:** Identity §7, §26, §32, §34; Vision decision framework Q9; Creative Direction §10.

Prefer timeless, intentional, five-year-defensible decisions (Identity §7).

Designed feel: timeless five-year confidence (Identity §26).

Longevity before popularity (Identity §34).

Would we still choose this decision in five years? (Vision)

Dislike trends for trends’ sake (Identity §7).

Do not introduce features simply because they are fashionable (Vision).

Public: never advertise as Apple / Linear / Stripe-inspired; study principles internally only (Identity §32; Creative Direction).

---

## 26. Visual quality gates

**Source:** Vision §16, §14; Identity §34; Creative Direction.

Before any visual feature is complete, visual quality must hold with: Functional, Motion, Engineering, Performance, Accessibility, and Content quality (Vision §16). Shortfall in one → not complete.

Vision Decision Framework applies to visual choices (in order):

1. Does this improve clarity?  
2. Does this strengthen storytelling?  
3. Does this reinforce engineering quality?  
4. Does this improve the user's understanding?  
5. Does it remain performant?  
6. Does it remain accessible?  
7. Does it fit the design language?  
8. Can it be maintained?  
9. Would we still choose this decision in five years?  

Identity high quality when (visual-relevant): nothing accidental; inevitable spacing; calm type; rhythmic information; obvious hierarchy; organized complexity; consistent language; intentional decisions; craft deepens with use; respects attention; confidence without asking.

North Star (Vision): every visual decision must have a clear, defensible reason. Nothing exists merely because it looks impressive.

---

## 27. Visual anti-patterns

**Source:** Vision §6, §15; Identity §24.1–24.5, §29, §30, §34.

### 27.1 Vision

Chaos; excess; trend chasing; gimmicks; excessive visual clutter; unrelated decorative animations (motion defer); repetitive technology badges; multiple competing accent colors; inconsistent typography; overly dense layouts; effects that distract from content.

### 27.2 Identity hard bans / never leave believing (visual)

Trend-driven design without purpose; technology logo walls; generic project cards; portfolio templates; artificial complexity; style without substance; visuals competing with content; aesthetics over engineering quality; just another portfolio with better animations; impressive only because visually loud; template-assembled.

### 27.3 Instant “not me” visual patterns (Identity §24.4)

Neon cyberpunk; RGB; AI-generated art as decoration; particles; logo collections; Dribbble experiments; startup landing aesthetics; oversized gradients; decorative dashboards/charts; generic UI mockups; fake OS interfaces; excessive noise; code-rain; fake terminals; decorative browser chrome; vanity metrics without context; decorative wireframe textures; generic innovation illustrations; empty testimonial cards; unrelated network meshes; simplistic metaphors that trivialize engineering.

### 27.4 Color / type anti-patterns

As listed in §3 and §4 of this document (Identity §29–§30).

### 27.5 Reject cultures (Identity §34)

Dribbble-first; agency theatre; trend redesigns; visual maximalism; purposeless glassmorphism; neon cyberpunk; RGB overload; AI clichés; generic portfolio templates; excessive personal branding; marketing over evidence; screenshot-optimized-only; originality over usability.

### 27.6 Soft preferences (avoid unless strongly justified) (Identity §24.3)

Heavy gradients; excessive glassmorphism; large hero slogans; decorative 3D; dark interfaces that reduce readability; extremely minimal layouts that hide useful information; highly saturated accents.

(Experimental navigation and playful micro-interactions are Interaction Language — noted only as Identity soft prefs; not specified here.)

---

## 28. Decision framework for future visual choices

**Source:** Vision §14; Identity §34 inherit list; Creative Direction §9.

Apply Vision’s nine questions in order (§26 of this document).

Additionally obey Identity inherit principles when choosing visuals:

- purpose before beauty  
- understanding before decoration  
- consistency before novelty  
- precision before expression  
- hierarchy before density  
- craftsmanship before trends  
- systems before screens  
- communication before animation  
- performance before effects  
- accessibility before aesthetics  
- truth before marketing  
- longevity before popularity  

Execution question (Identity §33): would this decision still feel appropriate inside one of the world’s highest-quality software products?

If unsupported by Vision / Identity / Discovery / Creative Direction → stop and ask, or mark Deferred — do not invent.

---

## 29. Deferred register (Design Language)

| ID | Item | Status |
|----|------|--------|
| DL-01 | Exact typeface selection and type scale tokens | Deferred |
| DL-02 | Exact color palette / semantic token values | Deferred |
| DL-03 | Spacing scale and grid definitions | Deferred |
| DL-04 | Icon system | Deferred |
| DL-05 | Illustration style guide beyond constraints | Deferred |
| DL-06 | Material / surface token recipes | Deferred |
| DL-07 | Diagram notation standards | Deferred |
| DL-08 | Numeric proportion system | Deferred |
| DL-09 | Texture library | Deferred |
| DL-10 | Page layouts / screen compositions | Deferred — out of scope (IA / Companion / README) |
| DL-11 | Component library visuals | Deferred — out of scope |
| DL-12 | Portrait policy application in imagery | Deferred — Identity D-09 |
| DL-13 | Architecture diagram asset pack | Deferred — Discovery Disc-02 |
| DL-14 | “Cinematic quality without cinematic excess” as visual Design Language commitment | Out of Scope / Deferred — not an Identity-stated visual affirmative; Identity Motion taste refuses cinematic-for-itself (Motion Language) |

---

## 30. Scope

This document owns visual principles for:

- visual philosophy and hierarchy philosophy  
- typography, color, spacing, proportion, rhythm philosophies  
- composition and density philosophies (not layouts)  
- grids philosophy (principle-level; definitions Deferred)  
- material, lighting, depth, texture, surfaces philosophies  
- iconography / illustration / imagery / diagrams / information visualization philosophies (constraints; systems Deferred where unsupported)  
- visual consistency; premium craftsmanship (visual)  
- accessibility implications for visuals  
- desktop vs mobile visual consistency  
- timelessness; visual quality gates; visual anti-patterns  
- decision framework for future visual choices  

---

## 31. Out of Scope

| Domain | Belongs to |
|--------|------------|
| Page layouts, screen compositions, section templates | IA / Companion / README System |
| Navigation, progressive disclosure mechanics | Interaction Language / IA |
| Animation, motion timing, transitions, motion vocabulary | Motion Language |
| Interaction feedback mechanics, gestures | Interaction Language |
| Component APIs and UI kits | Implementation / component docs |
| Technology (React, Tailwind, Three.js, etc.) | Implementation |
| README structure / Companion IA | README System / Companion Experience |
| Sound implementation | Audio docs |
| Inventing missing Discovery assets | Discovery (locked) |
| Personal identity claims | Identity (locked) |
| Creative WHY philosophy restatement as expansion | Creative Direction (locked) — referenced, not rewritten |
| Mood boards; new visual references beyond constitutional study-principles lists | Forbidden |
| “Cinematic quality without cinematic excess” as visual commitment | Out of Scope — Motion Language / DL-14 |

---

## 32. Dependencies

| Document | Relationship |
|----------|----------------|
| `00-vision.md` | Design constitution, principles, a11y, quality, decision framework, forbidden list |
| `01-identity.md` | Process that produced Identity |
| `02-identity-specification.md` | Visual / type / color / imagery / anti-pattern source of truth |
| `03-discovery.md` | Evidence gaps; asset Deferred items; must not invent visuals as proof |
| `04-creative-direction.md` | WHY constraints; engineering-first; restraint; timelessness; entrance/destination identity unity |

---

## 33. Future dependent documents

Design Language constrains, but does not replace:

- Motion Language  
- Interaction Language / Information Architecture  
- README System  
- Companion Experience specification  
- Content / Writing system  
- Assets  
- Component specifications  
- Engineering Standards, Performance, Accessibility (implementation detail)  
- Implementation / Cursor constitution  

Those documents may extend these principles. They must never contradict them.

---

## 34. Approval gate

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  

Design Language is complete. Future Product Bible documents may extend this document but must never contradict it. If any future instruction conflicts with Design Language, stop immediately and ask for clarification. Do not silently reconcile conflicts.

Stop. Do not begin Motion Language, UI exploration, or implementation until instructed.

---

*End of Document 05 — Design Language v1.0 (Locked)*
