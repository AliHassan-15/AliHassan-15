# Security and verification (M14)

**Status:** Construction document  
**Authority:** Engineering implementation — not Product Bible  
**Milestone:** M14

## Intent

Prove EOS is trustworthy enough to hand to another senior engineer or publish
as a public engineering reference — without adding product surface.

Security is production-grade and minimal. Verification is automated where
practical. Anything that cannot be proven is documented as an accepted risk.

## Security posture

| Control | Implementation |
|---------|----------------|
| Clickjacking | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| Referrer | `Referrer-Policy: strict-origin-when-cross-origin` |
| Permissions | `Permissions-Policy` disables camera, mic, geolocation, payment, USB |
| CSP | Restrictive defaults; `script-src` / `style-src` allow `'unsafe-inline'` for Next + theme bootstrap; `'unsafe-eval'` retained for Next runtime compatibility |
| Fingerprinting chrome | `poweredByHeader: false` |
| Secrets | No server secrets in repo; app env allowlist is `NEXT_PUBLIC_SITE_URL`, `VERCEL_URL`, `NODE_ENV` |
| Client bundles | Release verify scans `.next/static` for private-key / AWS secret patterns |
| SRI | Not applied — first-party self-hosted assets only (next/font, local static). No third-party script CDNs |

Headers live in `companion/next.config.ts` and apply to `/:path*`.

### CSP honesty

A nonce-strict CSP would require restructuring the theme bootstrap script and
fighting Next’s runtime. EOS accepts a same-origin CSP with inline script/style
allowance rather than security theater that breaks the product. This is an
accepted risk until a nonce pipeline is justified.

## Verification strategy

| Guarantee | Automation |
|-----------|------------|
| Content schema + Discovery integrity | `content:validate` + `verify` |
| README ↔ content authority | `readme:check` (also `prebuild` + `verify`) |
| Archive route integrity | `verify` (slug uniqueness, path shape, archive filter) |
| Sitemap / robots / manifest contracts | `verify` (source + constructed URL set) |
| Canonical metadata presence | `verify` (layout / archive / case-study sources) |
| Hard-coded internal href drift | `verify` against known path set |
| Env boundary | `verify` allowlist scan |
| Secret pattern scan | `verify` companion source (+ client chunks after build) |
| A11y contracts (landmarks) | `verify` source contracts for `#main`, SkipLink, primary nav |
| Security header config present | `verify` `next.config.ts` tokens |
| Production route artifacts | `verify:release` after `build` |
| Dependency vulns (prod, high+) | `pnpm audit:deps` |

Commands (repo root):

```bash
pnpm verify            # content + contracts (build optional)
pnpm build
pnpm verify:release    # requires .next
pnpm audit:deps
```

CI runs typecheck → lint → format → audit → build → verify:release.

## Dependency review

Production runtime dependencies:

| Package | Role |
|---------|------|
| `next` | App Router Companion |
| `react` / `react-dom` | UI |
| `zod` | Content schema validation |

No convenience libraries for motion, audio, spatial, UI kits, analytics, or
auth. Enhancement systems use platform APIs. Dev tooling is limited to
TypeScript, ESLint (Next), Prettier, and `tsx` for scripts.

Transitive hardening (root `pnpm.overrides`):

| Override | Reason |
|----------|--------|
| `sharp >= 0.35.0` | Patch libvips CVEs pulled via optional `next` → `sharp` |
| `postcss >= 8.5.18` | Patch sourceMappingURL disclosure in Next’s PostCSS |

Revisit overrides when Next ships patched nested versions natively.

## Production assumptions

1. `NEXT_PUBLIC_SITE_URL` is set to the real public origin (no trailing slash).
2. Deployment serves the Next production build (`pnpm build` / `pnpm start` or platform equivalent).
3. Security headers from `next.config.ts` are not stripped by an intermediate CDN without replacement.
4. Ambient audio file may be absent; audio must fail silent (M11/M13).
5. No authentication, backend, or user-generated content surface exists.

## Known accepted risks

| Risk | Why accepted | Future opportunity |
|------|--------------|--------------------|
| CSP allows `'unsafe-inline'` / `'unsafe-eval'` | Required for current Next + theme bootstrap | Nonce/hash CSP if bootstrap is restructured |
| No Subresource Integrity on JS/CSS | First-party Next-emitted assets; no CDN scripts | Revisit if third-party scripts appear |
| No automated browser a11y suite (axe/playwright) | Source contracts + manual keyboard checks | Add axe CI when test harness is justified |
| No HTTP-level header assertion in CI | Headers configured in Next; CI doesn’t spin a server for header probing | Optional smoke after `next start` |
| `pnpm audit` is advisory for transitive deps | Fail gate at high+ severity only | Raise bar if supply-chain threat model changes |
| Client import of `@/modules/experience` barrel can pull `meaning` (fs) | Server components OK; client must import `routes` | Keep barrel thin or split packages |

## Runtime failure model (unchanged, verified by design)

| System | Failure mode |
|--------|--------------|
| Motion | Reduced-motion / capability → no motion |
| Spatial | Capability fail → flat list |
| Audio | Mute default; play fail → Off + silent |
| Theme | Inline bootstrap; CSS tokens remain readable |
| Content | Build fails on invalid schema / README drift |
| Archive / 404 / errors | Calm recovery surfaces (M13) |

## Ownership boundaries (for the next engineer)

| Area | Location |
|------|----------|
| Product truth | `content/` + Product Bible `docs/product-bible/` |
| Content load / Discovery | `companion/modules/meaning/` |
| Routes / orientation | `companion/modules/experience/` (`routes.ts` safe for client) |
| Presentation | `companion/modules/presentation/` |
| Enhancements | `companion/modules/enhancement/{motion,spatial,audio}/` |
| Site URL / SEO helpers | `companion/lib/site-url.ts` |
| Security headers | `companion/next.config.ts` |
| Verification | `companion/scripts/verify-release.ts` |
| Engineering ADRs | `docs/engineering/decision-log.md` |

## Explicit non-goals

No new pages or domains. No Lab / Writing / Research / Career. No analytics,
auth, or backend. No redesign. No security theater beyond durable defaults.
