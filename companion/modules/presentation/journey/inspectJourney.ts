import { COMPANION_PATHS } from "@/modules/experience/routes";
import {
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getEngineeringPatterns,
  getProjectBySlug,
  loadProjects,
  projectDisplayTitle,
} from "@/modules/meaning";
import { buildCapabilityAtlasModel } from "@/modules/presentation/capability/inspectCapability";
import type {
  JourneyConnection,
  JourneyLink,
  JourneyModel,
  JourneyStation,
} from "./journey.types";

export type {
  JourneyConnection,
  JourneyLink,
  JourneyModel,
  JourneyStation,
} from "./journey.types";
export { isJourneyStationId } from "./journey.types";

function uniqueLinks(links: JourneyLink[]): JourneyLink[] {
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

/** Hash id from Atlas evolution id — evo-2024-retrieval → 2024-retrieval. */
function stationIdFromEvolution(evolutionId: string): string {
  return evolutionId.replace(/^evo-/, "");
}

function projectHref(slug: string): string {
  return COMPANION_PATHS.project(slug);
}

/**
 * Build Engineering Journey stations from confirmed Atlas evolution only.
 * Never invents years, projects, stations, or decorative connections.
 */
export function buildJourneyModel(): JourneyModel {
  const atlas = getEngineeringAtlas();
  const projects = loadProjects();
  const patterns = getEngineeringPatterns();
  const capabilityModel = buildCapabilityAtlasModel();

  const projectById = new Map(
    projects.map((project) => [project.id, project] as const),
  );

  const stations: JourneyStation[] = [];

  for (const step of atlas.evolution) {
    if (step.confidence !== "confirmed") {
      continue;
    }

    const stationId = stationIdFromEvolution(step.id);
    const projectIds = step.projectIds;

    const projectLinks = uniqueLinks(
      projectIds.flatMap((id) => {
        const project = projectById.get(id) ?? getProjectBySlug(id);
        if (!project) {
          return [];
        }
        return [
          {
            href: projectHref(project.slug),
            label: projectDisplayTitle(project),
          },
        ];
      }),
    );

    const architecture = uniqueLinks(
      atlas.architectureIndex
        .filter((entry) =>
          entry.projectIds.some((id) => projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id}`,
          label: entry.name,
        })),
    );

    const decisions = uniqueLinks([
      ...atlas.decisions
        .filter((entry) =>
          entry.projectIds.some((id) => projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-decision-${entry.id}`,
          label: entry.decision,
        })),
      ...projectIds.flatMap((id) => {
        const project = projectById.get(id);
        if (!project) {
          return [];
        }
        return project.engineeringCaseFile.decisionLineages
          .filter((lineage) => lineage.id)
          .map((lineage) => ({
            href: `${projectHref(project.slug)}#decision-explorer-heading`,
            label: `${projectDisplayTitle(project)} · ${lineage.id}`,
          }));
      }),
    ]);

    const validation = uniqueLinks(
      atlas.validationIndex
        .filter((entry) =>
          entry.projectIds.some((id) => projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
          label: entry.name,
        })),
    );

    const atlasSystems = uniqueLinks(
      atlas.systems
        .filter((entry) =>
          entry.projectIds.some((id) => projectIds.includes(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-system-${entry.id}`,
          label: entry.title,
        })),
    );

    const relatedCapabilities = capabilityModel.inspections.filter((entry) =>
      entry.projects.some((link) =>
        projectLinks.some((project) => project.href === link.href),
      ),
    );

    const capabilities = uniqueLinks(
      relatedCapabilities.map((entry) => ({
        href: `${COMPANION_PATHS.home}#engineering-capability-atlas`,
        label: entry.label,
      })),
    );

    const knowledge = uniqueLinks(
      projectLinks.map((link) => ({
        href: `${link.href}#engineering-knowledge-graph`,
        label: `Knowledge graph · ${link.label}`,
      })),
    );

    const evidence = uniqueLinks([
      {
        href: `${COMPANION_PATHS.atlas}#atlas-evolution-${step.id}`,
        label: `Atlas evolution · ${step.label}`,
      },
      ...projectLinks.map((link) => ({
        href: `${link.href}#engineering-evolution`,
        label: `Case study evolution · ${link.label}`,
      })),
      ...patterns
        .filter((pattern) =>
          pattern.projectIds.some((id) => projectIds.includes(id)),
        )
        .map((pattern) => ({
          href: `${COMPANION_PATHS.archive}#pattern-${pattern.id}`,
          label: `Pattern · ${pattern.title}`,
        })),
    ]);

    stations.push({
      id: stationId,
      evolutionId: step.id,
      title: step.label,
      summary: step.evidence,
      year: step.year,
      announce: `Journey station · ${step.label}`,
      projects: projectLinks,
      capabilities,
      capabilityIds: relatedCapabilities.map((entry) => entry.id),
      architecture,
      decisions,
      validation,
      atlasSystems,
      knowledge,
      evidence,
      connections: [],
      confidenceCaption: evidenceConfidenceCaption(step.confidence),
    });
  }

  // Chronological connections (Atlas order) + shared engineering entities.
  for (let index = 0; index < stations.length; index += 1) {
    const current = stations[index];
    if (!current) {
      continue;
    }
    const connections: JourneyConnection[] = [];

    const next = stations[index + 1];
    if (next) {
      connections.push({
        toStationId: next.id,
        relation: "precedes",
      });
    }

    for (let otherIndex = 0; otherIndex < stations.length; otherIndex += 1) {
      if (otherIndex === index) {
        continue;
      }
      const other = stations[otherIndex];
      if (!other) {
        continue;
      }

      const sharedSystem = current.atlasSystems.find((link) =>
        other.atlasSystems.some((entry) => entry.href === link.href),
      );
      if (sharedSystem) {
        connections.push({
          toStationId: other.id,
          relation: "shares Atlas system",
          via: sharedSystem,
        });
      }

      const sharedArchitecture = current.architecture.find((link) =>
        other.architecture.some((entry) => entry.href === link.href),
      );
      if (sharedArchitecture) {
        connections.push({
          toStationId: other.id,
          relation: "shares architecture",
          via: sharedArchitecture,
        });
      }

      const sharedCapability = current.capabilities.find((link) =>
        other.capabilities.some((entry) => entry.label === link.label),
      );
      if (sharedCapability) {
        connections.push({
          toStationId: other.id,
          relation: "shares capability",
          via: sharedCapability,
        });
      }
    }

    // Atlas relationship chains that mention projects from both stations.
    for (const relationship of atlas.relationships) {
      const stepProjectIds = new Set(
        relationship.steps
          .filter((entry) => entry.kind === "project")
          .map((entry) => entry.id),
      );
      const currentProjects = current.projects
        .map((link) => link.href.replace(/^\/archive\//, ""))
        .filter((slug) => stepProjectIds.has(slug));
      const otherStations = stations.filter((station) => {
        if (station.id === current.id) {
          return false;
        }
        return station.projects.some((link) =>
          stepProjectIds.has(link.href.replace(/^\/archive\//, "")),
        );
      });

      if (currentProjects.length === 0) {
        continue;
      }

      for (const other of otherStations) {
        connections.push({
          toStationId: other.id,
          relation: relationship.title,
          via: {
            href: `${COMPANION_PATHS.atlas}#atlas-relationship-${relationship.id}`,
            label: relationship.title,
          },
        });
      }
    }

    // Deduplicate connections by toStationId + relation + via.
    const seen = new Set<string>();
    current.connections = connections.filter((connection) => {
      const key = `${connection.toStationId}::${connection.relation}::${connection.via?.href ?? ""}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  return { stations };
}
