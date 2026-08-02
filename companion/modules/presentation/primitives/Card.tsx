import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import { Surface } from "../layout/Surface";
import styles from "./Card.module.css";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section";
};

/**
 * Structural card only — padding + bordered surface.
 * Never owns product meaning, media galleries, or marketing chrome.
 */
export function Card({ children, className, as = "div", ...rest }: CardProps) {
  return (
    <Surface as={as} bordered className={cx(styles.root, className)} {...rest}>
      {children}
    </Surface>
  );
}
