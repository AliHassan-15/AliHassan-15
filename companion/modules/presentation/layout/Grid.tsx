import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Grid.module.css";

type SpaceScale = 2 | 3 | 4 | 5 | 6 | 7;
type GridColumns = 1 | 2 | 3;

type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: GridColumns;
  gap?: SpaceScale;
  children: ReactNode;
};

export function Grid({
  columns = 2,
  gap = 4,
  children,
  className,
  ...rest
}: GridProps) {
  return (
    <div
      className={cx(
        styles.root,
        styles[`columns-${columns}`],
        styles[`gap-${gap}`],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
