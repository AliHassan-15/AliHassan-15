/**
 * Spatial capability — construction types only.
 * Exact scene inventories remain Deferred (Document 32 SP-*).
 */

export const SPATIAL_ATTRIBUTE = "data-eos-spatial" as const;

export type SpatialCapability = "full" | "off";

export type SpatialGateReason =
  | "ok"
  | "reduced-motion"
  | "save-data"
  | "reduced-data"
  | "no-perspective"
  | "server";
