/**
 * Companion route composition (construction).
 * Product Bible IA-01 / IA-03 remain Deferred as constitutional locks.
 * Archive path is D-ENG-014 — not a Product Bible amendment.
 */

export const COMPANION_PATHS = {
  home: "/",
  archive: "/archive",
  atlas: "/atlas",
  journey: "/journey",
  project: (slug: string) => `/archive/${slug}`,
} as const;

export const ROUTE_ORIENTATION = {
  home: {
    path: COMPANION_PATHS.home,
    label: "Companion",
    where: "Companion · Arrival",
    why: "Engineering identity, judgment, and the systems that follow from them.",
    next: "Open the Product Archive for recorded engineering evidence.",
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
    why: "Engineering evidence — problems, decisions, constraints, and what remains unknown.",
    next: "Open a case study for system-level review.",
    returnTo: {
      label: "Companion",
      href: COMPANION_PATHS.home,
    },
  },
  atlas: {
    path: COMPANION_PATHS.atlas,
    label: "Engineering Systems Atlas",
    where: "Companion · Engineering Systems Atlas",
    why: "How this engineer designs software — systems, decisions, validation, and failure knowledge across the body of work.",
    next: "Cross-reference case studies in the Product Archive for project-attached evidence.",
    returnTo: {
      label: "Product Archive",
      href: COMPANION_PATHS.archive,
    },
  },
  journey: {
    path: COMPANION_PATHS.journey,
    label: "Engineering Journey",
    where: "Companion · Engineering Journey",
    why: "Causal stations of engineering evolution — what changed in practice, drawn only from confirmed Atlas evidence.",
    next: "Inspect related systems in the Engineering Systems Atlas or open a case study.",
    returnTo: {
      label: "Engineering Systems Atlas",
      href: COMPANION_PATHS.atlas,
    },
  },
} as const;

export type CompanionRouteKey = keyof typeof ROUTE_ORIENTATION;
