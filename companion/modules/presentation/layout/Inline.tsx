import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Inline.module.css";

type SpaceScale = 1 | 2 | 3 | 4 | 5;

type InlineProps = HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceScale;
  children: ReactNode;
};

export function Inline({ gap = 2, children, className, ...rest }: InlineProps) {
  return (
    <div className={cx(styles.root, styles[`gap-${gap}`], className)} {...rest}>
      {children}
    </div>
  );
}
