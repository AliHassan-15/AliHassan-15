import {
  loadEntranceProjects,
  loadIdentity,
  loadProjectBySlug,
  loadProjects,
  validateAllContent,
} from "./load";
import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  evidenceStatusCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  presentEvidenceString,
} from "./honesty";
import {
  getProjectNetwork,
  relatedLinksForCaseSection,
  resolveAtlasRelatedHrefs,
  resolveLineageReferenceHref,
  resolveRelationshipStepHref,
} from "./network";
import {
  loadEngineeringAtlas,
  loadEngineeringPatterns,
} from "./load/secondary";
import type {
  EngineeringAtlas,
  EngineeringPattern,
  IdentityContent,
  ProjectContent,
} from "./schema";

export type {
  IdentityContent,
  ProjectContent,
  CaseStudySections,
  EvidenceString,
  EvidenceStringList,
  DiscoveryStatus,
  EvidenceConfidence,
  ProvenanceSource,
  AssetReference,
  EngineeringPattern,
  EngineeringReference,
  EngineeringAtlas,
  AtlasSystem,
  AtlasEvolutionStep,
  AtlasArchitectureComponent,
  AtlasDecision,
  AtlasFailure,
  AtlasValidation,
  AtlasGlossaryEntry,
  AtlasRelationship,
  DecisionLineage,
} from "./schema";

export type { HonestyDisclosure, HonestyPresentation } from "./honesty";
export type { EosHref, ProjectNetwork } from "./network";

export {
  presentEvidenceString,
  discloseEvidenceString,
  discloseEvidenceStringList,
  formatEvidenceStatus,
  evidenceStatusCaption,
  evidenceConfidenceCaption,
  formatProvenanceSource,
  validateAllContent,
  loadIdentity,
  loadProjects,
  loadEntranceProjects,
  loadProjectBySlug,
  getProjectNetwork,
  relatedLinksForCaseSection,
  resolveAtlasRelatedHrefs,
  resolveLineageReferenceHref,
  resolveRelationshipStepHref,
};

/** Presentation-facing identity — links flattened for existing surfaces. */
export type Identity = IdentityContent & {
  githubProfileUrl: string;
  githubEntranceUrl: string;
  companionDestinationUrl: string | null;
};

export function getIdentity(): Identity {
  const identity = loadIdentity();
  return {
    ...identity,
    githubProfileUrl: identity.links.githubProfile,
    githubEntranceUrl: identity.links.githubEntrance,
    companionDestinationUrl: identity.links.companionDestination ?? null,
  };
}

export function getEntranceProjects(): ProjectContent[] {
  return loadEntranceProjects();
}

export function getEvidenceTableProjects(): ProjectContent[] {
  return loadProjects().filter((project) => project.includeInEvidenceTable);
}

export function getArchiveProjects(): ProjectContent[] {
  return loadProjects().filter((project) => project.includeInArchive);
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  return loadProjectBySlug(slug);
}

export function getEngineeringPatterns(): EngineeringPattern[] {
  return loadEngineeringPatterns().patterns;
}

export function getEngineeringAtlas(): EngineeringAtlas {
  return loadEngineeringAtlas();
}

export function projectDisplayTitle(project: ProjectContent): string {
  const subtitle = presentEvidenceString(project.subtitle);
  if (subtitle.kind === "show") {
    return `${project.name} — ${subtitle.text}`;
  }
  return project.name;
}

export function projectRepoHref(project: ProjectContent): string | null {
  const url = presentEvidenceString(project.repositoryUrl);
  return url.kind === "show" ? url.text : null;
}

export function projectTierLabel(tier: ProjectContent["tier"]): string {
  switch (tier) {
    case "flagship":
      return "Load-bearing";
    case "supporting":
      return "Supporting";
    case "archive":
      return "Archive";
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
}
