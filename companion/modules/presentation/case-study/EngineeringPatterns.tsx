import {
  evidenceConfidenceCaption,
  getEngineeringPatterns,
  getProjectBySlug,
  loadProjects,
  projectDisplayTitle,
  type EngineeringPattern,
} from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import {
  Heading,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import styles from "./CaseStudyDocument.module.css";

function PatternCard({ pattern }: { pattern: EngineeringPattern }) {
  const projects = pattern.projectIds
    .map((id) => {
      const project =
        getProjectBySlug(id) ??
        loadProjects().find((entry) => entry.id === id) ??
        null;
      return project
        ? { id, slug: project.slug, title: projectDisplayTitle(project) }
        : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <section
      className={styles.evidence}
      aria-labelledby={`pattern-${pattern.id}`}
    >
      <Stack gap={4}>
        <div className={styles.evidenceRow}>
          <Text as="span" size="caption" tone="tertiary">
            {evidenceConfidenceCaption(pattern.confidence)}
          </Text>
          <Heading level={3} id={`pattern-${pattern.id}`}>
            {pattern.title}
          </Heading>
        </div>
        <Paragraph>{pattern.statement}</Paragraph>
        <div className={styles.evidenceRow}>
          <Text as="span" size="caption" tone="tertiary">
            Evidenced in
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {projects.map((project, index) => (
              <span key={project.id}>
                {index > 0 ? " · " : null}
                <Link href={`/archive/${project.slug}`} tone="secondary">
                  {project.title}
                </Link>
              </span>
            ))}
          </Text>
        </div>
      </Stack>
    </section>
  );
}

/**
 * Cross-project patterns — only principles evidenced in ≥2 projects.
 */
export function EngineeringPatterns() {
  const patterns = getEngineeringPatterns();

  if (patterns.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="engineering-patterns-heading">
      <Stack gap={6}>
        <Stack gap={4}>
          <Heading level={2} id="engineering-patterns-heading">
            Cross-project engineering patterns
          </Heading>
          <Paragraph tone="secondary">
            Recurring principles only where at least two confirmed projects
            support the claim. Missing patterns are not invented.
          </Paragraph>
        </Stack>
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </Stack>
    </section>
  );
}
