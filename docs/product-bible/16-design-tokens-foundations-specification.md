# Document 16 — Design Tokens & Foundations Specification

**Version:** 1.0  
**Status:** Locked  
**Authority:** Implementation specification — design foundations for the Engineering Operating System (EOS)  
**Nature:** First implementation specification. Not a constitutional document. May not contradict Documents 00–15. May not redefine constitutional philosophy. Locked technical specification.  
**Depends on:** Documents 00–15 (Locked where marked Locked)  
**Implements:** Document 14 — Design System Constitution  
**Also obeys:** Document 05 — Design Language; Document 12 — Engineering Quality Standard; Document 15 — UI System Constitution  
**Answers:** HOW design foundations and tokens are structured as timeless, implementation-independent specification  
**Does not answer:** Construction syntax; vendors; frameworks; tooling recipes; interface-part inventories; motion timings; route trees

---

## 0. Purpose

**Why.** Documents 05 and 14 lock visual law. Construction cannot begin without a shared foundations contract. Without that contract, every surface invents private values and identity drifts.

**Specification.** This document translates the Design System Constitution into design foundations: token philosophy, hierarchy, semantic and primitive roles, color architecture, typography, space, size, radius, border, elevation, opacity, layering, responsive foundation philosophy, theme philosophy, naming, inheritance, governance, review, anti-patterns, and evolution. It remains implementation-independent. Exact numeric values, typeface selection, and palette literals remain **Deferred** where Documents 00–15 left them Deferred (including Design Language DL-01, DL-02, DL-03, DL-06, DL-08). Deferred gaps are never filled by invention presented as decided truth.

**Failure Conditions.** Foundations that contradict Documents 00–15. Exact values invented while still Deferred. Foundations that redefine constitutional philosophy. Construction-bound syntax treated as the foundation itself.

---

## 1. Foundation Philosophy

**Why.** Foundations are the shared substrate of visual consistency. Weak foundations force every later surface to compensate with costume.

**Specification.** Foundations exist to make Document 14 enforceable in construction without becoming construction. They encode calm, clarity, restraint, hierarchy before density, identity before color, and one identity across light and dark. Foundations prefer the smallest dependable set. Foundations age; fashion does not enter the foundation layer. Entrance and destination share foundations; depth of proof differs — same message, different depth. Foundations never invent a third public product identity.

**Failure Conditions.** Fashion in the foundation layer. Separate foundation identities per mode or surface. Foundations that compensate for weak hierarchy. Foundations that exist to impress.

---

## 2. Design Token Philosophy

**Why.** Tokens are named decisions. Unnamed decisions become unowned drift.

**Specification.** A design token is a named, governed foundation value or role with a single meaning. Tokens express constitutional intent: information, hierarchy, state, and comprehension — never personality, entertainment, luxury-as-color, novelty, or attention-seeking. Tokens are the contract between design law and later construction. Tokens must be explainable without reference to any particular construction method. Token meaning outranks local override.

**Failure Conditions.** Unnamed raw values used as identity. Tokens that encode trend personality. Tokens that cannot be explained as constitutional intent. Local overrides that silently redefine token meaning.

---

## 3. Token Hierarchy

**Why.** Without hierarchy, semantic meaning collapses into raw values and every consumer invents aliases.

**Specification.** Token hierarchy is ordered as follows:

1. **Primitive tokens** — raw foundation scales and roles without product meaning (value steps, neutral steps, type metric roles).  
2. **Semantic tokens** — product meaning mapped onto primitives (surface, text, border, focus, status, accent-as-information).  
3. **Contextual tokens** — optional, bounded mappings for a specific surface context that still resolve to semantic tokens; never a second identity.  
4. **Component-binding tokens** — Deferred to later UI implementation specifications; must only reference semantic or contextual tokens, never invent private identity.

Consumers prefer semantic tokens. Primitive tokens are not used directly in product surfaces except where a foundation specification explicitly requires it.

**Failure Conditions.** Product surfaces bound directly to primitives as habit. Contextual tokens inventing a second brand. Component-binding tokens introducing private palettes or type systems. Hierarchy inverted.

