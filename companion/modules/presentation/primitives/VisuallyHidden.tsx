import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./VisuallyHidden.module.css";

type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function VisuallyHidden({
  children,
  className,
  ...rest
}: VisuallyHiddenProps) {
  return (
    <span className={cx(styles.root, className)} {...rest}>
      {children}
    </span>
  );
}
