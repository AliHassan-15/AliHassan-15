# Document 08 — Information Architecture

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  
**Authority:** Constitutional Information Architecture for the Engineering Operating System (EOS)  
**Depends on:** `00-vision.md`, `01-identity.md` (process), `02-identity-specification.md` (Approved / Locked), `03-discovery.md` (Approved / Locked — Immutable), `04-creative-direction.md` (Approved / Locked — Immutable), `05-design-language.md` (Approved / Locked — Immutable), `06-motion-language.md` (Approved / Locked — Immutable), `07-interaction-language.md` (Approved / Locked — Immutable)  
**Answers:** WHAT information exists; WHERE it belongs; HOW information is organized; HOW sections relate; WHAT navigation hierarchy exists; WHAT content is grouped together  
**Does not answer:** Visual Design; Design Language; Motion; Interaction mechanics; Components; Layouts; Frontend; Implementation; Technology; Engineering architecture; Copywriting; Storytelling

---

## 0. Purpose and constitutional rules

### 0.1 Purpose

Information Architecture defines the structural organization of EOS information across public surfaces.

It organizes only what prior locked constitutions already establish about information placement, grouping, hierarchy, and surface roles.

### 0.2 Conflict rule

If any instruction conflicts with Vision, Identity, Discovery, Creative Direction, Design Language, Motion Language, or Interaction Language, stop immediately and ask. Do not silently reconcile.

### 0.3 Provenance rule

Every structural claim must be traceable to a prior constitutional document. If unsupported, mark **Deferred**.

### 0.4 Separation rule

This document must not define visual design, motion, interaction mechanics, components, layouts, frontend, implementation, technology, engineering architecture, copywriting, or storytelling.

Interaction Language owns how behavior feels; IA owns where information lives and how it is hierarchically grouped. Exact page trees / route maps were Deferred from Interaction Language to IA — where still unspecified by Vision/Identity/Discovery, they remain **Deferred** here too (no invention).

---

## 1. Public surfaces (where information lives)

**Source:** Vision §3; Identity §0.5, §40.0; Discovery §2; Creative Direction §7.

EOS has exactly two public product surfaces:

| Surface | Role | Status (Discovery) |
|---------|------|--------------------|
| **Product A — GitHub Profile** | Entrance | Artifact exists (handle `AliHassan-15`) |
| **Product B — Companion Experience** | Destination | Missing as shipped product |

GitHub is the entrance. It is not the destination (Vision).

Companion is where the complete engineering story is told (Vision) and where richer motion and interaction belong (Vision; Creative Direction).

Same message; different depth (Identity §25.5; Creative Direction).

No third public product surface (Identity §0.5).

---

## 2. Internal conceptual systems (organization inside surfaces)

**Source:** Identity §0.5, §40.0–§40.1; Discovery §2.

Five internal systems organize information *inside* the two public surfaces over time. They are not competing public products:

| # | System | Information it organizes (Identity §40.1) |
|---|--------|---------------------------------------------|
| 1 | **Engineering Identity** | Philosophy, depth, taste, systems thinking, leadership approach, exploration areas — without self-promotion |
| 2 | **Product Archive** | Evolving case-study library (problem, why, architecture, rejected approaches, tradeoffs, constraints, production lessons, performance, future improvements) |
| 3 | **Engineering Laboratory** | Public experimentation (AI, distributed prototypes, architecture, infra, rendering, tooling, interaction research, visualizations) — curiosity not marketing |
| 4 | **Knowledge System** | Essays, notes, journals, debugging stories, principles, research summaries, AI learning notes, systems observations — practical understanding not content mill |
| 5 | **Career Operating System** | Canonical hub connecting GitHub, OSS, research, writing, speaking, products, résumé, teaching, updates — not disconnected profiles |

Discovery: these systems are conceptual only — not separate public products (Discovery §2).

Exact mapping of each system to Companion routes / README sections: **Deferred** (must not invent sitemap).

---

## 3. Information depth hierarchy (progressive disclosure levels)

**Source:** Identity §28; Interaction Language §3; Motion Language progressive-disclosure boundary.

