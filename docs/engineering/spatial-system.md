# Spatial System (Construction)

**Status:** Construction document (M10 → P46)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 00 (3D Constitution), 32 (Spatial System Constitution), 27, 28  
**Surface:** `modules/enhancement/spatial`

---

## Justification (Document 32 §19)

| Question | Answer |
|----------|--------|
| Improves understanding? | Yes — only where confirmed architecture prose names explicit `stages:` |
| Flat clearer? | Flat ordered list remains the complete experience |
| Removable? | Yes — remove module; prose + list still explain |
| Discovery honest? | Stages are extracted only from content-authored lists; never invented |
| One experience? | Codebase RAG pipeline topology only (others return null) |
| Interactive? | Stage selection opens an inspection plate from confirmed prose, provenance, and Atlas see-also — not animation theater |

If Apple removed the depth stack tomorrow, meaning survives via the ordered list, inspection plate, and architecture paragraph.

---

## Ownership

| Path | Owns |
|------|------|
| `modules/enhancement/spatial/` | Capability, provider, topology inspection enhancement |
| Case study pages | Composition only — no WebGL / scene ownership |
| Content | Sole stage labels via confirmed architecture text |

---

## Inspection contract (P46)

1. Extract stages only from content-authored `stages:` lists.
2. Selecting a stage inspects **position** (from the list), **evidence excerpt** (sentence from confirmed architecture prose that names the stage, or an honest missing-prose note), **confidence**, **artifacts**, and **related systems** already confirmed for the architecture section.
3. Never invent nodes, pipelines, ADRs, or stage-to-component bindings.
4. Depth stack remains optional spatial enhancement; accessibility lives on the stage radiogroup.

---

## Fail-closed gates

Spatial depth stays off when:

- `prefers-reduced-motion: reduce`
- `prefers-reduced-data: reduce`
- `navigator.connection.saveData`
- CSS `perspective` unsupported
- Server render / before capability probe

Inspection list + plate remain available without spatial depth.

---

## Refused

WebGL demos, Three.js bundles, particles, floating objects, continuous render loops, hero cameras, multiple spatial experiences, speculative stage descriptions.

---

## Deferred (still Deferred)

SP-01–SP-10 inventories, camera values, lighting values, scene graphs, GPU engines — untouched.
