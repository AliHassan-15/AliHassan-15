import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { getArchiveProjects } from "@/modules/meaning";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const archiveEntries = getArchiveProjects().map((project) => ({
    url: `${base}${COMPANION_PATHS.project(project.slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${base}${COMPANION_PATHS.home}`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}${COMPANION_PATHS.archive}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...archiveEntries,
  ];
}
