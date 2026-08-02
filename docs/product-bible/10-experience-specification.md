# Document 10 — Experience Specification

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  
**Authority:** Constitutional Experience Specification for the Engineering Operating System (EOS)  
**Depends on:** `00-vision.md`, `01-identity.md` (process), `02-identity-specification.md` (Approved / Locked), `03-discovery.md` (Approved / Locked — Immutable), `04-creative-direction.md` (Approved / Locked — Immutable), `05-design-language.md` (Approved / Locked — Immutable), `06-motion-language.md` (Approved / Locked — Immutable), `07-interaction-language.md` (Approved / Locked — Immutable), `08-information-architecture.md` (Approved / Locked — Immutable), `09-content-architecture.md` (Approved / Locked — Immutable)  
**Answers:** WHAT the visitor experiences; IN WHAT ORDER experiences unfold; WHAT emotional transitions occur; HOW attention shifts; WHAT atmosphere exists; WHERE silence, motion, and stillness belong; WHERE architecture becomes visible; HOW projects become experiences; HOW GitHub transitions into Companion; WHAT should be remembered after leaving  
**Does not answer:** Components; Layouts; Typography; Colors; Spacing; Animation timings; Interaction mechanics; Frontend; React; Three.js; Implementation; Discovery evidence invention

---

## 0. Purpose and constitutional rules

### 0.1 Purpose

This document defines the complete EOS experience: emotional, narrative, experiential, and atmospheric.

It is **not** a UI specification.  
It is **not** implementation.  
It is **not** component design.

It is the owner’s experience vision for how someone enters, explores, and leaves EOS.

### 0.2 Owner decisions

Owner decisions in this document are constitutional for experience intent.

This document **may** describe intended experience even when Discovery records Companion as Missing as a shipped product. It must **not** invent Discovery evidence, metrics, stacks, or artifacts as existing.

### 0.3 Conflict rule

If any instruction conflicts with Vision, Identity, Discovery, Creative Direction, Design Language, Motion Language, Interaction Language, Information Architecture, or Content Architecture, stop immediately and ask. Do not silently reconcile.

### 0.4 Separation rule

This document must not define components, layouts, typography, colors, spacing, animation timings, interaction mechanics, frontend, React, Three.js, or implementation.

Concrete page trees, route maps, README section order, and Companion composition remain Deferred (IA / CA).

---

## 1. Overall experience philosophy

**Source:** Vision §0–§1, §4–§5; Identity §1.7, §6, §25–§28, §31–§35; Creative Direction §1–§6, §9.

EOS is a **personal engineering product**, not a portfolio and not a résumé (Vision; Creative Direction).

Canonical obligation (Identity §1.7):

> Every artifact in the Engineering Operating System exists to demonstrate deliberate engineering—where systems thinking, technical depth, craftsmanship, clarity, and long-term quality consistently take precedence over trends, spectacle, or self-promotion.

Default atmosphere (Identity §31; Creative Direction):

> Quiet confidence expressed through timeless engineering craftsmanship.

Senior phrase (Identity §26):

> Engineering precision expressed through timeless product craftsmanship.

Experience philosophy in one line (**Owner decision**, aligned to locked constitutions):

The visitor should feel they have entered a refined engineering workspace that reveals how an engineer thinks — never a showcase that asks to be impressed.

Core experiential laws:

1. **Engineering first** — visual experience supports engineering; engineering never supports decoration (Vision).  
2. **Understanding before entertainment** — motion communicates; emotion is not manufactured by effects (Vision; Identity; Creative Direction).  
3. **Evidence before persuasion** — ~80% demonstrated through artifacts, ~20% explained through writing (Identity; Creative Direction).  
4. **Same message; different depth** — GitHub entrance / Companion destination (Identity §25.5).  
5. **Luxury through restraint** — only what deserves to remain; whitespace, silence, and pacing are valuable (Vision Principle 3).  
6. **Systems before screens** (Identity §34; Creative Direction).  
7. **Respects attention** (Identity §34).  
8. **Truth builds credibility** — never exaggerate; never invent experience (Vision Principle 5).

---

## 2. Experience goals

**Source:** Vision §4, §11; Identity §1.8, §25.2–§25.3; Creative Direction §1, §8.

### 2.1 Success conclusions (Vision)

Visitors should conclude:

- This engineer cares deeply about quality.  
- This engineer understands systems.  
- This engineer builds thoughtfully.  
- This engineer finishes work to a high standard.  
- This engineer communicates clearly.

