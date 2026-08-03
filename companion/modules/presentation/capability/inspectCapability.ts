import {
  discloseEvidenceStringList,
  evidenceConfidenceCaption,
  getEngineeringAtlas,
  getEngineeringPatterns,
  loadProjects,
  projectDisplayTitle,
  type EvidenceConfidence,
} from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";

export type CapabilityLink = {
  href: string;
  label: string;
};

export type CapabilityKind =
  "system" | "architecture" | "technology" | "validation";

export type CapabilityNodeLayout = {
  id: string;
  x: number;
  y: number;
};

export type CapabilityEdge = {
  id: string;
  fromId: string;
  toId: string;
  reason: string;
};

/** Fully serializable plate + graph model — safe for client components. */
export type CapabilityInspection = {
  id: string;
  kind: CapabilityKind;
  kindLabel: string;
  label: string;
  serial: string;
  descriptionText: string;
  projects: CapabilityLink[];
  architecture: CapabilityLink[];
  decisions: CapabilityLink[];
  validation: CapabilityLink[];
  failures: CapabilityLink[];
  limitationsText: string;
  evidenceText: string;
  artifacts: string[];
  relatedCapabilities: CapabilityLink[];
  atlasLinks: CapabilityLink[];
  knowledgeLinks: CapabilityLink[];
  provenance: string[];
  confidenceCaption: string;
  connectedIds: string[];
};

export type CapabilityAtlasModel = {
  inspections: CapabilityInspection[];
  layout: CapabilityNodeLayout[];
  edges: CapabilityEdge[];
  viewBox: { width: number; height: number };
};

const KIND_LABEL: Record<CapabilityKind, string> = {
  system: "System",
  architecture: "Architecture",
  technology: "Technology",
  validation: "Validation",
};

const VIEW = { width: 960, height: 580 } as const;

/** Exact aliases → architecture ids. Never invents capabilities — only merges labels. */
const ARCHITECTURE_ALIASES: Record<string, string> = {
  django: "arch-django",
  fastapi: "arch-fastapi",
  react: "arch-react",
  nextjs: "arch-nextjs",
  next: "arch-nextjs",
  restapis: "arch-rest-apis",
  restapi: "arch-rest-apis",
  nodejs: "arch-nodejs-express",
  node: "arch-nodejs-express",
  express: "arch-nodejs-express",
  expressjs: "arch-nodejs-express",
  mongodb: "arch-mongodb",
  postgresql: "arch-postgresql",
  postgres: "arch-postgresql",
  jwt: "arch-jwt",
  attentionresunet: "arch-attentionresunet",
  pytorch: "arch-pytorch",
  xception: "arch-xception-keras",
  kerascnn: "arch-xception-keras",
  tensorflowkeras: "arch-xception-keras",
  tensorflow: "arch-xception-keras",
  pinecone: "arch-pinecone",
  slackapi: "arch-slack",
  slack: "arch-slack",
  llamaapis: "arch-llama-firebase",
  firebase: "arch-llama-firebase",
  purepythonhosengine: "arch-hos-engine",
  hosengine: "arch-hos-engine",
};

