import type { Metadata } from "next";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Link, Paragraph } from "@/modules/presentation/primitives";
import { SiteShell } from "@/modules/presentation/shell";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <SiteShell>
      <article className={styles.page}>
        <Stack gap={5}>
          <Heading level={1}>Page not found</Heading>
          <Paragraph tone="secondary">
            This route is not part of the Companion. The entrance and archive
            remain available.
          </Paragraph>
          <div className={styles.actions}>
            <Link href={COMPANION_PATHS.home} tone="secondary">
              Return to Companion home
            </Link>
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              Enter the Product Archive
            </Link>
          </div>
        </Stack>
      </article>
    </SiteShell>
  );
}
