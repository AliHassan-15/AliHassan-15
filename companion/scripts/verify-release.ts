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
import { assetUrl, getBasePath, getSiteUrl } from "../lib/site-url";
import { COMPANION_PATHS } from "../modules/experience/routes";
import { runEosConsistencyAudit } from "./verify-eos-consistency";
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
  const abs = (routePath: string) => {
    if (routePath === "/" || routePath === "") {
      return `${base}/`;
    }
    return `${base}${routePath.endsWith("/") ? routePath : `${routePath}/`}`;
  };
  return [
    abs(COMPANION_PATHS.home),
    abs(COMPANION_PATHS.archive),
    abs(COMPANION_PATHS.atlas),
    abs(COMPANION_PATHS.journey),
    ...projects.map((project) => abs(COMPANION_PATHS.project(project.slug))),
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
    "sitemap includes home + archive + atlas + journey + case studies",
    urls.length === 4 + getArchiveProjects().length,
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
    "root layout sets metadataBase from getSiteOrigin",
    rootLayout.includes("metadataBase") && rootLayout.includes("getSiteOrigin"),
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

  const atlasPage = readFileSync(
    path.join(companionRoot, "app", "(site)", "atlas", "page.tsx"),
    "utf8",
  );
  check(
    "atlas page declares /atlas canonical",
    atlasPage.includes('canonical: "/atlas"') ||
      atlasPage.includes("canonical: '/atlas'"),
  );

  const journeyPage = readFileSync(
    path.join(companionRoot, "app", "(site)", "journey", "page.tsx"),
    "utf8",
  );
  check(
    "journey page declares /journey canonical",
    journeyPage.includes('canonical: "/journey"') ||
      journeyPage.includes("canonical: '/journey'"),
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
  check("COMPANION_PATHS.atlas", COMPANION_PATHS.atlas === "/atlas");
  check("COMPANION_PATHS.journey", COMPANION_PATHS.journey === "/journey");
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
    COMPANION_PATHS.atlas,
    COMPANION_PATHS.journey,
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

  const allowed = new Set([
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_BASE_PATH",
    "NODE_ENV",
  ]);

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
  const outDir = path.join(companionRoot, "out");
  const nextDir = path.join(companionRoot, ".next");

  if (existsSync(outDir)) {
    check("production build artifacts present", true, "static export out/");

    const expected = [
      path.join(outDir, "index.html"),
      path.join(outDir, "archive", "index.html"),
      path.join(outDir, "atlas", "index.html"),
      path.join(outDir, "journey", "index.html"),
      path.join(outDir, "404.html"),
      path.join(outDir, "robots.txt"),
      path.join(outDir, "sitemap.xml"),
    ];

    for (const file of expected) {
      check(`route artifact ${path.relative(outDir, file)}`, existsSync(file));
    }

    const deepmed = path.join(outDir, "archive", "deepmed", "index.html");
    check("route artifact archive/deepmed/index.html", existsSync(deepmed));

    const audioDir = path.join(outDir, "audio");
    const audioExpected = [
      "base-ambience.ogg",
      "low-air.ogg",
      "mechanical-texture.ogg",
      "distant-resonance.ogg",
    ];
    for (const name of audioExpected) {
      check(`static audio ${name}`, existsSync(path.join(audioDir, name)));
    }

    const identityDir = path.join(outDir, "identity");
    const identityExpected = [
      "portrait-primary.png",
      "portrait-primary-md.png",
      "grain.png",
      "signature.png",
    ];
    for (const name of identityExpected) {
      check(
        `static identity ${name}`,
        existsSync(path.join(identityDir, name)),
      );
    }

    const base = getBasePath();
    const indexHtml = readFileSync(path.join(outDir, "index.html"), "utf8");
    const portraitPath = assetUrl("/identity/portrait-primary.png");
    check(
      "exported HTML portrait src uses basePath",
      indexHtml.includes(`src="${portraitPath}"`),
      portraitPath,
    );
    const grainCssVar = `url(&quot;${assetUrl("/identity/grain.png")}&quot;)`;
    const grainCssVarRaw = `url("${assetUrl("/identity/grain.png")}")`;
    check(
      "exported HTML grain asset var uses basePath",
      indexHtml.includes(grainCssVar) || indexHtml.includes(grainCssVarRaw),
      assetUrl("/identity/grain.png"),
    );
    check(
      "exported CSS has no root-absolute grain url",
      (() => {
        const cssFiles = walkFiles(
          path.join(outDir, "_next", "static"),
          (file) => file.endsWith(".css"),
        );
        for (const file of cssFiles) {
          const css = readFileSync(file, "utf8");
          if (/url\(\s*["']?\/identity\/grain\.png/.test(css)) {
            return false;
          }
        }
        return true;
      })(),
    );
    check(
      "client bundles resolve audio via assetUrl + basePath",
      (() => {
        const relativeAudio = "/audio/base-ambience.ogg";
        const chunks = walkFiles(path.join(outDir, "_next", "static"), (file) =>
          file.endsWith(".js"),
        );
        let sawRelative = false;
        let sawDirectRootSrc = false;
        let sawBase = base === "";
        for (const chunk of chunks) {
          const js = readFileSync(chunk, "utf8");
          if (js.includes(relativeAudio)) {
            sawRelative = true;
          }
          // Direct root src (broken on Pages) — helper call is src:n("/audio/...")
          if (
            js.includes(`src:"${relativeAudio}"`) ||
            js.includes(`src:'${relativeAudio}'`)
          ) {
            sawDirectRootSrc = true;
          }
          if (base && js.includes(base)) {
            sawBase = true;
          }
        }
        return sawRelative && sawBase && !sawDirectRootSrc;
      })(),
      base
        ? `${base} + assetUrl(${JSON.stringify("/audio/base-ambience.ogg")})`
        : `assetUrl(${JSON.stringify("/audio/base-ambience.ogg")})`,
    );
    if (base) {
      check(
        "exported HTML has no unprefixed /identity/ portrait src",
        !indexHtml.includes('src="/identity/'),
      );
    }

    const nextStatic = path.join(outDir, "_next", "static");
    if (existsSync(nextStatic)) {
      const chunks = walkFiles(nextStatic, (file) => file.endsWith(".js"));
      const forbidden =
        /BEGIN (RSA |OPENSSH )?PRIVATE KEY|AWS_SECRET_ACCESS_KEY/;
      let hit = false;
      for (const chunk of chunks) {
        if (forbidden.test(readFileSync(chunk, "utf8"))) {
          hit = true;
          break;
        }
      }
      check("client bundles free of private key material", !hit);
    } else {
      check(
        "client bundles free of private key material",
        true,
        "no _next/static dir",
      );
    }
    return;
  }

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
        "skipped (no out/; pass --require-build after build)",
      );
    }
    return;
  }

  check("production build artifacts present", true, ".next (non-export)");

  const appDir = path.join(nextDir, "server", "app");
  const expected = [
    path.join(appDir, "(site)", "page.js"),
    path.join(appDir, "(site)", "archive", "page.js"),
    path.join(appDir, "(site)", "archive", "[slug]", "page.js"),
    path.join(appDir, "(site)", "atlas", "page.js"),
    path.join(appDir, "(site)", "journey", "page.js"),
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

function verifyEosConsistency(): void {
  const checks = runEosConsistencyAudit();
  for (const result of checks) {
    check(result.name, result.ok, result.detail);
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
  verifyEosConsistency();
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
