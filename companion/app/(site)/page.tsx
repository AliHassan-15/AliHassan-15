import { getIdentity } from "@/modules/meaning";
import { COMPANION_PATHS, getOrientation } from "@/modules/experience";
import {
  EntranceCamera,
  EntranceStage,
  Reveal,
} from "@/modules/enhancement/motion";
import { EngineeringPortrait } from "@/modules/presentation/identity";
import { CapabilityAtlasSection } from "@/modules/presentation/capability";
import { Section, Stack } from "@/modules/presentation/layout";
import {
  Caption,
  Heading,
  Lead,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import styles from "./document.module.css";

function markFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function HomePage() {
  const identity = getIdentity();
  const orientation = getOrientation("home");
  const presenceMark = markFromName(identity.name);

  return (
    <EntranceStage>
      <EntranceCamera>
        <article className={styles.article}>
          <Section
            aria-labelledby="identity-heading"
            gap={6}
            className={styles.homeHero}
          >
            <div className={styles.cameraPlane} aria-hidden="true">
              <div className={styles.architecture}>
                <svg
                  className={styles.architectureSvg}
                  viewBox="0 0 640 420"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Distant infrastructure — routing, boundaries, stages */}
                  <g className={styles.archBounds}>
                    <path d="M60 40 H580 V380 H60 Z" />
                    <path d="M120 90 H520 V330 H120 Z" />
                  </g>
                  <g className={styles.archLines}>
                    <path d="M40 320 H180 L240 220 H360 L420 140 H580" />
                    <path d="M80 360 H220 L300 280 H460 L520 200" />
                    <path d="M120 80 H260 L340 160 H500" />
                    <path d="M200 40 V180 L280 260 V360" />
                    <path d="M480 60 V200 L560 280" />
                    <path d="M40 140 H140 L200 200" />
                  </g>
                  <g className={styles.archFlow}>
                    <path d="M40 320 H180 L240 220 H360" />
                    <path d="M200 40 V180 L280 260" />
                    <path d="M120 80 H260 L340 160" />
                    <path d="M420 140 H580" />
                  </g>
                  <g className={styles.archNodes}>
                    <circle cx="40" cy="320" r="2.5" />
                    <circle cx="180" cy="320" r="2.5" />
                    <circle cx="240" cy="220" r="3" />
                    <circle cx="360" cy="220" r="2.5" />
                    <circle cx="420" cy="140" r="2.5" />
                    <circle cx="200" cy="40" r="2.5" />
                    <circle cx="280" cy="260" r="3" />
                    <circle cx="340" cy="160" r="2.5" />
                    <circle cx="500" cy="160" r="2" />
                    <circle cx="560" cy="280" r="2" />
                    <circle cx="140" cy="140" r="2" />
                  </g>
                </svg>
                <span className={styles.archFog} />
              </div>

              <div className={styles.presence}>
                <span className={`${styles.track} ${styles.trackOuter}`} />
                <span className={`${styles.track} ${styles.trackMid}`} />
                <span className={`${styles.track} ${styles.trackInner}`} />
                <span className={styles.scanArc} />
                <span className={`${styles.guide} ${styles.guideH}`} />
                <span className={`${styles.guide} ${styles.guideV}`} />
                <span className={`${styles.cal} ${styles.calA}`} />
                <span className={`${styles.cal} ${styles.calB}`} />
                <span className={`${styles.cal} ${styles.calC}`} />
                <span className={styles.presenceCore}>{presenceMark}</span>
              </div>
            </div>

            <div className={styles.heroStage}>
              <div className={styles.heroInner}>
                <span data-enter="1">
                  <Caption className={styles.enterKicker}>
                    {orientation.why}
                  </Caption>
                </span>
                <span data-enter="2">
                  <Heading
                    level={1}
                    id="identity-heading"
                    className={styles.enterTitle}
                  >
                    {identity.name}
                  </Heading>
                </span>
                <p data-enter="3" className={styles.enterSubtitle}>
                  {identity.title}
                </p>
                <span data-enter="4">
                  <Lead className={styles.enterLead}>
                    {identity.canonicalSentence}
                  </Lead>
                </span>
                <div data-enter="5" className={styles.enterBody}>
                  <Paragraph tone="secondary">
                    {identity.seniorSentence}
                  </Paragraph>
                </div>
                <div data-enter="6" className={styles.metaRow}>
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
                </div>
              </div>

              <EngineeringPortrait
                identity={identity}
                presenceMark={presenceMark}
              />
            </div>
          </Section>

          <Reveal step={0}>
            <Section
              aria-labelledby="engineering-heading"
              gap={5}
              className={styles.block}
            >
              <p className={styles.sectionLabel}>System 01 · Philosophy</p>
              <Heading level={2} id="engineering-heading">
                Engineering
              </Heading>
              <Paragraph>{identity.philosophyDefinition}</Paragraph>
              <ol className={styles.principles}>
                {identity.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ol>
            </Section>
          </Reveal>

          <Reveal step={1}>
            <CapabilityAtlasSection />
          </Reveal>

          <Reveal step={2}>
            <Section
              aria-labelledby="archive-heading"
              gap={5}
              className={styles.block}
            >
              <p className={styles.sectionLabel}>System 04 · Evidence</p>
              <div className={styles.archiveGate}>
                <Heading level={2} id="archive-heading">
                  Product Archive
                </Heading>
                <Paragraph>
                  Projects are treated as engineering records: the problem, the
                  constraints, the architecture, the trade-offs, and what
                  remains unproven.
                </Paragraph>
                <Paragraph tone="tertiary">
                  Confirmed facts stay Confirmed. Missing stays Missing.
                  Deferred stays Deferred. Nothing is upgraded for presentation.
                </Paragraph>
                <Stack gap={3}>
                  <Link
                    href={COMPANION_PATHS.archive}
                    tone="secondary"
                    className={styles.gateAction}
                  >
                    Open Product Archive
                  </Link>
                  <Link href={orientation.returnHref} tone="secondary">
                    Return to {orientation.returnLabel}
                  </Link>
                  <Text as="p" size="caption" tone="tertiary">
                    Next: {orientation.next}
                  </Text>
                </Stack>
              </div>
            </Section>
          </Reveal>
        </article>
      </EntranceCamera>
    </EntranceStage>
  );
}
