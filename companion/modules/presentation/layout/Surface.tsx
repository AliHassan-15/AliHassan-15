import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Surface.module.css";

type SurfaceTone = "canvas" | "default" | "muted" | "elevated";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "aside";
  tone?: SurfaceTone;
  bordered?: boolean;
  children: ReactNode;
};

export function Surface({
  as = "div",
  tone = "default",
  bordered = false,
  children,
  className,
  ...rest
}: SurfaceProps) {
  const Component: ElementType = as;

  return (
    <Component
      className={cx(
        styles.root,
        styles[tone],
        bordered && styles.bordered,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
