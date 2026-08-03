/**
 * Audio construction types — P61 spatial ambient.
 * Exact AU inventories remain Deferred where Product Bible locks apply.
 */

export const AUDIO_ATTRIBUTE = "data-eos-audio" as const;

export const AUDIO_PREFERENCE_KEY = "eos-audio-preference" as const;

/** Visitor preference — silence default. */
export type AudioPreference = "off" | "on";

export type AudioCapability = "available" | "unavailable";

export type AudioGateReason =
  "ok" | "save-data" | "reduced-data" | "no-audio" | "no-assets" | "server";

export type AmbientLayerId = "base" | "air" | "mechanical" | "resonance";

export type AmbientRoomId =
  "arrival" | "atlas" | "case-study" | "evidence" | "journey" | "footer";

export type AmbientLayerConfig = {
  id: AmbientLayerId;
  /** Public URL — loaded only after visitor enables ambient. */
  src: string;
  /**
   * True only when the loop file is present under companion/public/audio/.
   * Never mark true without a real asset.
   */
  shipped: boolean;
};

export type AmbientRoomProfile = {
  id: AmbientRoomId;
  /** Relative layer weights 0–1 — almost imperceptible room differences. */
  weights: Record<AmbientLayerId, number>;
};

export type AmbientEnvironmentConfig = {
  id: string;
  layers: AmbientLayerConfig[];
  rooms: Record<AmbientRoomId, AmbientRoomProfile>;
  /** Silence before ambience after enable / arrival. */
  settleDelayMs: number;
  /** Crossfade for layer weight / mute changes. */
  fadeMs: number;
  /** Instant transitions when reduced motion is preferred. */
  reducedMotionFadeMs: number;
  /** Master peak after fade — ~15–20% perceived. */
  masterVolume: number;
};

/** @deprecated Use AmbientEnvironmentConfig — kept for transitional imports. */
export type AmbientTrackConfig = {
  id: string;
  src: string;
  settleDelayMs: number;
  fadeMs: number;
  targetVolume: number;
};
