"use client";

import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import { useEngineeringFocus } from "./EngineeringContext";
import styles from "./EngineeringWorldRoot.module.css";

type EngineeringWorldRootProps = {
  children: ReactNode;
};

/**
 * Marks the active engineering world for quiet opacity synchronization.
 */
export function EngineeringWorldRoot({ children }: EngineeringWorldRootProps) {
  const focus = useEngineeringFocus();
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={styles.root}
      data-eos-eng-world={focus ? "active" : "idle"}
      data-eos-eng-camera={reduced ? "reduce" : "full"}
    >
      {children}
    </div>
  );
}
