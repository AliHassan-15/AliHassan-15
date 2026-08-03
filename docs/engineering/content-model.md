# Content Model & Honesty Layer (Construction)

**Status:** Construction document (M6)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 02, 03, 09, 22–24, 26  
**Surfaces:** README (Product A) + Companion (Product B) via shared meaning

---

## Ownership

| Path | Owns |
|------|------|
| `content/` | Sole product-truth authority |
| `companion/modules/meaning/schema/` | Typed contracts + Zod runtime validation |
| `companion/modules/meaning/load/` | Shared content loaders |
| `companion/modules/meaning/honesty.ts` | Presentation that never upgrades Discovery status |
| `companion/scripts/validate-content.ts` | Loud failure on invalid content |
| `companion/scripts/generate-readme.ts` | README derived from content (not a second truth store) |

Components, routes, and README **do not** own truth.

---

## Honesty contract

Evidence fields are discriminated unions:

- `confirmed` → value required; may be shown; optional `confidence` + `provenance[]`
- `missing` → omitted; never invented
- `deferred` → omitted; optional `deferralId`

Confidence grades (never silently upgraded): `confirmed` | `readme-attributed` | `public-artifact` | `deferred` | `missing`.

Provenance sources may cite repository, commit, file path, document, notebook, README section, testing report, or Identity path. Case studies disclose provenance via a native “Evidence provenance” expander.

Cross-project patterns live in `content/evidence/engineering-patterns.json` (each pattern requires ≥2 `projectIds`).

Presentation helpers refuse silent upgrades. Attempting to require a non-confirmed field throws.

---

## Add a project (content only)

1. Create `content/evidence/projects/<id>.json` matching `projectSchema`
2. Include `engineeringCaseFile` (timeline, decisionRecords, validationMethodology, technicalRisks, failureModes, knownLimitations, futureDirections, assets) — Confirmed only with provenance; otherwise Missing/Deferred
3. Append `<id>` to `content/evidence/catalog.json`
4. Run `pnpm content:validate`
5. Run `pnpm readme:generate` if the project is entrance/evidence-visible

No React, route, or component edits required for catalog expansion. Engineering case-file fields render on existing case-study surfaces via EvidenceField (no new visual system).

---

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm content:validate` | Parse + validate all content |
| `pnpm readme:generate` | Rewrite root `README.md` from content |
| `pnpm readme:check` | Fail if README diverges from content |
| `prebuild` | validate + README check before Companion build |

---

## Disclose vs present

| Helper | Use |
|--------|-----|
| `presentEvidenceString` | Entrance / compact — omit Missing/Deferred |
| `discloseEvidenceString` | Case studies — show status honestly; never hide gaps |

---

## Deferred (unchanged Product Bible)

About prose (Doc 24), email/LinkedIn (D-01/D-02), portrait (D-09), availability one-liner variants (D-10), live demos (D-04), DeepMed/RouteWise stacks (D-11/D-12), case-study bodies (M8), supporting full matrices (Disc-05).
