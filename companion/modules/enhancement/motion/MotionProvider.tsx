"use client";

import { useEffect, type ReactNode } from "react";
import { MOTION_ATTRIBUTE, type MotionCapability } from "./types";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MotionProviderProps = {
  children: ReactNode;
};

function applyMotionCapability(capability: MotionCapability): void {
  document.documentElement.setAttribute(MOTION_ATTRIBUTE, capability);
}

/**
 * Leaf sync for motion capability — no product UI, no layout ownership.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    applyMotionCapability(prefersReducedMotion ? "reduce" : "full");
  }, [prefersReducedMotion]);

  return children;
}