Not successful merely because of many animations or visual effects (Vision §4).

### 2.2 Companion leave-understanding (Vision §11)

Visitors should leave understanding:

- how problems are approached  
- how systems are designed  
- why architectural decisions were made  
- what has been built  
- what is being built next  

### 2.3 Top five signals (Identity §25.3)

1. Systems thinking  
2. Deliberate engineering  
3. Craftsmanship  
4. Technical depth  
5. Trust  

### 2.4 Curiosity engine targets (Identity §28; Interaction Language)

- In about **5 minutes**: understand the engineer.  
- In about **30 minutes**: understand how the engineer thinks.  

Reward exploration via deeper insight — not Easter eggs or gamification (Identity §28).

### 2.5 Highest compliments (Identity)

- “Everything feels exactly as it should.” (§26)  
- Trusted engineering because every interaction felt intentional; motion disappears into understanding (§27).  
- Forgot reading a website; felt like reading clear thinking (§29).  
- “Everything here feels considered.” (§34)

---

## 3. First impression

**Source:** Identity §1.8, §25.1; Vision §0; Creative Direction §8.

Before reading a single paragraph, the visitor should immediately feel:

- This experience has been intentionally engineered.  
- Every interaction feels purposeful.  
- Quality has clearly been prioritized.  
- The interface feels calm, refined, and trustworthy.  
- Someone obsessed with details built this.

First impression must communicate engineering quality **before** technical reading (Vision; Creative Direction §8).

First impression must **not** communicate: chaos, excess, trend chasing, gimmicks, portfolio theater, AI hype, or entertainment (Vision §6; Identity §24).

---

## 4. Entrance sequence

**Source:** Vision §3, §10; Identity §25.5; Creative Direction §7; IA §4.2; CA §2.

### 4.1 Surface order (constitutional)

1. **Entrance — GitHub Profile / README**  
2. **Invitation toward Companion**  
3. **Destination — Companion Experience**  

GitHub is the entrance. It is not the destination (Vision).

### 4.2 Entrance experience (README)

The visitor experiences, in experiential order (**Owner decision** for sequence emphasis; content ownership per CA §2):

1. **Identity recognition** — name, default title, canonical sentence presence.  
2. **Credibility and craftsmanship** — entrance professionalism, clarity, direction (Identity §25.5; Vision §10).  
3. **Light context** — geography and education once, lightly; opportunity mid-weight, not hero (Identity §1.2, §2.2, §2.4).  
4. **Work evidence** — confirmed public repositories as proof channels (CA §2; Discovery).  
5. **Invitation** — natural guidance into Companion without recreating the entire companion (Vision §10).

Entrance emotional beat: **Arrival → Curiosity** (Identity §31 atmospheric journey start).

Entrance must leave curiosity without satisfying full proof (Identity §25.5).

### 4.3 Exact README block order

**Deferred** (IA-02; CA-02; README System).

---

## 5. Loading philosophy

**Source:** Identity §15, §28; Interaction Language §12; Motion Language (motion must not delay interaction); Vision §12 Performance.

Loading is a state of honest waiting, not a performance.

Experience rules:

- Loading / success / empty / error / background states must communicate clearly (Identity §15).  
- Feedback includes loading (Identity §28) — immediate, subtle, consistent, predictable, professional.  
- No celebrating ordinary loading (Identity §28).  
- Motion must not delay interaction (Identity §24.4; Motion Language).  
- Performance remains a feature; every effect must justify performance cost (Vision §12).  
- Atmosphere never wins over performance, accessibility, battery, or responsiveness (Identity §31).

Loading indicators, skeletons, and timings: **Deferred** (IL-06).

**Owner decision:** Loading should feel like a precise system preparing — never like a trailer, brand splash, or entertainment interlude.

---

## 6. Silence philosophy

**Source:** Vision Principle 3; Identity §27, §31; Motion Language §14; Creative Direction §5.

Silence is valuable (Vision).

Silence in EOS means:

- absence of unnecessary motion  
- absence of unnecessary sound  
- absence of visual noise  
- room for comprehension  

Atmosphere includes silence as a primary quality of a private refined engineering workspace (Identity §31).

Sound is muted by default; complete experience without sound (Vision §9; Identity §31).

If atmosphere depends on sound, visual/spatial experience has failed (Identity §31).

**Owner decision:** Silence is not emptiness — it is confidence that the system does not need to fill every moment.

---

## 7. Audio philosophy (high level only)

