import type { HTMLAttributes } from "react";
import { cx } from "../lib/cx";
import styles from "./Spacer.module.css";

type SpaceScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SpacerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpaceScale;
  axis?: "block" | "inline";
};

export function Spacer({
  size = 4,
  axis = "block",
  className,
  ...rest
}: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        styles.root,
        styles[axis],
        styles[`size-${size}`],
        className,
      )}
      {...rest}
    />
  );
}
