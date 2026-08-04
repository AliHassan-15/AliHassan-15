"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { ARRIVAL_SILENCE_MS } from "@/modules/enhancement/motion";

type HeroTypographyProps = {
  children: ReactNode;
  /** Stagger index — communicative pacing, matches `Reveal`'s convention. */
  step?: number;
  as?: "span" | "div" | "p";
  className?: string;
};

/**
 * Machined reveal for the one or two most prominent hero lines only — rises
 * and softens into focus, staggered by `step`. Every other hero line keeps
 * the existing CSS settle (Document 06 §5 reveal behavior; this is not a
 * second, competing motion system, just a stronger treatment for the
 * identity name and canonical sentence).
 */
export function HeroTypography({
  children,
  step = 0,
  as = "span",
  className,
}: HeroTypographyProps) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const timer = window.setTimeout(
      () => setReady(true),
      ARRIVAL_SILENCE_MS + step * 90,
    );
    return () => window.clearTimeout(timer);
  }, [reduced, step]);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={
        ready
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 18, filter: "blur(8px)" }
      }
      transition={{
        duration: 1.25,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.05 },
      }}
    >
      {children}
    </MotionTag>
  );
}
