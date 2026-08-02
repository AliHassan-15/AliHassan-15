/**
 * Production deploy pack — colocate Companion + content for Vercel CLI uploads
 * when the working tree is not Git-connected (full monorepo still preferred on Vercel Git).
 *
 * Usage (repo root):
 *   node scripts/deploy-production.mjs
 *   node scripts/deploy-production.mjs --dry-run
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const packRoot = path.join(repoRoot, ".deploy-pack");
const dryRun = process.argv.includes("--dry-run");

function copyCompanion() {
  mkdirSync(packRoot, { recursive: true });

  for (const entry of [
    "app",
    "lib",
    "modules",
    "public",
    "scripts",
    "styles",
    "eslint.config.mjs",
    "next.config.ts",
    "package.json",
    "tsconfig.json",
    "vercel.json",
    ".env.example",
  ]) {
    const from = path.join(repoRoot, "companion", entry);
    if (!existsSync(from)) continue;
    cpSync(from, path.join(packRoot, entry), { recursive: true });
  }
}

function writeInstallConfig() {
  const vercelPath = path.join(packRoot, "vercel.json");
  const config = JSON.parse(readFileSync(vercelPath, "utf8"));

  // Pack is a single package. Prefer npm on Vercel to avoid pnpm+Node24 registry bugs.
  config.installCommand = "npm install";
  config.buildCommand = "npm run build";
  writeFileSync(vercelPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  const pkgPath = path.join(packRoot, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.engines = { node: "24.x" };
  delete pkg.packageManager;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

function main() {
  console.log("Preparing production deploy pack…");
  rmSync(packRoot, { recursive: true, force: true });
  copyCompanion();
  cpSync(path.join(repoRoot, "content"), path.join(packRoot, "content"), {
    recursive: true,
  });
  writeInstallConfig();

  const rootVercel = path.join(repoRoot, ".vercel");
  if (existsSync(rootVercel)) {
    cpSync(rootVercel, path.join(packRoot, ".vercel"), { recursive: true });
  }

  console.log(`Pack ready at ${packRoot}`);
  if (dryRun) {
    console.log("Dry run — skipping vercel deploy.");
    return;
  }

  const result = spawnSync(
    "npx",
    [
      "--yes",
      "vercel@latest",
      "deploy",
      "--prod",
      "--yes",
      "--scope",
      "hassanakramali-gmailcoms-projects",
    ],
    { cwd: packRoot, stdio: "inherit", shell: true },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();