**Source:** Vision §9; Identity §27, §31; Motion Language environmental/audio boundary.

- Audio is optional (Vision).  
- Muted by default; visitor must choose to enable (Vision; Identity §31).  
- Explicit opt-in; visible mute (Identity §31).  
- Independent of navigation and understanding (Identity §31).  
- Complete without sound (Identity §31).  
- If enabled: deepen atmosphere only — never inform, impress, or entertain (Identity §31).  
- Character if enabled: environmental ambience / textures / soft spatial resonance / room tone — closer to quiet premium studio/lab anticipation than music; never consciously “the soundtrack” (Identity §31).  

**Audio bans (Identity §31):** UI clicks, keyboard, notifications, achievements, game SFX, assistant voices, narration, TTS, jingles, EDM/dubstep/trap/synthwave clichés, trailer/epic scores, attention-looping music.

Motion and sound composed together but independent; not choreographed sync of every interaction (Identity §31).

Music taste is never a personal brand signal (Identity §31).

Audio implementation: **Deferred**.

---

## 8. Camera philosophy (high level only)

**Source:** Vision §8; Identity §27; Motion Language §10–§12; Design Language depth.

Camera exists only as a communication tool for spatial / architectural / system / environmental understanding.

Appropriate when justified (Vision §8):

- camera depth  
- architecture visualization  
- environmental storytelling  
- spatial navigation  

Inappropriate (Vision §8):

- random floating objects  
- decorative planets  
- unrelated geometry  
- effects that reduce performance without improving understanding  

3D is optional; must justify existence; remove if clarity, accessibility, or performance is better without (Identity §27).

Refuse cinematic-for-itself (Identity §27; Motion Language §12).

Camera paths, shot lists, and cinematic choreography: **Deferred** (ML-08).

**Owner decision:** The camera should feel like inspection of a system — never like a product trailer.

---

## 9. Atmosphere

**Source:** Identity §26, §31; Creative Direction §5; Design Language §15, §22.

### 9.1 Default sentence

> Quiet confidence expressed through timeless engineering craftsmanship.

### 9.2 Atmospheric qualities

Private refined engineering workspace (Identity §31):

- silence  
- space  
- presence  
- focus  
- confidence  
- depth  
- precision  
- maturity  

Emotional qualities (Identity §26): calm confidence; precision; engineering discipline; intelligence; craftsmanship → premium perception; technical maturity; trustworthiness; curiosity; depth without unnecessary complexity; clarity without oversimplification; timelessness; purposefulness; quiet ambition; systems thinking.

### 9.3 Environmental feel (qualities, not costume)

Inspired by (Identity §31): premium engineering studio; quiet architecture workspace; research lab after midnight; industrial design workshop; mission planning room; technical library; systems control environment.

### 9.4 Atmospheric journey

Arrival → Curiosity → Calm → Immersion → Understanding → Respect → Inspiration (Identity §31).

Atmosphere is primarily visual/spatial (Identity §31).

---

## 10. Lighting philosophy

**Source:** Identity §26, §30; Design Language §12.

- Both light and dark themes; **one identity** (Identity §26).  
- Light = clarity / docs / analysis (Identity §26).  
- Dark = immersion / focus / depth (Identity §26).  
- **Only environmental lighting changes** between themes (Identity §26).  
- Believable materials; light-influenced; shadows/translucency for spatial understanding when earned (Identity §30).  
- Avoid gaming lighting and glass glow as identity (Identity §30).  

Lighting implementation and 3D lighting setups: **Deferred**.

**Owner decision:** Light should clarify structure and attention — never decorate mood for its own sake.

---

## 11. Spatial feeling

**Source:** Identity §26–§28, §31; Vision §8; Motion Language §4; Design Language §13; Interaction Language hybrid spatial mode.

Spatial feeling of EOS:

- information-rich, highly structured, intentionally spacious (Identity §26)  
- progressive unfold; breathe without emptiness (Identity §26)  
- depth earned for understanding — not spectacle (Identity §27)  
- hybrid navigation may use **spatial** mode for architecture (Identity §28)  
- orientation: always know where / why / next / return (Identity §28)  

Physical metaphors for organization, not costume (Identity §26): precision instruments, aerospace control, blueprints, industrial manuals, scientific publications, engineering notebooks, technical reference books.

Desktop may allow denser exploration; mobile is the same identity, not a dumbed-down product (Identity §26).

Exact spatial layouts: **Deferred**.

---

## 12. Focus transitions

**Source:** Identity §27 Behavior priority; Motion Language §5–§7; Vision §7.

