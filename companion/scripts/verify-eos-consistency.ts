/**
 * EOS consistency audit — orphan references fail verification.
 * Invoked from verify-release.ts.
 */

import { loadEngineeringAtlas } from "../modules/meaning/load/secondary";
import { loadProjects } from "../modules/meaning/load/projects";

export type EosCheck = {
  name: string;
  ok: boolean;
  detail?: string;
};

function collectIds(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

export function runEosConsistencyAudit(): EosCheck[] {
  const checks: EosCheck[] = [];
  const projects = loadProjects();
  const knownProjects = new Set(projects.map((project) => project.id));
  const atlas = loadEngineeringAtlas();

  const push = (name: string, ok: boolean, detail?: string) => {
    checks.push({ name, ok, detail });
  };

  const systemIds = atlas.systems.map((entry) => entry.id);
  const validationIds = atlas.validationIndex.map((entry) => entry.id);
  const glossaryIds = atlas.glossary.map((entry) => entry.id);
  const architectureIds = atlas.architectureIndex.map((entry) => entry.id);
  const decisionIds = atlas.decisions.map((entry) => entry.id);
  const failureIds = atlas.failures.map((entry) => entry.id);
  const evolutionIds = atlas.evolution.map((entry) => entry.id);
  const relationshipIds = atlas.relationships.map((entry) => entry.id);

  const allAtlasIds = [
    ...systemIds,
    ...validationIds,
    ...glossaryIds,
    ...architectureIds,
    ...decisionIds,
    ...failureIds,
    ...evolutionIds,
    ...relationshipIds,
  ];
  const duplicates = [...collectIds(allAtlasIds).entries()].filter(
    ([, count]) => count > 1,
  );
  push(
    "atlas identifiers unique",
    duplicates.length === 0,
    duplicates.map(([id]) => id).join(", ") || undefined,
  );

  for (const system of atlas.systems) {
    push(
      `system ${system.id} cites ≥2 projects`,
      system.projectIds.length >= 2,
      String(system.projectIds.length),
    );
    for (const id of system.projectIds) {
      push(
        `system ${system.id} project ${id}`,
        knownProjects.has(id),
        knownProjects.has(id) ? undefined : "orphan project id",
      );
    }
    for (const id of system.relatedSystemIds) {
      push(
        `system ${system.id} related system ${id}`,
        systemIds.includes(id),
        systemIds.includes(id) ? undefined : "orphan system ref",
      );
    }
    for (const id of system.relatedValidationIds) {
      push(
        `system ${system.id} related validation ${id}`,
        validationIds.includes(id),
        validationIds.includes(id) ? undefined : "orphan validation ref",
      );
    }
    for (const id of system.relatedGlossaryIds) {
      push(
        `system ${system.id} related glossary ${id}`,
        glossaryIds.includes(id),
        glossaryIds.includes(id) ? undefined : "orphan glossary ref",
      );
    }
    for (const id of system.relatedArchitectureIds) {
      push(
        `system ${system.id} related architecture ${id}`,
        architectureIds.includes(id),
        architectureIds.includes(id) ? undefined : "orphan architecture ref",
      );
    }
  }

  const years = atlas.evolution.map((step) => step.year);
  let chronologyOk = true;
  for (let i = 1; i < years.length; i += 1) {
    if (years[i]! < years[i - 1]!) {
      chronologyOk = false;
      break;
    }
  }
  push("atlas evolution chronology ordered", chronologyOk, years.join(" → "));

  for (const entry of [
    ...atlas.evolution,
    ...atlas.architectureIndex,
    ...atlas.decisions,
    ...atlas.validationIndex,
    ...atlas.glossary,
  ]) {
    for (const id of entry.projectIds) {
      push(
        `atlas entry ${entry.id} project ${id}`,
        knownProjects.has(id),
        knownProjects.has(id) ? undefined : "orphan project id",
      );
    }
  }

  for (const failure of atlas.failures) {
    push(
      `failure ${failure.id} project ${failure.projectId}`,
      knownProjects.has(failure.projectId),
      knownProjects.has(failure.projectId) ? undefined : "orphan project id",
    );
  }

  for (const rel of atlas.relationships) {
    for (const step of rel.steps) {
      let ok = false;
      switch (step.kind) {
        case "system":
          ok = systemIds.includes(step.id);
          break;
        case "validation":
          ok = validationIds.includes(step.id);
          break;
        case "architecture":
          ok = architectureIds.includes(step.id);
          break;
        case "glossary":
          ok = glossaryIds.includes(step.id);
          break;
        case "decision":
          ok = decisionIds.includes(step.id);
          break;
        case "project":
          ok = knownProjects.has(step.id);
          break;
        default: {
          const _exhaustive: never = step.kind;
          void _exhaustive;
          ok = false;
        }
      }
      push(
        `relationship ${rel.id} step ${step.kind}:${step.id}`,
        ok,
        ok ? undefined : "orphan relationship step",
      );
    }
  }

  for (const project of projects) {
    const lineages = project.engineeringCaseFile.decisionLineages;
    const lineageIds = lineages.map((entry) => entry.id);
    const lineageDupes = [...collectIds(lineageIds).entries()].filter(
      ([, count]) => count > 1,
    );
    push(
      `project ${project.id} lineage ids unique`,
      lineageDupes.length === 0,
      lineageDupes.map(([id]) => id).join(", ") || undefined,
    );

    for (const lineage of lineages) {
      for (const ref of lineage.referencedAgainBy) {
        let ok = false;
        switch (ref.kind) {
          case "atlas-system":
            ok = systemIds.includes(ref.id);
            break;
          case "atlas-decision":
            ok = decisionIds.includes(ref.id);
            break;
          case "atlas-validation":
            ok = validationIds.includes(ref.id);
            break;
          case "atlas-glossary":
            ok = glossaryIds.includes(ref.id);
            break;
          case "project":
            ok = knownProjects.has(ref.id);
            break;
          default: {
            const _exhaustive: never = ref.kind;
            void _exhaustive;
            ok = false;
          }
        }
        push(
          `lineage ${project.id}/${lineage.id} ref ${ref.kind}:${ref.id}`,
          ok,
          ok ? undefined : "orphan lineage reference",
        );
      }
    }
  }

  const glossaryTerms = collectIds(
    atlas.glossary.map((entry) => entry.term.toLowerCase()),
  );
  const termDupes = [...glossaryTerms.entries()].filter(
    ([, count]) => count > 1,
  );
  push(
    "glossary terms unique",
    termDupes.length === 0,
    termDupes.map(([term]) => term).join(", ") || undefined,
  );

  return checks;
}
