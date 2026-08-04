/**
 * Spatial capability — construction types only.
 * Exact scene inventories remain Deferred (Document 32 SP-*).
 */

export const SPATIAL_ATTRIBUTE = "data-eos-spatial" as const;
export const SPATIAL_TIER_ATTRIBUTE = "data-eos-spatial-tier" as const;

export type SpatialCapability = "full" | "off";

export type SpatialGateReason =
  | "ok"
  | "reduced-motion"
  | "save-data"
  | "reduced-data"
  | "no-perspective"
  | "no-webgl"
  | "server";

/**
 * Rendering budget for WebGL scenes once spatial capability is "full".
 * "cinematic" — full particle/geometry/postprocessing budget.
 * "lite" — reduced particle counts, no postprocessing, simplified geometry.
 * Chosen once per session from a coarse, cheap hardware probe; never
 * re-measured mid-scene (stability over precision).
 */
export type SpatialTier = "cinematic" | "lite";
