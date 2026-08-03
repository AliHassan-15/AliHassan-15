import { clearIdentityCache, loadIdentity } from "./identity";
import {
  clearProjectsCache,
  loadEntranceProjects,
  loadProjectBySlug,
  loadProjects,
} from "./projects";
import {
  clearSecondaryCaches,
  loadAssets,
  loadEngineeringAtlas,
  loadEngineeringPatterns,
  loadExternalLinks,
  loadWritingReferences,
} from "./secondary";

function assertAtlasProjectIds(): void {
  const atlas = loadEngineeringAtlas();
  const projects = loadProjects();
  const known = new Set(projects.map((project) => project.id));

  const collect = (ids: string[], context: string) => {
    for (const id of ids) {
      if (!known.has(id)) {
        throw new Error(
          `Engineering Atlas ${context} references unknown project id: ${id}`,
        );
      }
    }
  };

  for (const system of atlas.systems) {
    collect(system.projectIds, `system "${system.id}"`);
  }
  for (const step of atlas.evolution) {
    collect(step.projectIds, `evolution "${step.id}"`);
  }
  for (const component of atlas.architectureIndex) {
    collect(component.projectIds, `architecture "${component.id}"`);
  }
  for (const decision of atlas.decisions) {
    collect(decision.projectIds, `decision "${decision.id}"`);
  }
  for (const failure of atlas.failures) {
    collect([failure.projectId], `failure "${failure.id}"`);
  }
  for (const entry of atlas.validationIndex) {
    collect(entry.projectIds, `validation "${entry.id}"`);
  }
  for (const entry of atlas.glossary) {
    collect(entry.projectIds, `glossary "${entry.id}"`);
  }
}

export function validateAllContent(): void {
  clearIdentityCache();
  clearProjectsCache();
  clearSecondaryCaches();

  loadIdentity();
  loadProjects();
  loadAssets();
  loadExternalLinks();
  loadWritingReferences();
  loadEngineeringPatterns();
  assertAtlasProjectIds();
}

export {
  loadIdentity,
  loadProjects,
  loadEntranceProjects,
  loadProjectBySlug,
  loadAssets,
  loadExternalLinks,
  loadWritingReferences,
  loadEngineeringPatterns,
  loadEngineeringAtlas,
};
