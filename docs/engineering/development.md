# Development

**Status:** Construction document (M1)  
**Authority:** Engineering implementation — not Product Bible

---

## Prerequisites

- Node.js 20 or newer
- pnpm 10.14.0 (pinned via root `packageManager`)

Enable pnpm with Corepack when available:

```bash
corepack enable
corepack prepare pnpm@10.14.0 --activate
```

Or invoke without a global install:

```bash
npm exec --yes pnpm@10.14.0 -- <command>
```

---

## Install

From the repository root:

```bash
pnpm install
```

---

## Scripts

Run from the repository root:

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start Companion in development |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` (strict) |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check (CI) |
| `pnpm content:validate` | Validate `content/` against meaning schemas |
| `pnpm readme:generate` | Regenerate root README from content |
| `pnpm readme:check` | Fail if README diverges from content |
| `pnpm verify` / `pnpm verify:release` | Release verification (M14+) |
| `pnpm audit:deps` | Production dependency audit (high+) |
| `pnpm deploy:production` | CLI production pack deploy to Vercel (M15) |

Equivalent filtered commands also exist on `companion/package.json`.

`pnpm build` runs content validation and README sync check first (`prebuild`).

---

## Path aliases

Inside `companion/`:

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `companion/*` |

Absolute imports are required for application code. Relative `../` climbs across ownership boundaries are refused when an alias exists.

---

## Environment

- Template: `companion/.env.example`
- Local file: `companion/.env.local` (gitignored)
- Production: `NEXT_PUBLIC_SITE_URL` must be the public Companion URL (no trailing slash); set `NEXT_PUBLIC_BASE_PATH=/AliHassan-15` for GitHub Pages

---

## Quality gates

Before considering a change complete:

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm format:check`
4. `pnpm audit:deps`
5. `pnpm build`
6. `pnpm verify` (and `pnpm verify:release` after build)

CI runs the same sequence on pull requests and pushes to `main` / `master`.

Release tagging and rollback: `docs/engineering/release-and-launch.md`.

---

## Working rules (M1+)

- Do not invent Discovery evidence or Identity content
- Do not add dependencies for later milestones early
- Do not create speculative folders
- Prefer Server Components; Client Components only when the browser is required
- Record binding construction decisions in `docs/engineering/decision-log.md`
