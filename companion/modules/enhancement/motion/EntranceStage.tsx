"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import styles from "./EntranceStage.module.css";

/** Intentional stillness before the environment begins breathing. */
export const ARRIVAL_SILENCE_MS = 750;

type EntranceStageProps = {
  children: ReactNode;
};

/**
 * Arrival gate. The room already exists — silence, then soft settling.
 * Instant under reduced motion. Coordinates site atmosphere via html attribute.
 */
export function EntranceStage({ children }: EntranceStageProps) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(reduced);

  useLayoutEffect(() => {
    if (reduced) {
      document.documentElement.removeAttribute("data-eos-arrival");
      return;
    }
    document.documentElement.setAttribute("data-eos-arrival", "silence");
    return () => {
      document.documentElement.removeAttribute("data-eos-arrival");
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }

    const silence = window.setTimeout(() => {
      setReady(true);
      document.documentElement.setAttribute("data-eos-arrival", "ready");
    }, ARRIVAL_SILENCE_MS);

    return () => {
      window.clearTimeout(silence);
    };
  }, [reduced]);

  return (
    <div
      className={styles.root}
      data-eos-entrance={ready ? "ready" : "silence"}
    >
      {children}
    </div>
  );
}
