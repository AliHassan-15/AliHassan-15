import type {
  DiscoveryStatus,
  EvidenceString,
  EvidenceStringList,
} from "./schema";

export type HonestyPresentation =
  { kind: "show"; text: string } | { kind: "omit" };

export type HonestyDisclosure = {
  status: DiscoveryStatus;
  text: string | null;
  deferralId?: string;
};

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
      return { status: "confirmed", text: field.value };
    case "missing":
      return { status: "missing", text: null };
    case "deferred":
      return {
        status: "deferred",
        text: null,
        deferralId: field.deferralId,
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
      return { status: "confirmed", text: field.value.join(", ") };
    case "missing":
      return { status: "missing", text: null };
    case "deferred":
      return {
        status: "deferred",
        text: null,
        deferralId: field.deferralId,
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

export function evidenceStatusCaption(disclosure: HonestyDisclosure): string {
  switch (disclosure.status) {
    case "confirmed":
      return "Confirmed";
    case "missing":
      return "Missing";
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
