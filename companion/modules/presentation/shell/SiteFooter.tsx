import { getIdentity } from "@/modules/meaning";
import {
  COMPANION_PATHS,
  ROUTE_ORIENTATION,
} from "@/modules/experience/routes";
import { PORTRAIT_ASSETS } from "@/modules/presentation/identity";
import { Cluster } from "@/modules/presentation/layout";
import { Caption, Link } from "@/modules/presentation/primitives";
import styles from "./SiteFooter.module.css";

/**
 * Shared return paths — same destinations from every Companion surface.
 * Signature appears only as dossier authentication — never decoration.
 */
export function SiteFooter() {
  const identity = getIdentity();

  return (
    <footer className={styles.root}>
      <div className={styles.meta}>
        <Caption>Engineering Operating System</Caption>
        <span
          className={styles.signature}
          role="img"
          aria-label={`Signature of ${identity.name}`}
          style={{
            WebkitMaskImage: `url(${PORTRAIT_ASSETS.signature})`,
            maskImage: `url(${PORTRAIT_ASSETS.signature})`,
          }}
        />
      </div>
      <Cluster gap={4} className={styles.links}>
        <Link href={COMPANION_PATHS.home} tone="secondary">
          {ROUTE_ORIENTATION.home.label}
        </Link>
        <Link href={COMPANION_PATHS.archive} tone="secondary">
          {ROUTE_ORIENTATION.archive.label}
        </Link>
        <Link href={COMPANION_PATHS.atlas} tone="secondary">
          {ROUTE_ORIENTATION.atlas.label}
        </Link>
        <Link href={COMPANION_PATHS.journey} tone="secondary">
          {ROUTE_ORIENTATION.journey.label}
        </Link>
        <Link href={identity.githubEntranceUrl} tone="secondary">
          {ROUTE_ORIENTATION.home.returnTo.label}
        </Link>
        <Link href={identity.githubProfileUrl} tone="secondary">
          GitHub
        </Link>
      </Cluster>
    </footer>
  );
}
