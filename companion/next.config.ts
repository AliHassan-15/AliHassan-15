import { existsSync } from "node:fs";
import type { NextConfig } from "next";
import path from "node:path";

/**
 * Content lives at the repository root in development.
 * Production deploy packs may colocate `content/` beside this config.
 */
const colocatedContent = path.join(__dirname, "content");
const monorepoContent = path.join(__dirname, "..", "content");
const contentIsColocated = existsSync(colocatedContent);
const contentRoot = contentIsColocated ? colocatedContent : monorepoContent;

/**
 * GitHub Pages project site basePath.
 * Local / preview without env → "" (site at /).
 * Pages CI sets NEXT_PUBLIC_BASE_PATH=/AliHassan-15.
 */
const basePath = (() => {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!raw || raw === "/") {
    return "";
  }
  return raw.startsWith("/")
    ? raw.replace(/\/$/, "")
    : `/${raw.replace(/\/$/, "")}`;
})();

/**
 * Production security headers — retained as the Companion header contract.
 * Static export (GitHub Pages) cannot apply Next.js headers at runtime;
 * the values remain documented and verifiable in this file.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "media-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  poweredByHeader: false,
  // Monorepo only: trace repo-root content into the build graph.
  // Colocated packs keep content inside the app root — no extra tracing root.
  ...(contentIsColocated
    ? {}
    : {
        outputFileTracingRoot: path.join(__dirname, ".."),
        outputFileTracingIncludes: {
          "/**": [`${contentRoot.replace(/\\/g, "/")}/**/*`],
        },
      }),
};

export default nextConfig;

// Keep header contract discoverable for release verification (static export
// cannot attach these on GitHub Pages).
void securityHeaders;
