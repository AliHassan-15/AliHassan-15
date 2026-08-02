import { cx } from "../lib/cx";
import styles from "./SkipLink.module.css";

type SkipLinkProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function SkipLink({
  href = "#main",
  label = "Skip to content",
  className,
}: SkipLinkProps) {
  return (
    <a href={href} className={cx(styles.root, className)}>
      {label}
    </a>
  );
}
