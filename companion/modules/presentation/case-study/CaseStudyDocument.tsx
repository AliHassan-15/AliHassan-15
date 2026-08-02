import { ArchitectureTopology } from "@/modules/enhancement/spatial";
import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  formatEvidenceStatus,
  projectDisplayTitle,
  projectRepoHref,
  projectTierLabel,
  type ProjectContent,
} from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import {
  Caption,
  Heading,
  Lead,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import { EvidenceField } from "./EvidenceField";
import styles from "./CaseStudyDocument.module.css";

type CaseStudyDocumentProps = {
  project: ProjectContent;
  orientationWhy: string;
};

const CASE_STUDY_ORDER = [
  { key: "problem", title: "Problem" },
  { key: "overview", title: "Overview" },
  { key: "architecture", title: "Architecture" },
  { key: "decisions", title: "Decisions" },
  { key: "tradeoffs", title: "Trade-offs" },
  { key: "lessons", title: "Lessons" },
  { key: "constraints", title: "Constraints" },
  { key: "rejectedApproaches", title: "Rejected approaches" },
] as const;

function aiUsageLabel(project: ProjectContent): string {
  switch (project.aiUsageClass) {
    case "essential":
      return "AI essential to the system";
    case "conventional":
      return "Conventional by design — AI not forced";
    case "unspecified":
      return "AI usage classification unspecified";
    default: {
      const _exhaustive: never = project.aiUsageClass;
      return _exhaustive;
    }
  }
}

/**
 * Shared case-study document — composes from content; never invents evidence.
 */
export function CaseStudyDocument({
  project,
  orientationWhy,
}: CaseStudyDocumentProps) {
  const title = projectDisplayTitle(project);
  const repo = projectRepoHref(project);
  const types = discloseEvidenceStringList(project.typeLabels);
  const status = discloseEvidenceString(project.completionStatus);
  const role = discloseEvidenceString(project.role);
  const credit = discloseEvidenceString(project.creditLine);
  const tech = discloseEvidenceStringList(project.technologies);
  const outcomes = discloseEvidenceString(project.measuredOutcomes);
  const demo = discloseEvidenceString(project.liveDemo);
  const note = discloseEvidenceString(project.repositoryNote);

  return (
    <article className={styles.document}>
      <header className={styles.hero}>
        <Stack gap={5}>
          <Caption>{orientationWhy}</Caption>
          <Text as="p" size="caption" tone="tertiary" className={styles.meta}>
            {projectTierLabel(project.tier)} · {aiUsageLabel(project)}
          </Text>
          <Heading level={1} id="case-study-title">
            {title}
          </Heading>
          {types.status === "confirmed" && types.text ? (
            <Lead className={styles.types}>{types.text}</Lead>
          ) : null}
          {status.status === "confirmed" && status.text ? (
            <Text as="p" size="body-sm" tone="secondary">
              {status.text}
            </Text>
          ) : null}
          {role.status === "confirmed" && role.text ? (
            <Paragraph tone="secondary">{role.text}</Paragraph>
          ) : null}
          {credit.status === "confirmed" && credit.text ? (
            <Paragraph>{credit.text}</Paragraph>
          ) : null}
        </Stack>
      </header>

      <section className={styles.evidence} aria-labelledby="evidence-heading">
        <Heading level={2} id="evidence-heading">
          Evidence
        </Heading>
        <Stack gap={4}>
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Repository
            </Text>
            {repo ? (
              <Link href={repo} tone="secondary">
                {repo.replace("https://github.com/", "")}
              </Link>
            ) : (
              <Text as="span" size="body-sm" tone="tertiary">
                {formatEvidenceStatus(
                  discloseEvidenceString(project.repositoryUrl),
                )}
              </Text>
            )}
          </div>
          {note.status === "confirmed" && note.text ? (
            <Paragraph tone="tertiary">{note.text}</Paragraph>
          ) : null}
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Technologies
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {formatEvidenceStatus(tech)}
            </Text>
          </div>
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Measured outcomes
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {formatEvidenceStatus(outcomes, {
                missingLabel: "Missing — not claimed",
              })}
            </Text>
          </div>
          <div className={styles.evidenceRow}>
            <Text as="span" size="caption" tone="tertiary">
              Live demo
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {formatEvidenceStatus(demo)}
            </Text>
          </div>
        </Stack>
      </section>

      <div className={styles.sections}>
        {CASE_STUDY_ORDER.map((section) => {
          const disclosure = discloseEvidenceString(
            project.caseStudy[section.key],
          );

          return (
            <div key={section.key}>
              <EvidenceField
                id={`section-${section.key}`}
                title={section.title}
                disclosure={disclosure}
              />
              {section.key === "architecture" &&
              disclosure.status === "confirmed" &&
              disclosure.text ? (
                <ArchitectureTopology architectureText={disclosure.text} />
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}
