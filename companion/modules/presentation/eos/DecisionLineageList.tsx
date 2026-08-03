import {
  discloseEvidenceString,
  resolveLineageReferenceHref,
  type DecisionLineage,
  type HonestyDisclosure,
} from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import {
  Heading,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import { EvidenceField } from "../case-study/EvidenceField";
import styles from "../case-study/CaseStudyDocument.module.css";
import { DecisionExplorer } from "./DecisionExplorer";
import {
  confirmedDecisionLineages,
  inspectDecision,
  type DecisionExplorerLink,
} from "./inspectDecision";

type DecisionLineageListProps = {
  lineages: DecisionLineage[];
  tradeoffs: HonestyDisclosure;
  constraints: HonestyDisclosure;
  relatedArchitecture: DecisionExplorerLink[];
  /** Project-level Atlas systems already confirmed for this case study. */
  relatedSystems?: DecisionExplorerLink[];
};

const STEPS = [
  { key: "decision", title: "Decision" },
  { key: "why", title: "Reason" },
  { key: "alternativeRejected", title: "Alternative rejected" },
  { key: "validation", title: "Validation" },
  { key: "futureDirection", title: "Future direction" },
] as const;

/**
 * Engineering Decision Explorer — ADR paths as an inspection surface.
 * Missing steps remain Missing. Never invents decisions.
 */
export function DecisionLineageList({
  lineages,
  tradeoffs,
  constraints,
  relatedArchitecture,
  relatedSystems = [],
}: DecisionLineageListProps) {
  const confirmed = confirmedDecisionLineages(lineages);

  if (confirmed.length === 0) {
    return null;
  }

  const inspections = confirmed.map((lineage) => {
    const fromRefs: DecisionExplorerLink[] = [];
    for (const ref of lineage.referencedAgainBy) {
      const href = resolveLineageReferenceHref(ref);
      if (!href) {
        continue;
      }
      fromRefs.push({ href, label: ref.label });
    }
    const merged = [...fromRefs, ...relatedSystems];
    const seen = new Set<string>();
    const systems = merged.filter((link) => {
      const key = `${link.href}::${link.label}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });

    return inspectDecision({
      lineage,
      tradeoffs,
      constraints,
      relatedArchitecture,
      relatedSystems: systems,
    });
  });

  return (
    <section
      className={styles.evidence}
      aria-labelledby="decision-explorer-heading"
      data-eos-section-title="Engineering decision explorer"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="decision-explorer-heading">
            Engineering decision explorer
          </Heading>
          <Paragraph tone="secondary">
            Inspect why systems became the way they are. Architecture answers
            what exists; decisions answer why. Missing stays Missing. Deferred
            stays Deferred.
          </Paragraph>
        </Stack>

        <DecisionExplorer inspections={inspections} />

        <Stack gap={6}>
          <Text as="span" size="caption" tone="tertiary">
            Lineage detail · Evidence inspector
          </Text>
          {confirmed.map((lineage) => (
            <section
              key={lineage.id}
              className={styles.evidence}
              aria-labelledby={`lineage-${lineage.id}`}
              data-eos-section-title={`Lineage · ${lineage.id}`}
            >
              <Stack gap={4}>
                <Heading level={3} id={`lineage-${lineage.id}`}>
                  {lineage.id}
                </Heading>
                {STEPS.map((step, index) => {
                  const field = lineage[step.key];
                  return (
                    <div key={step.key}>
                      {index > 0 ? (
                        <Text as="span" size="caption" tone="tertiary">
                          ↓
                        </Text>
                      ) : null}
                      <EvidenceField
                        id={`lineage-${lineage.id}-${step.key}`}
                        title={step.title}
                        disclosure={discloseEvidenceString(field)}
                      />
                    </div>
                  );
                })}
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Referenced again by
                  </Text>
                  {lineage.referencedAgainBy.length > 0 ? (
                    <Text as="span" size="body-sm" tone="secondary">
                      {lineage.referencedAgainBy.map((ref, index) => {
                        const href = resolveLineageReferenceHref(ref);
                        return (
                          <span key={`${ref.kind}-${ref.id}`}>
                            {index > 0 ? " · " : null}
                            {href ? (
                              <Link href={href} tone="secondary">
                                {ref.label}
                              </Link>
                            ) : (
                              ref.label
                            )}
                          </span>
                        );
                      })}
                    </Text>
                  ) : (
                    <Text as="span" size="body-sm" tone="tertiary">
                      Missing
                    </Text>
                  )}
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </Stack>
    </section>
  );
}
