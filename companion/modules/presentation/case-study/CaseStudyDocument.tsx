import { ArchitectureTopology } from "@/modules/enhancement/spatial/ArchitectureTopology";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import {
  discloseEvidenceString,
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  formatEvidenceStatus,
  formatProvenanceSource,
  getProjectNetwork,
  projectDisplayTitle,
  projectRepoHref,
  projectTierLabel,
  relatedLinksForCaseSection,
  type ProjectContent,
} from "@/modules/meaning";
import {
  DecisionLineageList,
  EngineeringWalkthrough,
  EvolutionExplorerSection,
  FailureExplorerSection,
  KnowledgeGraphSection,
  PatternExplorerSection,
  PrincipleExplorerSection,
  ReadingPosition,
  ValidationExplorerSection,
  WalkthroughRoom,
  buildWalkthroughRooms,
} from "@/modules/presentation/eos";
import { EngineeringWorldPanel } from "@/modules/presentation/engineering";
import { EngineeringDemonstrationSection } from "@/modules/presentation/demonstration";
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

/** Engineering case-file sections — same EvidenceField surface; no new visuals. */
const ENGINEERING_CASE_FILE_ORDER = [
  { key: "timeline", title: "Engineering timeline" },
  { key: "decisionRecords", title: "Decision records" },
  { key: "validationMethodology", title: "Validation methodology" },
  { key: "technicalRisks", title: "Technical risks" },
  { key: "failureModes", title: "Failure modes" },
  { key: "knownLimitations", title: "Known limitations" },
  { key: "futureDirections", title: "Future engineering directions" },
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
  const references = project.engineeringReferences;
  const network = getProjectNetwork(project.id);
  const atlasAppears = [
    ...network.systems.map((entry) => ({
      href: entry.href,
      label: entry.title,
    })),
    ...network.glossary.map((entry) => ({
      href: entry.href,
      label: entry.term,
    })),
  ];
  const walkthroughRooms = buildWalkthroughRooms(project);
  const hasWalkthroughRoom = (id: (typeof walkthroughRooms)[number]["id"]) =>
    walkthroughRooms.some((room) => room.id === id);

  const decisionLineageList = (
    <DecisionLineageList
      lineages={project.engineeringCaseFile.decisionLineages}
      tradeoffs={discloseEvidenceString(project.caseStudy.tradeoffs)}
      constraints={discloseEvidenceString(project.caseStudy.constraints)}
      relatedArchitecture={[
        ...(discloseEvidenceString(project.caseStudy.architecture).status ===
        "confirmed"
          ? [
              {
                href: "#section-architecture",
                label: "Case study · Architecture",
              },
            ]
          : []),
        ...network.architecture.map((entry) => ({
          href: entry.href,
          label: `Atlas · ${entry.name}`,
        })),
      ]}
      relatedSystems={network.systems.map((entry) => ({
        href: entry.href,
        label: `Atlas · ${entry.title}`,
      }))}
    />
  );

  return (
    <article className={styles.document} id="eos-document">
      <EngineeringWalkthrough rooms={walkthroughRooms}>
        {walkthroughRooms.length >= 2 ? <EngineeringWorldPanel /> : null}
        <WalkthroughRoom roomId="objective">
          <header className={styles.hero} data-eos-section-title="Case study">
            <Stack gap={5}>
              <Caption>{orientationWhy}</Caption>
              <ReadingPosition rootId="eos-document" />
              <Text
                as="p"
                size="caption"
                tone="tertiary"
                className={styles.meta}
              >
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
        </WalkthroughRoom>

        {network.systems.length > 0 ||
        network.glossary.length > 0 ||
        network.decisions.length > 0 ||
        network.architecture.length > 0 ? (
          <section
            className={styles.evidence}
            aria-labelledby="engineering-network-heading"
            data-eos-section-title="Engineering network"
          >
            <Stack gap={4}>
              <Heading level={2} id="engineering-network-heading">
                Engineering network
              </Heading>
              <Paragraph tone="secondary">
                Cross-document references computed from the Engineering Systems
                Atlas. No duplicate claims.
              </Paragraph>
              {network.systems.length > 0 ? (
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Systems
                  </Text>
                  <Text as="span" size="body-sm" tone="secondary">
                    {network.systems.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 ? " · " : null}
                        <Link href={entry.href} tone="secondary">
                          {entry.title}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </div>
              ) : null}
              {network.decisions.length > 0 ? (
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Decisions
                  </Text>
                  <Text as="span" size="body-sm" tone="secondary">
                    {network.decisions.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 ? " · " : null}
                        <Link href={entry.href} tone="secondary">
                          {entry.decision}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </div>
              ) : null}
              {network.architecture.length > 0 ? (
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Architecture
                  </Text>
                  <Text as="span" size="body-sm" tone="secondary">
                    {network.architecture.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 ? " · " : null}
                        <Link href={entry.href} tone="secondary">
                          {entry.name}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </div>
              ) : null}
              {network.validations.length > 0 ? (
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Validation
                  </Text>
                  <Text as="span" size="body-sm" tone="secondary">
                    {network.validations.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 ? " · " : null}
                        <Link href={entry.href} tone="secondary">
                          {entry.name}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </div>
              ) : null}
              {network.glossary.length > 0 ? (
                <div className={styles.evidenceRow}>
                  <Text as="span" size="caption" tone="tertiary">
                    Language
                  </Text>
                  <Text as="span" size="body-sm" tone="secondary">
                    {network.glossary.map((entry, index) => (
                      <span key={entry.id}>
                        {index > 0 ? " · " : null}
                        <Link href={entry.href} tone="secondary">
                          {entry.term}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </div>
              ) : null}
              <div className={styles.evidenceRow}>
                <Text as="span" size="caption" tone="tertiary">
                  Atlas
                </Text>
                <Link href={COMPANION_PATHS.atlas} tone="secondary">
                  Engineering Systems Atlas
                </Link>
              </div>
            </Stack>
          </section>
        ) : null}

        <WalkthroughRoom roomId="evidence">
          <section
            className={styles.evidence}
            aria-labelledby="evidence-heading"
            data-eos-section-title="Evidence"
          >
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
        </WalkthroughRoom>

        <div className={styles.sections}>
          {CASE_STUDY_ORDER.map((section) => {
            const disclosure = discloseEvidenceString(
              project.caseStudy[section.key],
            );
            const related = relatedLinksForCaseSection(project, section.key);
            const body = (
              <>
                <EvidenceField
                  id={`section-${section.key}`}
                  title={section.title}
                  disclosure={disclosure}
                  relatedSystems={related}
                  appearsIn={atlasAppears.slice(0, 4)}
                />
                {section.key === "architecture" &&
                disclosure.status === "confirmed" &&
                disclosure.text ? (
                  <ArchitectureTopology
                    architectureText={disclosure.text}
                    confidenceCaption={evidenceConfidenceCaption(
                      disclosure.confidence,
                    )}
                    artifacts={disclosure.provenance.map(
                      formatProvenanceSource,
                    )}
                    relatedEvidence={related}
                  />
                ) : null}
              </>
            );

            if (
              section.key === "architecture" &&
              hasWalkthroughRoom("architecture")
            ) {
              return (
                <WalkthroughRoom key={section.key} roomId="architecture">
                  {body}
                </WalkthroughRoom>
              );
            }

            return <div key={section.key}>{body}</div>;
          })}
        </div>

        <section
          className={styles.evidence}
          aria-labelledby="engineering-case-file-heading"
          data-eos-section-title="Engineering case file"
        >
          <Heading level={2} id="engineering-case-file-heading">
            Engineering case file
          </Heading>
          <Stack gap={4}>
            <div className={styles.evidenceRow}>
              <Text as="span" size="caption" tone="tertiary">
                Confirmed assets
              </Text>
              <Text as="span" size="body-sm" tone="secondary">
                {formatEvidenceStatus(
                  discloseEvidenceStringList(
                    project.engineeringCaseFile.assets,
                  ),
                  { missingLabel: "Missing — no assets linked" },
                )}
              </Text>
            </div>
          </Stack>
        </section>

        <div className={styles.sections}>
          {ENGINEERING_CASE_FILE_ORDER.map((section) => {
            const disclosure = discloseEvidenceString(
              project.engineeringCaseFile[section.key],
            );
            const related = relatedLinksForCaseSection(project, section.key);

            return (
              <EvidenceField
                key={section.key}
                id={`engineering-${section.key}`}
                title={section.title}
                disclosure={disclosure}
                relatedSystems={related}
                appearsIn={
                  section.key === "validationMethodology"
                    ? network.validations.map((entry) => ({
                        href: entry.href,
                        label: entry.name,
                      }))
                    : atlasAppears.slice(0, 3)
                }
              />
            );
          })}
        </div>

        {hasWalkthroughRoom("decisions") ? (
          <WalkthroughRoom roomId="decisions">
            {decisionLineageList}
          </WalkthroughRoom>
        ) : (
          decisionLineageList
        )}

        <WalkthroughRoom roomId="validation">
          <ValidationExplorerSection
            project={project}
            atlasValidations={network.validations}
            relatedArchitecture={[
              ...(discloseEvidenceString(project.caseStudy.architecture)
                .status === "confirmed"
                ? [
                    {
                      href: "#section-architecture",
                      label: "Case study · Architecture",
                    },
                  ]
                : []),
              ...(project.engineeringCaseFile.decisionLineages.length > 0
                ? [
                    {
                      href: "#decision-explorer-heading",
                      label: "Engineering decision explorer",
                    },
                  ]
                : []),
              ...network.architecture.map((entry) => ({
                href: entry.href,
                label: `Atlas · ${entry.name}`,
              })),
            ]}
            relatedSystems={network.systems.map((entry) => ({
              href: entry.href,
              label: `Atlas · ${entry.title}`,
              relatedValidationIds: entry.relatedValidationIds,
            }))}
          />
        </WalkthroughRoom>

        <WalkthroughRoom roomId="failures">
          <FailureExplorerSection
            project={project}
            relatedArchitecture={[
              ...(discloseEvidenceString(project.caseStudy.architecture)
                .status === "confirmed"
                ? [
                    {
                      href: "#section-architecture",
                      label: "Case study · Architecture",
                    },
                  ]
                : []),
              ...(project.engineeringCaseFile.decisionLineages.length > 0
                ? [
                    {
                      href: "#decision-explorer-heading",
                      label: "Engineering decision explorer",
                    },
                  ]
                : []),
              {
                href: "#engineering-validation",
                label: "Engineering validation",
              },
              ...network.architecture.map((entry) => ({
                href: entry.href,
                label: `Atlas · ${entry.name}`,
              })),
            ]}
            relatedValidation={[
              {
                href: "#engineering-validation",
                label: "Engineering validation",
              },
              ...network.validations.map((entry) => ({
                href: entry.href,
                label: `Atlas · ${entry.name}`,
              })),
            ]}
            relatedSystems={network.systems
              .filter(
                (entry) =>
                  entry.id === "failure-analysis" ||
                  entry.id === "validation-strategy" ||
                  entry.id === "testing-philosophy" ||
                  entry.id === "deployment-philosophy" ||
                  entry.id === "api-boundary-design",
              )
              .map((entry) => ({
                href: entry.href,
                label: `Atlas · ${entry.title}`,
              }))}
            relatedAtlasDecisions={network.decisions.map((entry) => ({
              href: entry.href,
              label: `Atlas · ${entry.decision}`,
            }))}
          />
        </WalkthroughRoom>

        <EvolutionExplorerSection
          project={project}
          relatedArchitecture={[
            ...(discloseEvidenceString(project.caseStudy.architecture)
              .status === "confirmed"
              ? [
                  {
                    href: "#section-architecture",
                    label: "Case study · Architecture",
                  },
                ]
              : []),
            ...(project.engineeringCaseFile.decisionLineages.length > 0
              ? [
                  {
                    href: "#decision-explorer-heading",
                    label: "Engineering decision explorer",
                  },
                ]
              : []),
            {
              href: "#engineering-validation",
              label: "Engineering validation",
            },
            {
              href: "#failure-resilience",
              label: "Failure & resilience",
            },
            ...network.architecture.map((entry) => ({
              href: entry.href,
              label: `Atlas · ${entry.name}`,
            })),
          ]}
          relatedValidation={[
            {
              href: "#engineering-validation",
              label: "Engineering validation",
            },
            ...network.validations.map((entry) => ({
              href: entry.href,
              label: `Atlas · ${entry.name}`,
            })),
          ]}
          relatedFailure={[
            {
              href: "#failure-resilience",
              label: "Failure & resilience",
            },
          ]}
          relatedSystems={network.systems.map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.title}`,
          }))}
          relatedAtlasDecisions={network.decisions.map((entry) => ({
            href: entry.href,
            label: `Atlas · ${entry.decision}`,
          }))}
        />

        <PatternExplorerSection
          project={project}
          localExplorerLinks={[
            ...(discloseEvidenceString(project.caseStudy.architecture)
              .status === "confirmed"
              ? [
                  {
                    href: "#section-architecture",
                    label: "Case study · Architecture",
                  },
                ]
              : []),
            ...(project.engineeringCaseFile.decisionLineages.length > 0
              ? [
                  {
                    href: "#decision-explorer-heading",
                    label: "Engineering decision explorer",
                  },
                ]
              : []),
            {
              href: "#engineering-validation",
              label: "Engineering validation",
            },
            {
              href: "#failure-resilience",
              label: "Failure & resilience",
            },
            {
              href: "#engineering-evolution",
              label: "Engineering evolution",
            },
            {
              href: COMPANION_PATHS.atlas,
              label: "Engineering Systems Atlas",
            },
          ]}
        />

        <PrincipleExplorerSection
          project={project}
          localExplorerLinks={[
            ...(discloseEvidenceString(project.caseStudy.architecture)
              .status === "confirmed"
              ? [
                  {
                    href: "#section-architecture",
                    label: "Case study · Architecture",
                  },
                ]
              : []),
            ...(project.engineeringCaseFile.decisionLineages.length > 0
              ? [
                  {
                    href: "#decision-explorer-heading",
                    label: "Engineering decision explorer",
                  },
                ]
              : []),
            {
              href: "#engineering-validation",
              label: "Engineering validation",
            },
            {
              href: "#failure-resilience",
              label: "Failure & resilience",
            },
            {
              href: "#engineering-evolution",
              label: "Engineering evolution",
            },
            {
              href: "#engineering-patterns",
              label: "Engineering patterns",
            },
            {
              href: COMPANION_PATHS.atlas,
              label: "Engineering Systems Atlas",
            },
          ]}
        />

        <KnowledgeGraphSection project={project} />

        <WalkthroughRoom roomId="references">
          <section
            className={styles.evidence}
            aria-labelledby="engineering-references-heading"
            data-eos-section-title="Engineering references"
          >
            <Heading level={2} id="engineering-references-heading">
              Engineering references
            </Heading>
            {references.status === "confirmed" ? (
              <Stack gap={4}>
                {references.value.map((ref) => (
                  <div key={ref.href} className={styles.evidenceRow}>
                    <Text as="span" size="caption" tone="tertiary">
                      {evidenceConfidenceCaption(ref.confidence)} · {ref.kind}
                    </Text>
                    <Link href={ref.href} tone="secondary">
                      {ref.label}
                    </Link>
                  </div>
                ))}
              </Stack>
            ) : (
              <Paragraph tone="tertiary">
                {references.status === "missing"
                  ? "No confirmed engineering references are linked for this project."
                  : `Deferred${references.deferralId ? ` · ${references.deferralId}` : ""}. References are not presented as complete.`}
              </Paragraph>
            )}
          </section>
        </WalkthroughRoom>
      </EngineeringWalkthrough>
      <EngineeringDemonstrationSection project={project} />
    </article>
  );
}
