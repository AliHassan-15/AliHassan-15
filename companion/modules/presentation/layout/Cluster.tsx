import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Cluster.module.css";

type SpaceScale = 1 | 2 | 3 | 4 | 5 | 6;

type ClusterProps = HTMLAttributes<HTMLDivElement> & {
  gap?: SpaceScale;
  align?: "start" | "center" | "end" | "baseline";
  children: ReactNode;
};

export function Cluster({
  gap = 3,
  align = "center",
  children,
  className,
  ...rest
}: ClusterProps) {
  return (
    <div
      className={cx(
        styles.root,
        styles[`gap-${gap}`],
        styles[`align-${align}`],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
