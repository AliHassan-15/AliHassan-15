import { COMPANION_PATHS } from "@/modules/experience/routes";
import {
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getProjectBySlug,
  loadProjects,
  projectDisplayTitle,
  resolveAtlasRelatedHrefs,
  resolveRelationshipStepHref,
} from "@/modules/meaning";
import { Stack } from "@/modules/presentation/layout";
import {
  Heading,
  Link,
  Paragraph,
  Text,
} from "@/modules/presentation/primitives";
import styles from "../case-study/CaseStudyDocument.module.css";

type ResolvedProject = {
  id: string;
  slug: string;
  title: string;
};

function resolveProjects(projectIds: string[]): ResolvedProject[] {
  return projectIds
    .map((id) => {
      const project =
        getProjectBySlug(id) ??
        loadProjects().find((entry) => entry.id === id) ??
        null;
      return project
        ? { id, slug: project.slug, title: projectDisplayTitle(project) }
        : null;
    })
    .filter((entry): entry is ResolvedProject => entry !== null);
}

function ProjectLinks({ projectIds }: { projectIds: string[] }) {
  const projects = resolveProjects(projectIds);
  return (
    <Text as="span" size="body-sm" tone="secondary">
      {projects.map((project, index) => (
        <span key={project.id}>
          {index > 0 ? " · " : null}
          <Link href={COMPANION_PATHS.project(project.slug)} tone="secondary">
            {project.title}
          </Link>
        </span>
      ))}
    </Text>
  );
}

const TOC = [
  { id: "atlas-systems", label: "Engineering systems" },
  { id: "atlas-evolution", label: "Decision evolution" },
  { id: "atlas-architecture", label: "Architecture index" },
  { id: "atlas-relationships", label: "Architecture relationships" },
  { id: "atlas-decisions", label: "Decision graph" },
  { id: "atlas-failures", label: "Failure knowledge" },
  { id: "atlas-validation", label: "Validation index" },
  { id: "atlas-glossary", label: "Engineering glossary" },
] as const;

/**
 * Engineering Systems Atlas — reference manual surface.
 * Reuses case-study evidence rhythm; no new visual language.
 */
