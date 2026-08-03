import {
  discloseEvidenceString,
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getEngineeringPatterns,
  getProjectBySlug,
  getProjectNetwork,
  loadProjects,
  projectDisplayTitle,
  resolveAtlasRelatedHrefs,
  resolveLineageReferenceHref,
  resolveRelationshipStepHref,
  type ProjectContent,
} from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import type { DecisionExplorerLink } from "./inspectDecision";

export type KnowledgeGraphLink = DecisionExplorerLink;

export type KnowledgeNodeKind =
  | "project"
  | "architecture"
  | "decision"
  | "validation"
  | "failure"
  | "evolution"
  | "pattern"
  | "principle"
  | "atlas-system";

/** Fully serializable plate model — safe for client components. */
export type KnowledgeNodeInspection = {
  id: string;
  kind: KnowledgeNodeKind;
  label: string;
  kindLabel: string;
  entityText: string;
  descriptionText: string;
  connected: KnowledgeGraphLink[];
  incoming: string[];
  outgoing: string[];
  supportingProjects: KnowledgeGraphLink[];
  references: KnowledgeGraphLink[];
  provenance: string[];
  confidenceCaption: string;
};

const KIND_LABEL: Record<KnowledgeNodeKind, string> = {
  project: "Project",
  architecture: "Architecture",
  decision: "Decision",
  validation: "Validation",
  failure: "Failure",
  evolution: "Evolution",
  pattern: "Pattern",
  principle: "Principle",
  "atlas-system": "Atlas System",
};

const KIND_ORDER: KnowledgeNodeKind[] = [
  "project",
  "architecture",
  "decision",
  "validation",
  "failure",
  "evolution",
  "pattern",
  "principle",
  "atlas-system",
];

