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
  loadExternalLinks,
  loadWritingReferences,
} from "./secondary";

export function validateAllContent(): void {
  clearIdentityCache();
  clearProjectsCache();
  clearSecondaryCaches();

  loadIdentity();
  loadProjects();
  loadAssets();
  loadExternalLinks();
  loadWritingReferences();
}

export {
  loadIdentity,
  loadProjects,
  loadEntranceProjects,
  loadProjectBySlug,
  loadAssets,
  loadExternalLinks,
  loadWritingReferences,
};
