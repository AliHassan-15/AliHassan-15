/**
 * README System — generate Product A from content authority.
 * Does not invent truth. Omits Missing/Deferred evidence fields.
 */

import fs from "node:fs";
import path from "node:path";
import {
  getEvidenceTableProjects,
  getEntranceProjects,
  getIdentity,
  presentEvidenceString,
  projectDisplayTitle,
  projectRepoHref,
  validateAllContent,
  type ProjectContent,
} from "../modules/meaning";

function principlesList(principles: string[]): string {
  return principles
    .map((principle, index) => `${index + 1}. ${principle}`)
    .join("\n");
}

function repoRoot(): string {
  return path.resolve(process.cwd(), "..");
}

function selectedWorkBlock(project: ProjectContent): string {
  const href = projectRepoHref(project);
  const title = projectDisplayTitle(project);
  const heading = href ? `### [${title}](${href})` : `### ${title}`;

  const lines: string[] = [heading, ""];

  const objective = presentEvidenceString(project.objective);
  if (objective.kind === "show") {
    lines.push(objective.text, "");
  }

  const credit = presentEvidenceString(project.creditLine);
  if (credit.kind === "show") {
    lines.push(credit.text, "");
  } else {
    const role = presentEvidenceString(project.role);
    if (role.kind === "show") {
      lines.push(role.text, "");
    }
  }

  const note = presentEvidenceString(project.repositoryNote);
  if (note.kind === "show") {
    lines.push(note.text, "");
  }

  return lines.join("\n").trimEnd();
}

function evidenceRows(projects: ProjectContent[]): string {
  const rows: string[] = [];

  for (const project of projects) {
    const href = projectRepoHref(project);
    if (!href) {
      continue;
    }

    const labelField = presentEvidenceString(project.evidenceLabel);
    const label = labelField.kind === "show" ? labelField.text : project.name;
    const slug = href.replace("https://github.com/", "");
    rows.push(`| ${label} | [${slug}](${href}) |`);
  }

  return rows.join("\n");
}

export function renderReadme(): string {
  validateAllContent();
  const identity = getIdentity();
  const selected = getEntranceProjects();
  const evidence = getEvidenceTableProjects();

  const selectedBlocks = selected.map(selectedWorkBlock).join("\n\n");

  return `# ${identity.name}

**${identity.title}**

${identity.canonicalSentence}

<p>
  <img src="readme/assets/svg/mark-light.svg" alt="" width="720" height="48" class="gh-light-mode-only" />
  <img src="readme/assets/svg/mark-dark.svg" alt="" width="720" height="48" class="gh-dark-mode-only" />
</p>

${identity.geography} · ${identity.educationShort}

${identity.opportunity}

---

## Engineering

${identity.philosophyEntrance}

${principlesList(identity.principles)}

---

## Selected work

Confirmed public work only. Measured outcomes are not claimed here.

${selectedBlocks}

---

## Evidence

Public repositories used as proof channels:

| Project | Repository |
|---------|------------|
${evidenceRows(evidence)}

---

## Companion

This README is the entrance.

Deeper architecture, decisions, trade-offs, and systems thinking belong in the **Companion Experience** — the destination of EOS.

${
  identity.links.companionDestination
    ? `Open the Companion: [${identity.links.companionDestination}](${identity.links.companionDestination})`
    : "A public destination deployment publishes when it meets the product’s Definition of Done."
}

The Companion L1 shell also lives in [\`companion/\`](./companion). Run it locally with \`pnpm dev\` from the repository root.

Curiosity belongs here. Proof depth belongs there.
`;
}

export function writeReadme(): string {
  const markdown = renderReadme();
  const target = path.join(repoRoot(), "README.md");
  fs.writeFileSync(target, `${markdown.trimEnd()}\n`, "utf8");
  return target;
}

export function checkReadme(): void {
  const expected = `${renderReadme().trimEnd()}\n`;
  const readmePath = path.join(repoRoot(), "README.md");

  if (!fs.existsSync(readmePath)) {
    if (process.env.VERCEL) {
      console.log(
        "Skipping README sync check on Vercel — README lives at the monorepo root.",
      );
      return;
    }
    throw new Error(`README.md not found at ${readmePath}`);
  }

  const actual = fs.readFileSync(readmePath, "utf8");

  if (actual !== expected) {
    throw new Error(
      "README.md is out of sync with content/. Run: pnpm readme:generate",
    );
  }
}

const isDirect = process.argv[1]?.includes("generate-readme");

if (isDirect) {
  const mode = process.argv[2] ?? "write";
  if (mode === "check") {
    checkReadme();
    console.log("README.md matches content authority.");
  } else {
    const target = writeReadme();
    console.log(`Wrote ${target}`);
  }
}
