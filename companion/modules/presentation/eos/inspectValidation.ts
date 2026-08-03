import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  evidenceStatusCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  type HonestyDisclosure,
} from "@/modules/meaning/honesty";
import type {
  AtlasValidation,
  DecisionLineage,
  ProjectContent,
  ProvenanceSource,
} from "@/modules/meaning/schema";
import type { DecisionExplorerLink } from "./inspectDecision";

export type ValidationExplorerLink = DecisionExplorerLink;

export type ValidationSystemLink = ValidationExplorerLink & {
  relatedValidationIds?: string[];
};

/** Fully serializable plate model — safe for client components. */
export type ValidationInspection = {
  id: string;
  label: string;
  objectiveText: string;
  methodText: string;
  whyText: string;
  evidenceText: string;
  outcomeText: string;
  limitationsText: string;
  relatedArchitecture: ValidationExplorerLink[];
  relatedAdr: ValidationExplorerLink[];
  relatedSystems: ValidationExplorerLink[];
  artifacts: string[];
  confidenceCaption: string;
  provenance: string[];
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

function uniqueLinks(
  links: ValidationExplorerLink[],
): ValidationExplorerLink[] {
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

function lineageRefsValidation(
  lineage: DecisionLineage,
  validationId: string,
): boolean {
  return lineage.referencedAgainBy.some(
    (ref) => ref.kind === "atlas-validation" && ref.id === validationId,
  );
}

function whyForValidation(
  lineages: DecisionLineage[],
  validationId: string,
  soleMethod: boolean,
): string {
  for (const lineage of lineages) {
    if (
      !lineageRefsValidation(lineage, validationId) &&
      !(
        soleMethod &&
        discloseEvidenceString(lineage.validation).status === "confirmed"
      )
    ) {
      continue;
    }
    const why = discloseEvidenceString(lineage.why);
    if (why.status === "confirmed" && why.text) {
      return why.text;
    }
  }
  return "Missing";
}

function relatedAdrLinks(
  lineages: DecisionLineage[],
  validationId: string,
  soleMethod: boolean,
): ValidationExplorerLink[] {
  const links: ValidationExplorerLink[] = [];
  for (const lineage of lineages) {
    const tied =
      lineageRefsValidation(lineage, validationId) ||
      (soleMethod &&
        discloseEvidenceString(lineage.validation).status === "confirmed");
    if (!tied) {
      continue;
    }
    links.push({
      href: `#lineage-${lineage.id}`,
      label: lineage.id,
    });
  }
  return uniqueLinks(links);
}

function systemsForMethod(
  systems: ValidationSystemLink[],
  validationId: string,
): ValidationExplorerLink[] {
  const tied = systems.filter((link) =>
    link.relatedValidationIds?.includes(validationId),
  );
  if (tied.length > 0) {
    return uniqueLinks(tied.map(({ href, label }) => ({ href, label })));
  }
  return uniqueLinks(systems.map(({ href, label }) => ({ href, label })));
}

function assetLabels(project: ProjectContent): string[] {
  const assets = discloseEvidenceStringList(project.engineeringCaseFile.assets);
  if (assets.status !== "confirmed" || !assets.text) {
    return [];
  }
  return assets.text.split(", ").filter((part) => part.length > 0);
}

/**
 * Build Validation Explorer inspections from Atlas validation entries +
 * confirmed case-file fields only. Never invents methods or outcomes.
 */
export function buildValidationInspections(args: {
  project: ProjectContent;
  atlasValidations: Array<AtlasValidation & { href: string }>;
  relatedArchitecture: ValidationExplorerLink[];
  relatedSystems: ValidationSystemLink[];
}): ValidationInspection[] {
  const { project, atlasValidations, relatedArchitecture, relatedSystems } =
    args;
  const methodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );
  const outcomes = discloseEvidenceString(project.measuredOutcomes);
  const limitations = discloseEvidenceString(
    project.engineeringCaseFile.knownLimitations,
  );
  const lineages = project.engineeringCaseFile.decisionLineages;

  const methods = atlasValidations.filter(
    (entry) =>
      entry.confidence === "confirmed" ||
      entry.confidence === "readme-attributed" ||
      entry.confidence === "public-artifact",
  );

  if (methods.length === 0) {
    return [];
  }

  const soleMethod = methods.length === 1;
  const artifacts = assetLabels(project);

  return methods.map((entry) => {
    const provenance = collectProvenance([
      ...methodology.provenance,
      ...outcomes.provenance,
      ...limitations.provenance,
    ]);

    const evidenceParts: string[] = [];
    if (entry.detail) {
      evidenceParts.push(entry.detail);
    }
    if (methodology.status === "confirmed" && methodology.text) {
      evidenceParts.push(methodology.text);
    }

    return {
      id: entry.id,
      label: entry.name,
      objectiveText: fieldText(methodology),
      methodText: entry.name,
      whyText: whyForValidation(lineages, entry.id, soleMethod),
      evidenceText:
        evidenceParts.length > 0 ? evidenceParts.join(" ") : "Missing",
      outcomeText: fieldText(outcomes),
      limitationsText: fieldText(limitations),
      relatedArchitecture,
      relatedAdr: relatedAdrLinks(lineages, entry.id, soleMethod),
      relatedSystems: systemsForMethod(relatedSystems, entry.id),
      artifacts: artifacts.length > 0 ? artifacts : provenance,
      confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      provenance: provenance.length > 0 ? provenance : ["Missing"],
    };
  });
}

/**
 * When Atlas has no validation entries but case-file methodology is confirmed,
 * expose a single methodology inspection — still Discovery-honest.
 */
export function buildMethodologyFallbackInspection(args: {
  project: ProjectContent;
  relatedArchitecture: ValidationExplorerLink[];
  relatedSystems: ValidationSystemLink[];
}): ValidationInspection | null {
  const { project, relatedArchitecture, relatedSystems } = args;
  const methodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );
  if (methodology.status !== "confirmed" || !methodology.text) {
    return null;
  }

  const outcomes = discloseEvidenceString(project.measuredOutcomes);
  const limitations = discloseEvidenceString(
    project.engineeringCaseFile.knownLimitations,
  );
  const provenance = collectProvenance([
    ...methodology.provenance,
    ...outcomes.provenance,
    ...limitations.provenance,
  ]);
  const artifacts = assetLabels(project);
  const lineages = project.engineeringCaseFile.decisionLineages;

  return {
    id: "validation-methodology",
    label: "Validation methodology",
    objectiveText: methodology.text,
    methodText: "Validation methodology",
    whyText: whyForValidation(lineages, "validation-methodology", true),
    evidenceText: methodology.text,
    outcomeText: fieldText(outcomes),
    limitationsText: fieldText(limitations),
    relatedArchitecture,
    relatedAdr: relatedAdrLinks(lineages, "validation-methodology", true),
    relatedSystems: uniqueLinks(
      relatedSystems.map(({ href, label }) => ({ href, label })),
    ),
    artifacts: artifacts.length > 0 ? artifacts : provenance,
    confidenceCaption: evidenceStatusCaption(methodology),
    provenance: provenance.length > 0 ? provenance : ["Missing"],
  };
}