Motion behavior priority (Identity §27):

**Reveal → Focus → Connect → Transition → Emphasize → Breathe (supportive only)**

Focus transitions in experience:

- attention moves to what must be understood next  
- connections between system parts become perceptible  
- after large transitions: stillness (Identity §27)  
- before new complexity: pause (Identity §27)  
- environmental motion never competes with interaction focus (Identity §27)  

Preferred Vision behaviors: reveal, focus, connect, breathe, transition, emphasize (Vision §7).

Focus must never be manufactured by distraction, forced scrolling, or novelty (Identity §28 anti-patterns).

### 12.1 Reduced-motion experience obligation

**Source:** Vision §13; Identity §27; Motion Language reduced-motion philosophy.

Under reduced motion, the experience must preserve:

- clarity  
- hierarchy  
- continuity  
- relationships  
- orientation  
- accessibility  
- understanding  

Motion must never be the sole channel of meaning (Identity §27).

Concrete reduced-motion recipes and timings: **Deferred** (Motion Language / Accessibility implementation — ML-07).

Concrete focus choreography: **Deferred**.

---

## 13. Reading rhythm

**Source:** Identity §21, §26, §29; Design Language typography/rhythm; Creative Direction.

Reading rhythm:

- measured paragraphs between concise and dense (Identity §21)  
- system first; depth optional (Identity §21)  
- scan + deep read without typographic fatigue (Identity §29)  
- cadence: scan → understand → reflect → explore (Identity §29)  
- headings anticipate; body sustains; captions context; code integrated (Identity §29)  
- denser only when content is more technical; dense docs OK, dense presentation not (Identity §29)  

Philosophy presentation ratio: work proves; writing connects dots (Identity; Creative Direction).

Exact About/Writing prose: **Deferred** (CA-01).

**Owner decision:** Reading should feel like clear engineering thought — never like a pitch deck or personal brand essay.

---

## 14. Exploration rhythm

**Source:** Identity §28; Interaction Language §3–§4; IA L1–L3; Creative Direction journey.

### 14.1 Progressive depth

Optional depth (Identity §28):

| Level | Experience |
|-------|------------|
| **L1** | Identity / what / why |
| **L2** | Projects / systems / architecture / research |
| **L3** | Decisions / infra / AI pipelines / code / writing |

Never force or overwhelm; reward curiosity (Identity §28).

### 14.2 Primary psychological journey

Curiosity → Confidence → Understanding → Trust → Respect → Inspiration (Identity §26).

### 14.3 First vs return

- **First visit:** guidance, pacing, progressive intro (Identity §28).  
- **Return visit:** more depth, faster nav, persistent progress where appropriate (Identity §28).  

Persistent progress mechanisms: **Deferred** (IL-13).

### 14.4 Hybrid exploration modes

Narrative (stories) · Structural (systems) · Spatial (architecture) · Contextual (depth) (Identity §28).

Visitor remains in control; calm exploration; never entertainment or manipulation (Identity §28).

L1–L3 page wiring: **Deferred** (IA-09; CA-08; IL-02).

---

## 15. Curiosity loop

**Source:** Identity §28; Interaction Language §4; Creative Direction.

The curiosity loop (**Owner decision** naming; content from Identity):

1. **Encounter** a clear engineering claim or system surface.  
2. **Sense** that more depth exists without being forced into it.  
3. **Choose** to go deeper (L2 / L3).  
4. **Receive** insight that improves understanding of how the engineer thinks.  
5. **Trust** increases; desire to explore adjacent systems grows.  
6. Loop continues until Inspiration (journey end-state), without gamification.

Reward: deeper insight — not Easter eggs, badges, or novelty (Identity §28).

5-minute / 30-minute understanding targets apply (Identity §28).

---

## 16. Narrative progression

**Source:** Vision Product B / §11; Identity §18.1, §25.5, §28; Creative Direction §4; IA §6–§7; CA relationships.

Narrative progression is engineering storytelling without entertainment (Creative Direction §4).

### 16.1 Macro narrative (two surfaces)

1. Entrance shows software and identity with restraint.  
2. Destination shows the engineer through architecture, decisions, trade-offs, philosophy, systems/product thinking, evolution, research, leadership, technical communication (Identity §25.5).  
3. Visitor leaves with Vision §11 understandings.

### 16.2 Micro narrative (within a project experience)

problem → overview → architecture → decisions → trade-offs → lessons (Identity §18.1; CA §6.1).

