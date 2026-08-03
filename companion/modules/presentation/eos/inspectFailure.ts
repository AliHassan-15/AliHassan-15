import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  type HonestyDisclosure,
} from "@/modules/meaning/honesty";
import type {
  AtlasFailure,
  DecisionLineage,
  ProjectContent,
  ProvenanceSource,
} from "@/modules/meaning/schema";
import type { DecisionExplorerLink } from "./inspectDecision";

export type FailureExplorerLink = DecisionExplorerLink;

/** Fully serializable plate model — safe for client components. */
export type FailureInspection = {
  id: string;
  label: string;
  failureText: string;
  whyText: string;
  detectionText: string;
  mitigationText: string;
  recoveryText: string;
  limitationText: string;
  relatedArchitecture: FailureExplorerLink[];
  relatedDecision: FailureExplorerLink[];
  relatedValidation: FailureExplorerLink[];
  relatedSystems: FailureExplorerLink[];
  evidenceText: string;
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

function uniqueLinks(links: FailureExplorerLink[]): FailureExplorerLink[] {
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

function detectionText(
  validations: FailureExplorerLink[],
  methodology: HonestyDisclosure,
): string {
  if (validations.length > 0) {
    return validations.map((link) => link.label).join(" · ");
  }
  return fieldText(methodology);
}

function mitigationFromLineages(
  lineages: DecisionLineage[],
  soleFailure: boolean,
): string {
  // Only when a project has a single confirmed failure scenario can a confirmed
  // ADR be presented as project-level mitigation without inventing bindings.
  if (!soleFailure) {
    return "Missing";
  }
  for (const lineage of lineages) {
    const decision = discloseEvidenceString(lineage.decision);
    const why = discloseEvidenceString(lineage.why);
    if (decision.status === "confirmed" && decision.text) {
      if (why.status === "confirmed" && why.text) {
        return `${decision.text} ${why.text}`;
      }
      return decision.text;
    }
  }
  return "Missing";
}

function relatedDecisionLinks(
  lineages: DecisionLineage[],
  atlasDecisions: FailureExplorerLink[],
): FailureExplorerLink[] {
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

/**
 * Build Failure & Resilience inspections from Atlas failure entries +
 * confirmed case-file fields only. Never invents scenarios.
 */
export function buildFailureInspections(args: {
  project: ProjectContent;
  atlasFailures: Array<AtlasFailure & { href: string }>;
  relatedArchitecture: FailureExplorerLink[];
  relatedValidation: FailureExplorerLink[];
  relatedSystems: FailureExplorerLink[];
  relatedAtlasDecisions: FailureExplorerLink[];
}): FailureInspection[] {
  const {
    project,
    atlasFailures,
    relatedArchitecture,
    relatedValidation,
    relatedSystems,
    relatedAtlasDecisions,
  } = args;

  const methods = atlasFailures.filter(
    (entry) =>
      entry.confidence === "confirmed" ||
      entry.confidence === "readme-attributed" ||
      entry.confidence === "public-artifact",
  );

  if (methods.length === 0) {
    return [];
  }

  const risks = discloseEvidenceString(
    project.engineeringCaseFile.technicalRisks,
  );
  const failureModes = discloseEvidenceString(
    project.engineeringCaseFile.failureModes,
  );
  const limitations = discloseEvidenceString(
    project.engineeringCaseFile.knownLimitations,
  );
  const methodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );
  const constraints = discloseEvidenceString(project.caseStudy.constraints);
  const lineages = project.engineeringCaseFile.decisionLineages;
  const assets = discloseEvidenceStringList(project.engineeringCaseFile.assets);
  const assetLabels =
    assets.status === "confirmed" && assets.text
      ? assets.text.split(", ").filter((part) => part.length > 0)
      : [];

  const soleFailure = methods.length === 1;
  const mitigation = mitigationFromLineages(lineages, soleFailure);
  const decisions = relatedDecisionLinks(lineages, relatedAtlasDecisions);

  return methods.map((entry) => {
    const provenance = collectProvenance([
      ...failureModes.provenance,
      ...risks.provenance,
      ...limitations.provenance,
      ...methodology.provenance,
      ...constraints.provenance,
    ]);

    const whyParts: string[] = [entry.detail];
    if (risks.status === "confirmed" && risks.text) {
      whyParts.push(risks.text);
    }

    const evidenceParts: string[] = [entry.detail];
    if (failureModes.status === "confirmed" && failureModes.text) {
      evidenceParts.push(failureModes.text);
    }

    return {
      id: entry.id,
      label: entry.title,
      failureText: entry.title,
      whyText: whyParts.join(" "),
      detectionText: detectionText(relatedValidation, methodology),
      mitigationText: mitigation,
      recoveryText: fieldText(failureModes),
      limitationText: fieldText(limitations),
      relatedArchitecture,
      relatedDecision: decisions,
      relatedValidation,
      relatedSystems,
      evidenceText: evidenceParts.join(" "),
      provenance:
        provenance.length > 0
          ? provenance
          : assetLabels.length > 0
            ? assetLabels
            : ["Missing"],
      confidenceCaption: evidenceConfidenceCaption(entry.confidence),
    };
  });
}

/**
 * When Atlas has no failure entries but case-file failureModes is confirmed,
 * expose a single failure-modes inspection — still Discovery-honest.
 */
export function buildFailureModesFallbackInspection(args: {
  project: ProjectContent;
  relatedArchitecture: FailureExplorerLink[];
  relatedValidation: FailureExplorerLink[];
  relatedSystems: FailureExplorerLink[];
  relatedAtlasDecisions: FailureExplorerLink[];
}): FailureInspection | null {
  const {
    project,
    relatedArchitecture,
    relatedValidation,
    relatedSystems,
    relatedAtlasDecisions,
  } = args;
  const failureModes = discloseEvidenceString(
    project.engineeringCaseFile.failureModes,
  );
  if (failureModes.status !== "confirmed" || !failureModes.text) {
    return null;
  }

  const risks = discloseEvidenceString(
    project.engineeringCaseFile.technicalRisks,
  );
  const limitations = discloseEvidenceString(
    project.engineeringCaseFile.knownLimitations,
  );
  const methodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );
  const lineages = project.engineeringCaseFile.decisionLineages;
  const provenance = collectProvenance([
    ...failureModes.provenance,
    ...risks.provenance,
    ...limitations.provenance,
    ...methodology.provenance,
  ]);

  return {
    id: "failure-modes",
    label: "Documented failure modes",
    failureText: "Documented failure modes",
    whyText: fieldText(risks),
    detectionText: detectionText(relatedValidation, methodology),
    mitigationText: mitigationFromLineages(lineages, true),
    recoveryText: failureModes.text,
    limitationText: fieldText(limitations),
    relatedArchitecture,
    relatedDecision: relatedDecisionLinks(lineages, relatedAtlasDecisions),
    relatedValidation,
    relatedSystems,
    evidenceText: failureModes.text,
    provenance: provenance.length > 0 ? provenance : ["Missing"],
    confidenceCaption: evidenceConfidenceCaption(failureModes.confidence),
  };
}
