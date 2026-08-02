import type { ElementType, ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./Text.module.css";

type TextTone = "primary" | "secondary" | "tertiary" | "inverse" | "disabled";

type TextSize = "caption" | "body-sm" | "body" | "body-lg" | "lead";

type TextProps = {
  as?: "p" | "span" | "div";
  tone?: TextTone;
  size?: TextSize;
  mono?: boolean;
  children: ReactNode;
  className?: string;
};

export function Text({
  as = "p",
  tone = "secondary",
  size = "body",
  mono = false,
  children,
  className,
}: TextProps) {
  const Component: ElementType = as;

  return (
    <Component
      className={cx(
        styles.root,
        styles[`tone-${tone}`],
        styles[`size-${size}`],
        mono && styles.mono,
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function Paragraph(props: Omit<TextProps, "as">) {
  return <Text as="p" {...props} />;
}

export function Caption({
  tone = "tertiary",
  as = "span",
  ...rest
}: Omit<TextProps, "size"> & { as?: "p" | "span" }) {
  return <Text as={as} size="caption" tone={tone} {...rest} />;
}

export function Lead(props: Omit<TextProps, "size">) {
  return <Text size="lead" tone={props.tone ?? "secondary"} {...props} />;
}

export function Muted(props: Omit<TextProps, "tone">) {
  return <Text tone="tertiary" {...props} />;
}

type CodeProps = {
  children: ReactNode;
  className?: string;
  tone?: TextTone;
};

export function Code({ children, className, tone = "primary" }: CodeProps) {
  return (
    <code
      className={cx(
        styles.root,
        styles.mono,
        styles[`tone-${tone}`],
        styles["size-body-sm"],
        className,
      )}
    >
      {children}
    </code>
  );
}
