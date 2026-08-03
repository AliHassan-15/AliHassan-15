import type { ProjectContent } from "@/modules/meaning";
import { discloseEvidenceString } from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import { Heading, Paragraph, Text } from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";
import { ValidationExplorer } from "./ValidationExplorer";
import {
  buildMethodologyFallbackInspection,
  buildValidationInspections,
  type ValidationExplorerLink,
  type ValidationSystemLink,
} from "./inspectValidation";
import type { AtlasValidation } from "@/modules/meaning/schema";

type ValidationExplorerSectionProps = {
  project: ProjectContent;
  atlasValidations: Array<AtlasValidation & { href: string }>;
  relatedArchitecture: ValidationExplorerLink[];
  relatedSystems: ValidationSystemLink[];
};

/**
 * Engineering Validation — laboratory inspection of how confidence was earned.
 * Missing stays Missing when no confirmed validation methods exist.
 */
export function ValidationExplorerSection({
  project,
  atlasValidations,
  relatedArchitecture,
  relatedSystems,
}: ValidationExplorerSectionProps) {
  let inspections = buildValidationInspections({
    project,
    atlasValidations,
    relatedArchitecture,
    relatedSystems,
  });

  if (inspections.length === 0) {
    const fallback = buildMethodologyFallbackInspection({
      project,
      relatedArchitecture,
      relatedSystems,
    });
    if (fallback) {
      inspections = [fallback];
    }
  }

  const methodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );

  return (
    <section
      className={styles.evidence}
      aria-labelledby="engineering-validation-heading"
      data-eos-section-title="Engineering validation"
      id="engineering-validation"
    >
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-validation-heading">
            Engineering validation
          </Heading>
          <Paragraph tone="secondary">
            Inspect how confidence was earned. Architecture explains how it
            works; decisions explain why; validation explains what was proven.
            Missing stays Missing. Deferred stays Deferred.
          </Paragraph>
        </Stack>

        {inspections.length > 0 ? (
          <ValidationExplorer inspections={inspections} />
        ) : (
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Validation
            </Text>
            <Text as="span" size="body-sm" tone="tertiary">
              {methodology.status === "deferred"
                ? `Deferred${methodology.deferralId ? ` · ${methodology.deferralId}` : ""}`
                : "Missing"}
            </Text>
          </div>
        )}
      </Stack>
    </section>
  );
}
