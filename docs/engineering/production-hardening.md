# Production hardening (M13)

**Status:** Construction document  
**Authority:** Engineering implementation — not Product Bible  
**Milestone:** M13

## Intent

Harden EOS for production without expanding product surface. Accessibility,
performance boundaries, graceful failure, honest metadata, and mobile
resilience — not new features.

## Decisions

| Area | Decision |
|------|----------|
| Error surfaces | `not-found.tsx`, `error.tsx`, `global-error.tsx` — calm recovery, no Next default chrome |
| Landmarks | `#main` is `<main>`; header actions in `<nav aria-label="Primary">` |
| Heading outline | Archive tiers use `Heading level={2}` (caption-styled) |
| Providers | Theme stays root; Motion / Spatial / Audio scoped to `(site)` |
| Site URL | `getSiteUrl()` — `NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`, then localhost |
| SEO honesty | Twitter/OG `summary` without inventing images; minimal generated `icon.tsx` |
| Audio honesty | Failed play resets preference to Off; missing `ambient.ogg` fails silent |
| Sound chrome | `useOptionalAudio` — toggle absent outside AudioProvider |
| Touch / mobile | Pref controls ≥ `control-md`; header wraps; `100dvh` + safe-area insets |
| CI | `NEXT_PUBLIC_SITE_URL=https://example.com` so artifacts are not localhost |

## Explicit non-goals

No Lab / Writing / Research / Career. No redesign. No new animation language.
No invented Discovery evidence. Theme persistence remains deferred.

## Deploy checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the real public origin (no trailing slash).
2. Place governed ambient media at `public/audio/ambient.ogg` when Asset pipeline allows.
3. Confirm skip link → main, keyboard prefs, reduced-motion, and 404/error paths.
