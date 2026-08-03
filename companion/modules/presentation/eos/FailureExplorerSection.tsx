import { discloseEvidenceString, getEngineeringAtlas } from "@/modules/meaning";
import type { ProjectContent } from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { FailureExplorer } from "./FailureExplorer";
import {
  buildFailureInspections,
  buildFailureModesFallbackInspection,
  type FailureExplorerLink,
} from "./inspectFailure";

type FailureExplorerSectionProps = {
  project: ProjectContent;
  relatedArchitecture: FailureExplorerLink[];
  relatedValidation: FailureExplorerLink[];
  relatedSystems: FailureExplorerLink[];
  relatedAtlasDecisions: FailureExplorerLink[];
};

/**
 * Failure & Resilience — inspect confirmed failure scenarios only.
 * Missing stays Missing when no confirmed failures exist.
 */
export function FailureExplorerSection({
  project,
  relatedArchitecture,
  relatedValidation,
  relatedSystems,
  relatedAtlasDecisions,
}: FailureExplorerSectionProps) {
  const atlasFailures = getEngineeringAtlas()
    .failures.filter((entry) => entry.projectId === project.id)
    .map((entry) => ({
      ...entry,
      href: `${COMPANION_PATHS.atlas}#atlas-failure-${entry.id}`,
    }));

  let inspections = buildFailureInspections({
    project,
    atlasFailures,
    relatedArchitecture,
    relatedValidation,
    relatedSystems,
    relatedAtlasDecisions,
  });

  if (inspections.length === 0) {
    const fallback = buildFailureModesFallbackInspection({
      project,
      relatedArchitecture,
      relatedValidation,
      relatedSystems,
      relatedAtlasDecisions,
    });
    if (fallback) {
      inspections = [fallback];
    }
  }

  const failureModes = discloseEvidenceString(
    project.engineeringCaseFile.failureModes,
  );

  return (
    <section
      className={styles.evidence}
      aria-labelledby="failure-resilience-heading"
      data-eos-section-title="Failure and resilience"
      id="failure-resilience"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="failure-resilience-heading">
            Failure &amp; resilience
          </Heading>
          <Paragraph tone="secondary">
            Inspect what happens when things go wrong. Architecture explains
            how; decisions explain why; validation explains proof; failure
            explains resilience. Missing stays Missing. Deferred stays Deferred.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <FailureExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Failure
            </Text>
            <Text as="span" size="body-sm" tone="tertiary">
              {failureModes.status === "deferred"
                ? `Deferred${failureModes.deferralId ? ` · ${failureModes.deferralId}` : ""}`
                : "Missing"}
            </Text>
          </div>
        )}
      </Stack>
    </section>
  );
}
