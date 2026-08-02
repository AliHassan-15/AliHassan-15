import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Stack.module.css";

type SpaceScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type StackProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "ul" | "ol" | "nav";
  gap?: SpaceScale;
  children: ReactNode;
};

export function Stack({
  as = "div",
  gap = 4,
  children,
  className,
  ...rest
}: StackProps) {
  const Component: ElementType = as;

  return (
    <Component
      className={cx(styles.root, styles[`gap-${gap}`], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
