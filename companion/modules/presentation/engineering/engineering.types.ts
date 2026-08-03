export type EngineeringFocusKind =
  | "architecture-stage"
  | "capability"
  | "journey-station"
  | "atlas-system"
  | "atlas-decision"
  | "atlas-validation"
  | "atlas-failure"
  | "atlas-component"
  | "decision"
  | "validation"
  | "failure"
  | "knowledge"
  | "project"
  | "walkthrough-room";

export type EngineeringRelatedRef = {
  kind: EngineeringFocusKind;
  id: string;
  label: string;
  href?: string;
};

/** Shared focus object — one engineering context across EOS surfaces. */
export type EngineeringFocus = {
  kind: EngineeringFocusKind;
  id: string;
  label: string;
  related: EngineeringRelatedRef[];
  projectSlug?: string;
  source: string;
};

export type SetEngineeringFocusOptions = {
  /** When true, sync URL hash to the focus address when safe. Default true. */
  syncHash?: boolean;
};

/** Walkthrough room ids — reserved hashes on case-study pages. */
export const RESERVED_CASE_STUDY_HASHES = new Set([
  "objective",
  "architecture",
  "decisions",
  "reasoning",
  "validation",
  "failures",
  "evidence",
  "references",
  "case-study-title",
  "section-architecture",
  "section-architecture-section",
  "decision-explorer-heading",
  "engineering-validation",
  "failure-resilience",
  "evidence-heading",
  "engineering-references-heading",
  "engineering-evolution",
  "engineering-patterns",
  "engineering-knowledge-graph",
  "engineering-knowledge-graph-heading",
  "engineering-demonstration",
  "engineering-demonstration-heading",
]);

/**
 * Stable address for a confirmed architecture pipeline stage.
 * Example: "prompt construction" → "prompt-construction"
 */
export function architectureStageAddress(stage: string): string {
  return stage
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isReservedCaseStudyHash(hash: string): boolean {
  return RESERVED_CASE_STUDY_HASHES.has(hash);
}

/**
 * Short case-study aliases → walkthrough room ids.
 * Example: #reasoning → decisions (engineering judgment room).
 */
export const CASE_STUDY_HASH_ALIASES: Record<string, string> = {
  reasoning: "decisions",
};

/**
 * Atlas section short aliases → canonical section element ids.
 * Example: /atlas#validation → #atlas-validation
 */
export const ATLAS_SECTION_ALIASES: Record<string, string> = {
  systems: "atlas-systems",
  evolution: "atlas-evolution",
  architecture: "atlas-architecture",
  relationships: "atlas-relationships",
  decisions: "atlas-decisions",
  failures: "atlas-failures",
  validation: "atlas-validation",
  glossary: "atlas-glossary",
};

export function resolveCaseStudyHash(hash: string): string {
  return CASE_STUDY_HASH_ALIASES[hash] ?? hash;
}

export function resolveAtlasSectionHash(hash: string): string | null {
  return ATLAS_SECTION_ALIASES[hash] ?? null;
}

/** Match focus id/label against an explorer item id or label. */
export function focusMatchesItem(
  focus: EngineeringFocus | null,
  item: { id?: string; label?: string; kind?: EngineeringFocusKind },
): boolean {
  if (!focus) {
    return false;
  }
  if (
    item.kind &&
    item.kind === focus.kind &&
    item.id &&
    item.id === focus.id
  ) {
    return true;
  }
  if (item.id && item.id === focus.id) {
    return true;
  }
  if (item.label && item.label.toLowerCase() === focus.label.toLowerCase()) {
    return true;
  }
  return focus.related.some(
    (ref) =>
      (item.id && ref.id === item.id) ||
      (item.label && ref.label.toLowerCase() === item.label.toLowerCase()) ||
      (item.kind && ref.kind === item.kind && item.id && ref.id === item.id),
  );
}

/** Derive a related ref from an existing confirmed href when possible. */
export function relatedRefFromLink(
  href: string,
  label: string,
): EngineeringRelatedRef {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (hash.startsWith("atlas-system-")) {
    return {
      kind: "atlas-system",
      id: hash.slice("atlas-system-".length),
      label,
      href,
    };
  }
  if (hash.startsWith("atlas-decision-")) {
    return {
      kind: "atlas-decision",
      id: hash.slice("atlas-decision-".length),
      label,
      href,
    };
  }
  if (hash.startsWith("atlas-validation-")) {
    return {
      kind: "atlas-validation",
      id: hash.slice("atlas-validation-".length),
      label,
      href,
    };
  }
  if (hash.startsWith("atlas-failure-")) {
    return {
      kind: "atlas-failure",
      id: hash.slice("atlas-failure-".length),
      label,
      href,
    };
  }
  if (hash.startsWith("atlas-component-")) {
    return {
      kind: "atlas-component",
      id: hash.slice("atlas-component-".length),
      label,
      href,
    };
  }
  if (href.startsWith("/archive/")) {
    const slug = href.replace(/^\/archive\//, "").split("#")[0] ?? label;
    return { kind: "project", id: slug, label, href };
  }
  if (hash && !isReservedCaseStudyHash(hash) && !hash.startsWith("atlas-")) {
    return {
      kind: "architecture-stage",
      id: hash,
      label,
      href,
    };
  }
  return {
    kind: "project",
    id: label,
    label,
    href,
  };
}

/** Parse Atlas entity hashes: atlas-system-*, atlas-validation-*, etc. */
export function focusFromAtlasHash(hash: string): EngineeringFocus | null {
  const patterns: Array<{
    prefix: string;
    kind: EngineeringFocusKind;
  }> = [
    { prefix: "atlas-system-", kind: "atlas-system" },
    { prefix: "atlas-decision-", kind: "atlas-decision" },
    { prefix: "atlas-validation-", kind: "atlas-validation" },
    { prefix: "atlas-failure-", kind: "atlas-failure" },
    { prefix: "atlas-component-", kind: "atlas-component" },
    { prefix: "atlas-evolution-", kind: "journey-station" },
    { prefix: "atlas-glossary-", kind: "atlas-system" },
  ];

  for (const pattern of patterns) {
    if (hash.startsWith(pattern.prefix)) {
      const id = hash.slice(pattern.prefix.length);
      if (!id) {
        return null;
      }
      return {
        kind: pattern.kind,
        id,
        label: id,
        related: [],
        source: "hash",
      };
    }
  }

  return null;
}
