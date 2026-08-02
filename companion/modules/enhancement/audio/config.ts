import type { AmbientTrackConfig } from "./types";

/**
 * Ambient track registry — swap `src` (or add tracks) without changing app architecture.
 * Placeholder path only; no invented audio asset is shipped.
 */
export const AMBIENT_TRACK: AmbientTrackConfig = {
  id: "companion-ambient",
  src: "/audio/ambient.ogg",
  settleDelayMs: 900,
  fadeMs: 2800,
  targetVolume: 0.07,
};

export function resolveAmbientTrack(
  trackId: string = AMBIENT_TRACK.id,
): AmbientTrackConfig {
  if (trackId === AMBIENT_TRACK.id) {
    return AMBIENT_TRACK;
  }
  return AMBIENT_TRACK;
}