---

## 4. Semantic Token Principles

**Why.** Semantics carry product meaning. Semantics protect grayscale understanding and accessibility.

**Specification.** Semantic tokens name intent: what the value is for. Required semantic families include at minimum: canvas / surface; text primary / secondary / tertiary / inverse; border subtle / strong; focus; selection; accent informational; status warn / success / fail / info; disabled; overlay. Semantic tokens must remain understandable when color is removed (grayscale test). Semantic accents punctuate; neutrals carry the field. Semantic tokens do not communicate personality, entertainment, luxury, novelty, noise, trendiness, attention-seeking, or artificial excitement.

**Failure Conditions.** Semantic names that hide decorative intent. Missing status or focus semantics. Semantic color required for understanding. Competing accent semantics without hierarchy. Semantic tokens that fail grayscale review.

---

## 5. Primitive Token Principles

**Why.** Primitives stabilize scales. Unstable primitives force semantic churn.

**Specification.** Primitive tokens define ordered foundation steps for neutrals, emphasis value, space, size, type metrics, radius, border weight, elevation, and opacity. Primitive steps are finite, intentional, and owned. Primitive sets prefer restraint: the smallest set that preserves hierarchy and rhythm. Exact step counts and numeric literals remain **Deferred (DL-02, DL-03, DL-08)** until decided under governance — architecture of families is specified here; invented literals are refused.

**Failure Conditions.** Infinite ad-hoc primitive steps. Primitive sets expanded for fashion. Numeric literals published as decided while still Deferred. Primitives that cannot support calm hierarchy.

---

## 6. Color Token Architecture

**Why.** Color is information. Color architecture must enforce Document 14 color law.

**Specification.** Color foundations are near-monochrome with carefully controlled semantic accents. Identity is established before color. Contrast comes primarily from value. Saturation stays restrained. Light and dark share one semantic token set with environment remapping — not separate brand color systems. Color token families:

- **Neutral value scale** (primitive) — Deferred exact steps (DL-02)  
- **Semantic surfaces and text** — map to neutrals  
- **Informational accent** — single controlled accent role; not competing accents  
- **Status** — warn / success / fail / info as utilitarian semantics  
- **Focus / selection / interaction state** — informational only  

Color may communicate focus, interaction state, hierarchy, selection, status, health, architectural relationships, warn / success / fail / info, and active context. Color must never become identity. Exact palette literals remain **Deferred (DL-02)**. Neon, cyberpunk, gaming glow, competing accents, and marketing explosions are refused as token identity.

**Failure Conditions.** Mode-specific brand palettes. Color as personality. Competing accents. Exact hex or literal values invented while Deferred. Grayscale test failure. Accessibility traded for mood.

---

## 7. Typography Foundation

**Why.** Typography establishes trust before other systems. Foundations must encode calm inevitable hierarchy.

**Specification.** Typography foundations define roles, not costumes: display (architectural restraint only); heading levels sufficient for inevitable hierarchy; body; caption / meta; code-integrated text. Hierarchy is achieved through proportion, space, rhythm, and contrast — not excessive scale. Type foundations communicate authority without arrogance and engineering confidence without ego. Exact typeface selection and type scale literals remain **Deferred (DL-01)**. Foundations forbid novelty display as identity, aggressive fashion typography, inconsistent role combinations, and type that markets instead of clarifies. Code text integrates without costume. Cadence supports scan → understand → reflect → explore.

**Failure Conditions.** Typeface personality as identity. Hierarchy by excessive scale only. Exact typefaces or sizes published as decided while Deferred. Inconsistent role systems across surfaces. Fatigue under intended reading length.

---

## 8. Spacing Foundation

**Why.** Space exists for comprehension. Inevitable spacing is a quality signal.

**Specification.** Spacing foundations define a finite ordered scale for separation, inset, and stack rhythm. Space must breathe without emptiness and must not conceal useful engineering information through extreme minimalism. Spacing clarifies hierarchy and relationships. Exact spacing scale literals and layout track definitions remain **Deferred (DL-03)**. Spacing tokens are preferred over ad-hoc gaps. Entrance and destination share the spacing foundation; density may differ by depth obligation, not by private scales.