export function EngineeringSystemsAtlas() {
  const atlas = getEngineeringAtlas();

  return (
    <div className={styles.document} id="eos-document">
      <nav className={styles.evidence} aria-label="Atlas sections">
        <Stack gap={2}>
          <Text as="span" size="caption" tone="tertiary">
            Sections
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {TOC.map((entry, index) => (
              <span key={entry.id}>
                {index > 0 ? " · " : null}
                <Link href={`#${entry.id}`} tone="secondary">
                  {entry.label}
                </Link>
              </span>
            ))}
          </Text>
        </Stack>
      </nav>

      <section className={styles.evidence} aria-labelledby="atlas-systems">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-systems">
              Engineering systems
            </Heading>
            <Paragraph tone="secondary">
              Recurring design systems only where at least two confirmed
              projects support the claim. Unsupported systems are not invented.
            </Paragraph>
          </Stack>
          {atlas.systems.map((system) => {
            const related = resolveAtlasRelatedHrefs(system);
            return (
              <section
                key={system.id}
                className={styles.evidence}
                aria-labelledby={`atlas-system-${system.id}`}
                data-eos-section-title={system.title}
              >
                <Stack gap={4}>
                  <div className={styles.evidenceRow}>
                    <Text as="span" size="caption" tone="tertiary">
                      {evidenceConfidenceCaption(system.confidence)}
                    </Text>
                    <Heading level={3} id={`atlas-system-${system.id}`}>
                      {system.title}
                    </Heading>
                  </div>
                  <Paragraph>{system.summary}</Paragraph>
                  <div className={styles.evidenceRow}>
                    <Text as="span" size="caption" tone="tertiary">
                      Projects
                    </Text>
                    <ProjectLinks projectIds={system.projectIds} />
                  </div>
                  {related.length > 0 ? (
                    <div className={styles.evidenceRow}>
                      <Text as="span" size="caption" tone="tertiary">
                        Related
                      </Text>
                      <Text as="span" size="body-sm" tone="secondary">
                        {related.map((link, index) => (
                          <span key={link.href}>
                            {index > 0 ? " · " : null}
                            <Link href={link.href} tone="secondary">
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </Text>
                    </div>
                  ) : null}
                </Stack>
              </section>
            );
          })}
        </Stack>
      </section>

      <section className={styles.evidence} aria-labelledby="atlas-evolution">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-evolution">
              Decision evolution
            </Heading>
            <Paragraph tone="secondary">
              Confirmed chronology only. Years without recorded public evidence
              are omitted.
            </Paragraph>
          </Stack>
          {atlas.evolution.map((step, index) => (
            <section
              key={step.id}
              className={styles.evidence}
              aria-labelledby={`atlas-evolution-${step.id}`}
            >
              <Stack gap={4}>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    {evidenceConfidenceCaption(step.confidence)} · {step.year}
                  </Text>
                  <Heading level={3} id={`atlas-evolution-${step.id}`}>
                    {step.label}
                  </Heading>
                </div>
                <Paragraph>{step.evidence}</Paragraph>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Projects
                  </Text>
                  <ProjectLinks projectIds={step.projectIds} />
                </div>
                {index < atlas.evolution.length - 1 ? (
                  <Text as="span" size="caption" tone="tertiary">
                    ↓
                  </Text>
                ) : null}
              </Stack>
            </section>
          ))}
        </Stack>
      </section>

      <section className={styles.evidence} aria-labelledby="atlas-architecture">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-architecture">
              Architecture index
            </Heading>
            <Paragraph tone="secondary">
              Components appear only where project evidence confirms them. No
              inferred stacks.
            </Paragraph>
          </Stack>
          {atlas.architectureIndex.map((component) => (
            <section
              key={component.id}
              className={styles.evidence}
              aria-labelledby={`atlas-component-${component.id}`}
            >
              <Stack gap={4}>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    {evidenceConfidenceCaption(component.confidence)}
                  </Text>
                  <Heading level={3} id={`atlas-component-${component.id}`}>
                    {component.name}
                  </Heading>
                </div>
                {component.note ? (
                  <Paragraph tone="secondary">{component.note}</Paragraph>
                ) : null}
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Projects
                  </Text>
                  <ProjectLinks projectIds={component.projectIds} />
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </section>

      {atlas.relationships.length > 0 ? (
        <section
          className={styles.evidence}
          aria-labelledby="atlas-relationships"
        >
          <Stack gap={6}>
            <Stack gap={4}>
              <Heading level={2} id="atlas-relationships">
                Architecture relationships
              </Heading>
              <Paragraph tone="secondary">
                Editorial chains across systems, projects, and language. Not a
                diagram.
              </Paragraph>
            </Stack>
            {atlas.relationships.map((rel) => (
              <section
                key={rel.id}
                className={styles.evidence}
                aria-labelledby={`atlas-relationship-${rel.id}`}
                data-eos-section-title={rel.title}
              >
                <Stack gap={4}>
                  <Heading level={3} id={`atlas-relationship-${rel.id}`}>
                    {rel.title}
                  </Heading>
                  {rel.steps.map((step, index) => {
                    const href = resolveRelationshipStepHref(step);
                    return (
                      <div key={`${rel.id}-${step.kind}-${step.id}`}>
                        {index > 0 ? (
                          <Text as="span" size="caption" tone="tertiary">
                            ↓
                          </Text>
                        ) : null}
                        <div className={styles.evidenceRow}>
                          <Text as="span" size="caption" tone="tertiary">
                            {step.kind}
                          </Text>
                          {href ? (
                            <Link href={href} tone="secondary">
                              {step.label}
                            </Link>
                          ) : (
                            <Text as="span" size="body-sm" tone="tertiary">
                              {step.label}
                            </Text>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </section>
            ))}
          </Stack>
        </section>
      ) : null}

      <section className={styles.evidence} aria-labelledby="atlas-decisions">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-decisions">
              Decision graph
            </Heading>
            <Paragraph tone="secondary">
              Decision → projects → evidence → outcome. Quiet document
              structure; not a diagram experiment.
            </Paragraph>
          </Stack>
          {atlas.decisions.map((decision) => (
            <section
              key={decision.id}
              className={styles.evidence}
              aria-labelledby={`atlas-decision-${decision.id}`}
            >
              <Stack gap={4}>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    {evidenceConfidenceCaption(decision.confidence)} · Decision
                  </Text>
                  <Heading level={3} id={`atlas-decision-${decision.id}`}>
                    {decision.decision}
                  </Heading>
                </div>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Projects
                  </Text>
                  <ProjectLinks projectIds={decision.projectIds} />
                </div>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Evidence
                  </Text>
                  <Paragraph>{decision.evidence}</Paragraph>
                </div>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Outcome
                  </Text>
                  <Paragraph>{decision.outcome}</Paragraph>
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </section>

      <section className={styles.evidence} aria-labelledby="atlas-failures">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-failures">
              Failure knowledge
            </Heading>
            <Paragraph tone="secondary">
              Every failure remains attached to its originating project. No
              unsupported generalization.
            </Paragraph>
          </Stack>
          {atlas.failures.map((failure) => (
            <section
              key={failure.id}
              className={styles.evidence}
              aria-labelledby={`atlas-failure-${failure.id}`}
            >
              <Stack gap={4}>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    {evidenceConfidenceCaption(failure.confidence)}
                  </Text>
                  <Heading level={3} id={`atlas-failure-${failure.id}`}>
                    {failure.title}
                  </Heading>
                </div>
                <Paragraph>{failure.detail}</Paragraph>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Source project
                  </Text>
                  <ProjectLinks projectIds={[failure.projectId]} />
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </section>

      <section className={styles.evidence} aria-labelledby="atlas-validation">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-validation">
              Validation index
            </Heading>
            <Paragraph tone="secondary">
              Confirmed validation methods linked to originating projects.
            </Paragraph>
          </Stack>
          {atlas.validationIndex.map((entry) => (
            <section
              key={entry.id}
              className={styles.evidence}
              aria-labelledby={`atlas-validation-${entry.id}`}
            >
              <Stack gap={4}>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    {evidenceConfidenceCaption(entry.confidence)}
                  </Text>
                  <Heading level={3} id={`atlas-validation-${entry.id}`}>
                    {entry.name}
                  </Heading>
                </div>
                <Paragraph>{entry.detail}</Paragraph>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Projects
                  </Text>
                  <ProjectLinks projectIds={entry.projectIds} />
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </section>

      <section className={styles.evidence} aria-labelledby="atlas-glossary">
        <Stack gap={6}>
          <Stack gap={4}>
            <Heading level={2} id="atlas-glossary">
              Engineering glossary
            </Heading>
            <Paragraph tone="secondary">
              Terminology already present in the evidence corpus. No invented
              vocabulary.
            </Paragraph>
          </Stack>
          {atlas.glossary.map((entry) => (
            <section
              key={entry.id}
              className={styles.evidence}
              aria-labelledby={`atlas-glossary-${entry.id}`}
            >
              <Stack gap={4}>
                <Heading level={3} id={`atlas-glossary-${entry.id}`}>
                  {entry.term}
                </Heading>
                <Paragraph>{entry.definition}</Paragraph>
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Appears in
                  </Text>
                  <ProjectLinks projectIds={entry.projectIds} />
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </section>
    </div>
  );
}
