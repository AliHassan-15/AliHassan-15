import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  let host = base;
  try {
    host = new URL(base).host;
  } catch {
    // Keep base if URL parsing fails (local).
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/internal/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