**Failure Conditions.** Ad-hoc gaps as habit. Separate spacing identities per surface. Crowding that destroys scan. Emptiness that hides meaning. Exact spacing literals invented while Deferred.

---

## 9. Sizing Foundation

**Why.** Unowned sizes produce accidental hierarchy and inconsistent touch and reading targets.

**Specification.** Sizing foundations define ordered roles for control height, icon optical box, and content measure bands where needed for comprehension and accessibility. Sizes serve clarity and use — not fashion. Exact numeric sizing literals remain **Deferred** until governed. Sizing must not create shouting hierarchy. Sizing must remain consistent across light and dark.

**Failure Conditions.** Fashion sizes. Inconsistent control sizing without semantic reason. Sizes that break accessibility of primary paths. Exact literals invented while Deferred.

---

## 10. Radius Foundation

**Why.** Corner language becomes personality when uncontrolled.

**Specification.** Radius foundations define a small ordered set of contour roles: none / subtle / standard / emphasis — mapped to calm geometry subordinate to content. Radius never performs playfulness, aggression, or trend identity. Ultra-rounded novelty as identity is refused. Exact radius literals remain **Deferred**. Contour language stays consistent across surfaces.

**Failure Conditions.** Trend radius as identity. Inconsistent contour language. Playful or aggressive radius without communicative need. Exact literals invented while Deferred.

---

## 11. Border Foundation

**Why.** Borders clarify structure. Decorative borders become noise.

**Specification.** Border foundations define weight roles (none / hairline / standard / strong) and semantic border colors via semantic tokens. Borders organize and separate; they do not decorate. Borders remain quiet under complexity. Exact weight literals remain **Deferred**. Borders must preserve calm hierarchy and must not compete with content.

**Failure Conditions.** Decorative border fashion. Competing border treatments. Borders used as personality. Exact literals invented while Deferred.

---

## 12. Elevation Foundation

**Why.** Elevation is a form of depth. Unearned elevation is costume.

**Specification.** Elevation foundations define a minimal ordered set of depth roles for structural separation when earned. Elevation clarifies relationships; it does not manufacture spectacle. Glow-as-identity elevation is refused. Elevation must remain removable in understanding terms: if elevation is removed and meaning holds, prefer the quieter solution when clarity is equal. Exact elevation literals remain **Deferred (related to DL-06)**. Light and dark remapping may change environmental expression, not identity.

**Failure Conditions.** Elevation as theater. Glow identity. Excessive elevation steps. Elevation required for core understanding. Exact literals invented while Deferred.

---

## 13. Opacity Foundation

**Why.** Opacity expresses state and overlay. Unowned opacity becomes mud.

**Specification.** Opacity foundations define roles for disabled, subtle overlay, strong overlay, and scrubbing of secondary content where needed for focus. Opacity supports comprehension and state honesty. Opacity must not reduce text below accessibility requirements. Exact opacity literals remain **Deferred**. Opacity is never used to fake depth as spectacle.

**Failure Conditions.** Unreadable faded text. Opacity as decoration. Inconsistent disabled expression. Exact literals invented while Deferred.

---

## 14. Layering Foundation

**Why.** Layer order prevents competing atmospheres from burying interaction.

**Specification.** Layering foundations define intentional stacking roles: canvas; content; sticky context; overlay; modal priority; transient feedback. Ambient atmosphere layers never outrank interaction focus. Layering preserves orientation and accessibility. Layering does not invent cinematic spectacle. Exact z-index construction mechanisms are out of scope; roles and priority law are specified here.

**Failure Conditions.** Atmosphere above interaction. Unowned stacking conflicts. Layering used for spectacle. Orientation lost under overlays.

---

## 15. Responsive Foundation Philosophy

**Why.** Same identity across contexts is locked law. Breakpoint recipes are not foundations theater.

