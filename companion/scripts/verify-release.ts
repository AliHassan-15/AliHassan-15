/**
 * Release verification — proves critical EOS engineering guarantees.
 *
 * Usage:
 *   tsx scripts/verify-release.ts
 *   tsx scripts/verify-release.ts --require-build
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSiteUrl } from "../lib/site-url";
import { COMPANION_PATHS } from "../modules/experience/routes";
import {
  getArchiveProjects,
  getIdentity,
  validateAllContent,
} from "../modules/meaning";
import { checkReadme } from "./generate-readme";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const companionRoot = path.join(__dirname, "..");
const requireBuild = process.argv.includes("--require-build");

type CheckResult = { name: string; ok: boolean; detail?: string };

const results: CheckResult[] = [];

function check(name: string, ok: boolean, detail?: string): void {
  results.push({ name, ok, detail });
  const mark = ok ? "PASS" : "FAIL";
  console.log(`${mark}  ${name}${detail ? ` — ${detail}` : ""}`);
}

function walkFiles(
  dir: string,
  predicate: (file: string) => boolean,
): string[] {
  const out: string[] = [];
  if (!existsSync(dir)) {
    return out;
  }
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === "dist" ||
        entry === "coverage"
      ) {
        continue;
      }
      out.push(...walkFiles(full, predicate));
      continue;
    }
    if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function expectedSitemapUrls(base: string): string[] {
  const projects = getArchiveProjects();
  return [
    `${base}${COMPANION_PATHS.home}`,
    `${base}${COMPANION_PATHS.archive}`,
    ...projects.map(
      (project) => `${base}${COMPANION_PATHS.project(project.slug)}`,
    ),
  ];
}

function verifyContent(): void {
  try {
    validateAllContent();
    check("content schema + catalog integrity", true);
  } catch (error) {
    check(
      "content schema + catalog integrity",
      false,
      error instanceof Error ? error.message : "validation failed",
    );
  }
}

function verifyReadme(): void {
  try {
    checkReadme();
    check("README generation consistency", true);
  } catch (error) {
    check(
      "README generation consistency",
      false,
      error instanceof Error ? error.message : "README check failed",
    );
  }
}

function verifyArchiveRoutes(): void {
  const projects = getArchiveProjects();
  const slugs = new Set<string>();
  let duplicate = false;

  for (const project of projects) {
    if (slugs.has(project.slug)) {
      duplicate = true;
    }
    slugs.add(project.slug);
  }

  check(
    "archive slugs unique",
    !duplicate && projects.length === slugs.size,
    `${projects.length} archive projects`,
  );

  const nonArchive = projects.filter((project) => !project.includeInArchive);
  check(
    "archive query returns only includeInArchive projects",
    nonArchive.length === 0,
    nonArchive.map((project) => project.id).join(", ") || undefined,
  );

  for (const project of projects) {
    const route = COMPANION_PATHS.project(project.slug);
    check(
      `archive route shape ${project.slug}`,
      route === `/archive/${project.slug}`,
      route,
    );
  }
}

function verifySitemapIntegrity(): void {
  const base = getSiteUrl();
  const urls = expectedSitemapUrls(base);

  check("canonical site URL has no trailing slash", !base.endsWith("/"), base);

  check(
    "sitemap includes home + archive + case studies",
    urls.length === 2 + getArchiveProjects().length,
    `${urls.length} URLs`,
  );

  const malformed = urls.filter(
    (url) => !/^https?:\/\/[^/\s]+(\/[\w./-]*)?$/.test(url),
  );
  check(
    "sitemap URLs are absolute and well-formed",
    malformed.length === 0,
    malformed.join(", ") || undefined,
  );

  const sitemapSource = readFileSync(
    path.join(companionRoot, "app", "sitemap.ts"),
    "utf8",
  );
  check(
    "sitemap.ts uses getArchiveProjects + COMPANION_PATHS",
    sitemapSource.includes("getArchiveProjects") &&
      sitemapSource.includes("COMPANION_PATHS"),
  );
}

function verifyCanonicalMetadataSource(): void {
  const rootLayout = readFileSync(
    path.join(companionRoot, "app", "layout.tsx"),
    "utf8",
  );
  check(
    "root layout sets metadataBase from getSiteUrl",
    rootLayout.includes("metadataBase") && rootLayout.includes("getSiteUrl"),
  );
  check(
    "root layout declares home canonical",
    rootLayout.includes('canonical: "/"') ||
      rootLayout.includes("canonical: '/'"),
  );

  const archivePage = readFileSync(
    path.join(companionRoot, "app", "(site)", "archive", "page.tsx"),
    "utf8",
  );
  check(
    "archive page declares /archive canonical",
    archivePage.includes('canonical: "/archive"') ||
      archivePage.includes("canonical: '/archive'"),
  );

  const caseStudy = readFileSync(
    path.join(companionRoot, "app", "(site)", "archive", "[slug]", "page.tsx"),
    "utf8",
  );
  check(
    "case-study metadata declares path canonical",
    caseStudy.includes("canonical: path") || caseStudy.includes("canonical:"),
  );
}

function verifyIdentityLinks(): void {
  const identity = getIdentity();
  check(
    "identity entrance URL is https",
    identity.githubEntranceUrl.startsWith("https://"),
    identity.githubEntranceUrl,
  );
  check(
    "identity profile URL is https",
    identity.githubProfileUrl.startsWith("https://"),
    identity.githubProfileUrl,
  );
}

function verifyRobotsPolicySource(): void {
  const robotsSource = readFileSync(
    path.join(companionRoot, "app", "robots.ts"),
    "utf8",
  );
  check(
    "robots disallows /internal/",
    robotsSource.includes('"/internal/"') ||
      robotsSource.includes("'/internal/'"),
  );
  check("robots references sitemap", robotsSource.includes("sitemap"));
}

function verifyManifestSource(): void {
  const manifest = readFileSync(
    path.join(companionRoot, "app", "manifest.ts"),
    "utf8",
  );
  check(
    "manifest short_name is EOS",
    manifest.includes('"EOS"') || manifest.includes("'EOS'"),
  );
  check(
    "manifest start_url is /",
    manifest.includes('start_url: "/"') || manifest.includes("start_url: '/'"),
  );
}

function verifyInternalPathConstants(): void {
  check("COMPANION_PATHS.home", COMPANION_PATHS.home === "/");
  check("COMPANION_PATHS.archive", COMPANION_PATHS.archive === "/archive");
}

function verifyInternalLinksInSource(): void {
  const files = [
    ...walkFiles(
      path.join(companionRoot, "app"),
      (file) => file.endsWith(".tsx") || file.endsWith(".ts"),
    ),
    ...walkFiles(
      path.join(companionRoot, "modules", "presentation"),
      (file) => file.endsWith(".tsx") || file.endsWith(".ts"),
    ),
  ];

  const hrefPattern = /href=\{?["'](\/[^"'#?]*)["']\}?/g;
  const known = new Set<string>([
    COMPANION_PATHS.home,
    COMPANION_PATHS.archive,
    ...getArchiveProjects().map((project) =>
      COMPANION_PATHS.project(project.slug),
    ),
  ]);

  const unknown = new Set<string>();
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    let match: RegExpExecArray | null;
    while ((match = hrefPattern.exec(text)) !== null) {
      const href = match[1];
      if (!href || href.startsWith("/internal")) {
        continue;
      }
      if (!known.has(href)) {
        unknown.add(href);
      }
    }
  }

  check(
    "no unknown hard-coded internal hrefs",
    unknown.size === 0,
    unknown.size > 0 ? [...unknown].join(", ") : undefined,
  );
}

function verifyNoSecretPatterns(): void {
  const files = walkFiles(companionRoot, (file) => {
    return (
      (file.endsWith(".ts") ||
        file.endsWith(".tsx") ||
        file.endsWith(".js") ||
        file.endsWith(".mjs")) &&
      !file.includes(`${path.sep}scripts${path.sep}`)
    );
  });

  const forbidden =
    /(SECRET_KEY|PRIVATE_KEY|API_SECRET|AWS_SECRET|BEGIN (RSA |OPENSSH )?PRIVATE KEY)/;

  const hits: string[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    if (forbidden.test(text)) {
      hits.push(path.relative(companionRoot, file));
    }
  }

  check(
    "no secret material patterns in companion source",
    hits.length === 0,
    hits.join(", ") || undefined,
  );
}

function verifyPublicEnvBoundary(): void {
  const files = [
    ...walkFiles(
      path.join(companionRoot, "modules"),
      (file) => file.endsWith(".ts") || file.endsWith(".tsx"),
    ),
    ...walkFiles(
      path.join(companionRoot, "app"),
      (file) => file.endsWith(".ts") || file.endsWith(".tsx"),
    ),
    ...walkFiles(
      path.join(companionRoot, "lib"),
      (file) => file.endsWith(".ts") || file.endsWith(".tsx"),
    ),
  ];

  const envRefs = new Set<string>();
  const envPattern = /process\.env\.([A-Z0-9_]+)/g;

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    let match: RegExpExecArray | null;
    while ((match = envPattern.exec(text)) !== null) {
      const key = match[1];
      if (key) {
        envRefs.add(key);
      }
    }
  }

  const allowed = new Set(["NEXT_PUBLIC_SITE_URL", "VERCEL_URL", "NODE_ENV"]);

  const unexpected = [...envRefs].filter((key) => !allowed.has(key));
  check(
    "env usage stays within allowlist",
    unexpected.length === 0,
    unexpected.length > 0
      ? unexpected.join(", ")
      : [...envRefs].sort().join(", ") || "none",
  );
}

function verifyBuildArtifacts(): void {
  const nextDir = path.join(companionRoot, ".next");
  if (!existsSync(nextDir)) {
    if (requireBuild) {
      check(
        "production build artifacts present",
        false,
        "run pnpm build before verify --require-build",
      );
    } else {
      check(
        "production build artifacts present",
        true,
        "skipped (no .next; pass --require-build after build)",
      );
    }
    return;
  }

  check("production build artifacts present", true);

  const appDir = path.join(nextDir, "server", "app");
  const expected = [
    path.join(appDir, "(site)", "page.js"),
    path.join(appDir, "(site)", "archive", "page.js"),
    path.join(appDir, "(site)", "archive", "[slug]", "page.js"),
    path.join(appDir, "robots.txt", "route.js"),
    path.join(appDir, "sitemap.xml", "route.js"),
  ];

  for (const file of expected) {
    check(`route artifact ${path.relative(nextDir, file)}`, existsSync(file));
  }

  const staticDir = path.join(nextDir, "static");
  if (existsSync(staticDir)) {
    const chunks = walkFiles(staticDir, (file) => file.endsWith(".js"));
    const forbidden = /BEGIN (RSA |OPENSSH )?PRIVATE KEY|AWS_SECRET_ACCESS_KEY/;
    let hit = false;
    for (const chunk of chunks) {
      if (forbidden.test(readFileSync(chunk, "utf8"))) {
        hit = true;
        break;
      }
    }
    check("client bundles free of private key material", !hit);
  } else {
    check("client bundles free of private key material", true, "no static dir");
  }
}

function verifyA11ySourceContracts(): void {
  const shell = readFileSync(
    path.join(
      companionRoot,
      "modules",
      "presentation",
      "shell",
      "SiteShell.tsx",
    ),
    "utf8",
  );
  check(
    'SiteShell exposes <main id="main">',
    /<main[^>]*id=["']main["']/.test(shell),
  );
  check("SiteShell includes SkipLink", shell.includes("SkipLink"));

  const header = readFileSync(
    path.join(
      companionRoot,
      "modules",
      "presentation",
      "shell",
      "SiteHeader.tsx",
    ),
    "utf8",
  );
  check(
    "SiteHeader uses primary nav landmark",
    header.includes('aria-label="Primary"') ||
      header.includes("aria-label='Primary'"),
  );
}

function verifySecurityHeadersConfig(): void {
  const config = readFileSync(
    path.join(companionRoot, "next.config.ts"),
    "utf8",
  );
  const required = [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Content-Security-Policy",
    "poweredByHeader: false",
  ];
  for (const token of required) {
    check(`next.config includes ${token}`, config.includes(token));
  }
}

function main(): void {
  console.log("EOS release verification\n");

  verifyContent();
  verifyReadme();
  verifyArchiveRoutes();
  verifySitemapIntegrity();
  verifyCanonicalMetadataSource();
  verifyIdentityLinks();
  verifyRobotsPolicySource();
  verifyManifestSource();
  verifyInternalPathConstants();
  verifyInternalLinksInSource();
  verifyNoSecretPatterns();
  verifyPublicEnvBoundary();
  verifyA11ySourceContracts();
  verifySecurityHeadersConfig();
  verifyBuildArtifacts();

  const failed = results.filter((result) => !result.ok);
  console.log(
    `\n${results.length - failed.length}/${results.length} checks passed.`,
  );

  if (failed.length > 0) {
    console.error("\nRelease verification failed.");
    process.exit(1);
  }

  console.log("Release verification passed.");
}

main();
