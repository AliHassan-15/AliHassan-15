import {
  discloseEvidenceString,
  evidenceStatusCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  type HonestyDisclosure,
} from "@/modules/meaning/honesty";
import type {
  DecisionLineage,
  ProvenanceSource,
} from "@/modules/meaning/schema";

export type DecisionExplorerLink = {
  href: string;
  label: string;
};

/** Fully serializable plate model — safe for client components. */
export type DecisionInspection = {
  id: string;
  label: string;
  decisionText: string;
  reasonText: string;
  tradeoffsText: string;
  constraintsText: string;
  validationText: string;
  relatedArchitecture: DecisionExplorerLink[];
  relatedSystems: DecisionExplorerLink[];
  evidenceCaption: string;
  artifacts: string[];
};

function decisionLabel(lineage: DecisionLineage): string {
  const disclosure = discloseEvidenceString(lineage.decision);
  if (disclosure.status === "confirmed" && disclosure.text) {
    const text = disclosure.text.trim();
    return text.length > 96 ? `${text.slice(0, 93).trimEnd()}…` : text;
  }
  return lineage.id;
}

function fieldText(disclosure: HonestyDisclosure): string {
  return formatEvidenceStatus(disclosure, { missingLabel: "Missing" });
}

function tradeoffsText(
  tradeoffs: HonestyDisclosure,
  alternativeRejected: HonestyDisclosure,
): string {
  const parts: string[] = [];
  if (tradeoffs.status === "confirmed") {
    parts.push(fieldText(tradeoffs));
  }
  if (alternativeRejected.status === "confirmed") {
    parts.push(`Alternative rejected — ${fieldText(alternativeRejected)}`);
  }
  if (parts.length > 0) {
    return parts.join(" ");
  }
  if (tradeoffs.status === "deferred") {
    return fieldText(tradeoffs);
  }
  if (alternativeRejected.status === "deferred") {
    return fieldText(alternativeRejected);
  }
  return "Missing";
}

function collectArtifacts(sources: ProvenanceSource[]): string[] {
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

/**
 * Build a Decision Explorer plate from confirmed lineage + case-study context.
 * Missing/Deferred fields stay Missing/Deferred — never invented.
 */
export function inspectDecision(args: {
  lineage: DecisionLineage;
  tradeoffs: HonestyDisclosure;
  constraints: HonestyDisclosure;
  relatedArchitecture: DecisionExplorerLink[];
  relatedSystems: DecisionExplorerLink[];
}): DecisionInspection {
  const { lineage, tradeoffs, constraints, relatedArchitecture } = args;
  const decision = discloseEvidenceString(lineage.decision);
  const reason = discloseEvidenceString(lineage.why);
  const alternativeRejected = discloseEvidenceString(
    lineage.alternativeRejected,
  );
  const validation = discloseEvidenceString(lineage.validation);

  const artifacts = collectArtifacts([
    ...decision.provenance,
    ...reason.provenance,
    ...alternativeRejected.provenance,
    ...validation.provenance,
    ...tradeoffs.provenance,
    ...constraints.provenance,
  ]);

  return {
    id: lineage.id,
    label: decisionLabel(lineage),
    decisionText: fieldText(decision),
    reasonText: fieldText(reason),
    tradeoffsText: tradeoffsText(tradeoffs, alternativeRejected),
    constraintsText: fieldText(constraints),
    validationText: fieldText(validation),
    relatedArchitecture,
    relatedSystems: args.relatedSystems,
    evidenceCaption: evidenceStatusCaption(decision),
    artifacts,
  };
}

/**
 * Confirmed lineages only — decisions without a confirmed Decision step are omitted.
 */
export function confirmedDecisionLineages(
  lineages: DecisionLineage[],
): DecisionLineage[] {
  return lineages.filter(
    (lineage) =>
      discloseEvidenceString(lineage.decision).status === "confirmed",
  );
}