Diagrams / walkthroughs / decision logs primary; repos and demos as evidence (Identity §18.1).

### 16.3 Narrative modes

Hybrid: narrative for stories; structural for systems; spatial for architecture; contextual for depth (Identity §28).

Truth constraint: never exaggerate achievements; never invent experience; missing information asks / Defers (Vision Principle 5; Discovery Locked).

---

## 17. Project chapters

**Source:** Identity §18; IA §5.3; CA §6; Discovery §5.

Each load-bearing project is experienced as a **chapter** in the Product Archive — not a card gallery of tech logos (Identity §18.7, §24).

### 17.1 Chapter experience order (constitutional structure)

1. Problem  
2. Overview  
3. Architecture becomes visible  
4. Decisions  
5. Trade-offs  
6. Lessons  

### 17.2 Chapter cast (content ownership; not invented evidence)

| Chapter | Role in experience |
|---------|--------------------|
| DeepMed | Flagship; AI essential; credit line exact; no teammate names |
| RouteWise ELD | Enterprise SaaS depth; conventional by design; no assessment/Spotter framing |
| Underwater Image Enhancement | Research→product engineering chapter |
| Stellar / PMS | Full-stack + AI assistant in workflows |
| Codebase RAG | Retrieval-first AI developer tool |

Supporting / archive / future chapters: lower identity weight; archive not identity-defining; future placeholder only (IA / CA).

### 17.3 Experiential obligation of every chapter

Communicate complete production-oriented systems, decisions, product thinking, trade-offs — toolkit secondary (Identity §18.7).

Live demos DeepMed / RouteWise: **Deferred** (D-04) — experience must not pretend they exist.

Stacks D-11 / D-12: **Deferred** — experience must not invent identity-grade stacks.

---

## 18. Architecture reveal strategy

**Source:** Identity §13, §15, §18.1, §25.2, §28; Motion Language §4–§5, §17; Creative Direction systems before screens; Vision Companion.

Architecture becomes visible when it improves understanding — not as decorative blueprint theater.

Reveal strategy (**Owner decision** sequencing; principles locked):

1. **Orient** — what system exists and why (L1/L2).  
2. **Structure** — major responsibilities and boundaries (Identity architecture philosophy).  
3. **Relate** — connections, dependencies, data/control flow (Motion: connect; Interaction: trace/compare).  
4. **Decide** — why this shape; rejected approaches; trade-offs (case-study order).  
5. **Inspect** — optional L3: infra, pipelines, code depth.  

Progressive reveal of complex systems: expand / inspect / trace / compare / dependencies / relationships / decisions; build mental models; every interaction answers a question (Identity §28).

EOS architecture UX aspiration (Identity §13): progressive exploration — product overview → layered diagrams → interactions → decisions → code depth.

Concrete diagram asset packs: Discovery Disc-02 Deferred — experience may intend architecture reveal; must not invent missing curated assets as existing.

Expand/inspect/trace UI: **Deferred** (IL-03).

---

## 19. AI visualization philosophy

**Source:** Identity §12, §18.6, §24, §26 imagery; Creative Direction failed-EOS (AI as decoration); Design Language imagery; Motion/Vision 3D constraints.

AI visualization exists to explain workflows, agents, retrieval, evaluation, and system boundaries — never to costume the brand as “AI.”

Rules:

- Thoughtful AI; AI capability must be proven through products (Identity §25.2–§25.4).  
- Preserve AI essential vs conventional-by-design classes (Identity §18.6; CA §9).  
- Refuse AI as decoration; AI hype without engineering substance; generic AI clichés as identity (Identity §24; Creative Direction).  
- Imagery priority includes AI workflows and data-flow as engineering communication (Identity §26).  
- Abstract only for systems / relationships / scale — not atmosphere for itself (Identity §26).  

**Owner decision:** AI should appear as structured process and responsibility boundaries — never as glowing brains, particles, or purple mystique.

Visualization implementation: **Deferred**.

---

## 20. Timeline experience

**Source:** Identity §25.2 (evolution), §40.3 growth; Vision §11 “what is being built next”; IA Future projects; Creative Direction journey.

There is no constitutional dedicated Timeline page in IA/CA.

**Owner decision — experiential timeline:**

Timeline is felt as **evolution**, not a résumé chronology:

- project chapters show decisions and “do differently” as temporal learning  
- Companion may convey evolution of thinking and systems (Identity §25.5)  
- “what is being built next” appears as Future placeholder + truthful next-work only when available (Vision §11; CA §10; D-05 Deferred)  
- years of experience are not emphasized (Identity §2.3)  
- company/client names do not appear (Identity §2.4)  

