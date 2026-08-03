/**
 * Public site URL for metadata, robots, and sitemap.
 * Prefer NEXT_PUBLIC_SITE_URL. No platform-specific URL inventing.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

/**
 * Origin only — for metadataBase when the site is served under a basePath
 * (GitHub Pages project site). Absolute path canonicals resolve against origin;
 * Next.js applies basePath to generated metadata URLs.
 */
export function getSiteOrigin(): string {
  try {
    return new URL(getSiteUrl()).origin;
  } catch {
    return "http://localhost:3000";
  }
}

/** Public basePath for GitHub Pages (empty string for local root hosting). */
export function getBasePath(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!raw || raw === "/") {
    return "";
  }
  return raw.startsWith("/")
    ? raw.replace(/\/$/, "")
    : `/${raw.replace(/\/$/, "")}`;
}

/**
 * Public asset URL under the active basePath.
 * Use for every file served from `public/` — never hardcode root-absolute paths.
 * Local (no basePath) → `/identity/…`; GitHub Pages → `/AliHassan-15/identity/…`.
 */
export function assetUrl(publicPath: string): string {
  const normalized = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  return `${getBasePath()}${normalized}`;
}
