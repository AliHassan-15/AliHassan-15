# Release and launch (M15)

**Status:** Construction document  
**Authority:** Engineering implementation — not Product Bible  
**Milestone:** M15 (host updated for GitHub Pages)

## Intent

Make EOS a real public product with a reproducible release process — without
adding product functionality.

## Deployment architecture

| Layer | Choice |
|-------|--------|
| Host | GitHub Pages |
| Project site | `https://alihassan-15.github.io/AliHassan-15/` |
| Framework | Next.js 15 App Router (`companion/`) static export |
| Content | Repository-root `content/` (monorepo) |
| Package manager (local / CI) | pnpm 10.14.0 |
| Node | `20.x` (CI) / `24.x` (engines) |
| HTTPS | Platform-managed |
| Output | `companion/out` (`output: "export"`) |
| basePath | `/AliHassan-15` |
| Security headers | Documented in `companion/next.config.ts` (static hosts cannot apply Next runtime headers) |

### Canonical GitHub Pages deploy

1. Enable **GitHub Pages** for this repository (Source: GitHub Actions).
2. Push to `main` (or `master`) — workflow `.github/workflows/pages.yml` builds, verifies, and deploys `companion/out`.
3. Production env (set in the workflow):
   - `NEXT_PUBLIC_SITE_URL=https://alihassan-15.github.io/AliHassan-15`
   - `NEXT_PUBLIC_BASE_PATH=/AliHassan-15`

### Local static preview

```bash
pnpm build
pnpm --filter eos-companion start
```

Serves `companion/out` (requires matching `NEXT_PUBLIC_BASE_PATH` when testing Pages paths).

## Production URLs

| Surface | URL |
|---------|-----|
| Entrance (GitHub) | https://github.com/AliHassan-15/AliHassan-15 |
| Companion (production) | https://alihassan-15.github.io/AliHassan-15/ |

Update `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_PATH` in workflows if the Pages URL changes, then redeploy so canonical URLs, sitemap, and robots match.

## Release process

### Pre-release checklist

- [ ] Product Bible conflict check (no Deferred invention)
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm format:check`
- [ ] `pnpm audit:deps`
- [ ] `pnpm build`
- [ ] `pnpm verify`
- [ ] `pnpm verify:release`
- [ ] README sync (`pnpm readme:check`)
- [ ] `content/identity` `companionDestination` matches GitHub Pages URL

### Tag release

1. Ensure `main` is green (CI + Pages).
2. Tag `vX.Y.Z` and push tags — Release workflow re-runs quality gates.
3. Confirm Pages deployment for the commit on `main`.

### Rollback

Re-run a previous successful Pages deployment from the Actions UI, or revert the
commit on `main` and push (Pages redeploys from the new HEAD).

## Non-goals

No product features. No redesign. No Vercel dependency.
