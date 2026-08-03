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

  const parts: string[] = [heading];

  const objective = presentEvidenceString(project.objective);
  if (objective.kind === "show") {
    parts.push(objective.text);
  }

  const credit = presentEvidenceString(project.creditLine);
  if (credit.kind === "show") {
    parts.push(credit.text);
  } else {
    const role = presentEvidenceString(project.role);
    if (role.kind === "show") {
      parts.push(role.text);
    }
  }

  const note = presentEvidenceString(project.repositoryNote);
  if (note.kind === "show") {
    parts.push(note.text);
  }

  return parts.join("\n\n");
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

function dualThemeImg(baseName: string, width: number, height: number): string {
  return [
    "<p>",
    `  <img src="readme/assets/svg/${baseName}-light.svg" alt="" width="${width}" height="${height}" class="gh-light-mode-only" />`,
    `  <img src="readme/assets/svg/${baseName}-dark.svg" alt="" width="${width}" height="${height}" class="gh-dark-mode-only" />`,
    "</p>",
  ].join("\n");
}

function sectionBreak(): string {
  return dualThemeImg("section-divider", 720, 16);
}

function section(title: string, headerSlug: string, body: string): string {
  return `## ${title}

${dualThemeImg(`header-${headerSlug}`, 720, 36)}

${body.trim()}`;
}

export function renderReadme(): string {
  validateAllContent();
  const identity = getIdentity();
  const selected = getEntranceProjects();
  const evidence = getEvidenceTableProjects();

  const selectedBlocks = selected.map(selectedWorkBlock).join("\n\n");

  const companionCta = identity.links.companionDestination
    ? `**[Open Engineering Companion](${identity.links.companionDestination})**`
    : "A public destination deployment publishes when it meets the product’s Definition of Done.";

  const contactLinks = [
    `[GitHub](${identity.links.githubProfile})`,
    identity.links.companionDestination
      ? `[Companion](${identity.links.companionDestination})`
      : null,
  ]
    .filter((link): link is string => link !== null)
    .join(" · ");

  const identityBlock = `# ${identity.name}

**${identity.title}**

${identity.canonicalSentence}

${dualThemeImg("hero", 720, 137)}

${dualThemeImg("divider", 720, 28)}

${identity.geography} · ${identity.educationShort}

${dualThemeImg("plate-location", 360, 52)}

${identity.opportunity}

${dualThemeImg("plate-availability", 360, 52)}`;

  const philosophy = section(
    "Philosophy",
    "philosophy",
    `${identity.philosophyEntrance}

${principlesList(identity.principles)}

${dualThemeImg("plate-quote", 720, 72)}`,
  );

  const focus = section(
    "Engineering focus",
    "focus",
    `${dualThemeImg("plate-focus", 360, 52)}

${identity.seniorSentence}`,
  );

  const selectedWork = section(
    "Selected work",
    "selected",
    `Confirmed public work only. Measured outcomes are not claimed without evidence.

${selectedBlocks}`,
  );

  const evidenceSection = section(
    "Evidence",
    "evidence",
    `Public repositories used as proof channels:

| Project | Repository |
|---------|------------|
${evidenceRows(evidence)}`,
  );

  const companion = section(
    "Engineering Companion",
    "companion",
    `This README is the lobby.

The Companion is the engineering environment — Atlas, Journey, Architecture, Demonstrations, Evidence, and Case Studies as one continuous product.

${dualThemeImg("divider", 720, 28)}

${companionCta}

Local shell: [\`companion/\`](./companion)`,
  );

  const contact = section(
    "Contact",
    "contact",
    `${dualThemeImg("plate-contact", 360, 52)}

${contactLinks}

${dualThemeImg("footer-plate", 720, 40)}

${dualThemeImg("plate-signature", 280, 56)}`,
  );

  return [
    identityBlock,
    philosophy,
    focus,
    selectedWork,
    evidenceSection,
    companion,
    contact,
  ].join(`\n\n${sectionBreak()}\n\n`);
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
