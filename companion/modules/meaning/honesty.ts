import type {
  DiscoveryStatus,
  EvidenceConfidence,
  EvidenceString,
  EvidenceStringList,
  ProvenanceSource,
} from "./schema";

export type HonestyPresentation =
  { kind: "show"; text: string } | { kind: "omit" };

export type HonestyDisclosure = {
  status: DiscoveryStatus;
  text: string | null;
  deferralId?: string;
  confidence: EvidenceConfidence;
  provenance: ProvenanceSource[];
};

function resolveConfidence(
  status: DiscoveryStatus,
  confidence?: EvidenceConfidence,
): EvidenceConfidence {
  if (status === "missing") {
    return "missing";
  }
  if (status === "deferred") {
    return "deferred";
  }
  return confidence ?? "confirmed";
}

/**
 * Confirmed values may be shown. Missing/Deferred are omitted — never upgraded.
 * Use for entrance / compact surfaces.
 */
export function presentEvidenceString(
  field: EvidenceString,
): HonestyPresentation {
  if (field.status === "confirmed") {
    return { kind: "show", text: field.value };
  }

  return { kind: "omit" };
}

/**
 * Case-study surfaces disclose status honestly — never hide Missing/Deferred.
 */
export function discloseEvidenceString(
  field: EvidenceString,
): HonestyDisclosure {
  switch (field.status) {
    case "confirmed":
      return {
        status: "confirmed",
        text: field.value,
        confidence: resolveConfidence("confirmed", field.confidence),
        provenance: field.provenance ?? [],
      };
    case "missing":
      return {
        status: "missing",
        text: null,
        confidence: "missing",
        provenance: [],
      };
    case "deferred":
      return {
        status: "deferred",
        text: null,
        deferralId: field.deferralId,
        confidence: "deferred",
        provenance: [],
      };
    default: {
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
}

export function discloseEvidenceStringList(
  field: EvidenceStringList,
): HonestyDisclosure {
  switch (field.status) {
    case "confirmed":
      return {
        status: "confirmed",
        text: field.value.join(", "),
        confidence: resolveConfidence("confirmed", field.confidence),
        provenance: field.provenance ?? [],
      };
    case "missing":
      return {
        status: "missing",
        text: null,
        confidence: "missing",
        provenance: [],
      };
    case "deferred":
      return {
        status: "deferred",
        text: null,
        deferralId: field.deferralId,
        confidence: "deferred",
        provenance: [],
      };
    default: {
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
}

/** Human-readable Discovery status for case-study surfaces. */
export function formatEvidenceStatus(
  disclosure: HonestyDisclosure,
  options?: { missingLabel?: string },
): string {
  const missingLabel = options?.missingLabel ?? "Missing";

  switch (disclosure.status) {
    case "confirmed":
      return disclosure.text ?? missingLabel;
    case "missing":
      return missingLabel;
    case "deferred":
      return disclosure.deferralId
        ? `Deferred · ${disclosure.deferralId}`
        : "Deferred";
    default: {
      const _exhaustive: never = disclosure.status;
      return _exhaustive;
    }
  }
}

export function evidenceConfidenceCaption(
  confidence: EvidenceConfidence,
  deferralId?: string,
): string {
  switch (confidence) {
    case "confirmed":
      return "Confirmed";
    case "readme-attributed":
      return "README-attributed";
    case "public-artifact":
      return "Public artifact";
    case "missing":
      return "Missing";
    case "deferred":
      return deferralId ? `Deferred · ${deferralId}` : "Deferred";
    default: {
      const _exhaustive: never = confidence;
      return _exhaustive;
    }
  }
}

export function evidenceStatusCaption(disclosure: HonestyDisclosure): string {
  return evidenceConfidenceCaption(
    disclosure.confidence,
    disclosure.deferralId,
  );
}

export function formatProvenanceSource(source: ProvenanceSource): string {
  const parts: string[] = [source.label];
  if (source.repository) {
    parts.push(`Repository: ${source.repository}`);
  }
  if (source.commit) {
    parts.push(`Commit: ${source.commit.slice(0, 12)}`);
  }
  if (source.path) {
    parts.push(`Path: ${source.path}`);
  }
  if (source.lines) {
    parts.push(`Lines: ${source.lines}`);
  }
  if (source.section) {
    parts.push(`Section: ${source.section}`);
  }
  return parts.join(" · ");
}
