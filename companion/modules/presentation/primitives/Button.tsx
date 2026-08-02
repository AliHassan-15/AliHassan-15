import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import { VisuallyHidden } from "./VisuallyHidden";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cx(styles.root, styles[variant], styles[size], className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={cx(styles.content, loading && styles.contentLoading)}>
        {children}
      </span>
      {loading ? (
        <span className={styles.loadingLabel} aria-hidden="true">
          …
        </span>
      ) : null}
      {loading ? <VisuallyHidden>Loading</VisuallyHidden> : null}
    </button>
  );
}
