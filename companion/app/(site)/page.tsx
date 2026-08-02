import { getIdentity } from "@/modules/meaning";
import { COMPANION_PATHS, getOrientation } from "@/modules/experience";
import { Reveal } from "@/modules/enhancement/motion";
import { Section, Stack } from "@/modules/presentation/layout";
import {
  Caption,
  Divider,
  Heading,
  Lead,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import styles from "./document.module.css";

export default function HomePage() {
  const identity = getIdentity();
  const orientation = getOrientation("home");

  return (
    <article className={styles.article}>
      <Reveal step={0}>
        <Section
          aria-labelledby="identity-heading"
          gap={6}
          className={styles.hero}
        >
          <Stack gap={5}>
            <Caption>{orientation.why}</Caption>
            <Heading level={1} id="identity-heading">
              {identity.name}
            </Heading>
            <p className={styles.title}>{identity.title}</p>
            <Lead className={styles.canonical}>
              {identity.canonicalSentence}
            </Lead>
            <Paragraph tone="secondary">{identity.seniorSentence}</Paragraph>
            <Text
              as="p"
              size="body-sm"
              tone="tertiary"
              className={styles.context}
            >
              {identity.geography} · {identity.educationShort}
            </Text>
            <Text
              as="p"
              size="body-sm"
              tone="secondary"
              className={styles.opportunity}
            >
              {identity.opportunity}
            </Text>
          </Stack>
        </Section>
      </Reveal>

      <Divider />

      <Reveal step={1}>
        <Section
          aria-labelledby="engineering-heading"
          gap={5}
          className={styles.block}
        >
          <Heading level={2} id="engineering-heading">
            Engineering
          </Heading>
          <Paragraph>{identity.philosophyDefinition}</Paragraph>
          <ol className={styles.principles}>
            {identity.principles.map((principle) => (
              <li key={principle}>
                <Text as="span" tone="primary" size="body">
                  {principle}
                </Text>
              </li>
            ))}
          </ol>
        </Section>
      </Reveal>

      <Divider />

      <Reveal step={2}>
        <Section
          aria-labelledby="archive-heading"
          gap={5}
          className={styles.block}
        >
          <Heading level={2} id="archive-heading">
            Product Archive
          </Heading>
          <Paragraph>
            Selected work deepens as engineering evidence — problems, decisions,
            constraints, and what remains unknown.
          </Paragraph>
          <Paragraph tone="tertiary">
            The archive is a library, not a gallery. Claims stay secondary to
            proof.
          </Paragraph>
          <Stack gap={3}>
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              Enter the Product Archive
            </Link>
            <Link href={orientation.returnHref} tone="secondary">
              Return to {orientation.returnLabel}
            </Link>
            <Text as="p" size="caption" tone="tertiary">
              Next: {orientation.next}
            </Text>
          </Stack>
        </Section>
      </Reveal>
    </article>
  );
}
