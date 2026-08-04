"use client";

import { useEffect, useState } from "react";
import { probeDeviceTier } from "./deviceTier";
import type { SpatialTier } from "./types";

/**
 * Session-stable rendering tier. Probed once on mount (client-only —
 * WebGL context creation has real cost) and never re-measured, so a
 * scene's quality never shifts under a visitor mid-interaction.
 */
export function useDeviceTier(): SpatialTier {
  const [tier, setTier] = useState<SpatialTier>("lite");

  useEffect(() => {
    setTier(probeDeviceTier());
  }, []);

  return tier;
}
