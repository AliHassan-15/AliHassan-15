"use client";

import { useEffect, type ReactNode } from "react";
import { MOTION_ATTRIBUTE, type MotionCapability } from "./types";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MotionProviderProps = {
  children: ReactNode;
};

export const MOTION_PREFERENCE_KEY = "eos-motion-preference" as const;

function applyMotionCapability(capability: MotionCapability): void {
  document.documentElement.setAttribute(MOTION_ATTRIBUTE, capability);
  try {
    window.localStorage.setItem(MOTION_PREFERENCE_KEY, capability);
  } catch {
    // Fail closed — capability still applies for the session.
  }
}

/**
 * Leaf sync for motion capability — no product UI, no layout ownership.
 * Persists the active capability for product memory continuity.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    applyMotionCapability(prefersReducedMotion ? "reduce" : "full");
  }, [prefersReducedMotion]);

  return children;
}