Dedicated timeline page / chronology UI: **Deferred** (unsupported as IA node).

---

## 21. Skills experience

**Source:** Identity §17.9, §25.4; Discovery §7 (Demonstrated only); IA/CA (no dedicated Skills hub).

There is no constitutional Skills gallery page in IA/CA.

**Owner decision — experiential skills:**

Skills are experienced **through demonstrated work**, not as logo walls or skill bars:

- visitor encounters capabilities inside project chapters and architecture reveals  
- Discovery Demonstrated skills remain evidence-graded and project-tied  
- Practiced / Learning / Interested grades are out of Discovery scope (Disc-07) — not a public skills costume  
- refuse framework-collector identity (Identity §1.6, §24)  

Dedicated skills page: **Deferred** (unsupported as IA node; would conflict with prove-via-work if implemented as logo theater).

---

## 22. Research experience

**Source:** Identity §19; IA §5.4; CA §7.

Research experience is folded into project case studies until substantial public research earns a dedicated section (Identity §19).

When present inside chapters, public research experience includes: architecture informed by research; high-level evaluation methodology; trade-offs; design decisions; approach comparisons; lessons; public benchmarks where appropriate (Identity §19).

Must not surface private research until appropriate (Identity §19).

Must not claim AI researcher / ML scientist / academic researcher identity (Identity §19).

Dedicated Research section experience: **Deferred** until earned (IA-05; CA-04).

---

## 23. Lab experience

**Source:** Identity §40.1; IA §5.6; CA §9.

Lab experience = public experimentation as curiosity, not marketing (Identity §40.1).

Content classes when Lab exists: AI, distributed prototypes, architecture, infra, rendering, tooling, interaction research, visualizations (Identity §40.1).

Exact Companion Lab section: **Deferred** (IA-07; CA-06).

**Owner decision:** Lab should feel like an open bench adjacent to the archive — never a gimmick playground or trend demo reel.

---

## 24. GitHub → Companion transition

**Source:** Vision §3, §10–§11; Identity §25.5; Creative Direction §7; IA §6; CA §12.

### 24.1 Experiential meaning of the transition

| From (Entrance) | To (Destination) |
|-----------------|------------------|
| Memorable first impression | Complete engineering story |
| Identity quickly | Architecture, decisions, trade-offs |
| Craftsmanship within GitHub constraints | Richer motion and interaction (Vision) |
| Curiosity | Proof |
| Shows software | Shows the engineer |
| Same message | Different depth |

### 24.2 Transition feeling (**Owner decision**)

The transition should feel like crossing from a precise doorway into the working system — continuous identity, increased depth, no portfolio “enter site” carnival.

### 24.3 Transition constraints

- README must not recreate the entire Companion (Vision §10).  
- Companion must not be a résumé (Vision §11).  
- Invitation is natural guidance (Vision §10).  
- No third public product surface (Identity §0.5).  

Exact invitation placement / wording beyond locked identity lines: **Deferred** (README System / Companion Experience).

Discovery: Companion Missing as shipped product — transition is intended experience; product not yet existent.

---

## 25. Ending experience

**Source:** Vision §11; Identity §25.2; Creative Direction; IA §7.

Ending is not a credits sequence or CTA storm.

Ending experience goals:

- Vision leave-understanding list satisfied  
- After-exploring impressions formed (Identity §25.2): systems thinking; decisions have reasons; architecture drives implementation; quality over trends; thoughtful AI; design improves understanding; performance/a11y/maintainability as core; ownership concept→deployment; docs/communication match implementation care; builds products not just applications; understand how thinking works  
- Atmospheric journey reaches Respect → Inspiration (Identity §31)  
- Psychological journey reaches Trust → Respect → Inspiration (Identity §26)  

**Owner decision:** The ending should feel like completed understanding with optional further depth — never like a hard stop that demands applause.

Exact exit composition: **Deferred**.

---

## 26. Last impression

**Source:** Identity §26 Final; §25.2–§25.3; Vision §4; Creative Direction §5.

Last impression must be:

- intentional detail  
- engineering discipline  
- quiet confidence  
- trust  

Last impression must **not** be:

- colors / effects / trends (Identity §26)  
- animations remembered over architecture (Identity failed EOS)  
- slogans over decisions  
- attention over trust  

---

## 27. Emotional memory

