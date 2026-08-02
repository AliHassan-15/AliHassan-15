# Release and launch (M15)

**Status:** Construction document  
**Authority:** Engineering implementation — not Product Bible  
**Milestone:** M15

## Intent

Make EOS a real public product with a reproducible release process — without
adding product functionality.

## Deployment architecture

| Layer | Choice |
|-------|--------|
| Host | Vercel |
| Project | `eos-companion` |
| Framework | Next.js 15 App Router (`companion/`) |
| Content | Repository-root `content/` (monorepo) or colocated pack for CLI |
| Package manager (local / CI) | pnpm 10.14.0 |
| Node | `24.x` (Vercel engines) |
| HTTPS | Platform-managed |
| Compression | Platform-managed (Brotli/gzip) |
| Immutable assets | `/_next/static/*` → `Cache-Control: public, max-age=31536000, immutable` |
| Security headers | `companion/next.config.ts` (+ cache headers in `companion/vercel.json`) |

### Canonical Git-connected deploy (preferred)

1. Connect this repository to the Vercel project.
2. Set **Root Directory** to `companion`.
3. Keep `companion/vercel.json` install/build commands (parent pnpm workspace).
4. Set Production env: `NEXT_PUBLIC_SITE_URL=https://<production-host>` (no trailing slash).
5. Production branch: `main` (or `master`).

### CLI pack deploy (this workspace without `.git`)

When the working tree is not a Git checkout:

```bash
node scripts/deploy-production.mjs
```

This colocates `content/` beside the Companion app, installs with npm on Vercel,
and deploys to the linked `eos-companion` project.

Dry run (pack only):

```bash
node scripts/deploy-production.mjs --dry-run
```

## Production URLs

Record the live values after the first successful production alias:

| Surface | URL |
|---------|-----|
| Entrance (GitHub) | https://github.com/AliHassan-15/AliHassan-15 |
| Companion (production) | https://eos-companion.vercel.app |
| Inspect / dashboard | https://vercel.com/hassanakramali-gmailcoms-projects/eos-companion |

Update `NEXT_PUBLIC_SITE_URL` to the stable production origin, then redeploy so
canonical URLs, sitemap, and robots match.

Optional custom domain: attach in Vercel → Domains; keep HTTPS; redirect www→apex
(or the reverse) once chosen. Do not invent a domain in content until it is live.

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
- [ ] `NEXT_PUBLIC_SITE_URL` points at the intended production origin
- [ ] No secrets in client bundles / env allowlist still holds

### Deploy

**Git path:** merge to production branch → Vercel production deployment.

**CLI path:** `node scripts/deploy-production.mjs`

### Deployment verification checklist

- [ ] `https://<host>/` renders Home
- [ ] `/archive` and at least one `/archive/[slug]`
- [ ] `/robots.txt` disallows `/internal/`, references sitemap
- [ ] `/sitemap.xml` lists home, archive, case studies
- [ ] `/manifest.webmanifest` short_name `EOS`, start_url `/`
- [ ] `/icon` responds
- [ ] Security headers present (`X-Frame-Options`, CSP, nosniff, referrer, permissions)
- [ ] Theme toggle works; Sound stays Off by default
- [ ] 404 and error recovery surfaces
- [ ] Skip link → `#main`

### Post-release verification

- [ ] Deep link refresh works
- [ ] Back navigation preserves orientation
- [ ] Reduced motion / missing ambient audio fail closed
- [ ] Mobile + keyboard pass
- [ ] Entrance README still matches content authority

## Rollback

### Emergency rollback (Vercel)

```bash
npx vercel rollback --scope hassanakramali-gmailcoms-projects
# or pin a prior deployment:
npx vercel rollback <deployment-url-or-id> --scope hassanakramali-gmailcoms-projects
```

Dashboard: Project → Deployments → ⋮ on last known-good → **Promote to Production**.

### Rollback checklist

- [ ] Confirm incident (broken routes, bad content, bad env)
- [ ] Rollback / promote last known-good production deployment
- [ ] Re-check Home, Archive, sitemap, robots
- [ ] Fix forward on a branch; do not “hotfix invent” Discovery evidence
- [ ] Redeploy only after quality gates pass

## Launch checklist

- [ ] Companion production URL stable
- [ ] `NEXT_PUBLIC_SITE_URL` matches that URL
- [ ] README Companion section points at the live destination (after content update)
- [ ] Tag `v1.0.0` on the canonical Git remote
- [ ] CI green on the tagged commit
- [ ] Stop building net-new features — wait for real feedback + Deferred register

## Versioning

Semantic version **v1.0.0** marks the first public EOS release (README entrance +
live Companion destination). Do not invent `v1.1.0` until a governed change
warrants it.

Tag on the canonical clone (this working tree may lack `.git`):

```bash
git tag -a v1.0.0 -m "EOS v1.0.0 — public entrance + Companion destination"
git push origin v1.0.0
```

## Known limitations

| Limitation | Notes |
|------------|-------|
| Working tree may lack `.git` | Tag/push from the canonical remote clone |
| Ambient `ambient.ogg` may be absent | Audio fails silent (M11/M13) |
| CSP allows inline script/style | Documented M14 accepted risk |
| CLI pack uses npm on Vercel | Git path uses pnpm workspace; pack avoids pnpm+Node24 registry bug |
| Custom domain optional | Stable `*.vercel.app` alias is acceptable for v1.0.0 |

## Future roadmap (already-approved Deferred only)

Do **not** invent new roadmap items. Only Deferred work already owned by the
Product Bible / engineering revisit notes, for example:

- Theme preference persistence (D-ENG-019 revisit)
- Governed ambient asset under Document 25
- Nonce-strict CSP when theme bootstrap allows (D-ENG-020)
- Lab / Writing / Research / Career — only when Discovery + IA unlock them
- Exact security/performance inventories remaining Deferred under Docs 27–30

After M15: **stop building**. Next work is evidence-driven, not feature theater.
