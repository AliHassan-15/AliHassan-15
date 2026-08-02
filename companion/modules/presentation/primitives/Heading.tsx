import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Heading.module.css";

type HeadingLevel = 1 | 2 | 3;

type HeadingProps = {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  id?: string;
};

const tagByLevel = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

export function Heading({ level, children, className, id }: HeadingProps) {
  const Tag = tagByLevel[level];

  return (
    <Tag
      id={id}
      className={cx(styles.root, styles[`level-${level}`], className)}
    >
      {children}
    </Tag>
  );
}
