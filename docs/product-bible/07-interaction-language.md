# Document 07 — Interaction Language

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  
**Authority:** Constitutional Interaction Language (principles) for the Engineering Operating System (EOS)  
**Immutability:** Future Product Bible documents may extend Interaction Language but must never contradict it. Conflict → stop and ask. Do not silently reconcile.  
**Depends on:** `00-vision.md`, `01-identity.md` (process), `02-identity-specification.md` (Approved / Locked), `03-discovery.md` (Approved / Locked — Immutable), `04-creative-direction.md` (Approved / Locked — Immutable), `05-design-language.md` (Approved / Locked — Immutable), `06-motion-language.md` (Approved / Locked — Immutable)  
**Answers:** How EOS behaves when someone uses it (principles only)  
**Does not answer:** Who I am; What exists; Why EOS exists; How EOS looks; How EOS moves; How it is implemented

---

## 0. Purpose and constitutional rules

### 0.1 Purpose

Interaction Language defines how the Engineering Operating System behaves when someone uses it.

It organizes interaction principles already established in Vision, Identity, Creative Direction, Design Language, and Motion Language.

It does not invent philosophy. It does not invent evidence. It does not invent visual or motion grammar.

### 0.2 Conflict rule

If any instruction conflicts with Vision, Identity, Discovery, Creative Direction, Design Language, or Motion Language, stop immediately and ask. Do not silently reconcile.

### 0.3 Provenance rule

Every interaction principle must be traceable to a prior constitutional document. If unsupported, mark **Deferred**.

### 0.4 Separation rule

If a topic belongs to Design Language, Motion Language, Information Architecture (page trees / structures), README System, Companion Experience structure, or Implementation, defer it.

This document must not define buttons, components, layouts, navigation trees, page structures, animation timings, colors, typography, spacing, tokens, code, or frameworks.

---

## 1. Interaction principles

**Source:** Identity §28; Identity §15; Vision North Star; Creative Direction.

Feel (Identity §28): premium engineering tool — predictable, confident, clear, responsive, intentional, curious, progressive understanding, mature, precise, calm exploration; visitor in control; never entertainment/manipulation.

Final (Identity §28): never think about the interface; focus on engineering.

Good frontend (Identity §15): complex systems feel simple — predictable behavior, responsive interactions, clear feedback, accessibility, performance, consistency; users focus on tasks.

Refuse impressive UX that sacrifices clarity (Identity §15).

Every interaction, transition, illustration, visualization, and line of copy must reinforce the perception of thoughtful engineering (Vision §1).

Every interaction must have a clear, defensible reason (Vision North Star).

Time as design material (Identity §26; Creative Direction): every interaction teaches, clarifies, reinforces, builds confidence, or inspires exploration — or is simplified/removed.

Before reading (Identity §1.8 / Creative Direction): Every interaction feels purposeful.

Hard ban: interactions that reduce clarity (Identity §24.2).

Soft preference: avoid playful micro-interactions unless strongly justified (Identity §24.3). Motion Language refuses playful feel (Identity §27; Motion Language).

---

## 2. Navigation philosophy

**Source:** Identity §28; Identity §24.3; Vision Companion / entrance.

Navigation (Identity §28): Hybrid — narrative for stories; structural for systems; spatial for architecture; contextual for depth; always know where/why/next/return.

Anti-patterns (Identity §28): hidden nav; forced scrolling.

Soft preference: avoid experimental navigation unless strongly justified (Identity §24.3).

Richer interaction belongs in the Companion destination (Vision §3; Creative Direction §7). README / entrance: curiosity without recreating companion (Identity §25.5).

Navigation trees, route maps, and page structures: **Deferred** (IA / Companion / README System).

---

## 3. Progressive disclosure philosophy

**Source:** Identity §28; Identity §15; Design Language / Motion Language boundaries.

Freedom (Identity §28): Progressive disclosure with optional depth —

- L1 identity / what / why  
- L2 projects / systems / architecture / research  
- L3 decisions / infra / AI pipelines / code / writing  

Never force or overwhelm; reward curiosity (Identity §28).

Complex UX (Identity §15): reveal only what’s needed; smaller interactions; progressive disclosure of advanced functionality.

Progressive unfold (Identity §26; Design Language): information-rich, highly structured, intentionally spacious; progressive unfold.

Concrete disclosure controls, UI for L1–L3, and page wiring: **Deferred**.

---

## 4. Exploration philosophy

**Source:** Identity §28; Creative Direction.

Curiosity engine (Identity §28): reward exploration via deeper insight — not Easter eggs/gamification; 5 minutes understand engineer; 30 minutes understand how engineer thinks.

