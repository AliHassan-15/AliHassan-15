import { SoundToggle } from "@/modules/enhancement/audio";
import {
  COMPANION_PATHS,
  ROUTE_ORIENTATION,
} from "@/modules/experience/routes";
import { getIdentity } from "@/modules/meaning";
import { Cluster } from "@/modules/presentation/layout";
import { Link, Text, ThemeToggle } from "@/modules/presentation/primitives";
import styles from "./SiteHeader.module.css";

/**
 * Shared chrome — orientation first, navigation second.
 * Same engineering rooms from every surface.
 */
export function SiteHeader() {
  const identity = getIdentity();

  return (
    <header className={styles.root}>
      <div className={styles.brand}>
        <Text
          as="span"
          size="caption"
          tone="tertiary"
          className={styles.kicker}
        >
          {ROUTE_ORIENTATION.home.label}
        </Text>
        <Link
          href={COMPANION_PATHS.home}
          tone="secondary"
          className={styles.name}
        >
          {identity.name}
        </Link>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        <Cluster gap={4} className={styles.actions}>
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
          <span className={styles.prefs}>
            <ThemeToggle className={styles.pref} />
            <SoundToggle className={styles.pref} />
          </span>
        </Cluster>
      </nav>
    </header>
  );
}
