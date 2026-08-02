import type { Metadata } from "next";
import { Reveal } from "@/modules/enhancement/motion";
import { getOrientation } from "@/modules/experience";
import { getArchiveProjects, getIdentity } from "@/modules/meaning";
import { ArchiveList } from "@/modules/presentation/case-study";
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
    "Engineering evidence library — problems, decisions, constraints, and open questions.",
  alternates: {
    canonical: "/archive",
  },
  openGraph: {
    title: "Product Archive · EOS",
    description:
      "Engineering evidence library — problems, decisions, constraints, and open questions.",
    url: "/archive",
  },
  twitter: {
    card: "summary",
    title: "Product Archive · EOS",
    description:
      "Engineering evidence library — problems, decisions, constraints, and open questions.",
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
            <Caption>{orientation.why}</Caption>
            <Heading level={1} id="archive-heading">
              Product Archive
            </Heading>
            <Lead>
              An engineering library for {identity.name}. Projects are evidence
              — not advertisements.
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
        <Section gap={4} className={styles.block}>
          <Link href={orientation.returnHref} tone="secondary">
            Return to {orientation.returnLabel}
          </Link>
        </Section>
      </Reveal>
    </article>
  );
}
