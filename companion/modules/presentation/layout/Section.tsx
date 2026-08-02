import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Section.module.css";

type SpaceScale = 4 | 5 | 6 | 7 | 8 | 9;

type SectionProps = HTMLAttributes<HTMLElement> & {
  gap?: SpaceScale;
  children: ReactNode;
};

export function Section({
  gap = 6,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cx(styles.root, styles[`gap-${gap}`], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
