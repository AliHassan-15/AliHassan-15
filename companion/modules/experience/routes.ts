/**
 * Companion route composition (construction).
 * Product Bible IA-01 / IA-03 remain Deferred as constitutional locks.
 * Archive path is D-ENG-014 — not a Product Bible amendment.
 */

export const COMPANION_PATHS = {
  home: "/",
  archive: "/archive",
  project: (slug: string) => `/archive/${slug}`,
} as const;

export const ROUTE_ORIENTATION = {
  home: {
    path: COMPANION_PATHS.home,
    label: "Companion",
    where: "Companion · destination",
    why: "Understand who this engineer is, what they build, and why the work exists.",
    next: "Continue into the Product Archive for engineering evidence.",
    returnTo: {
      label: "GitHub entrance",
      /** Resolved at runtime via `getIdentity().githubEntranceUrl`. */
      href: COMPANION_PATHS.home,
    },
  },
  archive: {
    path: COMPANION_PATHS.archive,
    label: "Product Archive",
    where: "Companion · Product Archive",
    why: "Read engineering evidence — problems, decisions, constraints, and open questions.",
    next: "Open a case study for deeper system review.",
    returnTo: {
      label: "Companion home",
      href: COMPANION_PATHS.home,
    },
  },
} as const;

export type CompanionRouteKey = keyof typeof ROUTE_ORIENTATION;
