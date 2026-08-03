import { getEngineeringPatterns, type ProjectContent } from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { PatternExplorer } from "./PatternExplorer";
import {
  buildPatternInspections,
  type PatternExplorerLink,
} from "./inspectPattern";

type PatternExplorerSectionProps = {
  project: ProjectContent;
  localExplorerLinks: PatternExplorerLink[];
};

/**
 * Engineering Patterns — inspect principles evidenced in ≥2 confirmed projects.
 * Missing stays Missing when this project participates in no confirmed patterns.
 */
export function PatternExplorerSection({
  project,
  localExplorerLinks,
}: PatternExplorerSectionProps) {
  const inspections = buildPatternInspections({
    patterns: getEngineeringPatterns(),
    projectId: project.id,
    localExplorerLinks,
  });

  return (
    <section
      className={styles.evidence}
      aria-labelledby="engineering-patterns-explorer-heading"
      data-eos-section-title="Engineering patterns"
      id="engineering-patterns"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-patterns-explorer-heading">
            Engineering patterns
          </Heading>
          <Paragraph tone="secondary">
            Inspect principles that recur across confirmed systems. A pattern
            appears only when at least two projects support it. Missing stays
            Missing.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <PatternExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Patterns
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
