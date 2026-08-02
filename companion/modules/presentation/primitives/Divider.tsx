import type { HTMLAttributes } from "react";
import { cx } from "../lib/cx";
import styles from "./Divider.module.css";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  tone?: "subtle" | "strong";
};

export function Divider({ tone = "subtle", className, ...rest }: DividerProps) {
  return <hr className={cx(styles.root, styles[tone], className)} {...rest} />;
}
