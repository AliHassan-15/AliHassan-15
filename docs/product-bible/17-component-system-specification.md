# Document 17 — Component System Specification

**Version:** 1.0  
**Status:** Locked  
**Authority:** Implementation Specification — component system for the Engineering Operating System (EOS)  
**Nature:** Implementation specification. Not a constitutional document. May not contradict Documents 00–16. May not redefine constitutional philosophy. Locked technical specification.  
**Depends on:** Documents 00–16 (Locked where marked Locked)  
**Implements:** Document 15 — UI System Constitution  
**Also obeys:** Documents 07, 11–14, and 16 (Locked where marked Locked); technical extension of Document 16 only — never Constitutional Extension or replacement of Documents 00–15  
**Answers:** WHAT components are and HOW the component system behaves at a timeless architectural level  
**Does not answer:** Construction syntax; vendors; frameworks; tooling; foundation literals; route trees; content ownership; motion timings

---

## 0. Purpose

**Why.** Document 15 locks UI constitutional law. Document 16 locks foundations architecture. Without a component system specification, surfaces invent private interface units and consistency collapses.

**Specification.** This document specifies the EOS component system under Document 15: taxonomy; category responsibilities; boundaries; composition; hierarchy; communication; state presentation at component level; identity preservation; consistency; accessibility; performance; evolution; governance; review; and anti-patterns. It applies Document 15 Component Philosophy and Primitive Philosophy; it does not redefine them. It remains implementation-independent. It does not invent a library inventory. Exact named unit catalogs remain Deferred until governed under this specification. Deferred gaps are never filled by fashion catalogs presented as decided truth.

**Failure Conditions.** Component system that contradicts Documents 00–16. Redefinition of UI, Design, Interaction, or Engineering constitutions. Construction-bound recipes treated as the component system itself. Invented library inventories presented as locked.

---

## 1. Component Philosophy

**Why.** Interface units without shared philosophy become residue. Residue blocks continuation and destroys trust.

**Specification.** This section applies Document 15 Component Philosophy to the component system; it does not redefine or replace it. A component is a governed interface unit with one coherent responsibility in service of engineering understanding. Components exist so visitors never think about the interface — only the engineering. Components are predictable, calm, accessible, and replaceable behind contracts. Components compose; they do not perform. Spectacle, entertainment, and novelty are refused as component purpose. The smallest dependable unit that preserves clarity outranks the impressive fragile unit. Five-year defensibility outranks temporary component fashion.

**Failure Conditions.** Components that demand attention for themselves. Entertainment or manipulation as component purpose. Unowned component behavior. Fashion units without communicative purpose. Demonstration components treated as product components.

---

## 2. Component Taxonomy

**Why.** Without taxonomy, every unit becomes a special case and reuse becomes mythology.

**Specification.** EOS components are classified by architectural role, not by vendor family:

1. Primitive  
2. Composite  
3. Layout  
4. Structural  
5. Navigation  
6. Content  
7. Feedback  
8. State  
9. Overlay  
10. Progressive Disclosure  

Category sections below apply Documents 07 and 15 to component-system roles; they do not redefine Interaction Language or UI Constitution.

A unit belongs to one primary class. Secondary traits are allowed; dual primary class without ownership is refused. Taxonomy guides composition and review. Taxonomy does not invent exact unit inventories.

**Failure Conditions.** Unclassified units in product surfaces. Dual primary class without owner. Taxonomy used to smuggle a vendor catalog. Classification by fashion rather than responsibility.

---

## 3. Primitive Components

**Why.** Unstable primitives force every higher surface to reinvent meaning.

**Specification.** Primitive components express the smallest dependable interface meanings: actionable, selectable, focusable, disableable, and honest presentation of loading, empty, success, and error — without celebrating ordinary states. Primitives remain calm, predictable, and accessible. Higher components build on primitives; they do not reinvent primitive meaning per surface. Primitive meaning outranks local cleverness. Exact primitive inventories remain **Deferred**; refusals still bind.

**Failure Conditions.** Reinvented primitive meaning per surface. Ordinary states celebrated. Inaccessible primitives. Clever primitives that block continuation. Invented primitive catalogs presented as decided.

---

## 4. Composite Components

**Why.** Composites package related responsibilities. Unbounded composites become god units.

