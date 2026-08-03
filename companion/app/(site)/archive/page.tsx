import type { Metadata } from "next";
import { Reveal } from "@/modules/enhancement/motion";
import { COMPANION_PATHS, getOrientation } from "@/modules/experience";
import { getArchiveProjects, getIdentity } from "@/modules/meaning";
import {
  ArchiveList,
  EngineeringPatterns,
} from "@/modules/presentation/case-study";
import { EosLocation } from "@/modules/presentation/eos";
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
  title: "Product Archive",
  description:
    "Engineering evidence library — recorded problems, decisions, constraints, and open questions.",
  alternates: {
    canonical: "/archive",
  },
  openGraph: {
    title: "Product Archive · EOS",
    description:
      "Engineering evidence library — recorded problems, decisions, constraints, and open questions.",
    url: "/archive",
  },
  twitter: {
    card: "summary",
    title: "Product Archive · EOS",
    description:
      "Engineering evidence library — recorded problems, decisions, constraints, and open questions.",
  },
};

export default function ArchivePage() {
  const identity = getIdentity();
  const orientation = getOrientation("archive");
  const projects = getArchiveProjects();

  return (
    <article className={styles.article}>
      <Reveal step={0}>
        <Section
          aria-labelledby="archive-heading"
          gap={6}
          className={styles.hero}
        >
          <Stack gap={5}>
            <EosLocation
              segments={[
                { label: "Companion", href: COMPANION_PATHS.home },
                { label: "Product Archive" },
              ]}
            />
            <Caption className={styles.identityKicker}>
              {orientation.why}
            </Caption>
            <Heading level={1} id="archive-heading">
              Product Archive
            </Heading>
            <Lead>
              An engineering library for {identity.name}. Each entry is evidence
              of judgment under constraints — not a product listing.
            </Lead>
            <Paragraph tone="secondary">
              Confirmed facts appear as Confirmed. Missing remains Missing.
              Deferred remains Deferred. Nothing is upgraded for presentation.
            </Paragraph>
          </Stack>
        </Section>
      </Reveal>

      <Reveal step={1}>
        <ArchiveList projects={projects} />
      </Reveal>

      <Reveal step={2}>
        <Section gap={6} className={styles.block}>
          <EngineeringPatterns />
        </Section>
      </Reveal>

      <Reveal step={3}>
        <Section gap={4} className={styles.block}>
          <Stack gap={3}>
            <Link href={COMPANION_PATHS.atlas} tone="secondary">
              Engineering Systems Atlas
            </Link>
            <Link href={COMPANION_PATHS.journey} tone="secondary">
              Engineering Journey
            </Link>
            <Link href={orientation.returnHref} tone="secondary">
              Companion
            </Link>
          </Stack>
        </Section>
      </Reveal>
    </article>
  );
}