Calm exploration (Identity §28 Feel).

Visitor in control (Identity §28 Feel).

First vs return (Identity §28): first — guidance, pacing, progressive intro; return — more depth, faster nav, persistent progress where appropriate.

Persistent progress mechanisms: **Deferred**.

---

## 5. Information reveal philosophy

**Source:** Identity §28; Identity §15; Motion Language §5 (reveal as motion behavior).

Complex systems (Identity §28): progressive reveal; expand / inspect / trace / compare / dependencies / relationships / decisions; build mental models; every interaction answers a question.

Reveal only what’s needed (Identity §15).

Preferred motion behavior includes reveal (Vision §7; Motion Language).

Reduced motion: motion never sole channel (Identity §27; Motion Language).

Expand/inspect/trace UI patterns and implementations: **Deferred**.

---

## 6. User control

**Source:** Identity §28.

Visitor in control (Identity §28 Feel).

Never entertainment/manipulation (Identity §28 Feel).

Never force or overwhelm (Identity §28).

Anti-patterns: surprise interactions; artificial friction; forced scrolling (Identity §28).

---

## 7. Predictability

**Source:** Identity §28; Identity §15.

Feel includes: predictable (Identity §28).

Feedback: predictable (Identity §28).

Predictable behavior; predictable state (Identity §15).

Motion: explain, not decorate — state changes, attention, spatial relationships, predictable interactions (Identity §15).

Refuse: hidden state changes; guesswork interfaces (Identity §15).

Anti-patterns: surprise interactions; invisible affordances (Identity §28).

---

## 8. Discoverability refusals

**Source:** Identity §28 anti-patterns.

Anti-patterns: hidden nav; invisible affordances; hover-only info; nested discovery puzzles; overloaded gestures (Identity §28).

Positive discoverability doctrine beyond these refusals: **Deferred** (unsupported as a named doctrine in prior constitutions).

---

## 9. Interaction consistency

**Source:** Identity §15; Identity §28; Vision Principle 4.

Consistent patterns (Identity §15).

Feedback: consistent (Identity §28).

Vision Principle 4 — Consistency Creates Trust: Spacing, Typography, Motion, Color, Layout, Language must feel like they were created by one team with one vision (Vision).

Refuse: inconsistent patterns (Identity §15).

Micro-interactions: craftsmanship not personality; precision / feedback / state / continuity / quality (Identity §28).

---

## 10. Feedback philosophy

**Source:** Identity §28; Identity §15.

Feedback (Identity §28): immediate, subtle, consistent, predictable, professional; hover / focus / press / loading / completion / errors as specified; no celebrating ordinary interactions.

Clear feedback (Identity §15).

UI as conversation with the system (Identity §15).

Concrete feedback specs for each state: **Deferred**.

---

## 11. Error philosophy

**Source:** Identity §15; Identity §28.

Loading / success / empty / error / background states communicate clearly (Identity §15).

Feedback includes errors as specified (Identity §28).

Error copy, error UI components, recovery flows, and visual error styling: **Deferred** (Design Language / Implementation).

---

## 12. Loading philosophy

**Source:** Identity §15; Identity §28.

Loading / success / empty / error / background states communicate clearly (Identity §15).

Feedback includes loading as specified (Identity §28).

Anti-pattern: motion delaying interaction (Identity §24.4; Motion Language).

Loading indicators, skeletons, and timings: **Deferred**.

---

## 13. Empty-state philosophy

**Source:** Identity §15.

Loading / success / empty / error / background states communicate clearly (Identity §15).

Empty-state content and layouts: **Deferred**.

---

## 14. Search philosophy

**Source:** Identity §28.

Keyboard/power users (Identity §28): search-driven exploration where valuable; enhance without first-visit complexity.

Search UI, ranking, and implementation: **Deferred**.

---

## 15. Filtering philosophy

**Source:** Unsupported as a dedicated doctrine in prior constitutions.

Filtering interaction philosophy: **Deferred**.

---

## 16. Keyboard philosophy

**Source:** Identity §28; Vision §13; Motion Language Deferred handoff.

Keyboard/power users (Identity §28): full support; logical focus; meaningful shortcuts where appropriate; search-driven exploration where valuable; enhance without first-visit complexity.

Vision Accessibility: keyboard navigation (Vision §13).

Shortcut maps and focus implementation: **Deferred**.

---

## 17. Accessibility philosophy (interaction)

**Source:** Vision §13; Identity §15, §28, §34; Motion Language §19–§20.

Accessibility is part of quality — baseline, not optional (Vision §13).

