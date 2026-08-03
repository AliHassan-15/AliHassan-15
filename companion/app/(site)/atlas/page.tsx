import type { Metadata } from "next";
import { Reveal } from "@/modules/enhancement/motion";
import {
  COMPANION_PATHS,
  getOrientation,
  ROUTE_ORIENTATION,
} from "@/modules/experience";
import { getEngineeringAtlas } from "@/modules/meaning";
import { EngineeringSystemsAtlas } from "@/modules/presentation/atlas";
import { EngineeringWorldPanel } from "@/modules/presentation/engineering";
import { EosLocation, ReadingPosition } from "@/modules/presentation/eos";
import { Section, Stack } from "@/modules/presentation/layout";
import {
  Caption,
  Heading,
  Lead,
  Link,
  Paragraph,
} from "@/modules/presentation/primitives";
import styles from "../document.module.css";

export const metadata: Metadata = {
  title: "Engineering Systems Atlas",
  description:
    "Engineering reference manual — recurring systems, decision evolution, validation, and failure knowledge across the body of work.",
  alternates: {
    canonical: "/atlas",
  },
  openGraph: {
    title: "Engineering Systems Atlas · EOS",
    description:
      "Engineering reference manual — recurring systems, decision evolution, validation, and failure knowledge across the body of work.",
    url: "/atlas",
  },
  twitter: {
    card: "summary",
    title: "Engineering Systems Atlas · EOS",
    description:
      "Engineering reference manual — recurring systems, decision evolution, validation, and failure knowledge across the body of work.",
  },
};

export default function AtlasPage() {
  const orientation = getOrientation("atlas");
  const atlas = getEngineeringAtlas();

  return (
    <article className={styles.article}>
      <Reveal step={0}>
        <Section
          aria-labelledby="atlas-room-heading"
          gap={6}
          className={styles.hero}
        >
          <Stack gap={5}>
            <EosLocation
              segments={[
                { label: "Companion", href: COMPANION_PATHS.home },
                { label: "Engineering Systems Atlas" },
              ]}
            />
            <Caption className={styles.identityKicker}>
              {orientation.why}
            </Caption>
            <Heading level={1} id="atlas-room-heading">
              {atlas.title}
            </Heading>
            <Lead>{atlas.purpose}</Lead>
            <ReadingPosition rootId="eos-document" />
            <Paragraph tone="secondary">
              Confirmed facts appear as Confirmed. Missing remains Missing.
              Deferred remains Deferred. Chronology and systems are only those
              the evidence supports.
            </Paragraph>
          </Stack>
        </Section>
      </Reveal>

      <Reveal step={1}>
        <Section gap={6} className={styles.block}>
          <EngineeringSystemsAtlas />
        </Section>
      </Reveal>

      <Reveal step={2}>
        <Section gap={4} className={styles.block}>
          <EngineeringWorldPanel />
        </Section>
      </Reveal>

      <Reveal step={3}>
        <Section gap={4} className={styles.block}>
          <Stack gap={3}>
            <Link href={COMPANION_PATHS.journey} tone="secondary">
              Engineering Journey
            </Link>
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              {ROUTE_ORIENTATION.archive.label}
            </Link>
            <Link href={COMPANION_PATHS.home} tone="secondary">
              Return to {ROUTE_ORIENTATION.home.label}
            </Link>
          </Stack>
        </Section>
      </Reveal>
    </article>
  );
}