type MutableNode = {
  id: string;
  kind: CapabilityKind;
  label: string;
  description: string;
  projectIds: Set<string>;
  confidence: EvidenceConfidence;
  provenance: string[];
  artifacts: string[];
  relatedIds: Set<string>;
};

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function uniqueLinks(links: CapabilityLink[]): CapabilityLink[] {
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

function missingOr(values: string[]): string[] {
  return values.length > 0 ? values : ["Missing"];
}

function missingText(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "Missing";
}

function isUsableConfidence(confidence: EvidenceConfidence): boolean {
  return (
    confidence === "confirmed" ||
    confidence === "readme-attributed" ||
    confidence === "public-artifact"
  );
}

function projectLinks(projectIds: string[]): CapabilityLink[] {
  const projects = loadProjects();
  return [...projectIds]
    .map((id) => {
      const project = projects.find((entry) => entry.id === id) ?? null;
      if (!project) {
        return null;
      }
      return {
        href: COMPANION_PATHS.project(project.slug),
        label: projectDisplayTitle(project),
      };
    })
    .filter((entry): entry is CapabilityLink => entry !== null)
    .sort((a, b) => a.label.localeCompare(b.label));
}

function connect(a: MutableNode, b: MutableNode) {
  if (a.id === b.id) {
    return;
  }
  a.relatedIds.add(b.id);
  b.relatedIds.add(a.id);
}

/**
 * Deterministic blueprint coordinates — same order every load.
 * Lanes: systems | architecture | technology | validation
 */
function layoutNodes(nodes: MutableNode[]): CapabilityNodeLayout[] {
  const lanes: CapabilityKind[] = [
    "system",
    "architecture",
    "technology",
    "validation",
  ];
  const laneX = [120, 360, 600, 840];
  const layouts: CapabilityNodeLayout[] = [];

  for (let laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
    const kind = lanes[laneIndex];
    const x = laneX[laneIndex] ?? 120;
    const members = nodes
      .filter((node) => node.kind === kind)
      .sort((a, b) => a.label.localeCompare(b.label));
    const count = members.length;
    if (count === 0) {
      continue;
    }
    const top = 56;
    const bottom = VIEW.height - 48;
    const span = bottom - top;
    members.forEach((node, index) => {
      const y =
        count === 1
          ? top + span / 2
          : top + (span * index) / Math.max(count - 1, 1);
      layouts.push({
        id: node.id,
        x: Math.round(x),
        y: Math.round(y),
      });
    });
  }

  return layouts;
}

/**
 * Build Engineering Capability Atlas from Atlas + confirmed project technologies.
 * Never invents capabilities or edges.
 */
export function buildCapabilityAtlasModel(): CapabilityAtlasModel {
  const atlas = getEngineeringAtlas();
  const projects = loadProjects();
  const patterns = getEngineeringPatterns();
  const nodes = new Map<string, MutableNode>();

  function ensure(node: MutableNode): MutableNode {
    const existing = nodes.get(node.id);
    if (existing) {
      for (const id of node.projectIds) {
        existing.projectIds.add(id);
      }
      for (const id of node.relatedIds) {
        existing.relatedIds.add(id);
      }
      for (const item of node.provenance) {
        if (!existing.provenance.includes(item)) {
          existing.provenance.push(item);
        }
      }
      for (const item of node.artifacts) {
        if (!existing.artifacts.includes(item)) {
          existing.artifacts.push(item);
        }
      }
      if (
        existing.description === "Missing" &&
        node.description !== "Missing"
      ) {
        existing.description = node.description;
      }
      return existing;
    }
    nodes.set(node.id, node);
    return node;
  }

  // Atlas systems
  for (const system of atlas.systems) {
    if (!isUsableConfidence(system.confidence)) {
      continue;
    }
    ensure({
      id: `system:${system.id}`,
      kind: "system",
      label: system.title,
      description: system.summary,
      projectIds: new Set(system.projectIds),
      confidence: system.confidence,
      provenance: [`Atlas system · ${system.id}`],
      artifacts: [],
      relatedIds: new Set(),
    });
  }

  // Atlas architecture
  for (const entry of atlas.architectureIndex) {
    if (!isUsableConfidence(entry.confidence)) {
      continue;
    }
    ensure({
      id: `architecture:${entry.id}`,
      kind: "architecture",
      label: entry.name,
      description: entry.note ?? `Atlas architecture component · ${entry.name}`,
      projectIds: new Set(entry.projectIds),
      confidence: entry.confidence,
      provenance: [`Atlas architecture · ${entry.id}`],
      artifacts: entry.note ? [entry.note] : [],
      relatedIds: new Set(),
    });
  }

  // Atlas validations
  for (const entry of atlas.validationIndex) {
    if (!isUsableConfidence(entry.confidence)) {
      continue;
    }
    ensure({
      id: `validation:${entry.id}`,
      kind: "validation",
      label: entry.name,
      description: entry.detail,
      projectIds: new Set(entry.projectIds),
      confidence: entry.confidence,
      provenance: [`Atlas validation · ${entry.id}`],
      artifacts: [entry.detail],
      relatedIds: new Set(),
    });
  }

  // Confirmed project technologies (merge into architecture when aliased)
  for (const project of projects) {
    const field = project.technologies;
    if (field.status !== "confirmed") {
      continue;
    }
    const disclosure = discloseEvidenceStringList(field);
    for (const value of field.value) {
      const key = normalizeKey(value);
      const archId = ARCHITECTURE_ALIASES[key];
      if (archId) {
        const node = nodes.get(`architecture:${archId}`);
        if (node) {
          node.projectIds.add(project.id);
          if (!node.provenance.includes(`Project technology · ${value}`)) {
            node.provenance.push(`Project technology · ${value}`);
          }
        }
        continue;
      }

      const id = `technology:${key}`;
      ensure({
        id,
        kind: "technology",
        label: value,
        description: `Confirmed technology evidence in ${projectDisplayTitle(project)}.`,
        projectIds: new Set([project.id]),
        confidence: disclosure.confidence,
        provenance: [
          `Project · ${project.id}`,
          ...disclosure.provenance.map((source) => source.label),
        ],
        artifacts: [],
        relatedIds: new Set(),
      });
    }
  }

  // Drop technology nodes with no projects (safety)
  for (const [id, node] of [...nodes.entries()]) {
    if (node.projectIds.size === 0) {
      nodes.delete(id);
    }
  }

  // Edges from Atlas related* fields
  for (const system of atlas.systems) {
    const from = nodes.get(`system:${system.id}`);
    if (!from) {
      continue;
    }
    for (const relatedId of system.relatedSystemIds) {
      const to = nodes.get(`system:${relatedId}`);
      if (to) {
        connect(from, to);
      }
    }
    for (const relatedId of system.relatedArchitectureIds) {
      const to = nodes.get(`architecture:${relatedId}`);
      if (to) {
        connect(from, to);
      }
    }
    for (const relatedId of system.relatedValidationIds) {
      const to = nodes.get(`validation:${relatedId}`);
      if (to) {
        connect(from, to);
      }
    }
  }

  // Co-occurrence edges: capabilities sharing ≥2 projects (confirmed together)
  const nodeList = [...nodes.values()];
  for (let i = 0; i < nodeList.length; i += 1) {
    for (let j = i + 1; j < nodeList.length; j += 1) {
      const a = nodeList[i];
      const b = nodeList[j];
      if (!a || !b) {
        continue;
      }
      let shared = 0;
      for (const id of a.projectIds) {
        if (b.projectIds.has(id)) {
          shared += 1;
        }
      }
      if (shared >= 2) {
        connect(a, b);
      }
    }
  }

  // Pattern overlap: systems/architecture already linked via projects; attach pattern titles as artifacts
  for (const pattern of patterns) {
    if (pattern.projectIds.length < 2) {
      continue;
    }
    if (!isUsableConfidence(pattern.confidence)) {
      continue;
    }
    for (const node of nodes.values()) {
      let shared = 0;
      for (const id of pattern.projectIds) {
        if (node.projectIds.has(id)) {
          shared += 1;
        }
      }
      if (shared >= 2) {
        node.artifacts.push(`Pattern · ${pattern.title}`);
      }
    }
  }

  const ordered = [...nodes.values()].sort((a, b) => {
    const kindOrder: CapabilityKind[] = [
      "system",
      "architecture",
      "technology",
      "validation",
    ];
    const kindDiff = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
    if (kindDiff !== 0) {
      return kindDiff;
    }
    return a.label.localeCompare(b.label);
  });

  const layout = layoutNodes(ordered);
  const layoutById = new Map(layout.map((entry) => [entry.id, entry]));

  const edgeKeys = new Set<string>();
  const edges: CapabilityEdge[] = [];
  for (const node of ordered) {
    for (const relatedId of node.relatedIds) {
      if (!nodes.has(relatedId)) {
        continue;
      }
      const pair = [node.id, relatedId].sort();
      const key = `${pair[0]}::${pair[1]}`;
      if (edgeKeys.has(key)) {
        continue;
      }
      edgeKeys.add(key);
      edges.push({
        id: key,
        fromId: pair[0]!,
        toId: pair[1]!,
        reason: "Confirmed Atlas relation or shared project evidence",
      });
    }
  }

  const inspections: CapabilityInspection[] = ordered.map((node, index) => {
    const projectIdList = [...node.projectIds];
    const related = [...node.relatedIds]
      .map((id) => nodes.get(id))
      .filter((entry): entry is MutableNode => Boolean(entry));

    const architecture = uniqueLinks(
      related
        .filter((entry) => entry.kind === "architecture")
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-component-${entry.id.replace(/^architecture:/, "")}`,
          label: entry.label,
        })),
    );

    const decisions = uniqueLinks(
      atlas.decisions
        .filter(
          (decision) =>
            isUsableConfidence(decision.confidence) &&
            decision.projectIds.some((id) => node.projectIds.has(id)),
        )
        .map((decision) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-decision-${decision.id}`,
          label: decision.decision,
        })),
    );

    const validation = uniqueLinks([
      ...related
        .filter((entry) => entry.kind === "validation")
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id.replace(/^validation:/, "")}`,
          label: entry.label,
        })),
      ...atlas.validationIndex
        .filter(
          (entry) =>
            isUsableConfidence(entry.confidence) &&
            entry.projectIds.some((id) => node.projectIds.has(id)),
        )
        .map((entry) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-validation-${entry.id}`,
          label: entry.name,
        })),
    ]);

    const failures = uniqueLinks(
      atlas.failures
        .filter(
          (failure) =>
            isUsableConfidence(failure.confidence) &&
            node.projectIds.has(failure.projectId),
        )
        .map((failure) => ({
          href: `${COMPANION_PATHS.atlas}#atlas-failure-${failure.id}`,
          label: failure.title,
        })),
    );

    const atlasLinks: CapabilityLink[] = [];
    if (node.kind === "system") {
      atlasLinks.push({
        href: `${COMPANION_PATHS.atlas}#atlas-system-${node.id.replace(/^system:/, "")}`,
        label: `Atlas · ${node.label}`,
      });
    } else if (node.kind === "architecture") {
      atlasLinks.push({
        href: `${COMPANION_PATHS.atlas}#atlas-component-${node.id.replace(/^architecture:/, "")}`,
        label: `Atlas · ${node.label}`,
      });
    } else if (node.kind === "validation") {
      atlasLinks.push({
        href: `${COMPANION_PATHS.atlas}#atlas-validation-${node.id.replace(/^validation:/, "")}`,
        label: `Atlas · ${node.label}`,
      });
    } else {
      atlasLinks.push({
        href: COMPANION_PATHS.atlas,
        label: "Engineering Systems Atlas",
      });
    }

    const knowledgeLinks = uniqueLinks([
      ...projectLinks(projectIdList).map((link) => ({
        href: `${link.href}#engineering-knowledge-graph`,
        label: `Knowledge graph · ${link.label}`,
      })),
      {
        href: COMPANION_PATHS.atlas,
        label: "Atlas relationships",
      },
    ]);

    const limitations =
      failures.length > 0
        ? failures.map((entry) => entry.label).join("; ")
        : "Missing";

    return {
      id: node.id,
      kind: node.kind,
      kindLabel: KIND_LABEL[node.kind],
      label: node.label,
      serial: `CAP-${String(index + 1).padStart(2, "0")}`,
      descriptionText: missingText(node.description),
      projects: projectLinks(projectIdList),
      architecture,
      decisions,
      validation,
      failures,
      limitationsText: limitations,
      evidenceText: missingOr(uniqueStrings(node.provenance)).join(" · "),
      artifacts: missingOr(uniqueStrings(node.artifacts)),
      relatedCapabilities: uniqueLinks(
        related.map((entry) => ({
          href: `#capability-${entry.id}`,
          label: `${KIND_LABEL[entry.kind]} · ${entry.label}`,
        })),
      ),
      atlasLinks: uniqueLinks(atlasLinks),
      knowledgeLinks,
      provenance: missingOr(uniqueStrings(node.provenance)),
      confidenceCaption: evidenceConfidenceCaption(node.confidence),
      connectedIds: [...node.relatedIds].sort(),
    };
  });

  // Keep only edges whose endpoints still exist in layout
  const validEdges = edges.filter(
    (edge) => layoutById.has(edge.fromId) && layoutById.has(edge.toId),
  );

  return {
    inspections,
    layout,
    edges: validEdges,
    viewBox: { width: VIEW.width, height: VIEW.height },
  };
}
