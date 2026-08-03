import type { ProjectContent } from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { KnowledgeGraphExplorer } from "./KnowledgeGraphExplorer";
import { buildKnowledgeGraphInspections } from "./inspectKnowledgeGraph";

type KnowledgeGraphSectionProps = {
  project: ProjectContent;
};

/**
 * Engineering Knowledge Graph — connective tissue across confirmed entities.
 * Editorial lists and inspection plates only. Missing stays Missing.
 */
export function KnowledgeGraphSection({ project }: KnowledgeGraphSectionProps) {
  const inspections = buildKnowledgeGraphInspections({ project });

  return (
    <section
      className={styles.evidence}
      aria-labelledby="engineering-knowledge-graph-heading"
      data-eos-section-title="Engineering knowledge graph"
      id="engineering-knowledge-graph"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-knowledge-graph-heading">
            Engineering Knowledge Graph
          </Heading>
          <Paragraph tone="secondary">
            Inspect how confirmed engineering entities connect for this project.
            Nodes and relationships come only from Atlas, explorers, references,
            and provenance already present in EOS. Missing stays Missing.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <KnowledgeGraphExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Knowledge graph
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
