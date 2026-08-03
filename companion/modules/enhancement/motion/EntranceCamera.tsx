"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import styles from "./EntranceCamera.module.css";

type EntranceCameraProps = {
  children: ReactNode;
};

/**
 * Museum-style dolly — walk through an exhibition.
 * Never rotate, zoom, shake, overshoot, or bounce.
 * Fail closed under reduced motion.
 */
export function EntranceCamera({ children }: EntranceCameraProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) {
      return;
    }

    let frame = 0;

    const apply = () => {
      const y = window.scrollY;
      const max = Math.max(window.innerHeight * 1.4, 1);
      const t = Math.min(Math.max(y / max, 0), 1);

      /* Independent planes — extremely small amplitudes */
      const bgY = t * 0.014;
      const mgY = t * 0.022;
      const fgY = t * 0.032;
      const bgX = t * -0.002;
      const mgX = t * -0.004;
      const fgX = t * -0.007;

      root.style.setProperty("--eos-entrance-scroll", t.toFixed(4));
      root.style.setProperty("--eos-entrance-bg-y", `${bgY.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-mg-y", `${mgY.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-fg-y", `${fgY.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-bg-x", `${bgX.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-mg-x", `${mgX.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-fg-x", `${fgX.toFixed(4)}rem`);
      /* Legacy aliases — midground default for cameraPlane */
      root.style.setProperty("--eos-entrance-shift-y", `${mgY.toFixed(4)}rem`);
      root.style.setProperty("--eos-entrance-shift-x", `${mgX.toFixed(4)}rem`);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-eos-entrance-camera={reduced ? "reduce" : "full"}
    >
      {children}
    </div>
  );
}
