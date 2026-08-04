"use client";

import { useEffect, type ReactNode } from "react";
import {
  SPATIAL_ATTRIBUTE,
  SPATIAL_TIER_ATTRIBUTE,
  type SpatialCapability,
  type SpatialTier,
} from "./types";
import { useDeviceTier } from "./useDeviceTier";
import { useSpatialCapability } from "./useSpatialCapability";

type SpatialProviderProps = {
  children: ReactNode;
};

function applySpatialCapability(capability: SpatialCapability): void {
  document.documentElement.setAttribute(SPATIAL_ATTRIBUTE, capability);
}

function applySpatialTier(tier: SpatialTier): void {
  document.documentElement.setAttribute(SPATIAL_TIER_ATTRIBUTE, tier);
}

/**
 * Optional leaf sync for spatial capability — no scenes, no layout ownership.
 * Fail-closed: attribute starts unset / off until probe allows full.
 */
export function SpatialProvider({ children }: SpatialProviderProps) {
  const capability = useSpatialCapability();
  const tier = useDeviceTier();

  useEffect(() => {
    applySpatialCapability(capability);
  }, [capability]);

  useEffect(() => {
    applySpatialTier(tier);
  }, [tier]);

  return children;
}
