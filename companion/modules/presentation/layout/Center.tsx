import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Center.module.css";

type CenterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  text?: boolean;
};

export function Center({
  children,
  text = false,
  className,
  ...rest
}: CenterProps) {
  return (
    <div className={cx(styles.root, text && styles.text, className)} {...rest}>
      {children}
    </div>
  );
}
