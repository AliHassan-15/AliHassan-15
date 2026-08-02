import {
  projectCatalogSchema,
  projectSchema,
  type ProjectContent,
} from "../schema";
import { parseContent } from "./read";

let catalogCache: ProjectContent[] | null = null;

export function loadProjects(): ProjectContent[] {
  if (catalogCache) {
    return catalogCache;
  }

  const catalog = parseContent("evidence/catalog.json", projectCatalogSchema);
  const projects = catalog.projects.map((id) =>
    parseContent(`evidence/projects/${id}.json`, projectSchema),
  );

  const ids = new Set(projects.map((project) => project.id));
  for (const id of catalog.projects) {
    if (!ids.has(id)) {
      throw new Error(
        `EOS content integrity failure: catalog lists "${id}" but project id mismatch.`,
      );
    }
  }

  catalogCache = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
  return catalogCache;
}

export function loadEntranceProjects(): ProjectContent[] {
  return loadProjects().filter((project) => project.selectedForEntrance);
}

export function loadProjectBySlug(slug: string): ProjectContent | null {
  return loadProjects().find((project) => project.slug === slug) ?? null;
}

export function clearProjectsCache(): void {
  catalogCache = null;
}