**Source:** Identity §25.2–§25.3, §26–§28, §31; Vision §4; Creative Direction.

What should remain after leaving:

| Memory | Source |
|--------|--------|
| This engineer understands systems | Vision success; Identity signals |
| Decisions had reasons | Identity §25.2 |
| Craftsmanship without spectacle | Identity §26; Creative Direction |
| Calm, precise exploration | Identity §27–§28 |
| How the engineer thinks | Identity §28 curiosity engine |
| Quiet confidence through timeless craftsmanship | Identity §31 |
| Desire to look closer at the work (repos/case studies) | Identity prove vs state |

Emotional memory is earned by understanding — not by effects (Identity §26).

---

## 28. Anti-patterns

**Source:** Vision Forbidden List; Identity §24, §27, §28, §31; Creative Direction §3, §10; Motion / Interaction / Design Languages.

Experience must refuse:

### 28.1 Product-type anti-patterns

- portfolio-first / template portfolio  
- résumé website  
- frontend animation showcase  
- AI influencer / content-creator engineer theater  
- startup marketing page / pitch energy  
- social media personal brand hub  
- attention over engineering  

### 28.2 Motion / atmosphere anti-patterns

- decorative animations; motion for its own sake  
- endless loops; unnecessary spinning; distracting motion  
- cinematic-for-itself; trailer/epic audio  
- emotionally manipulative effects  
- atmosphere that depends on sound  
- gaming lighting / neon cyberpunk / RGB identity  
- scroll hijacking  
- motion delaying interaction  
- parallax without information  
- physics for entertainment  
- bouncing / elastic excess  
- vanity metrics without context  
- fake terminals / code-rain / decorative browser chrome  

### 28.3 Interaction anti-patterns

- hidden navigation; surprise interactions; invisible affordances  
- overloaded gestures; nested discovery puzzles  
- forced scrolling; hover-only information  
- artificial friction; long confirmations; novelty over usability  
- Easter eggs / gamification as curiosity engine  
- entertainment or manipulation  

### 28.4 Narrative / content anti-patterns

- marketing replacing substance  
- exaggerated claims; invented experience  
- demos over case studies; slogans over decisions  
- AI as decoration  
- tech logo walls as identity  
- recreating Companion inside README  

---

## 29. Decision framework

**Source:** Vision §14; Identity §28; Creative Direction §6, §9; Motion / Interaction frameworks.

When an experience choice is uncertain, apply in order:

### 29.1 Vision decision framework

1. Does this improve clarity?  
2. Does this strengthen storytelling?  
3. Does this reinforce engineering quality?  
4. Does this improve the user's understanding?  
5. Does it remain performant?  
6. Does it remain accessible?  
7. Does it fit the design language?  
8. Can it be maintained?  
9. Would we still choose this decision in five years?  

If any answer is no, reconsider before proceeding (Vision).

### 29.2 Interaction decision framework (Identity §28)

- improve understanding?  
- reduce friction?  
- communicate engineering quality?  
- preserve orientation?  
- respect time?  
- accessible?  
- complexity justified?  

Else redesign/remove.

### 29.3 Experience-specific gate (**Owner decision**, derived)

- Does this belong at Entrance or Destination depth?  
- Does this prove via work rather than persuade via spectacle?  
- Does silence/stillness deserve to remain instead?  
- Would a senior engineer defend this as communication, not decoration?  

---

## 30. Quality gates

**Source:** Vision §16; Identity §25, §34–§35; Creative Direction; Motion / Interaction quality gates.

Experience is incomplete if any Vision quality dimension falls short:

**Functional · Visual · Motion · Engineering · Performance · Accessibility · Content**

Experience quality gates:

| Gate | Pass condition |
|------|----------------|
| First impression | Identity §1.8 feelings present before reading |
| Entrance | Vision §10 jobs met; Companion not recreated |
| Destination | Vision §11 leave-understandings achievable |
| Journey | Curiosity→…→Inspiration without manufactured emotion |
| Proof | Identity must-prove list advanced via artifacts |
| Restraint | Only what deserves to remain |
| Motion | Communicates; can disappear into understanding |
| Reduced motion | Clarity, hierarchy, continuity, relationships, orientation, accessibility, and understanding preserved; motion never sole channel |
| Interaction | Premium engineering tool; visitor in control |
| Truth | No invented evidence; Deferred honored |
| Memory | Intentional detail and engineering discipline remembered |
| Longevity | Five-year-defensible (Vision Q9; Identity) |

---

