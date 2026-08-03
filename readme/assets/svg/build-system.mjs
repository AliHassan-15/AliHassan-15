/**
 * EOS README SVG engineering system — generate light/dark asset pairs.
 * Hand-authored geometry. No editor metadata. Graphite/titanium only.
 *
 * Run: node readme/assets/svg/build-system.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Single stroke specification for the entrance system */
const SW = {
  hair: 0.8,
  tick: 0.65,
  faint: 0.45,
  rule: 1,
};

const themes = {
  light: {
    ink: "#2a2826",
    mid: "#524f4b",
    faint: "#8a8680",
    plate: "#e8e7e4",
    hair: "#3c3a37",
  },
  dark: {
    ink: "#e8e7e4",
    mid: "#c4c1bb",
    faint: "#8a8680",
    plate: "#121110",
    hair: "#d9d7d2",
  },
};

function esc(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function doc({ id, title, desc, width, height, body }) {
  const clean = String(body)
    .replace(/^\n+/, "")
    .replace(/\n+$/, "")
    .replace(/\n{3,}/g, "\n\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${esc(title)}</title>
  <desc id="${id}-desc">${esc(desc)}</desc>
  ${clean}
</svg>
`;
}

/** Registration L-corners at inset box */
function corners(x, y, w, h, len, stroke, sw = SW.hair) {
  const r = x + w;
  const b = y + h;
  return `<g fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="square">
    <path d="M${x} ${y + len}V${y}H${x + len}"/>
    <path d="M${r - len} ${y}H${r}V${y + len}"/>
    <path d="M${x} ${b - len}V${b}H${x + len}"/>
    <path d="M${r - len} ${b}H${r}V${b - len}"/>
  </g>`;
}

/** Edge calibration ticks along top of a horizontal span */
function ticksTop(x0, x1, y, majorEvery, stroke, sw = SW.tick) {
  const parts = [];
  for (let x = x0; x <= x1; x += 16) {
    const major = (x - x0) % majorEvery === 0;
    const h = major ? 7 : 3.5;
    parts.push(`M${x} ${y}V${y + h}`);
  }
  return `<path fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="square" d="${parts.join("")}"/>`;
}

function ticksLeft(y0, y1, x, majorEvery, stroke, sw = SW.tick) {
  const parts = [];
  for (let y = y0; y <= y1; y += 16) {
    const major = (y - y0) % majorEvery === 0;
    const w = major ? 7 : 3.5;
    parts.push(`M${x} ${y}H${x + w}`);
  }
  return `<path fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="square" d="${parts.join("")}"/>`;
}

function ruleEnds(y, width, mark, stroke, sw = SW.rule) {
  return `<g fill="${stroke}">
    <rect x="0" y="${y}" width="${width}" height="${sw}"/>
    <rect x="0" y="${y - 3}" width="${mark}" height="${sw + 6}"/>
    <rect x="${width - mark}" y="${y - 3}" width="${mark}" height="${sw + 6}"/>
  </g>`;
}

function monoText(x, y, text, size, fill, anchor = "start") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="${size}" letter-spacing="0.1em" text-anchor="${anchor}">${esc(text)}</text>`;
}

function writePair(baseName, factory) {
  for (const [theme, c] of Object.entries(themes)) {
    const file = path.join(__dirname, `${baseName}-${theme}.svg`);
    fs.writeFileSync(file, factory(c, theme), "utf8");
  }
}

/* —— Assets —— */

writePair("hero", (c) => {
  const W = 880;
  const H = 168;
  const body = `<g opacity="0.8">
    ${corners(24, 20, W - 48, H - 40, 12, c.hair, SW.hair)}
    <rect x="24" y="20" width="${W - 48}" height="${H - 40}" fill="none" stroke="${c.faint}" stroke-width="${SW.faint}" opacity="0.38"/>
    ${ticksTop(40, W - 40, 20, 80, c.faint, SW.tick)}
    ${ticksLeft(36, H - 36, 24, 64, c.faint, SW.tick)}
    <path fill="none" stroke="${c.faint}" stroke-width="${SW.faint}" opacity="0.26" d="M200 20V${H - 20}M440 20V${H - 20}M680 20V${H - 20}"/>
    <path fill="none" stroke="${c.faint}" stroke-width="${SW.faint}" opacity="0.22" d="M24 72H${W - 24}M24 112H${W - 24}"/>
    <path fill="none" stroke="${c.mid}" stroke-width="${SW.tick}" opacity="0.45" d="M72 132L160 96L280 104L400 68L560 60L760 40"/>
    <g fill="${c.mid}" opacity="0.45">
      <circle cx="160" cy="96" r="1.35"/>
      <circle cx="280" cy="104" r="1.35"/>
      <circle cx="400" cy="68" r="1.35"/>
      <circle cx="560" cy="60" r="1.35"/>
    </g>
    <path fill="none" stroke="${c.hair}" stroke-width="${SW.tick}" opacity="0.4" d="M432 84H448M440 76V92"/>
  </g>
  <g>
    <rect x="${W - 132}" y="52" width="72" height="72" fill="${c.plate}" stroke="${c.ink}" stroke-width="${SW.hair}"/>
    ${corners(W - 132, 52, 72, 72, 8, c.ink, SW.hair)}
    ${monoText(W - 96, 94, "AH", 18, c.ink, "middle")}
  </g>
  ${monoText(40, 56, "EOS · ENGINEERING OPERATING SYSTEM", 9, c.mid)}
  ${monoText(40, 148, "DRAFTING FIELD · ENTRANCE SURFACE", 8, c.faint)}`;
  return doc({
    id: "hero",
    title: "EOS engineering hero field",
    desc: "Drafting plate with registration marks, calibration ticks, system route, and AH serial plate.",
    width: W,
    height: H,
    body,
  });
});

writePair("monogram", (c) => {
  const S = 96;
  const body = `<rect x="8" y="8" width="80" height="80" fill="${c.plate}" stroke="${c.ink}" stroke-width="${SW.hair}"/>
  ${corners(8, 8, 80, 80, 10, c.ink, SW.hair)}
  <g fill="${c.mid}" opacity="0.5">
    <rect x="44" y="12" width="8" height="1"/>
    <rect x="12" y="44" width="1" height="8"/>
    <rect x="83" y="44" width="1" height="8"/>
    <rect x="44" y="83" width="8" height="1"/>
  </g>
  ${monoText(48, 56, "AH", 20, c.ink, "middle")}`;
  return doc({
    id: "monogram",
    title: "AH serial monogram plate",
    desc: "Machined registration plate bearing the AH identifier.",
    width: S,
    height: S,
    body,
  });
});

writePair("divider", (c) => {
  const W = 720;
  const H = 28;
  const body = `${ruleEnds(13, W, 16, c.ink, SW.rule)}
  <g fill="${c.mid}" opacity="0.58">
    <rect x="28" y="10" width="1" height="7"/>
    <rect x="44" y="11" width="1" height="5"/>
    <rect x="${W - 45}" y="11" width="1" height="5"/>
    <rect x="${W - 29}" y="10" width="1" height="7"/>
  </g>`;
  return doc({
    id: "divider",
    title: "Engineering divider",
    desc: "Horizontal construction rule with registration end marks and calibration ticks.",
    width: W,
    height: H,
    body,
  });
});

writePair("section-divider", (c) => {
  const W = 720;
  const H = 16;
  const body = `<g fill="${c.hair}" opacity="0.65">
    <rect x="0" y="7" width="${W}" height="1"/>
    <rect x="0" y="5" width="10" height="5"/>
    <rect x="${W - 10}" y="5" width="10" height="5"/>
  </g>`;
  return doc({
    id: "section-divider",
    title: "Section divider",
    desc: "Quiet section rule with registration end caps.",
    width: W,
    height: H,
    body,
  });
});

writePair("calibration-marks", (c) => {
  const W = 240;
  const H = 32;
  const body = `<g fill="none" stroke="${c.hair}" stroke-width="${SW.hair}" stroke-linecap="square">
    <path d="M8 8H24M8 8V24"/>
    <path d="M216 8H232V24"/>
    <path d="M8 24H24M232 24H216"/>
  </g>
  ${ticksTop(32, 208, 14, 48, c.faint, SW.tick)}
  <path fill="none" stroke="${c.mid}" stroke-width="${SW.hair}" d="M32 22H208"/>`;
  return doc({
    id: "cal",
    title: "Calibration marks",
    desc: "Standalone registration corners and tick ruler.",
    width: W,
    height: H,
    body,
  });
});

writePair("grid-field", (c) => {
  const W = 720;
  const H = 96;
  const lines = [];
  for (let x = 24; x <= W - 24; x += 24) {
    lines.push(`M${x} 12V${H - 12}`);
  }
  for (let y = 12; y <= H - 12; y += 24) {
    lines.push(`M24 ${y}H${W - 24}`);
  }
  const body = `${corners(12, 8, W - 24, H - 16, 10, c.faint, SW.tick)}
  <path fill="none" stroke="${c.faint}" stroke-width="${SW.faint}" opacity="0.32" d="${lines.join("")}"/>
  <rect x="12" y="8" width="${W - 24}" height="${H - 16}" fill="none" stroke="${c.hair}" stroke-width="${SW.faint}" opacity="0.42"/>`;
  return doc({
    id: "grid",
    title: "Engineering grid field",
    desc: "Sparse drafting grid inside a registration frame.",
    width: W,
    height: H,
    body,
  });
});

writePair("connector", (c) => {
  const W = 24;
  const H = 64;
  const body = `<g fill="${c.hair}">
    <rect x="11" y="0" width="2" height="${H}"/>
    <rect x="8" y="0" width="8" height="2"/>
    <rect x="8" y="${H - 2}" width="8" height="2"/>
    <rect x="9" y="30" width="6" height="2"/>
  </g>`;
  return doc({
    id: "connector",
    title: "Timeline connector",
    desc: "Vertical construction connector with end registration.",
    width: W,
    height: H,
    body,
  });
});

function plate(label, value, idBase, title) {
  writePair(idBase, (c) => {
    const W = 360;
    const H = 52;
    const body = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="${c.plate}" stroke="${c.ink}" stroke-width="${SW.hair}"/>
  ${corners(1, 1, W - 2, H - 2, 7, c.ink, SW.hair)}
  ${monoText(16, 20, label, 8, c.faint)}
  ${monoText(16, 38, value, 11, c.ink)}
  <g fill="${c.mid}" opacity="0.48">
    <rect x="${W - 28}" y="14" width="8" height="1"/>
    <rect x="${W - 21}" y="14" width="1" height="8"/>
  </g>`;
    return doc({
      id: idBase,
      title,
      desc: `Engineering plate labeled ${label}.`,
      width: W,
      height: H,
      body,
    });
  });
}

plate("LOCATION", "PAKISTAN", "plate-location", "Location plate");
plate(
  "AVAILABILITY",
  "OPEN TO FULL-TIME ENGINEERING",
  "plate-availability",
  "Availability plate",
);
plate("STATUS", "INDEPENDENT · BUILDING", "plate-status", "Status plate");
plate("FOCUS", "SYSTEMS · AI · FULL-STACK", "plate-focus", "Focus plate");
plate("CONTACT", "VIA COMPANION / GITHUB", "plate-contact", "Contact plate");

writePair("plate-signature", (c) => {
  const W = 280;
  const H = 56;
  const body = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="${c.plate}" stroke="${c.ink}" stroke-width="${SW.hair}"/>
  ${corners(1, 1, W - 2, H - 2, 8, c.ink, SW.hair)}
  ${monoText(18, 26, "AH", 16, c.ink)}
  ${monoText(18, 44, "EOS · TECHNICAL SIGNATURE", 8, c.mid)}
  <path fill="none" stroke="${c.faint}" stroke-width="${SW.tick}" d="M200 16V40H248"/>`;
  return doc({
    id: "sig",
    title: "Technical signature plate",
    desc: "AH technical signature on an engineering plate.",
    width: W,
    height: H,
    body,
  });
});

writePair("plate-quote", (c) => {
  const W = 720;
  const H = 72;
  const body = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="${c.hair}" stroke-width="${SW.hair}" opacity="0.58"/>
  ${corners(1, 1, W - 2, H - 2, 9, c.ink, SW.hair)}
  ${monoText(20, 28, "ENGINEERING NOTE", 8, c.faint)}
  ${monoText(20, 50, "PRECISION OVER SPECTACLE · SYSTEMS OVER FEATURES", 10, c.ink)}`;
  return doc({
    id: "quote",
    title: "Engineering quote plate",
    desc: "Quiet engineering note plate with registration frame.",
    width: W,
    height: H,
    body,
  });
});

writePair("footer-plate", (c) => {
  const W = 720;
  const H = 40;
  const body = `${ruleEnds(12, W, 14, c.hair, SW.rule)}
  ${monoText(0, 32, "EOS ENTRANCE · COMPANION DESTINATION", 8, c.faint)}
  ${monoText(W, 32, "AH", 8, c.mid, "end")}`;
  return doc({
    id: "footer",
    title: "Footer plate",
    desc: "Entrance footer rule with EOS / AH registration.",
    width: W,
    height: H,
    body,
  });
});

function sectionHeader(slug, label, title) {
  writePair(`header-${slug}`, (c) => {
    const W = 720;
    const H = 36;
    const body = `<g fill="${c.hair}" opacity="0.85">
    <rect x="0" y="17" width="${W}" height="1"/>
    <rect x="0" y="14" width="12" height="7"/>
  </g>
  ${monoText(24, 22, label, 10, c.ink)}
  <g fill="none" stroke="${c.mid}" stroke-width="${SW.hair}" stroke-linecap="square">
    <path d="M${W - 28} 12H${W - 12}V28"/>
  </g>`;
    return doc({
      id: `hdr-${slug}`,
      title,
      desc: `Section header plate for ${label}.`,
      width: W,
      height: H,
      body,
    });
  });
}

sectionHeader("archive", "ARCHIVE", "Archive section header");
sectionHeader("research", "RESEARCH", "Research section header");
sectionHeader("architecture", "ARCHITECTURE", "Architecture section header");
sectionHeader("lab", "LAB", "Lab section header");
sectionHeader("engineering", "ENGINEERING", "Engineering section header");
sectionHeader("philosophy", "PHILOSOPHY", "Philosophy section header");
sectionHeader("focus", "FOCUS", "Engineering focus section header");
sectionHeader("evidence", "EVIDENCE", "Evidence section header");
sectionHeader("companion", "COMPANION", "Engineering Companion section header");
sectionHeader("selected", "SELECTED WORK", "Selected work section header");
sectionHeader("contact", "CONTACT", "Contact section header");

writePair("label-system", (c) => {
  const W = 160;
  const H = 24;
  const body = `${corners(0, 0, W, H, 5, c.hair, SW.hair)}
  ${monoText(10, 16, "SYSTEM", 9, c.ink)}`;
  return doc({
    id: "label",
    title: "System section label",
    desc: "Compact registration label plate.",
    width: W,
    height: H,
    body,
  });
});

/* Legacy entrance marks — alias current divider language for continuity */
writePair("mark", (c) => {
  const W = 720;
  const H = 28;
  const body = `${ruleEnds(13, W, 16, c.ink, SW.rule)}
  <g fill="${c.mid}" opacity="0.58">
    <rect x="28" y="10" width="1" height="7"/>
    <rect x="${W - 29}" y="10" width="1" height="7"/>
  </g>`;
  return doc({
    id: "mark",
    title: "EOS entrance mark",
    desc: "Entrance construction rule with registration end marks.",
    width: W,
    height: H,
    body,
  });
});

const manifest = `# SVG Engineering System

Reusable GitHub-compatible SVG assets for the EOS entrance (Product A).

## Language

Registration corners · calibration ticks · engineering plates · drafting frames · hairline construction.

Graphite / titanium / slate only. No RGB. No neon. No gradients. No filters.

## Theme pairs

Every asset ships as \`-light.svg\` and \`-dark.svg\`.

Use GitHub classes:

\`\`\`html
<img src="readme/assets/svg/NAME-light.svg" alt="" class="gh-light-mode-only" />
<img src="readme/assets/svg/NAME-dark.svg" alt="" class="gh-dark-mode-only" />
\`\`\`

Decorative marks use empty \`alt\`; meaning stays in surrounding Markdown.

## Catalog

| Asset | Role |
|-------|------|
| \`hero-\*\` | Entrance drafting field + AH serial plate |
| \`monogram-\*\` | AH machined monogram plate |
| \`divider-\*\` / \`mark-\*\` | Primary engineering divider |
| \`section-divider-\*\` | Quieter section rule |
| \`header-*\` | Section headers (philosophy, focus, selected, …) |
| \`plate-*\` | Location, availability, status, focus, contact, signature, quote |
| \`grid-field-\*\` | Sparse drafting background |
| \`calibration-marks-\*\` | Standalone tick / corner set |
| \`connector-\*\` | Vertical timeline connector |
| \`footer-plate-\*\` | Entrance footer rule |
| \`label-system-\*\` | Compact system label |

## Rebuild

\`\`\`bash
node readme/assets/svg/build-system.mjs
\`\`\`

Geometry is authored in \`build-system.mjs\`. Outputs are clean SVG only.
`;

fs.writeFileSync(path.join(__dirname, "SYSTEM.md"), manifest, "utf8");
console.log("Wrote EOS SVG engineering system to", __dirname);