function uniqueLinks(links: KnowledgeGraphLink[]): KnowledgeGraphLink[] {
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

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    if (!value || seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

function projectLinks(projectIds: string[]): KnowledgeGraphLink[] {
  return projectIds
    .map((id) => {
      const project =
        getProjectBySlug(id) ??
        loadProjects().find((entry) => entry.id === id) ??
        null;
      if (!project) {
        return null;
      }
      return {
        href: COMPANION_PATHS.project(project.slug),
        label: projectDisplayTitle(project),
      };
    })
    .filter((entry): entry is KnowledgeGraphLink => entry !== null);
}

function missingOr(values: string[]): string[] {
  return values.length > 0 ? values : ["Missing"];
}

type MutableNode = KnowledgeNodeInspection;

function connect(
  from: MutableNode | undefined,
  to: MutableNode | undefined,
  edgeLabel: string,
  toLink?: KnowledgeGraphLink | null,
  fromLink?: KnowledgeGraphLink | null,
) {
  if (!from || !to) {
    return;
  }
  from.outgoing.push(edgeLabel);
  to.incoming.push(edgeLabel);
  if (toLink) {
    from.connected.push(toLink);
  }
  if (fromLink) {
    to.connected.push(fromLink);
  }
}

function nodePrimaryHref(node: KnowledgeNodeInspection): string | null {
  return node.connected[0]?.href ?? null;
}

function resolveStepNode(
  indexByKey: Map<string, string>,
  byId: Map<string, MutableNode>,
  kind: string,
  id: string,
): MutableNode | undefined {
  const candidates = [
    `${kind}:${id}`,
    kind === "system" ? `atlas-system:${id}` : "",
    kind === "system" ? `principle:${id}` : "",
    kind === "decision" ? `decision:atlas:${id}` : "",
    kind === "architecture" ? `architecture:${id}` : "",
    kind === "project" ? `project:${id}` : "",
    kind === "validation" ? `validation:${id}` : "",
  ].filter(Boolean);

  for (const key of candidates) {
    const nodeId = indexByKey.get(key);
    if (nodeId) {
      return byId.get(nodeId);
    }
  }
  return undefined;
}

/**
 * Build editorial knowledge-graph nodes for one project from confirmed Atlas
 * and explorer anchors only — never invents entities or edges.
 */
export function buildKnowledgeGraphInspections(args: {
  project: ProjectContent;
}): KnowledgeNodeInspection[] {
  const { project } = args;
  const atlas = getEngineeringAtlas();
  const network = getProjectNetwork(project.id);
  const patterns = getEngineeringPatterns().filter(
    (pattern) =>
      pattern.projectIds.includes(project.id) &&
      pattern.projectIds.length >= 2 &&
      (pattern.confidence === "confirmed" ||
        pattern.confidence === "readme-attributed" ||
        pattern.confidence === "public-artifact"),
  );

  const byId = new Map<string, MutableNode>();
  const indexByKey = new Map<string, string>();

  function register(node: MutableNode, keys: string[] = []) {
    const existing = byId.get(node.id);
    if (existing) {
      return existing;
    }
    byId.set(node.id, node);
    for (const key of keys) {
      indexByKey.set(key, node.id);
    }
    return node;
  }

  function find(key: string): MutableNode | undefined {
    const id = indexByKey.get(key);
    return id ? byId.get(id) : undefined;
  }

  const selfProjects = projectLinks([project.id]);
  const selfLink: KnowledgeGraphLink = {
    href: COMPANION_PATHS.project(project.slug),
    label: projectDisplayTitle(project),
  };
  const referenceLinks: KnowledgeGraphLink[] =
    project.engineeringReferences.status === "confirmed"
      ? project.engineeringReferences.value.map((ref) => ({
          href: ref.href,
          label: ref.label,
        }))
      : [];

  const architectureDisclosure = discloseEvidenceString(
    project.caseStudy.architecture,
  );
  const overviewDisclosure = discloseEvidenceString(project.caseStudy.overview);
  const objectiveDisclosure = discloseEvidenceString(project.objective);

  // --- Phase 1: register confirmed nodes only ---

  const projectNode = register(
    {
      id: `project:${project.id}`,
      kind: "project",
      label: projectDisplayTitle(project),
      kindLabel: KIND_LABEL.project,
      entityText: projectDisplayTitle(project),
      descriptionText:
        overviewDisclosure.text ?? objectiveDisclosure.text ?? "Missing",
      connected: [
        { href: COMPANION_PATHS.atlas, label: "Engineering Systems Atlas" },
      ],
      incoming: [],
      outgoing: [],
      supportingProjects: selfProjects,
      references: referenceLinks,
      provenance: missingOr(
        overviewDisclosure.provenance.map((source) => source.label),
      ),
      confidenceCaption: evidenceConfidenceCaption(
        overviewDisclosure.status === "confirmed"
          ? overviewDisclosure.confidence
          : objectiveDisclosure.status === "confirmed"
            ? objectiveDisclosure.confidence
            : "missing",
      ),
    },
    [`project:${project.id}`],
  );

  if (architectureDisclosure.status === "confirmed") {
    register(
      {
        id: "architecture:local",
        kind: "architecture",
        label: "Case study architecture",
        kindLabel: KIND_LABEL.architecture,
        entityText: "Case study architecture",
        descriptionText: architectureDisclosure.text ?? "Missing",
        connected: [
          { href: "#section-architecture", label: "Architecture section" },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: missingOr(
          architectureDisclosure.provenance.map((source) => source.label),
        ),
        confidenceCaption: evidenceConfidenceCaption(
          architectureDisclosure.confidence,
        ),
      },
      ["architecture:local"],
    );
  }

  for (const entry of network.architecture) {
    register(
      {
        id: `architecture:${entry.id}`,
        kind: "architecture",
        label: entry.name,
        kindLabel: KIND_LABEL.architecture,
        entityText: entry.name,
        descriptionText: entry.note ?? "Missing",
        connected: [{ href: entry.href, label: `Atlas · ${entry.name}` }],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: ["Missing"],
        confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      },
      [`architecture:${entry.id}`],
    );
  }

  for (const lineage of project.engineeringCaseFile.decisionLineages) {
    const decision = discloseEvidenceString(lineage.decision);
    if (decision.status !== "confirmed" || !decision.text) {
      continue;
    }
    const why = discloseEvidenceString(lineage.why);
    register(
      {
        id: `decision:${lineage.id}`,
        kind: "decision",
        label: lineage.id,
        kindLabel: KIND_LABEL.decision,
        entityText: decision.text,
        descriptionText: why.text ?? decision.text,
        connected: [
          {
            href: `#lineage-${lineage.id}`,
            label: `Lineage · ${lineage.id}`,
          },
          {
            href: "#decision-explorer-heading",
            label: "Decision explorer",
          },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: missingOr(
          decision.provenance.map((source) => source.label),
        ),
        confidenceCaption: evidenceConfidenceCaption(decision.confidence),
      },
      [`decision:${lineage.id}`, `lineage:${lineage.id}`],
    );
  }

  for (const entry of network.decisions) {
    register(
      {
        id: `decision:atlas:${entry.id}`,
        kind: "decision",
        label: entry.decision,
        kindLabel: KIND_LABEL.decision,
        entityText: entry.decision,
        descriptionText: `${entry.evidence} Outcome: ${entry.outcome}`,
        connected: [
          { href: entry.href, label: `Atlas · ${entry.decision}` },
          {
            href: "#decision-explorer-heading",
            label: "Decision explorer",
          },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: [entry.evidence],
        confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      },
      [`decision:atlas:${entry.id}`, `decision:${entry.id}`],
    );
  }

  for (const entry of network.validations) {
    register(
      {
        id: `validation:${entry.id}`,
        kind: "validation",
        label: entry.name,
        kindLabel: KIND_LABEL.validation,
        entityText: entry.name,
        descriptionText: entry.detail,
        connected: [
          { href: entry.href, label: `Atlas · ${entry.name}` },
          {
            href: "#engineering-validation",
            label: "Validation explorer",
          },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: [entry.detail],
        confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      },
      [`validation:${entry.id}`],
    );
  }

  for (const entry of atlas.failures.filter(
    (failure) => failure.projectId === project.id,
  )) {
    register(
      {
        id: `failure:${entry.id}`,
        kind: "failure",
        label: entry.title,
        kindLabel: KIND_LABEL.failure,
        entityText: entry.title,
        descriptionText: entry.detail,
        connected: [
          {
            href: `${COMPANION_PATHS.atlas}#atlas-failure-${entry.id}`,
            label: `Atlas · ${entry.title}`,
          },
          { href: "#failure-resilience", label: "Failure & resilience" },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: [entry.detail],
        confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      },
      [`failure:${entry.id}`],
    );
  }

  for (const entry of atlas.evolution.filter((step) =>
    step.projectIds.includes(project.id),
  )) {
    register(
      {
        id: `evolution:${entry.id}`,
        kind: "evolution",
        label: entry.label,
        kindLabel: KIND_LABEL.evolution,
        entityText: entry.label,
        descriptionText: entry.evidence,
        connected: [
          {
            href: `${COMPANION_PATHS.atlas}#atlas-evolution-${entry.id}`,
            label: `Atlas · ${entry.label}`,
          },
          { href: "#engineering-evolution", label: "Evolution explorer" },
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: selfProjects,
        references: referenceLinks,
        provenance: [entry.evidence],
        confidenceCaption: evidenceConfidenceCaption(entry.confidence),
      },
      [`evolution:${entry.id}`],
    );
  }

  for (const pattern of patterns) {
    const relatedProjects = projectLinks(pattern.projectIds);
    register(
      {
        id: `pattern:${pattern.id}`,
        kind: "pattern",
        label: pattern.title,
        kindLabel: KIND_LABEL.pattern,
        entityText: pattern.title,
        descriptionText: pattern.statement,
        connected: [
          { href: "#engineering-patterns", label: "Pattern explorer" },
          ...relatedProjects,
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: relatedProjects,
        references: referenceLinks,
        provenance: [pattern.statement],
        confidenceCaption: evidenceConfidenceCaption(pattern.confidence),
      },
      [`pattern:${pattern.id}`],
    );
  }

  for (const system of atlas.systems.filter(
    (entry) =>
      entry.projectIds.includes(project.id) && entry.projectIds.length >= 3,
  )) {
    const related = resolveAtlasRelatedHrefs(system);
    register(
      {
        id: `principle:${system.id}`,
        kind: "principle",
        label: system.title,
        kindLabel: KIND_LABEL.principle,
        entityText: system.title,
        descriptionText: system.summary,
        connected: [
          {
            href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
            label: `Atlas · ${system.title}`,
          },
          {
            href: "#engineering-principles",
            label: "Principles explorer",
          },
          ...related,
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: projectLinks(system.projectIds),
        references: referenceLinks,
        provenance: missingOr(related.map((link) => link.label)),
        confidenceCaption: evidenceConfidenceCaption(system.confidence),
      },
      [`principle:${system.id}`],
    );
  }

  for (const system of network.systems) {
    const related = resolveAtlasRelatedHrefs(system);
    register(
      {
        id: `atlas-system:${system.id}`,
        kind: "atlas-system",
        label: system.title,
        kindLabel: KIND_LABEL["atlas-system"],
        entityText: system.title,
        descriptionText: system.summary,
        connected: [
          { href: system.href, label: `Atlas · ${system.title}` },
          ...related,
        ],
        incoming: [],
        outgoing: [],
        supportingProjects: projectLinks(system.projectIds),
        references: referenceLinks,
        provenance: missingOr(related.map((link) => link.label)),
        confidenceCaption: evidenceConfidenceCaption(system.confidence),
      },
      [`atlas-system:${system.id}`, `system:${system.id}`],
    );
  }

  // --- Phase 2: confirmed edges only ---

  const localArch = find("architecture:local");
  if (localArch) {
    connect(
      projectNode,
      localArch,
      "Case study · Project includes Architecture",
      {
        href: "#section-architecture",
        label: "Case study · Architecture",
      },
      selfLink,
    );
  }

  for (const entry of network.architecture) {
    connect(
      projectNode,
      find(`architecture:${entry.id}`),
      `Atlas architecture index · ${entry.name}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id}`,
        label: `Atlas · ${entry.name}`,
      },
      selfLink,
    );
  }

  for (const lineage of project.engineeringCaseFile.decisionLineages) {
    const decisionNode = find(`decision:${lineage.id}`);
    if (!decisionNode) {
      continue;
    }
    connect(
      projectNode,
      decisionNode,
      `Engineering case file · Decision lineage ${lineage.id}`,
      {
        href: `#lineage-${lineage.id}`,
        label: `Lineage · ${lineage.id}`,
      },
      selfLink,
    );

    for (const ref of lineage.referencedAgainBy) {
      const href = resolveLineageReferenceHref(ref);
      if (href) {
        decisionNode.connected.push({ href, label: ref.label });
      }

      const mappedKind =
        ref.kind === "atlas-system"
          ? "system"
          : ref.kind === "atlas-decision"
            ? "decision"
            : ref.kind === "atlas-validation"
              ? "validation"
              : ref.kind === "project"
                ? "project"
                : ref.kind;
      const target = resolveStepNode(indexByKey, byId, mappedKind, ref.id);
      if (href && target) {
        connect(
          decisionNode,
          target,
          `referencedAgainBy · ${lineage.id} → ${ref.label}`,
          { href, label: ref.label },
          {
            href: `#lineage-${lineage.id}`,
            label: `Lineage · ${lineage.id}`,
          },
        );
      } else if (href) {
        decisionNode.outgoing.push(
          `referencedAgainBy · ${ref.kind} · ${ref.label}`,
        );
      }
    }
  }

  for (const entry of network.decisions) {
    connect(
      projectNode,
      find(`decision:atlas:${entry.id}`),
      `Atlas decision graph · ${entry.decision}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-decision-${entry.id}`,
        label: `Atlas · ${entry.decision}`,
      },
      selfLink,
    );
  }

  for (const entry of network.validations) {
    connect(
      projectNode,
      find(`validation:${entry.id}`),
      `Atlas validation index · ${entry.name}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
        label: `Atlas · ${entry.name}`,
      },
      selfLink,
    );
  }

  for (const entry of atlas.failures.filter(
    (failure) => failure.projectId === project.id,
  )) {
    connect(
      projectNode,
      find(`failure:${entry.id}`),
      `Atlas failure knowledge · ${entry.title}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-failure-${entry.id}`,
        label: `Atlas · ${entry.title}`,
      },
      selfLink,
    );
  }

  for (const entry of atlas.evolution.filter((step) =>
    step.projectIds.includes(project.id),
  )) {
    connect(
      projectNode,
      find(`evolution:${entry.id}`),
      `Atlas evolution · ${entry.label}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-evolution-${entry.id}`,
        label: `Atlas · ${entry.label}`,
      },
      selfLink,
    );
  }

  for (const pattern of patterns) {
    connect(
      projectNode,
      find(`pattern:${pattern.id}`),
      `Engineering patterns · ${pattern.title}`,
      { href: "#engineering-patterns", label: pattern.title },
      selfLink,
    );
  }

  for (const system of atlas.systems.filter(
    (entry) =>
      entry.projectIds.includes(project.id) && entry.projectIds.length >= 3,
  )) {
    connect(
      projectNode,
      find(`principle:${system.id}`),
      `Engineering principles · ${system.title}`,
      { href: "#engineering-principles", label: system.title },
      selfLink,
    );
  }

  for (const system of network.systems) {
    const node = find(`atlas-system:${system.id}`);
    connect(
      projectNode,
      node,
      `Atlas systems index · ${system.title}`,
      {
        href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
        label: `Atlas · ${system.title}`,
      },
      selfLink,
    );

    const principle = find(`principle:${system.id}`);
    if (principle && node) {
      connect(
        principle,
        node,
        `Principle derived from Atlas System · ${system.title}`,
        {
          href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
          label: `Atlas · ${system.title}`,
        },
        {
          href: "#engineering-principles",
          label: principle.label,
        },
      );
    }

    for (const relatedId of system.relatedSystemIds) {
      const other = find(`atlas-system:${relatedId}`);
      if (!node || !other) {
        continue;
      }
      connect(
        node,
        other,
        `relatedSystemIds · ${system.title} → ${other.label}`,
        {
          href:
            other.connected[0]?.href ??
            `${COMPANION_PATHS.atlas}#atlas-system-${relatedId}`,
          label: other.label,
        },
        {
          href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
          label: system.title,
        },
      );
    }
    for (const relatedId of system.relatedValidationIds) {
      const other = find(`validation:${relatedId}`);
      if (!node || !other) {
        continue;
      }
      connect(
        node,
        other,
        `relatedValidationIds · ${system.title} → ${other.label}`,
        {
          href:
            other.connected[0]?.href ??
            `${COMPANION_PATHS.atlas}#atlas-validation-${relatedId}`,
          label: other.label,
        },
        {
          href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
          label: system.title,
        },
      );
    }
    for (const relatedId of system.relatedArchitectureIds) {
      const other = find(`architecture:${relatedId}`);
      if (!node || !other) {
        continue;
      }
      connect(
        node,
        other,
        `relatedArchitectureIds · ${system.title} → ${other.label}`,
        {
          href:
            other.connected[0]?.href ??
            `${COMPANION_PATHS.atlas}#atlas-component-${relatedId}`,
          label: other.label,
        },
        {
          href: `${COMPANION_PATHS.atlas}#atlas-system-${system.id}`,
          label: system.title,
        },
      );
    }
  }

  for (const ref of referenceLinks) {
    projectNode.outgoing.push(`Engineering reference · ${ref.label}`);
    projectNode.connected.push(ref);
  }

  for (const rel of network.relationships) {
    for (let index = 0; index < rel.steps.length - 1; index += 1) {
      const fromStep = rel.steps[index];
      const toStep = rel.steps[index + 1];
      if (!fromStep || !toStep) {
        continue;
      }

      const fromNode = resolveStepNode(
        indexByKey,
        byId,
        fromStep.kind,
        fromStep.id,
      );
      const toNode = resolveStepNode(indexByKey, byId, toStep.kind, toStep.id);
      if (!fromNode || !toNode) {
        continue;
      }

      const fromHref =
        resolveRelationshipStepHref(fromStep) ?? nodePrimaryHref(fromNode);
      const toHref =
        resolveRelationshipStepHref(toStep) ?? nodePrimaryHref(toNode);
      connect(
        fromNode,
        toNode,
        `Atlas relationship · ${rel.title}: ${fromStep.label} → ${toStep.label}`,
        toHref ? { href: toHref, label: toStep.label } : null,
        fromHref ? { href: fromHref, label: fromStep.label } : null,
      );
    }
  }

  return [...byId.values()]
    .map((node) => ({
      ...node,
      connected: uniqueLinks(node.connected),
      incoming: missingOr(uniqueStrings(node.incoming)),
      outgoing: missingOr(uniqueStrings(node.outgoing)),
      supportingProjects: uniqueLinks(node.supportingProjects),
      references: uniqueLinks(node.references),
      provenance: missingOr(uniqueStrings(node.provenance)),
    }))
    .sort((a, b) => {
      const kindDiff = KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind);
      if (kindDiff !== 0) {
        return kindDiff;
      }
      return a.label.localeCompare(b.label);
    });
}