Interaction-relevant Vision Accessibility support: keyboard navigation; reduced-motion mode; descriptive labels (Vision §13).

Sufficient contrast; semantic structure; responsive layouts (Vision §13) — visual / layout ownership: Design Language / IA / Implementation — **Deferred** here as non-interaction-behavior detail.

Accessibility and performance are not finishing touches (Identity §15).

Accessibility before aesthetics (Identity §34).

Decision framework requires: accessible? (Identity §28).

Reduced motion: motion never sole channel (Identity §27; Motion Language). Reduced motion must preserve orientation (Identity §27).

Descriptive labels, ARIA implementation, and a11y test suites: **Deferred**.

---

## 18. Responsiveness philosophy

**Source:** Identity §15, §28; Vision §12; Identity §26 desktop/mobile.

Feel includes: responsive (Identity §28).

Responsive interactions (Identity §15).

Protect responsiveness (Identity §15).

Performance is a feature; the experience must remain responsive on typical modern laptops and phones (Vision §12).

Same identity on mobile and desktop; desktop may denser exploration; mobile not a dumbed-down product (Identity §26; Design Language §24).

Responsive layout implementation and breakpoints: **Deferred** (Design Language / IA / Implementation).

---

## 19. Interaction density

**Source:** Identity §15; Identity §28.

Smaller interactions (Identity §15).

Reveal only what’s needed (Identity §15).

Never force or overwhelm (Identity §28).

Interaction density tokens / component packing: **Deferred**.

---

## 20. Interruption philosophy

**Source:** Unsupported as a dedicated doctrine in prior constitutions.

Related refusals: surprise interactions; artificial friction; motion delaying interaction (Identity §28; Identity §24.4).

Dedicated interruption philosophy: **Deferred**.

---

## 21. Confirmation philosophy

**Source:** Identity §28 anti-patterns (partial).

Anti-pattern: long confirmations (Identity §28).

Positive confirmation doctrine beyond this refusal: **Deferred**.

---

## 22. Undo philosophy

**Source:** Unsupported as a dedicated doctrine in prior constitutions.

Undo philosophy: **Deferred**.

---

## 23. Command philosophy

**Source:** Identity §28 (partial).

Meaningful shortcuts where appropriate; search-driven exploration where valuable (Identity §28).

Command palettes, command systems, and CLI-in-UI: **Deferred**.

---

## 24. State philosophy

**Source:** Identity §15; Identity §28.

Predictable state (Identity §15).

Loading / success / empty / error / background states communicate clearly (Identity §15).

Separate UI from business logic; separate UI/app state (Identity §15).

Micro-interactions include state (Identity §28).

Refuse: hidden state changes (Identity §15).

State machines, stores, and implementation: **Deferred**.

---

## 25. Desktop vs mobile interaction philosophy

**Source:** Identity §26; Design Language §24; Vision §12–§13.

Same identity; desktop may denser exploration; mobile not a dumbed-down product (Identity §26).

Experience must remain responsive on typical modern laptops and phones (Vision §12).

Responsive layouts (Vision §13) — layout mechanics Deferred.

Platform-specific gesture systems: **Deferred** (anti-pattern already: overloaded gestures — Identity §28).

---

## 26. Decision framework

**Source:** Identity §28; Vision §14; Creative Direction.

Identity §28 decision framework:

- improve understanding?  
- reduce friction?  
- communicate engineering quality?  
- preserve orientation?  
- respect time?  
- accessible?  
- complexity justified?  

Else redesign/remove.

Vision Decision Framework also applies (Vision §14) when uncertainty exists.

Respects attention (Identity §34; Creative Direction).

---

## 27. Anti-patterns (interaction)

**Source:** Identity §28; Identity §15; Identity §24.2–24.3; Motion Language (interaction-adjacent).

### 27.1 Identity §28

- hidden nav  
- surprise interactions  
- invisible affordances  
- overloaded gestures  
- nested discovery puzzles  
- forced scrolling  
- hover-only info  
- artificial friction  
- long confirmations  
- novelty over usability  

### 27.2 Identity §15

- hidden state changes  
- guesswork interfaces  
- impressive UX that sacrifices clarity  
- inconsistent patterns  

### 27.3 Soft preferences (avoid unless strongly justified)

- experimental navigation (Identity §24.3)  
- playful micro-interactions (Identity §24.3)  

### 27.4 Hard bans (interaction-relevant)

- interactions that reduce clarity (Identity §24.2)  

### 27.5 Motion-adjacent (do not re-allow)

- scroll hijacking; motion delaying interaction; attention-seeking hover (Identity §24.4; Motion Language)

---

