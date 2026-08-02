import type { AudioCapability, AudioGateReason } from "./types";

export type AudioGateResult = {
  capability: AudioCapability;
  reason: AudioGateReason;
};

/**
 * Fail-closed probe — audio never required for meaning.
 */
export function probeAudioCapability(): AudioGateResult {
  if (typeof window === "undefined") {
    return { capability: "unavailable", reason: "server" };
  }

  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
    return { capability: "unavailable", reason: "reduced-data" };
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  if (connection?.saveData) {
    return { capability: "unavailable", reason: "save-data" };
  }

  if (typeof Audio === "undefined") {
    return { capability: "unavailable", reason: "no-audio" };
  }

  return { capability: "available", reason: "ok" };
}
