"use client";

import { useEffect } from "react";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { Stack } from "@/modules/presentation/layout";
import {
  Button,
  Heading,
  Link,
  Paragraph,
} from "@/modules/presentation/primitives";
import styles from "./not-found.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Companion route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <main className={styles.page}>
      <Stack gap={5}>
        <Heading level={1}>Something went wrong</Heading>
        <Paragraph tone="secondary">
          The Companion could not finish this view. You can try again or return
          home. Core content remains available without this enhancement path.
        </Paragraph>
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={reset}>
            Try again
          </Button>
          <Link href={COMPANION_PATHS.home} tone="secondary">
            Companion
          </Link>
        </div>
      </Stack>
    </main>
  );
}