Information is organized in optional depth levels:

| Level | Information classes (Identity §28) |
|-------|-------------------------------------|
| **L1** | Identity / what / why |
| **L2** | Projects / systems / architecture / research |
| **L3** | Decisions / infra / AI pipelines / code / writing |

Concrete L1–L3 page wiring and controls: **Deferred** (Interaction Language IL-02; no invention of UI).

---

## 4. Navigation hierarchy (modes and orientation)

**Source:** Identity §28; Interaction Language §2; Vision entrance→destination.

### 4.1 Hybrid navigation modes (information relationship types)

Identity §28 / Interaction Language:

| Mode | Used for |
|------|----------|
| Narrative | Stories |
| Structural | Systems |
| Spatial | Architecture |
| Contextual | Depth |

Orientation requirement: always know where / why / next / return (Identity §28).

### 4.2 Surface-level hierarchy

1. **Entrance (GitHub / README)** — first information layer: identity, credibility, craftsmanship, direction, invitation to Companion (Vision §10; Identity §25.5). Must not recreate the entire Companion (Vision §10).  
2. **Destination (Companion)** — deeper information layer: architecture, decisions, trade-offs, philosophy, systems/product thinking, evolution, research, leadership, technical communication (Identity §25.5).  

Exact Companion primary nav labels, README section order, and URL trees: **Deferred** (README System / Companion Experience specs).

---

## 5. Content groups (what is grouped together)

### 5.1 Identity / About information

**Source:** Identity §1, §2, §25; Creative Direction.

Grouped as L1 / Engineering Identity information:

- Canonical name / handle / default title  
- Canonical sentence (every EOS surface)  
- Opportunity signaling (README once mid-weight; Companion About near top) — Identity §2.2  
- Geography: once lightly in About-style context (Companion About once; README once) — Identity §1.2  
- University / degree: once on README and once on Companion About; not first-impression hero — Identity §2.4  
- Short thoughtful About (not career manifesto) — Identity §23  

Exact About copy: Content / Writing system — **Deferred** (IA places the group only).

### 5.2 Contact / presence information

**Source:** Identity §41.4; Discovery §3.

Grouped under professional channels only:

| Channel | IA status |
|---------|-----------|
| GitHub (`AliHassan-15`) | Confirmed placement |
| Personal website (EOS Companion) | Destination surface |
| LinkedIn | Deferred D-02 |
| Email | Deferred D-01 |
| Selected technical writing platforms | If introduced later |

Not a social media hub (Identity §41.4).

### 5.3 Projects information

**Source:** Identity §18; Discovery §5; Vision Companion (projects).

#### Group A — Load-bearing projects (Identity §18.3; Discovery §5.1)

1. DeepMed — AI Healthcare Platform (Flagship)  
2. RouteWise ELD  
3. Underwater Image Enhancement System  
4. Stellar Web Manager / Project-Management-System  
5. Codebase RAG  

#### Group B — Supporting projects (Identity §18.4; Discovery §5.2)

RouteRefuel; private client construction workflow app (details Deferred D-03); GameStore; Brain Tumor Classification; Flashcards Generator.

#### Group C — Archive projects (Identity §18.5; Discovery §5.3)

Named; public but not identity-defining; full evidence Deferred Disc-08.

#### Group D — Future projects (Identity §18.1; Discovery §5.4; D-05)

Placeholder space only.

#### Project case-study information structure (Identity §18.1)

Within a project case study, information is ordered as:

problem → overview → architecture → decisions → trade-offs → lessons  

Diagrams / walkthroughs / decision logs primary; repos and demos as evidence (Identity §18.1).

Live demos DeepMed / RouteWise: Deferred D-04 (Discovery / Identity).

Stacks D-11 / D-12: Deferred (Discovery).

Teammate names: must not appear (Identity §18.1).

RouteWise: do not place assessment/Spotter framing in public information (Identity §18.3.2).

DeepMed wait-time / market figures: vision/objectives language only — not measured-result information (Identity §18.1; Discovery §6 / §9).

### 5.4 Research information

**Source:** Identity §19; Vision Companion (research).

