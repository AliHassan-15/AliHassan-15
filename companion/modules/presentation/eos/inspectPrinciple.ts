import {
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getEngineeringPatterns,
  getProjectBySlug,
  loadProjects,
  projectDisplayTitle,
} from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import type { DecisionExplorerLink } from "./inspectDecision";

export type PrincipleExplorerLink = DecisionExplorerLink;

const MIN_PROJECTS = 3;

/** Fully serializable plate model — safe for client components. */
export type PrincipleInspection = {
  id: string;
  label: string;
  principleText: string;
  rationaleText: string;
  whyText: string;
  projects: PrincipleExplorerLink[];
  supportingArchitecture: PrincipleExplorerLink[];
  supportingDecisions: PrincipleExplorerLink[];
  supportingValidation: PrincipleExplorerLink[];
  supportingFailure: PrincipleExplorerLink[];
  supportingEvolution: PrincipleExplorerLink[];
  supportingPatterns: PrincipleExplorerLink[];
  atlasSystems: PrincipleExplorerLink[];
  evidenceText: string;
  artifacts: string[];
  provenance: string[];
  confidenceCaption: string;
};

function uniqueLinks(links: PrincipleExplorerLink[]): PrincipleExplorerLink[] {
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

function projectLinks(projectIds: string[]): PrincipleExplorerLink[] {
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
    .filter((entry): entry is PrincipleExplorerLink => entry !== null);
}

/**
 * Build Principles from Atlas systems with ≥3 confirmed projects.
 * Title/summary are reused — no invented philosophy.
 */
export function buildPrincipleInspections(args: {
  /** Optional: limit to principles that include this project. */
  projectId?: string;
  localExplorerLinks: PrincipleExplorerLink[];
}): PrincipleInspection[] {
  const { projectId, localExplorerLinks } = args;
  const atlas = getEngineeringAtlas();
  const patterns = getEngineeringPatterns();

  const eligible = atlas.systems.filter((system) => {
    if (system.projectIds.length < MIN_PROJECTS) {
      return false;
    }
    if (
      system.confidence !== "confirmed" &&
      system.confidence !== "readme-attributed" &&
      system.confidence !== "public-artifact"
    ) {
      return false;
    }
    if (projectId && !system.projectIds.includes(projectId)) {
      return false;
    }
    return true;
  });

  return eligible.map((system) => {
    const projects = projectLinks(system.projectIds);

    const supportingArchitecture = uniqueLinks([
      ...localExplorerLinks.filter(
        (link) =>
          link.href.includes("architecture") ||
          link.href.includes("section-architecture"),
      ),
      ...system.relatedArchitectureIds
        .map((id) => {
          const entry = atlas.architectureIndex.find((item) => item.id === id);
          if (!entry) {
            return null;
          }
          return {
            href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id}`,
            label: `Atlas · ${entry.name}`,
          };
        })
        .filter((entry): entry is PrincipleExplorerLink => entry !== null),
      ...atlas.architectureIndex
        .filter(
          (entry) =>
            intersectionCount(entry.projectIds, system.projectIds) >= 2,
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id}`,
          label: `Atlas · ${entry.name}`,
        })),
    ]);

    const supportingDecisions = uniqueLinks([
      ...localExplorerLinks.filter((link) => link.href.includes("decision")),
      ...atlas.decisions
        .filter((entry) =>
          entry.projectIds.every((id) => system.projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-decision-${entry.id}`,
          label: `Atlas · ${entry.decision}`,
        })),
    ]);

    const supportingValidation = uniqueLinks([
      ...localExplorerLinks.filter((link) => link.href.includes("validation")),
      ...system.relatedValidationIds
        .map((id) => {
          const entry = atlas.validationIndex.find((item) => item.id === id);
          if (!entry) {
            return null;
          }
          return {
            href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
            label: `Atlas · ${entry.name}`,
          };
        })
        .filter((entry): entry is PrincipleExplorerLink => entry !== null),
      ...atlas.validationIndex
        .filter((entry) =>
          entry.projectIds.every((id) => system.projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
          label: `Atlas · ${entry.name}`,
        })),
    ]);

    const supportingFailure = uniqueLinks([
      ...localExplorerLinks.filter((link) => link.href.includes("failure")),
      ...atlas.failures
        .filter((entry) => system.projectIds.includes(entry.projectId))
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-failure-${entry.id}`,
          label: `Atlas · ${entry.title}`,
        })),
    ]);

    const supportingEvolution = uniqueLinks([
      ...localExplorerLinks.filter((link) => link.href.includes("evolution")),
      ...atlas.evolution
        .filter(
          (entry) =>
            intersectionCount(entry.projectIds, system.projectIds) >= 1,
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-evolution-${entry.id}`,
          label: `Atlas · ${entry.label}`,
        })),
    ]);

    const supportingPatterns = uniqueLinks([
      ...localExplorerLinks.filter((link) => link.href.includes("pattern")),
      ...patterns
        .filter(
          (pattern) =>
            pattern.projectIds.length >= 2 &&
            intersectionCount(pattern.projectIds, system.projectIds) >= 2,
        )
        .map((pattern) => ({
          href: `#engineering-patterns`,
          label: pattern.title,
        })),
    ]);

    const atlasSystems = uniqueLinks([
      {
        href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
        label: `Atlas · ${system.title}`,
      },
      ...system.relatedSystemIds
        .map((id) => {
          const entry = atlas.systems.find((item) => item.id === id);
          if (!entry) {
            return null;
          }
          return {
            href: `${COMPANION_PATHS.atlas}#atlas-system-${entry.id}`,
            label: `Atlas · ${entry.title}`,
          };
        })
        .filter((entry): entry is PrincipleExplorerLink => entry !== null),
    ]);

    return {
      id: `principle-${system.id}`,
      label: system.title,
      principleText: system.title,
      rationaleText: system.summary,
      whyText: system.summary,
      projects,
      supportingArchitecture,
      supportingDecisions,
      supportingValidation,
      supportingFailure,
      supportingEvolution,
      supportingPatterns,
      atlasSystems,
      evidenceText: `${system.summary} Evidenced across ${system.projectIds.length} confirmed projects.`,
      artifacts: projects.map((link) => link.label),
      provenance: atlasSystems.map((link) => link.label),
      confidenceCaption: evidenceConfidenceCaption(system.confidence),
    };
  });
}
