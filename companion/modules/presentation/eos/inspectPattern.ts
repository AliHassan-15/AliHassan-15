import {
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getProjectBySlug,
  loadProjects,
  projectDisplayTitle,
  type EngineeringPattern,
} from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import type { DecisionExplorerLink } from "./inspectDecision";

export type PatternExplorerLink = DecisionExplorerLink;

/** Fully serializable plate model — safe for client components. */
export type PatternInspection = {
  id: string;
  label: string;
  patternText: string;
  intentText: string;
  whyText: string;
  benefitsText: string;
  tradeoffsText: string;
  projects: PatternExplorerLink[];
  relatedArchitecture: PatternExplorerLink[];
  relatedAdr: PatternExplorerLink[];
  relatedValidation: PatternExplorerLink[];
  relatedFailures: PatternExplorerLink[];
  relatedSystems: PatternExplorerLink[];
  evidenceText: string;
  artifacts: string[];
  provenance: string[];
  confidenceCaption: string;
};

function uniqueLinks(links: PatternExplorerLink[]): PatternExplorerLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.href}::${link.label}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function intersectionCount(a: string[], b: string[]): number {
  const set = new Set(b);
  return a.filter((id) => set.has(id)).length;
}

function projectLinks(projectIds: string[]): PatternExplorerLink[] {
  return projectIds
    .map((id) => {
      const project =
        getProjectBySlug(id) ??
        loadProjects().find((entry) => entry.id === id) ??
        null;
      if (!project) {
        return null;
      }
      return {
        href: COMPANION_PATHS.project(project.slug),
        label: projectDisplayTitle(project),
      };
    })
    .filter((entry): entry is PatternExplorerLink => entry !== null);
}

/**
 * Build Pattern Explorer inspections from confirmed cross-project patterns.
 * Only patterns with ≥2 project ids. Links derived from Atlas overlap — never invented prose.
 */
export function buildPatternInspections(args: {
  patterns: EngineeringPattern[];
  /** Optional: limit to patterns that include this project. */
  projectId?: string;
  localExplorerLinks: PatternExplorerLink[];
}): PatternInspection[] {
  const { patterns, projectId, localExplorerLinks } = args;
  const atlas = getEngineeringAtlas();

  const eligible = patterns.filter((pattern) => {
    if (pattern.projectIds.length < 2) {
      return false;
    }
    if (
      pattern.confidence !== "confirmed" &&
      pattern.confidence !== "readme-attributed" &&
      pattern.confidence !== "public-artifact"
    ) {
      return false;
    }
    if (projectId && !pattern.projectIds.includes(projectId)) {
      return false;
    }
    return true;
  });

  return eligible.map((pattern) => {
    const relatedSystems = uniqueLinks(
      atlas.systems
        .filter(
          (system) =>
            intersectionCount(system.projectIds, pattern.projectIds) >= 2,
        )
        .map((system) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
          label: `Atlas · ${system.title}`,
        })),
    );

    const relatedArchitecture = uniqueLinks(
      atlas.architectureIndex
        .filter(
          (entry) =>
            intersectionCount(entry.projectIds, pattern.projectIds) >= 2,
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id}`,
          label: `Atlas · ${entry.name}`,
        })),
    );

    const relatedAdr = uniqueLinks(
      atlas.decisions
        .filter((entry) =>
          entry.projectIds.every((id) => pattern.projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-decision-${entry.id}`,
          label: `Atlas · ${entry.decision}`,
        })),
    );

    const relatedValidation = uniqueLinks(
      atlas.validationIndex
        .filter((entry) =>
          entry.projectIds.every((id) => pattern.projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
          label: `Atlas · ${entry.name}`,
        })),
    );

    const relatedFailures = uniqueLinks(
      atlas.failures
        .filter((entry) => pattern.projectIds.includes(entry.projectId))
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-failure-${entry.id}`,
          label: `Atlas · ${entry.title}`,
        })),
    );

    const whySystem = atlas.systems.find(
      (system) => intersectionCount(system.projectIds, pattern.projectIds) >= 2,
    );

    const projects = projectLinks(pattern.projectIds);
    const evidenceParts = [
      pattern.statement,
      `Evidenced across ${pattern.projectIds.length} confirmed projects.`,
    ];

    return {
      id: pattern.id,
      label: pattern.title,
      patternText: pattern.title,
      intentText: pattern.statement,
      whyText: whySystem?.summary ?? "Missing",
      benefitsText: "Missing",
      tradeoffsText: "Missing",
      projects,
      relatedArchitecture: uniqueLinks([
        ...localExplorerLinks.filter(
          (link) =>
            link.href.includes("architecture") ||
            link.href.includes("section-architecture"),
        ),
        ...relatedArchitecture,
      ]),
      relatedAdr: uniqueLinks([
        ...localExplorerLinks.filter((link) => link.href.includes("decision")),
        ...relatedAdr,
      ]),
      relatedValidation: uniqueLinks([
        ...localExplorerLinks.filter((link) =>
          link.href.includes("validation"),
        ),
        ...relatedValidation,
      ]),
      relatedFailures: uniqueLinks([
        ...localExplorerLinks.filter((link) => link.href.includes("failure")),
        ...relatedFailures,
      ]),
      relatedSystems: uniqueLinks([
        ...localExplorerLinks.filter(
          (link) =>
            link.href.includes("evolution") || link.href.includes("atlas"),
        ),
        ...relatedSystems,
      ]),
      evidenceText: evidenceParts.join(" "),
      artifacts: projects.map((link) => link.label),
      provenance:
        relatedSystems.length > 0
          ? relatedSystems.map((link) => link.label)
          : ["Missing"],
      confidenceCaption: evidenceConfidenceCaption(pattern.confidence),
    };
  });
}