**Specification.** Composite components combine primitives and other governed units behind one coherent responsibility and a clear public contract. Composites hide internal structure that consumers must not depend on. Composites do not absorb unrelated responsibilities because they appear together temporally. Composites remain replaceable without rewriting product meaning. Composition preserves Document 13 replaceability and Document 15 reusability law.

**Failure Conditions.** God composites without ownership. Secret consumer dependence on internals. Unrelated responsibilities fused by coincidence. Composites that cannot be replaced without reinterpretation of locked meaning.

---

## 5. Layout Components

**Why.** Layout organizes relationships. Accidental layout becomes noise.

**Specification.** Layout components arrange structure for comprehension: information-rich, highly structured, intentionally spacious. They support hierarchy before density and progressive unfold over simultaneous overload. Layout components never invent Information Architecture route trees. Layout components never recreate destination depth inside the entrance. Layout serves understanding before decoration and systems before screens.

**Failure Conditions.** Collage layout without structure. Layout that hides relationships. Entrance layout recreating destination. Layout that forces attention to arrangement instead of engineering. Layout inventing IA ownership.

---

## 6. Structural Components

**Why.** Structure preserves orientation and surface hierarchy across the product.

**Specification.** Structural components define durable scaffolding of a surface: regions that establish primary, secondary, and optional depth zones. Structure preserves recoverable orientation: where, why, next, return. Ambient atmosphere never outranks interaction focus within structure. Structure shares grammar across entrance and destination; depth of capability differs. Structure never invents a third public product surface.

**Failure Conditions.** Competing structural foci. Orientation unrecoverable. Atmosphere above interaction in structure. Third public surface via structure. Structure that changes identity between light and dark.

---

## 7. Navigation Components

**Why.** Navigation failure destroys trust faster than visual failure.

**Specification.** Navigation components keep the visitor oriented: where, why, next, return. They may support narrative, structural, spatial-when-earned, and contextual modes when each remains predictable. Hidden navigation is refused. Forced scrolling as primary navigation is refused. Experimental navigation is refused unless strongly justified and owned. Richer navigation belongs in the destination; the entrance invites without recreating destination.

**Failure Conditions.** Hidden navigation. Lost orientation. Forced scrolling as primary path. Experimental navigation without justification. Entrance navigation that becomes destination. Surprise paths that cannot be declined.

---

## 8. Content Components

**Why.** Content units present engineering meaning. Costume content becomes portfolio theater.

**Specification.** Content components present text, media, diagrams, and proof in service of understanding. They obey Discovery honesty: Deferred and Missing remain Deferred and Missing — never invented as present. Content components prefer real engineering imagery over decorative illustration. Content never markets in place of engineering. Content density follows hierarchy before density. Exact content templates remain out of scope (Content Architecture / later specs).

**Failure Conditions.** Invented evidence in content units. Decorative content as identity. Content that persuades without proving. Content competing with decoration. Fantasy capabilities shown as present.

---

## 9. Feedback Components

**Why.** Without feedback, predictability collapses. Theatrical feedback becomes entertainment.

**Specification.** Feedback components communicate state change, focus, progress, completion, and error honestly. Feedback is immediate, subtle, consistent, predictable, and professional. Ordinary interactions are not celebrated. Feedback must not delay the next intentional action. Feedback must not require sound for comprehension. Motion accompanying feedback explains state — it does not entertain.

**Failure Conditions.** Delayed feedback. Celebratory ordinary feedback. Inconsistent feedback across surfaces. Feedback that delays interaction. Feedback that requires sound. Opaque state change.

---

## 10. State Components

**Why.** State presentation is where honesty is tested.

**Specification.** State components present loading, empty, success, error, disabled, and background conditions clearly and calmly. Transient presentation state does not masquerade as durable product truth. Unfinished state is never presented as ready. Empty states guide next meaningful action without inventing evidence. Error states preserve recoverable paths. Optional enhancement failure must not destroy L1 understanding.

**Failure Conditions.** Theatrical loading or error. Empty states that invent evidence. Unrecoverable errors. Presentation state treated as product truth. Optional failure collapsing core understanding.

---

## 11. Overlay Components

**Why.** Overlays interrupt. Unowned interruption destroys calm control.

