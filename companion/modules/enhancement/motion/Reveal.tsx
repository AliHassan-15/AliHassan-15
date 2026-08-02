import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "@/modules/presentation/lib/cx";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — communicative pacing, not decoration. */
  step?: number;
  as?: ElementType;
  className?: string;
  /** When false, skips entrance motion (content already present). */
  active?: boolean;
};

/**
 * Progressive reveal primitive — Server Component safe (CSS-driven).
 * Reduced motion collapses to immediate presence with hierarchy intact.
 */
export function Reveal({
  children,
  step = 0,
  as: Comp = "div",
  className,
  active = true,
}: RevealProps) {
  const style = {
    "--eos-reveal-step": String(step),
  } as CSSProperties;

  return (
    <Comp
      className={cx(active && styles.reveal, className)}
      style={active ? style : undefined}
      data-eos-reveal={active ? "true" : undefined}
    >
      {children}
    </Comp>
  );
}
