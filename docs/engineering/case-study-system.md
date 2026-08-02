# Product Archive & Case Study System (Construction)

**Status:** Construction document (M8)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 08–10, 18, 21–23, 26; Identity §18; Discovery honesty  
**Surface:** Companion L2 — Product Archive + case studies

---

## Ownership

| Path | Owns |
|------|------|
| `content/evidence/` | Project truth + case-study sections |
| `modules/meaning` | Loaders, disclose helpers, archive queries |
| `modules/presentation/case-study/` | Shared archive + case-study rendering |
| `app/(site)/archive/` | L2 routes generated from content |
| This document | Construction decisions for M8 |

---

## Routes (construction)

| Path | Role |
|------|------|
| `/archive` | Product Archive index |
| `/archive/[slug]` | Case study document |

IA-01 remains Deferred as Product Bible lock. These paths are D-ENG-014.

---

## Case-study section order

problem → overview → architecture → decisions → trade-offs → lessons  
(+ constraints, rejected approaches)

Structure always renders. Values are Discovery-honest via `discloseEvidenceString` — Missing/Deferred are never hidden or upgraded.

---

## Add a project

1. Add `content/evidence/projects/<id>.json` with `includeInArchive: true`
2. Append id to `content/evidence/catalog.json`
3. Run `pnpm content:validate`

No React route file edits required — `generateStaticParams` reads the catalog.

---

## Deferred

Exact IA-01 sitemap lock; Disc-05 supporting matrices; D-03/D-04/D-11/D-12; architecture visualizations; Research/Lab/Writing hubs.
