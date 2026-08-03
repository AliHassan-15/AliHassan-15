import type { ProjectContent } from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { PrincipleExplorer } from "./PrincipleExplorer";
import {
  buildPrincipleInspections,
  type PrincipleExplorerLink,
} from "./inspectPrinciple";

type PrincipleExplorerSectionProps = {
  project: ProjectContent;
  localExplorerLinks: PrincipleExplorerLink[];
};

/**
 * Engineering Principles — beliefs evidenced across ≥3 confirmed projects.
 * Derived from Atlas systems only. Missing stays Missing.
 */
export function PrincipleExplorerSection({
  project,
  localExplorerLinks,
}: PrincipleExplorerSectionProps) {
  const inspections = buildPrincipleInspections({
    projectId: project.id,
    localExplorerLinks,
  });

  return (
    <section
      className={styles.evidence}
      aria-labelledby="engineering-principles-heading"
      data-eos-section-title="Engineering principles"
      id="engineering-principles"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-principles-heading">
            Engineering principles
          </Heading>
          <Paragraph tone="secondary">
            Inspect the engineering beliefs that recur across confirmed systems.
            A principle appears only when at least three projects support it.
            Missing stays Missing.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <PrincipleExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Principles
            </Text>
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          </div>
        )}
      </Stack>
    </section>
  );
}
