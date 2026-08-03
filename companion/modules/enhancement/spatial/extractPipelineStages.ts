/**
 * Extract explicit pipeline stages from confirmed architecture prose.
 * Only the content-authored `stages:` list is used — nothing is invented.
 */

/**
 * Capture the content-authored stage list.
 * Accepts trailing Identity form (`stages: a, b, c.`) or an in-prose clause
 * ending at the first period.
 */
export function extractPipelineStages(
  architectureText: string,
): string[] | null {
  const trailing = architectureText.match(/stages:\s*(.+?)\.?\s*$/i);
  const clause = architectureText.match(/\bstages:\s*([^.\n]+)/i);
  const raw = trailing?.[1] ?? clause?.[1];
  if (!raw) {
    return null;
  }

  const stages = raw
    .split(/,|→|->/)
    .map((stage) => stage.replace(/\.\s*$/, "").trim())
    .filter((stage) => stage.length > 0);

  if (stages.length < 2) {
    return null;
  }

  return stages;
}
