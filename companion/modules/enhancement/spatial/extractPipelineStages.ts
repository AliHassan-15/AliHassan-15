/**
 * Extract explicit pipeline stages from confirmed architecture prose.
 * Only the content-authored `stages:` list is used — nothing is invented.
 */
export function extractPipelineStages(
  architectureText: string,
): string[] | null {
  const match = architectureText.match(/stages:\s*(.+)$/i);
  const raw = match?.[1];
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
