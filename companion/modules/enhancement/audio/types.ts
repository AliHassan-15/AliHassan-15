/**
 * Audio construction types.
 * Exact inventories remain Deferred (Document 33 AU-*).
 */

export const AUDIO_ATTRIBUTE = "data-eos-audio" as const;

/** Visitor preference — silence default. */
export type AudioPreference = "off" | "on";

export type AudioCapability = "available" | "unavailable";

export type AudioGateReason =
  "ok" | "save-data" | "reduced-data" | "no-audio" | "server";

export type AmbientTrackConfig = {
  id: string;
  /** Replaceable asset URL — architecture does not depend on this file existing. */
  src: string;
  /** Construction provisional — not a Product Bible lock (AU-10). */
  settleDelayMs: number;
  /** Construction provisional — not a Product Bible lock (AU-10). */
  fadeMs: number;
  /** Construction provisional peak after fade — extremely low. */
  targetVolume: number;
};