## 28. Quality gates

**Source:** Vision §16; Identity §28 Final; Creative Direction.

Functional, Visual, Motion, Engineering, Performance, Accessibility, and Content quality — shortfall in one means incomplete (Vision §16).

Final (Identity §28): never think about the interface; focus on engineering.

North Star applies to every interaction (Vision §2).

---

## 29. Scope

This document owns interaction principles for:

- interaction feel and principles  
- navigation philosophy (not trees)  
- progressive disclosure philosophy  
- exploration / curiosity philosophy  
- information reveal philosophy  
- user control; predictability; discoverability refusals  
- interaction consistency; feedback; error; loading; empty-state philosophies  
- search philosophy (principle); keyboard philosophy  
- accessibility and responsiveness philosophies (interaction)  
- interaction density; confirmation refusal; state philosophy  
- desktop vs mobile interaction philosophy  
- decision framework; anti-patterns; quality gates  

---

## 30. Out of Scope

| Domain | Belongs to |
|--------|------------|
| Buttons, components, layouts | Design Language / Component specs / Implementation |
| Navigation trees, page structures | Information Architecture / Companion / README |
| Animation timings, motion choreography | Motion Language / Implementation |
| Colors, typography, spacing, tokens | Design Language / Assets |
| Code, React, Next.js, Framer Motion, CSS, frameworks | Implementation |
| Creative WHY expansion | Creative Direction (Locked) |
| Visual grammar expansion | Design Language (Locked) |
| Motion grammar expansion | Motion Language (Locked) |
| Evidence inventing | Discovery (Locked) |
| Personal identity claims | Identity (Locked) |

---

## 31. Dependencies

| Document | Relationship |
|----------|----------------|
| `00-vision.md` | North Star; Companion richer interaction; Performance; Accessibility; Decision Framework; Quality |
| `01-identity.md` | Process that produced Identity |
| `02-identity-specification.md` | Interaction taste §28; frontend §15; bans §24; desktop/mobile §26 |
| `03-discovery.md` | Must not invent missing products/demos as interaction proof |
| `04-creative-direction.md` | Purposeful interaction; respects attention; Companion destination |
| `05-design-language.md` | Density / progressive unfold; desktop-mobile identity; a11y visual implications |
| `06-motion-language.md` | Reveal as motion behavior; reduced motion; ML-09 handoff; anti-pattern adjacency |

---

## 32. Future Dependents

Interaction Language constrains, but does not replace:

- Information Architecture  
- README System  
- Companion Experience specification  
- Component specifications  
- Accessibility implementation detail  
- Performance standards  
- Assets  
- Implementation / Cursor constitution  

Those documents may extend these principles. They must never contradict them.

---

## 33. Deferred Register

| ID | Item | Status |
|----|------|--------|
| IL-01 | Navigation trees / route maps / page structures | Deferred — IA / Companion / README |
| IL-02 | L1–L3 disclosure controls and UI wiring | Deferred |
| IL-03 | Expand / inspect / trace / compare implementations | Deferred |
| IL-04 | Feedback specs per hover/focus/press/loading/completion/error | Deferred |
| IL-05 | Error copy, recovery flows, error components | Deferred |
| IL-06 | Loading indicators / skeletons / timings | Deferred |
| IL-07 | Empty-state content and layouts | Deferred |
| IL-08 | Search UI / ranking / implementation | Deferred |
| IL-09 | Filtering philosophy and UI | Deferred — unsupported doctrine |
| IL-10 | Shortcut maps / focus implementation | Deferred |
| IL-11 | ARIA / descriptive labels implementation | Deferred |
| IL-12 | Responsive breakpoints / layout mechanics | Deferred |
| IL-13 | Persistent progress for return visitors | Deferred |
| IL-14 | Interruption philosophy | Deferred — unsupported doctrine |
| IL-15 | Confirmation doctrine beyond “long confirmations” refusal | Deferred |
| IL-16 | Undo philosophy | Deferred — unsupported doctrine |
| IL-17 | Command palette / command system | Deferred |
| IL-18 | State machine / store implementation | Deferred |
| IL-19 | Platform gesture systems | Deferred |
| IL-20 | Buttons / component interaction recipes | Deferred — out of scope |

---

## 34. Approval Gate

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  

Interaction Language is complete. Future Product Bible documents may extend this document but must never contradict it. If any future instruction conflicts with Interaction Language, stop immediately and ask for clarification. Do not silently reconcile conflicts.

Stop. Do not begin Information Architecture, UI exploration, component design, or implementation until instructed.

---

*End of Document 07 — Interaction Language v1.0 (Locked)*
