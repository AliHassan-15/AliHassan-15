import { discloseEvidenceString, getEngineeringAtlas } from "@/modules/meaning";
import type { ProjectContent } from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { EvolutionExplorer } from "./EvolutionExplorer";
import {
  buildEvolutionInspections,
  buildTimelineFallbackInspection,
  type EvolutionExplorerLink,
} from "./inspectEvolution";

type EvolutionExplorerSectionProps = {
  project: ProjectContent;
  relatedArchitecture: EvolutionExplorerLink[];
  relatedValidation: EvolutionExplorerLink[];
  relatedFailure: EvolutionExplorerLink[];
  relatedSystems: EvolutionExplorerLink[];
  relatedAtlasDecisions: EvolutionExplorerLink[];
};

/**
 * Engineering Evolution — inspect confirmed chronology only.
 * Missing stays Missing when no confirmed milestones exist.
 */
export function EvolutionExplorerSection({
  project,
  relatedArchitecture,
  relatedValidation,
  relatedFailure,
  relatedSystems,
  relatedAtlasDecisions,
}: EvolutionExplorerSectionProps) {
  const atlasEvolution = getEngineeringAtlas()
    .evolution.filter((entry) => entry.projectIds.includes(project.id))
    .map((entry) => ({
      ...entry,
      href: `${COMPANION_PATHS.atlas}#atlas-evolution-${entry.id}`,
    }));

  let inspections = buildEvolutionInspections({
    project,
    atlasEvolution,
    relatedArchitecture,
    relatedValidation,
    relatedFailure,
    relatedSystems,
    relatedAtlasDecisions,
  });

  if (inspections.length === 0) {
    const fallback = buildTimelineFallbackInspection({
      project,
      relatedArchitecture,
      relatedValidation,
      relatedFailure,
      relatedSystems,
      relatedAtlasDecisions,
    });
    if (fallback) {
      inspections = [fallback];
    }
  }

  const timeline = discloseEvidenceString(project.engineeringCaseFile.timeline);

  return (
    <section
      className={styles.evidence}
      aria-labelledby="engineering-evolution-heading"
      data-eos-section-title="Engineering evolution"
      id="engineering-evolution"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-evolution-heading">
            Engineering evolution
          </Heading>
          <Paragraph tone="secondary">
            Inspect how the system changed through confirmed evidence—not a Git
            history viewer. Missing stays Missing. Deferred stays Deferred.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <EvolutionExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Evolution
            </Text>
            <Text as="span" size="body-sm" tone="tertiary">
              {timeline.status === "deferred"
                ? `Deferred${timeline.deferralId ? ` · ${timeline.deferralId}` : ""}`
                : "Missing"}
            </Text>
          </div>
        )}
      </Stack>
    </section>
  );
}
