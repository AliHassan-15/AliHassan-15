import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Icon.module.css";

type IconSize = "sm" | "md" | "lg";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  size?: IconSize;
  label?: string;
};

export function Icon({
  children,
  size = "md",
  label,
  className,
  ...rest
}: IconProps) {
  const decorative = label === undefined;

  return (
    <span
      className={cx(styles.root, styles[size], className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      {...rest}
    >
      {children}
    </span>
  );
}
