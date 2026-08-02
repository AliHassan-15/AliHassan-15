import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./FocusRing.module.css";

type FocusRingProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Ownership: wraps a custom control so :focus-visible receives the system ring.
 * Never owns product chrome or decorative outlines.
 */
export function FocusRing({ children, className, ...rest }: FocusRingProps) {
  return (
    <div className={cx(styles.root, className)} {...rest}>
      {children}
    </div>
  );
}