**Specification.** Overlay components temporarily elevate priority for confirmation, focused task, or necessary interruption. Overlays preserve visitor control and recoverable return. Overlays do not trap visitors in novelty or puzzles. Consequential actions require confirmation proportional to risk. Atmosphere overlays never outrank task clarity. Overlay stacking obeys Document 16 layering foundation roles without inventing literal stacking values here.

**Failure Conditions.** Trap overlays. Novelty overlays. Missing confirmation for consequential action. Atmosphere overlay burying task. Orientation lost on dismiss. Unowned overlay stacking conflicts.

---

## 12. Progressive Disclosure Components

**Why.** Forced depth is novelty. Optional depth is respect.

**Specification.** Progressive disclosure components deliver clear L1 first and advance depth only by visitor choice. Depth is optional, not forced. First visits guide and pace; return visits may deepen without changing identity. Disclosure reveals what is needed to answer an engineering question. Exact disclosure wiring remains **Deferred** where Documents 08–10 left it Deferred; the law of optional progressive depth still binds.

**Failure Conditions.** Forced depth. Depth that cannot be declined. First-visit overload. Return visits that change identity. Disclosure as puzzle or entertainment. L1 dependent on undisclosed layers.

---

## 13. Component Responsibilities

**Why.** Ambiguous responsibility creates unowned debt and undecidable failure.

**Specification.** Every component owns a clear responsibility stated in its contract: what it provides, what it requires, and what it must not do. Responsibility is drawn by purpose, not by fashion. Knowledge of the whole system is not required to use a component correctly. Ownership is explicit; orphans are forbidden. If no owner can be named, the component is invalid for product entry.

**Failure Conditions.** Shared responsibility with no owner. Hidden side effects. Contracts that require intimate knowledge of internals. Orphan components retained for convenience.

---

## 14. Component Boundaries

**Why.** Boundaries protect replaceability and prevent secret coupling.

**Specification.** Boundaries are contracts. Internals remain private. Cross-boundary effects are explicit. Components do not reach through unrelated units to mutate shared meaning silently. Presentation boundaries do not own Discovery truth. Construction mechanisms do not leak into component meaning. Boundaries preserve entrance versus destination depth obligations.

**Failure Conditions.** Secret cross-boundary mutation. Consumers depending on internals. Discovery truth owned inside presentation tricks. Boundary collapse between entrance and destination obligations.

---

## 15. Component Composition

**Why.** Wholes emerge from responsible parts. Collage without contracts is not composition.

**Specification.** Compose by clear contracts. Prefer composition that preserves replaceability and understanding. Composed wholes must remain orienting and accessible. Composition must not recreate Companion depth inside the GitHub entrance or invent a third public product surface. Same message; different depth remains structural law. Parts that only work when secretly coupled are refused.

**Failure Conditions.** Composition without contracts. Secret coupling. Entrance becoming Companion via composition. Third public surface. Composition as collage.

---

## 16. Component Hierarchy

**Why.** Without hierarchy, density becomes noise and meaning competes.

**Specification.** Component hierarchy follows hierarchy before density. Primary meaning is reached first; secondary structure waits; optional depth remains optional. Primitive meaning supports composite meaning; composites do not redefine primitives. Structural and layout tiers support navigation and content tiers; they do not compete with them. Hierarchy is calm and inevitable.

**Failure Conditions.** Competing focal components. Density before hierarchy. Composites redefining primitives. Optional depth required for L1. Hierarchy achieved only by shouting.

---

## 17. Component Communication Principles

**Why.** Unclear communication between units creates guesswork interfaces.

**Specification.** Components communicate through explicit contracts: inputs of meaning, outputs of meaning, and signaled state changes. Communication is predictable. Hidden state changes are refused. Communication serves task understanding — not chatter, celebration, or novelty. Parent units orchestrate; children do not silently commandeer product meaning. Communication patterns remain consistent across surfaces under one identity.

**Failure Conditions.** Hidden state changes. Guesswork contracts. Child units commandeering product meaning. Inconsistent communication patterns. Chatter without understanding gained.

---

## 18. Component State Presentation

**Why.** Document 13 binds state philosophy. Document 15 binds state presentation. Components must present state without lying.

