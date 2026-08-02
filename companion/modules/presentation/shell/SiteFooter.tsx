import { getIdentity } from "@/modules/meaning";
import {
  COMPANION_PATHS,
  ROUTE_ORIENTATION,
} from "@/modules/experience/routes";
import { Cluster } from "@/modules/presentation/layout";
import { Caption, Link } from "@/modules/presentation/primitives";
import styles from "./SiteFooter.module.css";

/**
 * Shared return paths — same destinations from every Companion surface.
 */
export function SiteFooter() {
  const identity = getIdentity();

  return (
    <footer className={styles.root}>
      <div className={styles.meta}>
        <Caption>Engineering Operating System</Caption>
      </div>
      <Cluster gap={4} className={styles.links}>
        <Link href={COMPANION_PATHS.home} tone="secondary">
          {ROUTE_ORIENTATION.home.label}
        </Link>
        <Link href={COMPANION_PATHS.archive} tone="secondary">
          {ROUTE_ORIENTATION.archive.label}
        </Link>
        <Link href={identity.githubEntranceUrl} tone="secondary">
          Entrance
        </Link>
        <Link href={identity.githubProfileUrl} tone="secondary">
          GitHub
        </Link>
      </Cluster>
    </footer>
  );
}
