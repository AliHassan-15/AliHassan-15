import type { LabelHTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Label.module.css";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label className={cx(styles.root, className)} {...rest}>
      {children}
    </label>
  );
}