**Specification.** This section applies Documents 13 and 15 to component-level state presentation; it does not redefine them. Component state is deliberate, minimal, and named in presentation. Loading, empty, success, error, disabled, and background conditions communicate clearly. Ordinary states are not celebrated. Unfinished state is never ready. Known limitation outranks false confidence. State transitions are understandable. Durable product truth does not hide only inside ephemeral component state.

**Failure Conditions.** Unexplained state. Theatrical failure. Opaque failure. Presentation state as product truth. Celebrated ordinary states. Unfinished presented as complete.

---

## 19. Component Identity Preservation

**Why.** One identity across surfaces creates trust. Component forks create costume.

**Specification.** Components preserve one identity across light and dark and across entrance and destination. Behavior and presentation grammar remain one language; depth of capability differs by surface obligation. Components do not introduce a second Design, Motion, or Interaction language. Fashionable deviation is not iteration. Drift is specification breach until corrected.

**Failure Conditions.** Mode-specific component identity. Entrance/destination as different brands via components. Second visual or interaction language. Drift defended as taste.

---

## 20. Component Consistency Principles

**Why.** Consistency creates trust. Inconsistent component language is a hard ban.

**Specification.** Comparable situations use comparable components. Feedback, disclosure, navigation orientation, and state presentation feel like one vision with Documents 07, 14, and 15. Local exceptions require owned justification and revisit conditions. Inconsistency is never personality. Same message; different depth.

**Failure Conditions.** Multiple component languages. Inconsistency as personality. Unowned exceptions. Silent reinterpretation of locked interaction meaning.

---

## 21. Accessibility Requirements

**Why.** Accessibility is baseline Constitutional Authority — not a finishing pass.

**Specification.** Primary component paths must support keyboard use. Labels must be descriptive. Structure must remain meaningful. Contrast and readability outrank mood — components consume Document 16 foundations without inventing literals here. Reduced-capability paths preserve clarity, hierarchy, continuity, relationships, orientation, accessibility, and understanding. Motion is never the sole channel of meaning. Sound is never required for comprehension. No component is kept if it cannot remain accessible without destroying its communicative purpose.

**Failure Conditions.** Inaccessible primary paths. Missing labels. Motion as sole channel. Sound required. Accessibility deferred as polish. Accessible path that becomes a lesser product.

---

## 22. Performance Requirements

**Why.** Atmosphere never wins over responsiveness. Document 12 binds performance quality.

**Specification.** Every component behavior that costs responsiveness must justify its cost against improved understanding. Real-use paths remain responsive. Optional enhancement may fail closed without destroying L1. Authoring-path-only performance is insufficient evidence. Prefer simpler component behavior when clarity is equal. Performance debt requires owner, cost, and revisit condition.

**Failure Conditions.** Unjustified cost. Atmosphere preferred over responsiveness. Optional cost collapsing core use. Unowned performance debt. Quality proven only on the authoring path.

---

## 23. Component Evolution

**Why.** EOS evolves. Component evolution must deepen clarity without costume change.

**Specification.** Evolve by deepening predictability, strengthening orientation and accessibility, reducing unjustified component cost, clarifying contracts, and removing what no longer deserves to remain. Preserve same message with greater depth over time. Prefer patterns that age. Exact inventory decisions exiting Deferred require governance review. Trend reinvention is not evolution. Accumulation without reduction is refused.

**Failure Conditions.** Constant costume change. Accumulation without reduction. Silent exit from Deferred inventories. Evolution that weakens Documents 00–16 compliance.

---

## 24. Component Governance

**Why.** Ungoverned components accumulate into residue. Document 11 forbids unowned debt.

**Specification.** Every component family has an owner. Addition requires purpose, mapping to Documents 15 and 07, accessibility and performance impact, identity impact, and five-year defensibility. Removal requires migration path. Temporary components are labeled and isolated until they meet Document 12 acceptance discipline and this specification. Entrance and destination share governed component meaning; private forks are refused. Exact catalogs remain Deferred until decided under review.

**Failure Conditions.** Unowned components. Silent addition. Deferred catalogs filled by fantasy. Permanent temporary components. Surface-private forks.

---

## 25. Component Review Standards

**Why.** Components without review become novelty culture. Review enforces Documents 12 and 15.

**Specification.** Component review must answer:

