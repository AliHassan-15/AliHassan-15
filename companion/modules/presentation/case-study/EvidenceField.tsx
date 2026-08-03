import type { HonestyDisclosure, ProvenanceSource } from "@/modules/meaning";
import {
  evidenceConfidenceCaption,
  evidenceStatusCaption,
  formatProvenanceSource,
} from "@/modules/meaning";
import { CopySectionLink } from "@/modules/presentation/eos";
import {
  Heading,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import { EvidenceInspectorShell } from "./EvidenceInspectorShell";
import styles from "./EvidenceField.module.css";

export type EvidenceNavLink = {
  href: string;
  label: string;
};

type EvidenceFieldProps = {
  title: string;
  id: string;
  disclosure: HonestyDisclosure;
  /** Cross-document see-also — Atlas systems, glossary, etc. */
  relatedSystems?: EvidenceNavLink[];
  /** Where this claim also appears */
  appearsIn?: EvidenceNavLink[];
  /** Quiet deep-link affordance */
  enableCopyLink?: boolean;
};

const PROVENANCE_KIND_ORDER: ProvenanceSource["kind"][] = [
  "testing-report",
  "document",
  "notebook",
  "readme",
  "presentation",
  "repository",
  "commit",
  "file",
  "issue",
  "identity",
  "other",
];

function sortProvenance(provenance: ProvenanceSource[]): ProvenanceSource[] {
  return [...provenance].sort((a, b) => {
    const ai = PROVENANCE_KIND_ORDER.indexOf(a.kind);
    const bi = PROVENANCE_KIND_ORDER.indexOf(b.kind);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

function EvidenceInspector({
  disclosure,
  sectionId,
  relatedSystems,
  appearsIn,
}: {
  disclosure: HonestyDisclosure;
  sectionId: string;
  relatedSystems: EvidenceNavLink[];
  appearsIn: EvidenceNavLink[];
}) {
  const provenance = sortProvenance(disclosure.provenance);
  const hasInspector =
    disclosure.status === "confirmed" ||
    relatedSystems.length > 0 ||
    appearsIn.length > 0;

  if (!hasInspector) {
    return null;
  }

  return (
    <EvidenceInspectorShell>
      <summary>
        <Text
          as="span"
          size="caption"
          tone="tertiary"
          className={styles.status}
        >
          Evidence inspector
        </Text>
      </summary>
      <div className={styles.inspector}>
        <div className={styles.inspectorRow}>
          <Text as="span" size="caption" tone="tertiary">
            Confidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {evidenceConfidenceCaption(disclosure.confidence)}
          </Text>
        </div>
        <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
          ↓
        </Text>
        <div className={styles.inspectorRow}>
          <Text as="span" size="caption" tone="tertiary">
            Evidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {evidenceStatusCaption(disclosure)}
          </Text>
        </div>
        {provenance.length > 0 ? (
          <>
            <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
              ↓
            </Text>
            <div className={styles.inspectorBlock}>
              <Text as="span" size="caption" tone="tertiary">
                Artifacts
              </Text>
              <ol
                className={styles.artifactChain}
                aria-label={`Artifacts for ${sectionId}`}
              >
                {provenance.map((source, index) => {
                  const key = `${sectionId}-art-${index}`;
                  const line = formatProvenanceSource(source);
                  return (
                    <li key={key}>
                      {index > 0 ? (
                        <Text as="span" size="caption" tone="tertiary">
                          ↓{" "}
                        </Text>
                      ) : null}
                      {source.href ? (
                        <Link href={source.href} tone="secondary">
                          {line}
                        </Link>
                      ) : (
                        <Text as="span" size="body-sm" tone="tertiary">
                          {line}
                        </Text>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </>
        ) : null}
        {relatedSystems.length > 0 ? (
          <>
            <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
              ↓
            </Text>
            <div className={styles.inspectorBlock}>
              <Text as="span" size="caption" tone="tertiary">
                Related systems
              </Text>
              <Text as="span" size="body-sm" tone="secondary">
                {relatedSystems.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? " · " : null}
                    <Link href={link.href} tone="secondary">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </Text>
            </div>
          </>
        ) : null}
        {appearsIn.length > 0 ? (
          <>
            <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
              ↓
            </Text>
            <div className={styles.inspectorBlock}>
              <Text as="span" size="caption" tone="tertiary">
                Appears in
              </Text>
              <Text as="span" size="body-sm" tone="secondary">
                {appearsIn.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? " · " : null}
                    <Link href={link.href} tone="secondary">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </Text>
            </div>
          </>
        ) : null}
      </div>
    </EvidenceInspectorShell>
  );
}

/**
 * Discovery-honest field — Confirmed shows value; Missing/Deferred stay visible.
 * Universal evidence inspector reuses native disclosure — no new interaction language.
 */
export function EvidenceField({
  title,
  id,
  disclosure,
  relatedSystems = [],
  appearsIn = [],
  enableCopyLink = true,
}: EvidenceFieldProps) {
  return (
    <section
      className={styles.root}
      aria-labelledby={id}
      data-eos-section-title={title}
      id={`${id}-section`}
    >
      <div className={styles.header}>
        <Heading level={3} id={id}>
          {title}
        </Heading>
        <div className={styles.headerMeta}>
          <Text
            as="p"
            size="caption"
            tone="tertiary"
            className={styles.status}
            data-eos-evidence-status={disclosure.status}
            data-eos-evidence-confidence={disclosure.confidence}
          >
            {evidenceStatusCaption(disclosure)}
          </Text>
          {enableCopyLink ? <CopySectionLink sectionId={id} /> : null}
        </div>
      </div>
      {disclosure.status === "confirmed" && disclosure.text ? (
        <>
          <Paragraph className={styles.body}>{disclosure.text}</Paragraph>
          <EvidenceInspector
            disclosure={disclosure}
            sectionId={id}
            relatedSystems={relatedSystems}
            appearsIn={appearsIn}
          />
        </>
      ) : (
        <>
          <Paragraph tone="tertiary" className={styles.body}>
            {disclosure.status === "missing"
              ? "No confirmed evidence is recorded for this section."
              : "This section is Deferred. It is not presented as complete."}
          </Paragraph>
          <EvidenceInspector
            disclosure={disclosure}
            sectionId={id}
            relatedSystems={relatedSystems}
            appearsIn={appearsIn}
          />
        </>
      )}
    </section>
  );
}
