import type { ReactNode } from "react";
import { cx } from "@/modules/presentation/lib/cx";
import styles from "./PagePresence.module.css";

type PagePresenceProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Page entrance — settle into the studio. Not a cinematic load sequence.
 */
export function PagePresence({ children, className }: PagePresenceProps) {
  return (
    <div className={cx(styles.root, className)} data-eos-page-presence="true">
      {children}
    </div>
  );
}