## 31. Deferred Register (Experience Specification)

| ID | Item | Status |
|----|------|--------|
| EX-01 | Exact README entrance block order | Deferred — IA-02 / CA-02 / README System |
| EX-02 | Exact Companion page composition / sitemap experience map | Deferred — IA-01 / IA-03 / IA-04 / CA-03 |
| EX-03 | L1–L3 concrete wiring of experience depths | Deferred — IA-09 / CA-08 / IL-02 |
| EX-04 | Loading indicators / skeletons / timings | Deferred — IL-06 |
| EX-05 | Audio implementation | Deferred — Audio / Implementation |
| EX-06 | Camera paths / shot lists / 3D scene implementation | Deferred — ML-08 |
| EX-07 | Focus / reveal choreography recipes | Deferred — Motion / Companion choreography |
| EX-07a | Concrete reduced-motion recipes / timings | Deferred — ML-07 / Accessibility implementation |
| EX-08 | Expand / inspect / trace experience mechanics | Deferred — IL-03 |
| EX-09 | Persistent return-visitor progress | Deferred — IL-13 |
| EX-10 | Dedicated Timeline page | Deferred — unsupported as IA node |
| EX-11 | Dedicated Skills gallery page | Deferred — unsupported as IA node |
| EX-12 | Dedicated Research section experience | Deferred — IA-05 / CA-04 until earned |
| EX-13 | Lab section experience structure | Deferred — IA-07 / CA-06 |
| EX-14 | Exact GitHub→Companion invitation wording/placement | Deferred — README / Companion specs |
| EX-15 | Ending / exit composition | Deferred — Companion Experience |
| EX-16 | Live demo experiences (DeepMed / RouteWise) | Deferred — D-04 |
| EX-17 | Identity-grade stack visualization content | Deferred — D-11 / D-12 |
| EX-18 | Curated diagram / screenshot / recording experiences | Deferred — Disc-02 / Disc-03 |
| EX-19 | Future “what’s next” substance beyond placeholder | Deferred — D-05 |
| EX-20 | Lighting / material implementation | Deferred — Design / Implementation |

---

## 32. Scope

This document owns:

- overall experience philosophy and goals  
- first impression and entrance sequence (experiential)  
- loading / silence / audio / camera philosophies (high level)  
- atmosphere, lighting philosophy, spatial feeling  
- focus transitions; reduced-motion experience obligation; reading and exploration rhythms; curiosity loop  
- narrative progression; project chapters as experiences  
- architecture reveal strategy; AI visualization philosophy  
- timeline / skills / research / lab experiential intent  
- GitHub → Companion transition experience  
- ending, last impression, emotional memory  
- anti-patterns; decision framework; quality gates  
- Experience Deferred Register  

---

## 33. Out of Scope

| Domain | Belongs to |
|--------|------------|
| Components / Layouts / Typography / Colors / Spacing | Design Language / later specs |
| Animation timings / easing / choreography recipes | Motion Language / Implementation |
| Interaction mechanics / controls / widgets | Interaction Language / Implementation |
| Frontend / React / Three.js / libraries / code | Implementation |
| Inventing Discovery evidence | Discovery (Locked) |
| Structural IA nodes / content ownership matrices | IA / CA (Locked) |
| Exact prose copy | Content / Writing (Deferred CA-01) |

---

## 34. Dependencies

| Document | Relationship |
|----------|----------------|
| `00-vision.md` | Mission, entrance/destination, constitutions, success, decision framework |
| `02-identity-specification.md` | Journeys, atmosphere, motion/interaction taste, bans, prove/state |
| `03-discovery.md` | Evidence existence constraints; Companion Missing |
| `04-creative-direction.md` | WHY experience form; journey principles |
| `05`–`07` | Visual / motion / interaction principles binding experience |
| `08`–`09` | Where experiences attach; what content may appear |

---

## 35. Future Dependents

Experience Specification constrains, but does not replace:

- README System  
- Companion Experience specification  
- Assets  
- Audio implementation  
- Component specifications  
- Implementation / Cursor constitution  

Those documents may extend this experience. They must never contradict it.

---

## 36. Approval Gate

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  

Experience Specification is immutable. Future Product Bible documents may extend it but must never contradict it. If any future instruction conflicts with Experience Specification, stop immediately and ask for clarification. Do not silently reconcile conflicts.

Stop. Do not begin README System, Companion Experience UI, or implementation until instructed.

---

*End of Document 10 — Experience Specification v1.0 (Locked)*
