import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { getArchiveProjects } from "@/modules/meaning";

export const dynamic = "force-static";

/** Absolute sitemap URL — trailing slash matches static export + GitHub Pages. */
function absoluteUrl(base: string, routePath: string): string {
  if (routePath === "/" || routePath === "") {
    return `${base}/`;
  }
  const normalized = routePath.endsWith("/") ? routePath : `${routePath}/`;
  return `${base}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const archiveEntries = getArchiveProjects().map((project) => ({
    url: absoluteUrl(base, COMPANION_PATHS.project(project.slug)),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl(base, COMPANION_PATHS.home),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl(base, COMPANION_PATHS.archive),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(base, COMPANION_PATHS.atlas),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(base, COMPANION_PATHS.journey),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...archiveEntries,
  ];
}