**Specification.** Responsive foundations preserve one identity across viewing contexts. Token meaning does not change identity by context; density and measure may adapt. A lesser product on constrained contexts is refused. Exact breakpoint systems remain **Deferred** (Design Language). Responsive adaptation may remap measure and spacing density through governed tokens — never through a second theme identity. Authoring-context-only foundations are insufficient evidence.

**Failure Conditions.** Context-specific brand tokens. Lesser-product adaptation. Private responsive scales per surface. Exact breakpoints invented as identity while Deferred.

---

## 16. Theme Philosophy

**Why.** Light and dark are environments of one identity. Themes that fork brand create costume.

**Specification.** EOS supports light and dark environments. Only environmental lighting and value remapping change. Semantic token names remain stable across themes. Themes do not introduce extra brand color systems. Light favors clarity, documentation, and analysis; dark favors immersion, focus, and depth — without changing product meaning. Theme switching must preserve orientation, accessibility, and grayscale-capable understanding. Theme expression never manufactures emotion the engineering did not earn.

**Failure Conditions.** Separate brand per theme. Semantic rename per theme. Mood that reduces readability. Theme used as second product identity. Neon or gaming theme expression.

---

## 17. Token Naming Philosophy

**Why.** Names are contracts. Clever names hide meaning and block continuation.

**Specification.** Token names express role and intent in calm, durable language. Prefer semantic clarity over witty metaphor. Names must not encode a particular construction method, vendor, or fashion season. Names remain stable when underlying primitives remapped for theme. Names are English, structured, and free of hype. Deprecated names are owned with exit conditions; silent rename is refused.

**Failure Conditions.** Fashion or vendor-encoded names. Unstable renaming without governance. Names that obscure intent. Duplicate names with divergent meaning.

---

## 18. Token Inheritance Philosophy

**Why.** Inheritance prevents duplication. Uncontrolled inheritance creates hidden coupling.

**Specification.** Semantic tokens inherit from primitives. Contextual tokens inherit from semantics. Later component-binding tokens inherit from semantics or context only. Inheritance must remain traceable. Overrides are explicit, owned, and temporary with revisit conditions — or they are Constitutional / specification Breach relative to Documents 14 and this specification. Inheritance never launders a second identity through alias chains.

**Failure Conditions.** Hidden alias chains. Overrides without owner. Component-binding inventing primitives. Untraceable inheritance. Temporary overrides without exit.

---

## 19. Token Governance

**Why.** Ungoverned tokens accumulate into residue. Document 11 forbids unowned debt.

**Specification.** Every token family has an owner. Addition of tokens requires purpose, constitutional mapping to Documents 05/14, accessibility impact, theme impact, and five-year defensibility. Removal requires migration path. Deferred literals (DL-01, DL-02, DL-03, DL-06, DL-08 and related) remain Deferred until explicit decision under review — not until convenience. Temporary tokens are labeled and isolated. Entrance and destination share governed foundations; private forks are refused.

**Failure Conditions.** Unowned tokens. Silent addition. Deferred gaps filled by fantasy literals. Permanent temporary tokens. Surface-private foundation forks.

---

## 20. Token Review Standards

**Why.** Foundations without review become mythology. Review enforces Documents 12 and 14.

**Specification.** Foundations review must answer:

1. Does this obey Documents 00–16?  
2. Does it implement Document 14 without redefining it?  
3. Are light and dark one identity?  
4. Does the grayscale test still hold for color semantics?  
5. Is hierarchy calm and inevitable via type, space, and value?  
6. Are Deferred literals still marked Deferred — not invented?  
7. Are names durable and construction-independent?  
8. Is accessibility preserved?  
9. Would we still choose this in five years?  
10. Does any Document 12 visual, typography, or accessibility dimension fail?

One failed required answer voids foundations approval. Fashion is never a valid yes. Schedule pressure does not redefine Done.

**Failure Conditions.** Review that asks only whether tokens exist. Invented Deferred values accepted. Theme fork accepted. Approval without five-year defensibility.

---

## 21. Token Anti-Patterns

**Why.** Named refusals protect foundations before habits harden.

