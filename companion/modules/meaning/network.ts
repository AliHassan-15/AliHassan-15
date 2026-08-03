import { COMPANION_PATHS } from "@/modules/experience/routes";
import { loadEngineeringAtlas } from "./load/secondary";
import { loadProjects } from "./load/projects";
import type {
  AtlasArchitectureComponent,
  AtlasDecision,
  AtlasGlossaryEntry,
  AtlasRelationship,
  AtlasSystem,
  AtlasValidation,
  ProjectContent,
} from "./schema";

export type EosHref = {
  href: string;
  label: string;
};

export type ProjectNetwork = {
  systems: Array<AtlasSystem & { href: string }>;
  validations: Array<AtlasValidation & { href: string }>;
  glossary: Array<AtlasGlossaryEntry & { href: string }>;
  architecture: Array<AtlasArchitectureComponent & { href: string }>;
  decisions: Array<AtlasDecision & { href: string }>;
  relationships: AtlasRelationship[];
};

function atlasHref(hash: string): string {
  return `${COMPANION_PATHS.atlas}#${hash}`;
}

/**
 * Cross-document network for a project — computed from Atlas, never invented.
 */
export function getProjectNetwork(projectId: string): ProjectNetwork {
  const atlas = loadEngineeringAtlas();

  const systems = atlas.systems
    .filter((entry) => entry.projectIds.includes(projectId))
    .map((entry) => ({
      ...entry,
      href: atlasHref(`atlas-system-${entry.id}`),
    }));

  const validations = atlas.validationIndex
    .filter((entry) => entry.projectIds.includes(projectId))
    .map((entry) => ({
      ...entry,
      href: atlasHref(`atlas-validation-${entry.id}`),
    }));

  const glossary = atlas.glossary
    .filter((entry) => entry.projectIds.includes(projectId))
    .map((entry) => ({
      ...entry,
      href: atlasHref(`atlas-glossary-${entry.id}`),
    }));

  const architecture = atlas.architectureIndex
    .filter((entry) => entry.projectIds.includes(projectId))
    .map((entry) => ({
      ...entry,
      href: atlasHref(`atlas-component-${entry.id}`),
    }));

  const decisions = atlas.decisions
    .filter((entry) => entry.projectIds.includes(projectId))
    .map((entry) => ({
      ...entry,
      href: atlasHref(`atlas-decision-${entry.id}`),
    }));

  const relationships = atlas.relationships.filter((rel) =>
    rel.steps.some((step) => step.kind === "project" && step.id === projectId),
  );

  return {
    systems,
    validations,
    glossary,
    architecture,
    decisions,
    relationships,
  };
}

export function resolveAtlasRelatedHrefs(system: AtlasSystem): EosHref[] {
  const atlas = loadEngineeringAtlas();
  const links: EosHref[] = [];

  for (const id of system.relatedSystemIds) {
    const match = atlas.systems.find((entry) => entry.id === id);
    if (match) {
      links.push({
        href: atlasHref(`atlas-system-${match.id}`),
        label: match.title,
      });
    }
  }
  for (const id of system.relatedValidationIds) {
    const match = atlas.validationIndex.find((entry) => entry.id === id);
    if (match) {
      links.push({
        href: atlasHref(`atlas-validation-${match.id}`),
        label: match.name,
      });
    }
  }
  for (const id of system.relatedGlossaryIds) {
    const match = atlas.glossary.find((entry) => entry.id === id);
    if (match) {
      links.push({
        href: atlasHref(`atlas-glossary-${match.id}`),
        label: match.term,
      });
    }
  }
  for (const id of system.relatedArchitectureIds) {
    const match = atlas.architectureIndex.find((entry) => entry.id === id);
    if (match) {
      links.push({
        href: atlasHref(`atlas-component-${match.id}`),
        label: match.name,
      });
    }
  }

  return links;
}

export function resolveRelationshipStepHref(step: {
  kind: string;
  id: string;
}): string | null {
  const atlas = loadEngineeringAtlas();

  switch (step.kind) {
    case "system":
      return atlas.systems.some((entry) => entry.id === step.id)
        ? atlasHref(`atlas-system-${step.id}`)
        : null;
    case "validation":
      return atlas.validationIndex.some((entry) => entry.id === step.id)
        ? atlasHref(`atlas-validation-${step.id}`)
        : null;
    case "architecture":
      return atlas.architectureIndex.some((entry) => entry.id === step.id)
        ? atlasHref(`atlas-component-${step.id}`)
        : null;
    case "glossary":
      return atlas.glossary.some((entry) => entry.id === step.id)
        ? atlasHref(`atlas-glossary-${step.id}`)
        : null;
    case "decision":
      return atlas.decisions.some((entry) => entry.id === step.id)
        ? atlasHref(`atlas-decision-${step.id}`)
        : null;
    case "project": {
      const project =
        loadProjects().find((entry) => entry.id === step.id) ?? null;
      return project ? COMPANION_PATHS.project(project.slug) : null;
    }
    default:
      return null;
  }
}

export function resolveLineageReferenceHref(ref: {
  kind: string;
  id: string;
}): string | null {
  if (ref.kind === "project") {
    const project = loadProjects().find((entry) => entry.id === ref.id) ?? null;
    return project ? COMPANION_PATHS.project(project.slug) : null;
  }

  const kindMap: Record<string, string> = {
    "atlas-system": "system",
    "atlas-decision": "decision",
    "atlas-validation": "validation",
    "atlas-glossary": "glossary",
  };
  const mapped = kindMap[ref.kind];
  if (!mapped) {
    return null;
  }
  return resolveRelationshipStepHref({ kind: mapped, id: ref.id });
}

/** Section → Atlas see-also for EvidenceField inspector. */
export function relatedLinksForCaseSection(
  project: ProjectContent,
  sectionKey: string,
): EosHref[] {
  const network = getProjectNetwork(project.id);

  switch (sectionKey) {
    case "validationMethodology":
      return [
        ...network.validations.map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.name}`,
        })),
        ...network.systems
          .filter(
            (entry) =>
              entry.id === "validation-strategy" ||
              entry.id === "testing-philosophy",
          )
          .map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.title}`,
          })),
      ];
    case "decisionRecords":
      return [
        ...network.decisions.map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.decision}`,
        })),
        ...network.systems
          .filter((entry) => entry.id === "engineering-decision-records")
          .map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.title}`,
          })),
      ];
    case "failureModes":
      return network.systems
        .filter((entry) => entry.id === "failure-analysis")
        .map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.title}`,
        }));
    case "architecture":
      return [
        ...network.architecture.map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.name}`,
        })),
        ...network.systems
          .filter((entry) => entry.id === "api-boundary-design")
          .map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.title}`,
          })),
      ];
    case "decisions":
      return network.systems
        .filter((entry) => entry.id === "engineering-decision-records")
        .map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.title}`,
        }));
    default:
      return [];
  }
}