- Folded into project case studies until substantial public research earns a dedicated section (Identity §19).  
- Dedicated research section: **Deferred** until earned.  
- Public vs private research content boundaries: Identity §19 (IA must not surface private research).

### 5.5 Writing / knowledge information

**Source:** Identity §20, §40.1 Knowledge System; Vision Companion (writing).

- In EOS: case studies, architecture explanations, decision narratives, implementation notes, technical walkthroughs (Identity §20).  
- Writing surface: not immediately a primary pillar; support projects first; dedicated Writing / Engineering Notes later as library grows (Identity §20).  
- Knowledge System content classes: essays, notes, journals, debugging stories, principles, research summaries, AI learning notes, systems observations (Identity §40.1).  
- When dedicated Writing pillar appears: **Deferred** (timing / routes).

### 5.6 Laboratory / experimentation information

**Source:** Identity §40.1 Engineering Laboratory.

Public experimentation information classes listed in §2 table. Exact Companion Lab section: **Deferred**.

### 5.7 Career / opportunity / résumé-adjacent information

**Source:** Identity §2, §23, §40.1 Career Operating System; Vision Companion leave-understanding “what is being built next.”

- Opportunity openness: placed per §5.1 (not hero claim).  
- Years of experience: do not emphasize publicly (Identity §2.3).  
- Company / client names: do not appear (Identity §2.4).  
- Employment selective highlights: Deferred D-07 (Discovery).  
- Career OS as hub connecting GitHub, OSS, research, writing, speaking, products, résumé, teaching, updates (Identity §40.1) — exact hub structure **Deferred**.  
- “What is being built next” (Vision Companion): Future projects placeholder (D-05) + truthful next-work information only when available — **Deferred** if unspecified.

### 5.8 Evidence / artifacts information (existence inventory)

**Source:** Discovery (Locked).

Discovery catalogs what evidence exists (repos, FYP PDF, deferred demos/assets). IA does not invent missing artifacts. Professional Evidence as separate bible file: Missing / Disc-06 Deferred (Discovery).

---

## 6. How sections relate (cross-surface relationships)

**Source:** Vision §3, §10–§11; Identity §25.5, §0.5; Creative Direction §7; Interaction Language hybrid modes.

| Relationship | Rule |
|--------------|------|
| Entrance → Destination | README / GitHub invites into Companion; does not replace it (Vision §10) |
| Destination → Evidence | Companion proof points to repos, diagrams, case studies, write-ups (Identity §25.4–§25.5) |
| Same message / different depth | Identity and Companion share identity; Companion goes deeper (Identity §25.5) |
| Projects ↔ Research | Research folded into case studies until dedicated section earned (Identity §19) |
| Projects ↔ Writing | Case studies carry architecture/decisions/trade-offs/lessons; standalone writing when ideas transcend one project (Identity §20) |
| Five systems ↔ two surfaces | Systems organize inside GitHub + Companion; never a third public product (Identity §0.5) |
| Narrative / structural / spatial / contextual | Hybrid modes relate story, systems, architecture, and depth information (Identity §28) |

---

## 7. Companion information obligations (structural, not copy)

**Source:** Vision §11.

Visitors should leave understanding (information outcomes):

- how problems are approached  
- how systems are designed  
- why architectural decisions were made  
- what has been built  
- what is being built next  

IA must reserve information space for these outcomes. Exact page composition: **Deferred** (Companion Experience spec).

Companion is not a résumé (Vision §11; Creative Direction).

---

## 8. README / GitHub information obligations (structural, not copy)

**Source:** Vision §10; Identity §25.5.

README information jobs:

- communicate identity immediately  
- establish credibility  
- demonstrate craftsmanship  
- guide visitors naturally toward the companion experience  

Must not attempt to recreate the entire website (Vision §10).

Exact README section sequence and widgets: **Deferred** (README System).

---

## 9. AI usage classification (grouping constraint)

**Source:** Identity §18.6; Discovery §5.5.

When organizing project information, preserve stated classes:

- AI essential (stated): DeepMed; Codebase RAG; Stellar AI assistant  
- Conventional by design (stated): RouteWise ELD; GameStore; private client construction workflow app  

Do not regroup to invent AI centrality where Identity says otherwise.

---

## 10. Deferred Register (Information Architecture)

| ID | Item | Status |
|----|------|--------|
| IA-01 | Exact Companion sitemap / primary navigation labels | Deferred |
| IA-02 | Exact README section order / GitHub profile layout of information blocks | Deferred — README System |
| IA-03 | Route map / URL tree | Deferred |
| IA-04 | Explicit assignment of every content group to Companion routes | Deferred |
| IA-05 | Dedicated Research section (when earned) | Deferred — Identity §19 |
| IA-06 | Dedicated Writing / Engineering Notes pillar | Deferred — Identity §20 |
| IA-07 | Engineering Laboratory section structure | Deferred |
| IA-08 | Career Operating System hub structure | Deferred |
| IA-09 | L1–L3 page wiring | Deferred — Interaction IL-02 |
| IA-10 | Future projects content beyond placeholder | Deferred — D-05 |
| IA-11 | Contact LinkedIn / Email placement details | Deferred — D-01 / D-02 |
| IA-12 | Private client project details | Deferred — D-03 |
| IA-13 | Live demo destinations | Deferred — D-04 |
| IA-14 | Archive project full matrices / URLs | Deferred — Disc-08 |
| IA-15 | Separate Professional Evidence bible file placement | Deferred — Disc-06 |
| IA-16 | Availability one-liner placement wording | Deferred — D-10 |
| IA-17 | Portrait / photo information policy | Deferred — D-09 |

---

## 11. Scope

This document owns:

- public surface information roles (entrance / destination)  
- internal five-system information organization (conceptual)  
- L1–L2–L3 information depth hierarchy  
- hybrid navigation modes as information relationship types  
- content grouping (identity, contact, projects tiers, research, writing, lab, career, evidence)  
- case-study internal information order  
- cross-surface relationships  
- Companion / README structural information obligations  
- Deferred unknowns for sitemaps and section sequences  

---

## 12. Out of Scope

| Domain | Belongs to |
|--------|------------|
| Visual Design / Design Language | Design Language (Locked) |
| Motion | Motion Language (Locked) |
| Interaction mechanics / feedback behavior | Interaction Language (Locked) |
| Components / layouts / frontend / implementation / technology | Later implementation docs |
| Engineering architecture of EOS software | Architecture / Engineering Standards |
| Copywriting / storytelling prose | Content / Writing system; Creative Direction owns WHY only |
| Inventing missing Discovery evidence | Discovery (Locked) |
| Personal identity claims | Identity (Locked) |

---

## 13. Dependencies

| Document | Relationship |
|----------|----------------|
| `00-vision.md` | Product A/B; README / Companion constitutions |
| `01-identity.md` | Process |
| `02-identity-specification.md` | Surfaces, five systems, L1–L3, projects, research/writing placement, contact |
| `03-discovery.md` | What evidence exists; Deferred evidence IDs |
| `04-creative-direction.md` | Entrance/destination depth relationship |
| `05-design-language.md` | Must not be contradicted; no visual IA |
| `06-motion-language.md` | Must not be contradicted; no motion IA |
| `07-interaction-language.md` | Hybrid nav modes; progressive disclosure; trees Deferred to IA |

---

## 14. Future Dependents

Information Architecture constrains, but does not replace:

- README System  
- Companion Experience specification  
- Content / Writing system  
- Assets  
- Component specifications  
- Implementation / Cursor constitution  

Those documents may extend this structure. They must never contradict it.

---

## 15. Approval Gate

**Version:** 1.0 (Locked)  
**Status:** Approved / Locked — Immutable  

Information Architecture is immutable. Future Product Bible documents may extend it but must never contradict it. If any future instruction conflicts with Information Architecture, stop immediately and ask for clarification. Do not silently reconcile conflicts.

Stop. Do not begin README System, Companion Experience design, UI layouts, or implementation until instructed.

---

*End of Document 08 — Information Architecture v1.0 (Locked)*
