import type { ReactNode } from "react";
import { PagePresence } from "@/modules/enhancement/motion";
import { getIdentity } from "@/modules/meaning";
import { Container } from "@/modules/presentation/layout";
import { SkipLink } from "@/modules/presentation/primitives";
import { FloatingNav } from "./FloatingNav";
import { SiteFooter } from "./SiteFooter";
import styles from "./SiteShell.module.css";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * No fixed top navbar (owner direction — floating commands only, Rebuild
 * M2). `FloatingNav` carries all primary wayfinding; each room's own
 * heading (Document 06 room labels) carries page-level orientation.
 */
export function SiteShell({ children }: SiteShellProps) {
  const identity = getIdentity();

  return (
    <>
      <SkipLink href="#main" />
      {/* Near museum light — opacity breathe only; paired with html/body far+mid */}
      <div className="eosAtmosphereNear" aria-hidden="true" />
      <div className="eosAtmosphereGrain" aria-hidden="true" />
      <Container as="div" width="wide" className={styles.shell}>
        <main id="main" className={styles.main} tabIndex={-1}>
          <PagePresence>{children}</PagePresence>
        </main>
        <SiteFooter />
      </Container>
      <FloatingNav
        name={identity.name}
        githubHref={identity.githubEntranceUrl}
      />
    </>
  );
}
