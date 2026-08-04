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
type RevealElementProps = {
  className?: string;
  style?: CSSProperties;
  "data-eos-reveal"?: string;
  children?: ReactNode;
};

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

  const Element = Comp as ElementType<RevealElementProps>;

  return (
    <Element
      className={cx(active && styles.reveal, className)}
      style={active ? style : undefined}
      data-eos-reveal={active ? "true" : undefined}
    >
      {children}
    </Element>
  );
}
