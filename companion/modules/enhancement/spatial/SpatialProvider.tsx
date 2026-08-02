"use client";

import { useEffect, type ReactNode } from "react";
import { SPATIAL_ATTRIBUTE, type SpatialCapability } from "./types";
import { useSpatialCapability } from "./useSpatialCapability";

type SpatialProviderProps = {
  children: ReactNode;
};

function applySpatialCapability(capability: SpatialCapability): void {
  document.documentElement.setAttribute(SPATIAL_ATTRIBUTE, capability);
}

/**
 * Optional leaf sync for spatial capability — no scenes, no layout ownership.
 * Fail-closed: attribute starts unset / off until probe allows full.
 */
export function SpatialProvider({ children }: SpatialProviderProps) {
  const capability = useSpatialCapability();

  useEffect(() => {
    applySpatialCapability(capability);
  }, [capability]);

  return children;
}
