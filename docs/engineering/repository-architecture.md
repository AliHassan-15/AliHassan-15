# Repository Architecture

**Status:** Construction document (M1)  
**Authority:** Engineering implementation — not Product Bible  
**Depends on:** Approved G0 Construction Foundation; Product Bible Documents 00–33 (locked)

---

## Public surfaces

EOS has exactly two public surfaces:

| Surface | Location | Role |
|---------|----------|------|
| Product A — GitHub entrance | Root `README.md` | Entrance artifact (untouched in M1) |
| Product B — Companion | `companion/` | Destination application |

No third public product may exist — including by folder naming.

---

## Root layout

```text
AliHassan-15/
├── README.md                 # Product A (not modified in M1)
├── docs/
│   ├── product-bible/        # Locked Documents 00–33
│   └── engineering/          # Construction decisions (this tree)
├── content/                  # Authoritative product meaning
├── companion/                # Product B application
├── .github/                  # CI and repository automation
├── package.json              # pnpm workspace scripts
└── pnpm-workspace.yaml
```

---

## Ownership

| Path | Owns | Must not own |
|------|------|--------------|
| `docs/product-bible/` | Immutable product law | Implementation notes, ADRs, token literals |
| `docs/engineering/` | Binding construction decisions | Reinterpretation of Product Bible; invented Discovery evidence |
| `content/` | Product truth shared by both surfaces | React, CSS, route trees, fake completeness |
| `companion/` | Destination runtime: experience, presentation, platform | Duplicate identity truth; Product Bible edits |
| `README.md` | Entrance presentation under GitHub constraints | Destination depth; content authority |

---

## Companion internal boundaries

```text
companion/
├── app/                      # Route composition (App Router)
├── modules/
│   ├── meaning/              # Read models over /content
│   ├── experience/           # Orientation, disclosure
│   ├── presentation/         # UI / layout application
│   └── enhancement/          # Optional motion / spatial / audio
├── styles/                   # Token → runtime bridge
└── lib/platform/             # Framework adapters only
```

Higher layers may use lower layers. Lower layers must not invent higher meaning.

Module folders are structural ownership seats. Feature code is deferred to later milestones.

---

## Content domains

```text
content/
├── identity/    # Deferred to M6 (+ G1/G2)
├── evidence/    # Deferred to M6 / M8 (+ G3)
├── writing/     # Deferred to M12 (+ G4) when earned
└── assets/      # Deferred to M6 / asset work
```

`content/` is the only place product facts may be authored. M1 leaves every domain intentionally empty.

---

## Tooling location

| Concern | Location |
|---------|----------|
| Next.js app + TS/ESLint/Prettier | `companion/` |
| Workspace scripts (`dev`, `build`, `lint`, …) | Root `package.json` → filter `eos-companion` |
| CI | `.github/workflows/ci.yml` |

---

## Explicitly out of M1

Deferred elsewhere: design tokens (M2), components (M3), README System (M4), Companion L1 pages/nav (M5), content model (M6), motion (M7), case studies (M8), spatial (M10), audio (M11).
