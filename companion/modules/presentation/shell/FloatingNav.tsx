"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SoundToggle } from "@/modules/enhancement/audio";
import {
  COMPANION_PATHS,
  ROUTE_ORIENTATION,
} from "@/modules/experience/routes";
import { ThemeToggle } from "@/modules/presentation/primitives";
import styles from "./FloatingNav.module.css";

const NAV_ITEMS = [
  { href: COMPANION_PATHS.archive, label: "Projects" },
  { href: COMPANION_PATHS.atlas, label: "Atlas" },
  { href: COMPANION_PATHS.journey, label: "Journey" },
] as const;

type FloatingNavProps = {
  /** Passed from the server — `getIdentity()` reads from disk, client-only. */
  name: string;
  githubHref: string;
};

/**
 * Floating command bar — the whole of primary navigation. No fixed top
 * bar, no hamburger: orientation lives in one small dock that never
 * competes with the scene behind it.
 */
export function FloatingNav({ name, githubHref }: FloatingNavProps) {
  const pathname = usePathname() ?? "/";
  const reduced = useReducedMotion();

  return (
    <motion.nav
      className={styles.dock}
      aria-label="Primary"
      initial={reduced ? undefined : { opacity: 0, y: 22, scale: 0.97 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.05,
        delay: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <a
        href={COMPANION_PATHS.home}
        className={styles.mark}
        aria-label={`${name} — ${ROUTE_ORIENTATION.home.label}`}
      >
        {name
          .split(/\s+/)
          .map((part) => part.charAt(0))
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </a>

      <span className={styles.divider} aria-hidden="true" />

      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active ? `${styles.item} ${styles.itemActive}` : styles.item
            }
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </a>
        );
      })}

      <a href={githubHref} className={styles.item}>
        GitHub
      </a>

      <span className={styles.divider} aria-hidden="true" />

      <span className={styles.prefs}>
        <ThemeToggle className={styles.pref} />
        <SoundToggle className={styles.pref} />
      </span>
    </motion.nav>
  );
}
