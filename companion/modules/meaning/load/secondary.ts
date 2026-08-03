import {
  assetManifestSchema,
  engineeringAtlasSchema,
  engineeringPatternsSchema,
  externalLinksSchema,
  writingReferencesSchema,
  type AssetManifest,
  type EngineeringAtlas,
  type EngineeringPatternsContent,
  type ExternalLinksContent,
  type WritingReferencesContent,
} from "../schema";
import { parseContent } from "./read";

let assetsCache: AssetManifest | null = null;
let linksCache: ExternalLinksContent | null = null;
let writingCache: WritingReferencesContent | null = null;
let patternsCache: EngineeringPatternsContent | null = null;
let atlasCache: EngineeringAtlas | null = null;

export function loadAssets(): AssetManifest {
  if (!assetsCache) {
    assetsCache = parseContent("assets/manifest.json", assetManifestSchema);
  }

  return assetsCache;
}

export function loadExternalLinks(): ExternalLinksContent {
  if (!linksCache) {
    linksCache = parseContent("links/external.json", externalLinksSchema);
  }

  return linksCache;
}

export function loadWritingReferences(): WritingReferencesContent {
  if (!writingCache) {
    writingCache = parseContent(
      "writing/references.json",
      writingReferencesSchema,
    );
  }

  return writingCache;
}

export function loadEngineeringPatterns(): EngineeringPatternsContent {
  if (!patternsCache) {
    patternsCache = parseContent(
      "evidence/engineering-patterns.json",
      engineeringPatternsSchema,
    );
  }

  return patternsCache;
}

export function loadEngineeringAtlas(): EngineeringAtlas {
  if (!atlasCache) {
    atlasCache = parseContent(
      "evidence/engineering-atlas.json",
      engineeringAtlasSchema,
    );
  }

  return atlasCache;
}

export function clearSecondaryCaches(): void {
  assetsCache = null;
  linksCache = null;
  writingCache = null;
  patternsCache = null;
  atlasCache = null;
}
