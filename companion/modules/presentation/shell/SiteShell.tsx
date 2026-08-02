import type { ReactNode } from "react";
import { PagePresence } from "@/modules/enhancement/motion";
import { Container } from "@/modules/presentation/layout";
import { SkipLink } from "@/modules/presentation/primitives";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import styles from "./SiteShell.module.css";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipLink href="#main" />
      <Container as="div" width="wide" className={styles.shell}>
        <SiteHeader />
        <main id="main" className={styles.main} tabIndex={-1}>
          <PagePresence>{children}</PagePresence>
        </main>
        <SiteFooter />
      </Container>
    </>
  );
}
