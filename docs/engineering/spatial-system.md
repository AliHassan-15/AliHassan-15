# Spatial System (Construction)

**Status:** Construction document (M10)  
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

If Apple removed the depth stack tomorrow, meaning survives via the ordered list and architecture paragraph.

---

## Ownership

| Path | Owns |
|------|------|
| `modules/enhancement/spatial/` | Capability, provider, topology enhancement |
| Case study pages | Composition only — no WebGL / scene ownership |
| Content | Sole stage labels via confirmed architecture text |

---

## Fail-closed gates

Spatial depth stays off when:

- `prefers-reduced-motion: reduce`
- `prefers-reduced-data: reduce`
- `navigator.connection.saveData`
- CSS `perspective` unsupported
- Server render / before capability probe

---

## Refused

WebGL demos, Three.js bundles, particles, floating objects, continuous render loops, hero cameras, multiple spatial experiences.

---

## Deferred (still Deferred)

SP-01–SP-10 inventories, camera values, lighting values, scene graphs, GPU engines — untouched.
