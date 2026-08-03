import type { Metadata } from "next";
import { Reveal } from "@/modules/enhancement/motion";
import {
  COMPANION_PATHS,
  getOrientation,
  ROUTE_ORIENTATION,
} from "@/modules/experience";
import { EngineeringJourneySection } from "@/modules/presentation/journey";
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
  title: "Engineering Journey",
  description:
    "Causal engineering stations from confirmed Atlas evolution — what changed in practice, not a career timeline.",
  alternates: {
    canonical: "/journey",
  },
  openGraph: {
    title: "Engineering Journey · EOS",
    description:
      "Causal engineering stations from confirmed Atlas evolution — what changed in practice, not a career timeline.",
    url: "/journey",
  },
  twitter: {
    card: "summary",
    title: "Engineering Journey · EOS",
    description:
      "Causal engineering stations from confirmed Atlas evolution — what changed in practice, not a career timeline.",
  },
};

export default function JourneyPage() {
  const orientation = getOrientation("journey");

  return (
    <article className={styles.article} id="eos-document">
      <Reveal step={0}>
        <Section
          aria-labelledby="journey-room-heading"
          gap={6}
          className={styles.hero}
        >
          <Stack gap={5}>
            <EosLocation
              segments={[
                { label: "Companion", href: COMPANION_PATHS.home },
                { label: "Engineering Journey" },
              ]}
            />
            <Caption className={styles.identityKicker}>
              {orientation.why}
            </Caption>
            <Heading level={1} id="journey-room-heading">
              Engineering Journey
            </Heading>
            <Lead>
              How the engineering practice evolved — stations of what changed,
              connected through confirmed systems, not dates alone.
            </Lead>
            <ReadingPosition rootId="eos-document" />
            <Paragraph tone="secondary">
              Confirmed Atlas evolution only. Missing remains Missing. Deferred
              remains Deferred. No invented milestones.
            </Paragraph>
          </Stack>
        </Section>
      </Reveal>

      <Reveal step={1}>
        <Section gap={6} className={styles.block}>
          <EngineeringJourneySection />
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
            <Link href={COMPANION_PATHS.atlas} tone="secondary">
              {ROUTE_ORIENTATION.atlas.label}
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