1. Does this obey Documents 00–17?  
2. Does it implement Document 15 without redefining it?  
3. Is responsibility clear and owned?  
4. Does the visitor focus on engineering rather than the component?  
5. Is behavior predictable; is orientation recoverable?  
6. Is progressive depth optional?  
7. Are empty, loading, and error presentations honest?  
8. Do entrance and destination keep same message with different depth?  
9. Do accessibility and performance hold as baseline?  
10. Would we still choose this in five years?  
11. Does any Document 12 interaction, accessibility, or performance dimension fail?

One failed required answer voids approval. Fashion is never a valid yes. Schedule pressure does not redefine Done.

**Failure Conditions.** Review that asks only whether the unit exists or executes. Novelty accepted as craft. Silent conflict with locked documents. Approval without five-year defensibility. Done redefined by schedule.

---

## 26. Component Anti-Patterns

**Why.** Named refusals protect the system before habits harden.

**Specification.** The following are forbidden. Presence blocks acceptance until corrected:

| Forbidden behavior | Detectable when | Enforcement |
|--------------------|-----------------|-------------|
| Interface theater components | Visitor thinks about the unit instead of engineering | Reject |
| God units | One unit owns unrelated responsibilities | Reject or split |
| Hidden navigation units | Where / why / next / return unrecoverable | Reject |
| Hover-only required meaning | Required meaning unavailable without pointer hover | Reject |
| Forced depth units | Deeper levels cannot be declined | Reject |
| Celebrating ordinary states | Ordinary load/success/input is theatrical | Reject |
| Secret coupling | Parts only work through hidden dependence | Reject |
| Entrance recreates destination | Entrance units carry destination depth | Reject |
| Third public surface via components | Structure invents a public product beyond entrance/destination | Reject |
| Invented evidence in components | Deferred/Missing shown as present | Reject |
| Accessibility deferred | Primary path inaccessible | Reject |
| Vendor catalog smuggling | Inventory shaped as a fashion library rather than EOS responsibility | Reject |
| Unowned temporary components | No owner, cost, and exit | Reject |

**Failure Conditions.** Anti-patterns negotiated as taste. Temporary labels without exit. Partial credit for forbidden behaviors.

---

## 27. Scope

**Why.** Scope prevents this specification from becoming a second constitution or a construction manual.

**Specification.** This document owns only the implementation-independent component system specification for EOS: taxonomy; category responsibilities; boundaries; composition; hierarchy; communication; state presentation at component level; identity preservation; consistency; accessibility and performance requirements for components; evolution; governance; review; anti-patterns. Component Philosophy and Primitive Philosophy remain Document 15. It does not own Design, Interaction, Experience, Engineering, Architecture, Motion, or Foundations constitutions/specifications. Exact unit inventories remain Deferred here until governed.

**Failure Conditions.** Scope creep into constitutional redefinition. Scope creep into construction syntax. Scope creep into inventing Deferred inventories or foundation literals.

---

## 28. Out of Scope

| Domain | Belongs to |
|--------|------------|
| UI constitutional law | Document 15 (Locked) |
| Design constitution / visual grammar | Documents 14 and 05 (Locked) |
| Interaction behavior principles | Document 07 (Locked) |
| Design foundations and token architecture | Document 16 (Locked) |
| Engineering law / quality / architecture | Documents 11–13 (Locked) |
| Experience journeys | Document 10 (Locked) |
| IA routes / content ownership | Documents 08–09 (Locked) |
| Motion behavior | Document 06 (Locked) |
| Exact component inventories / named catalogs | Deferred — later governed decision under this specification |
| Foundation literals (palette, type scale, spacing, etc.) | Document 16 Deferred items |
| Construction syntax, vendors, frameworks, tooling recipes | Later technical construction documents |
| File structures and construction project layout | Later technical construction documents |

---

## 29. Technical Lock

This specification is locked.

Future implementation specifications may extend it.

They may never contradict it.

If a future specification conflicts with Documents 00–17:

Stop immediately and ask.

Do not silently reconcile.

Construction that violates Documents 00–16 remains invalid even if it appears to follow this specification. Exact component inventories marked Deferred remain Deferred until governed decision.

---

*End of Document 17 — Locked Technical Specification*
