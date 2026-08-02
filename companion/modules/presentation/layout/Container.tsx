import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Container.module.css";

type ContainerWidth = "narrow" | "prose" | "wide";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main" | "article" | "section";
  width?: ContainerWidth;
  children: ReactNode;
};

export function Container({
  as = "div",
  width = "wide",
  children,
  className,
  ...rest
}: ContainerProps) {
  const Component: ElementType = as;

  return (
    <Component className={cx(styles.root, styles[width], className)} {...rest}>
      {children}
    </Component>
  );
}
