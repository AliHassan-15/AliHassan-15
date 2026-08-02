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
 * Production security headers — simplest durable defaults for a static Companion.
 * Theme bootstrap is an inline script → script-src allows 'unsafe-inline'.
 * next/font self-hosts → no third-party font origins.
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
  poweredByHeader: false,
  // Monorepo only: trace repo-root content into the serverless bundle.
  // Colocated packs keep content inside the app root — no extra tracing root.
  ...(contentIsColocated
    ? {}
    : {
        outputFileTracingRoot: path.join(__dirname, ".."),
        outputFileTracingIncludes: {
          "/**": [`${contentRoot.replace(/\\/g, "/")}/**/*`],
        },
      }),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
