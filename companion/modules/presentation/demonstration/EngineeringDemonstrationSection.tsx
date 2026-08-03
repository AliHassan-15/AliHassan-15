import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph } from "@/modules/presentation/primitives";
import type { ProjectContent } from "@/modules/meaning";
import { EngineeringDemonstration } from "./EngineeringDemonstration";
import { buildDemonstrationModel } from "./inspectDemonstration";
import styles from "./EngineeringDemonstration.module.css";
import caseStyles from "@/modules/presentation/case-study/CaseStudyDocument.module.css";

type EngineeringDemonstrationSectionProps = {
  project: ProjectContent;
};

/**
 * Optional flagship demonstration — only when confirmed `stages:` exist.
 */
export function EngineeringDemonstrationSection({
  project,
}: EngineeringDemonstrationSectionProps) {
  const model = buildDemonstrationModel(project);
  if (!model) {
    return null;
  }

  return (
    <section
      className={`${caseStyles.evidence} ${styles.section}`}
      aria-labelledby="engineering-demonstration-heading"
      data-eos-section-title="Engineering demonstration"
      id="engineering-demonstration"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <p className={styles.sectionLabel}>Demonstration</p>
          <Heading level={2} id="engineering-demonstration-heading">
            Engineering demonstration
          </Heading>
          <Paragraph tone="secondary">
            Inspect confirmed pipeline stages for {model.projectTitle}.
            Selection updates the shared engineering context — Architecture
            Topology, Decision, Validation, Failure, Knowledge Graph, and
            Capability Atlas stay synchronized. Missing remains Missing.
          </Paragraph>
        </Stack>
        <EngineeringDemonstration model={model} />
      </Stack>
    </section>
  );
}
