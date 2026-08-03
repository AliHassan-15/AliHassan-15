import { extractPipelineStages } from "@/modules/enhancement/spatial/extractPipelineStages";
import { inspectPipelineStage } from "@/modules/enhancement/spatial/inspectPipelineStage";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import {
  discloseEvidenceString,
  evidenceConfidenceCaption,
  formatProvenanceSource,
  getProjectNetwork,
  projectDisplayTitle,
  type ProjectContent,
} from "@/modules/meaning";
import { architectureStageAddress } from "@/modules/presentation/engineering/engineering.types";
import { confirmedDecisionLineages } from "@/modules/presentation/eos/inspectDecision";

export type DemonstrationLink = {
  href: string;
  label: string;
};

/** Serializable stage plate — confirmed evidence only. */
export type DemonstrationStage = {
  id: string;
  label: string;
  position: string;
  purposeText: string;
  inputsText: string;
  outputsText: string;
  relatedDecisions: DemonstrationLink[];
  relatedValidation: DemonstrationLink[];
  relatedFailures: DemonstrationLink[];
  relatedSystems: DemonstrationLink[];
  relatedKnowledge: DemonstrationLink[];
  relatedCapabilities: DemonstrationLink[];
  artifacts: string[];
  evidenceText: string;
  confidenceCaption: string;
  provenance: string[];
};

export type DemonstrationModel = {
  projectSlug: string;
  projectTitle: string;
  architectureText: string;
  stages: DemonstrationStage[];
  relatedEvidence: DemonstrationLink[];
};

function textMentions(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function uniqueLinks(links: DemonstrationLink[]): DemonstrationLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.href}::${link.label}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Build an engineering demonstration only when confirmed `stages:` exist.
 * Never invents pipeline stages. Non-flagship and Missing architecture → null.
 */
export function buildDemonstrationModel(
  project: ProjectContent,
): DemonstrationModel | null {
  if (project.tier !== "flagship") {
    return null;
  }

  const architecture = discloseEvidenceString(project.caseStudy.architecture);
  if (architecture.status !== "confirmed" || !architecture.text) {
    return null;
  }

  const architectureText = architecture.text;
  const stages = extractPipelineStages(architectureText);
  if (!stages) {
    return null;
  }

  const network = getProjectNetwork(project.id);
  const lineages = confirmedDecisionLineages(
    project.engineeringCaseFile.decisionLineages,
  );
  const validationMethodology = discloseEvidenceString(
    project.engineeringCaseFile.validationMethodology,
  );
  const failureModes = discloseEvidenceString(
    project.engineeringCaseFile.failureModes,
  );
  const provenance = architecture.provenance.map(formatProvenanceSource);
  const confidenceCaption = evidenceConfidenceCaption(architecture.confidence);
  const projectHref = COMPANION_PATHS.project(project.slug);

  const relatedEvidence = uniqueLinks(
    architecture.provenance
      .filter((source) => Boolean(source.href))
      .map((source) => ({
        href: source.href as string,
        label: source.label,
      })),
  );

  const demonstrationStages: DemonstrationStage[] = stages.map(
    (stage, index) => {
      const inspection = inspectPipelineStage(architectureText, stages, index);
      const address = architectureStageAddress(stage);

      const relatedDecisions = uniqueLinks(
        lineages
          .filter((lineage) => {
            const decision = discloseEvidenceString(lineage.decision);
            const why = discloseEvidenceString(lineage.why);
            const validation = discloseEvidenceString(lineage.validation);
            return (
              (decision.status === "confirmed" &&
                decision.text &&
                textMentions(decision.text, stage)) ||
              (why.status === "confirmed" &&
                why.text &&
                textMentions(why.text, stage)) ||
              (validation.status === "confirmed" &&
                validation.text &&
                textMentions(validation.text, stage))
            );
          })
          .map((lineage) => ({
            href: `${projectHref}#decision-explorer-heading`,
            label: lineage.id,
          })),
      );

      const relatedValidation: DemonstrationLink[] = [];
      if (
        validationMethodology.status === "confirmed" &&
        validationMethodology.text &&
        textMentions(validationMethodology.text, stage)
      ) {
        relatedValidation.push({
          href: `${projectHref}#engineering-validation`,
          label: "Engineering validation",
        });
      }
      for (const entry of network.validations) {
        if (
          textMentions(entry.name, stage) ||
          textMentions(entry.detail, stage)
        ) {
          relatedValidation.push({
            href: entry.href,
            label: `Atlas · ${entry.name}`,
          });
        }
      }

      const relatedFailures: DemonstrationLink[] = [];
      if (
        failureModes.status === "confirmed" &&
        failureModes.text &&
        textMentions(failureModes.text, stage)
      ) {
        relatedFailures.push({
          href: `${projectHref}#failure-resilience`,
          label: "Failure & resilience",
        });
      }

      const relatedSystems = uniqueLinks(
        network.systems
          .filter(
            (entry) =>
              textMentions(entry.title, stage) ||
              textMentions(entry.summary, stage),
          )
          .map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.title}`,
          })),
      );

      return {
        id: address,
        label: stage,
        position: inspection?.position ?? `${index + 1} of ${stages.length}`,
        purposeText:
          inspection?.evidenceExcerpt ??
          "Named in the confirmed architecture stage list. No additional prose sentence names this stage.",
        inputsText: inspection?.follows
          ? `Preceded by confirmed stage · ${inspection.follows}`
          : "Missing",
        outputsText: inspection?.precedes
          ? `Followed by confirmed stage · ${inspection.precedes}`
          : "Missing",
        relatedDecisions,
        relatedValidation: uniqueLinks(relatedValidation),
        relatedFailures,
        relatedSystems,
        relatedKnowledge: [
          {
            href: `${projectHref}#engineering-knowledge-graph`,
            label: "Knowledge graph",
          },
        ],
        relatedCapabilities: [
          {
            href: `${COMPANION_PATHS.home}#engineering-capability-atlas`,
            label: "Capability Atlas",
          },
        ],
        artifacts: provenance,
        evidenceText: architectureText,
        confidenceCaption,
        provenance,
      };
    },
  );

  return {
    projectSlug: project.slug,
    projectTitle: projectDisplayTitle(project),
    architectureText,
    stages: demonstrationStages,
    relatedEvidence,
  };
}
