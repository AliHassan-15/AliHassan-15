import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  type HonestyDisclosure,
} from "@/modules/meaning/honesty";
import type {
  AtlasEvolutionStep,
  DecisionLineage,
  ProjectContent,
  ProvenanceSource,
} from "@/modules/meaning/schema";
import type { DecisionExplorerLink } from "./inspectDecision";

export type EvolutionExplorerLink = DecisionExplorerLink;

/** Fully serializable plate model — safe for client components. */
export type EvolutionInspection = {
  id: string;
  label: string;
  milestoneText: string;
  dateText: string;
  whyText: string;
  whatChangedText: string;
  impactText: string;
  tradeoffsText: string;
  relatedArchitecture: EvolutionExplorerLink[];
  relatedAdr: EvolutionExplorerLink[];
  relatedValidation: EvolutionExplorerLink[];
  relatedFailure: EvolutionExplorerLink[];
  relatedSystems: EvolutionExplorerLink[];
  evidenceText: string;
  artifacts: string[];
  provenance: string[];
  confidenceCaption: string;
};

function fieldText(disclosure: HonestyDisclosure): string {
  return formatEvidenceStatus(disclosure, { missingLabel: "Missing" });
}

function collectProvenance(sources: ProvenanceSource[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const source of sources) {
    const label = formatProvenanceSource(source);
    if (seen.has(label)) {
      continue;
    }
    seen.add(label);
    out.push(label);
  }
  return out;
}

function uniqueLinks(links: EvolutionExplorerLink[]): EvolutionExplorerLink[] {
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

function relatedAdrLinks(
  lineages: DecisionLineage[],
  atlasDecisions: EvolutionExplorerLink[],
): EvolutionExplorerLink[] {
  const fromLineages = lineages
    .filter(
      (lineage) =>
        discloseEvidenceString(lineage.decision).status === "confirmed",
    )
    .map((lineage) => ({
      href: `#lineage-${lineage.id}`,
      label: lineage.id,
    }));
  return uniqueLinks([...fromLineages, ...atlasDecisions]);
}

function assetLabels(project: ProjectContent): string[] {
  const assets = discloseEvidenceStringList(project.engineeringCaseFile.assets);
  if (assets.status !== "confirmed" || !assets.text) {
    return [];
  }
  return assets.text.split(", ").filter((part) => part.length > 0);
}

function whyForMilestone(
  lineages: DecisionLineage[],
  decisions: HonestyDisclosure,
  soleMilestone: boolean,
): string {
  if (soleMilestone) {
    for (const lineage of lineages) {
      const why = discloseEvidenceString(lineage.why);
      if (why.status === "confirmed" && why.text) {
        return why.text;
      }
    }
    if (decisions.status === "confirmed" && decisions.text) {
      return decisions.text;
    }
  }
  return "Missing";
}

/**
 * Build Evolution Explorer inspections from Atlas evolution entries +
 * confirmed case-file chronology only. Never invents milestones.
 */
export function buildEvolutionInspections(args: {
  project: ProjectContent;
  atlasEvolution: Array<AtlasEvolutionStep & { href: string }>;
  relatedArchitecture: EvolutionExplorerLink[];
  relatedValidation: EvolutionExplorerLink[];
  relatedFailure: EvolutionExplorerLink[];
  relatedSystems: EvolutionExplorerLink[];
  relatedAtlasDecisions: EvolutionExplorerLink[];
}): EvolutionInspection[] {
  const {
    project,
    atlasEvolution,
    relatedArchitecture,
    relatedValidation,
    relatedFailure,
    relatedSystems,
    relatedAtlasDecisions,
  } = args;

  const methods = atlasEvolution.filter(
    (entry) =>
      entry.confidence === "confirmed" ||
      entry.confidence === "readme-attributed" ||
      entry.confidence === "public-artifact",
  );

  if (methods.length === 0) {
    return [];
  }

  const timeline = discloseEvidenceString(project.engineeringCaseFile.timeline);
  const tradeoffs = discloseEvidenceString(project.caseStudy.tradeoffs);
  const decisions = discloseEvidenceString(project.caseStudy.decisions);
  const outcomes = discloseEvidenceString(project.measuredOutcomes);
  const lineages = project.engineeringCaseFile.decisionLineages;
  const artifacts = assetLabels(project);
  const soleMilestone = methods.length === 1;
  const adrLinks = relatedAdrLinks(lineages, relatedAtlasDecisions);

  return methods.map((entry) => {
    const provenance = collectProvenance([...timeline.provenance]);

    const whatParts: string[] = [entry.evidence];
    if (timeline.status === "confirmed" && timeline.text) {
      whatParts.push(timeline.text);
    }

    const evidenceParts: string[] = [entry.evidence];
    if (timeline.status === "confirmed" && timeline.text) {
      evidenceParts.push(timeline.text);
    }

    return {
      id: entry.id,
      label: entry.label,
      milestoneText: entry.label,
      dateText: entry.year,
      whyText: whyForMilestone(lineages, decisions, soleMilestone),
      whatChangedText: whatParts.join(" "),
      impactText: fieldText(outcomes),
      tradeoffsText: fieldText(tradeoffs),
      relatedArchitecture,
      relatedAdr: adrLinks,
      relatedValidation,
      relatedFailure,
      relatedSystems,
      evidenceText: evidenceParts.join(" "),
      artifacts: artifacts.length > 0 ? artifacts : provenance,
      provenance: provenance.length > 0 ? provenance : ["Missing"],
      confidenceCaption: evidenceConfidenceCaption(entry.confidence),
    };
  });
}

/**
 * When Atlas has no evolution entry but case-file timeline is confirmed,
 * expose a single timeline inspection — still Discovery-honest.
 */
export function buildTimelineFallbackInspection(args: {
  project: ProjectContent;
  relatedArchitecture: EvolutionExplorerLink[];
  relatedValidation: EvolutionExplorerLink[];
  relatedFailure: EvolutionExplorerLink[];
  relatedSystems: EvolutionExplorerLink[];
  relatedAtlasDecisions: EvolutionExplorerLink[];
}): EvolutionInspection | null {
  const {
    project,
    relatedArchitecture,
    relatedValidation,
    relatedFailure,
    relatedSystems,
    relatedAtlasDecisions,
  } = args;
  const timeline = discloseEvidenceString(project.engineeringCaseFile.timeline);
  if (timeline.status !== "confirmed" || !timeline.text) {
    return null;
  }

  const tradeoffs = discloseEvidenceString(project.caseStudy.tradeoffs);
  const decisions = discloseEvidenceString(project.caseStudy.decisions);
  const outcomes = discloseEvidenceString(project.measuredOutcomes);
  const lineages = project.engineeringCaseFile.decisionLineages;
  const provenance = collectProvenance([...timeline.provenance]);
  const artifacts = assetLabels(project);

  return {
    id: "engineering-timeline",
    label: "Engineering timeline",
    milestoneText: "Engineering timeline",
    dateText: "Missing",
    whyText: whyForMilestone(lineages, decisions, true),
    whatChangedText: timeline.text,
    impactText: fieldText(outcomes),
    tradeoffsText: fieldText(tradeoffs),
    relatedArchitecture,
    relatedAdr: relatedAdrLinks(lineages, relatedAtlasDecisions),
    relatedValidation,
    relatedFailure,
    relatedSystems,
    evidenceText: timeline.text,
    artifacts: artifacts.length > 0 ? artifacts : provenance,
    provenance: provenance.length > 0 ? provenance : ["Missing"],
    confidenceCaption: evidenceConfidenceCaption(timeline.confidence),
  };
}
