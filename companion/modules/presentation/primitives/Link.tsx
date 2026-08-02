import type { ComponentPropsWithoutRef, ReactNode } from "react";
import NextLink from "next/link";
import { cx } from "../lib/cx";
import styles from "./Link.module.css";

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary";
  external?: boolean;
};

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("//")
  );
}

export function Link({
  href,
  children,
  className,
  tone = "primary",
  external,
  ...rest
}: LinkProps) {
  const treatExternal = external ?? isExternalHref(href);
  const classes = cx(styles.root, styles[`tone-${tone}`], className);

  if (treatExternal) {
    return (
      <a
        href={href}
        className={classes}
        rel={rest.rel ?? "noopener noreferrer"}
        target={rest.target ?? "_blank"}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}