**Specification.** The following are forbidden in foundations work. Presence blocks acceptance until corrected:

| Forbidden behavior | Detectable when | Enforcement |
|--------------------|-----------------|-------------|
| Fashion foundations | Token set encodes trend personality | Reject |
| Color as identity | Understanding fails without color / grayscale fails | Reject |
| Theme brand fork | Light/dark introduce different brand systems | Reject |
| Primitive leakage | Product surfaces habitually bind to primitives | Correct or reject |
| Invented Deferred literals | DL-01/02/03/06/08 treated as decided without governance | Reject |
| Competing accents | Multiple unmanaged accent identities | Reject |
| Glow / neon / gaming elevation | Glow defines presence | Reject |
| Vendor-shaped naming | Names encode tooling or fashion season | Reject |
| Unowned overrides | Override without owner and exit | Reject |
| Surface-private scales | Entrance/destination or contexts fork foundations | Reject |
| Foundations as spectacle | Tokens exist to impress | Reject |

**Failure Conditions.** Anti-patterns negotiated as taste. Temporary labels without exit. Partial credit for forbidden behaviors.

---

## 22. Evolution Policy

**Why.** EOS evolves. Foundations must deepen without costume change.

**Specification.** Evolve foundations by reducing unjustified tokens, strengthening accessibility and hierarchy, clarifying semantics, and remapping primitives under stable semantic names. Preserve same message with greater depth over time. Prefer changes that age. Trend reinvention is not evolution. Literal decisions exiting Deferred status require governance review and Document 12 acceptance discipline. Accumulation without reduction is refused.

**Failure Conditions.** Constant costume change of tokens. Accumulation without reduction. Semantic rename for fashion. Silent exit from Deferred without review.

---

## 23. Scope

**Why.** Scope prevents this specification from becoming a second constitution or a construction manual.

**Specification.** This document owns only implementation-independent design foundations and token architecture for EOS. It does not own Design Philosophy, Interaction Philosophy, Engineering Philosophy, Architecture Philosophy, Motion Philosophy, or Experience Philosophy — those remain Documents 05–07 and 10–15. This specification binds foundation structure: token philosophy as foundations contract; hierarchy; semantic and primitive principles; color architecture; typography, spacing, sizing, radius, border, elevation, opacity, and layering foundations; responsive foundation structure; theme remapping structure; naming; inheritance; governance; review; anti-patterns; evolution. Exact literals marked Deferred remain Deferred here.

**Failure Conditions.** Scope creep into constitutional redefinition. Scope creep into construction syntax. Scope creep into inventing Deferred evidence or literals.

---

## 24. Out of Scope

| Domain | Belongs to |
|--------|------------|
| Design law / visual constitution | Documents 05 and 14 (Locked) |
| UI constitutional law | Document 15 (Locked) |
| Interaction behavior principles | Document 07 (Locked) |
| Motion behavior | Document 06 (Locked) |
| Engineering law / quality / architecture | Documents 11–13 (Locked) |
| Experience journeys | Document 10 (Locked) |
| IA routes / content ownership | Documents 08–09 (Locked) |
| Exact typeface selection and type scale literals | Deferred DL-01 — later governed decision |
| Exact color palette literals | Deferred DL-02 — later governed decision |
| Exact spacing scale and track definitions | Deferred DL-03 — later governed decision |
| Material / surface recipes beyond roles | Deferred DL-06 |
| Numeric proportion system mandate | Deferred DL-08 |
| Interface-part inventories and component-binding catalogs | Later UI implementation specifications |
| Construction syntax, vendors, frameworks, tooling recipes | Later technical construction documents |

---

## 25. Technical Lock

This specification is locked.

Future implementation specifications may extend it.

They may never contradict it.

If a future specification conflicts with Documents 00–16:

Stop immediately and ask.

Do not silently reconcile.

Construction that violates Documents 00–15 remains invalid even if it appears to follow this specification. Exact literals marked Deferred remain Deferred until governed decision.

---

*End of Document 16 — Locked Technical Specification*
