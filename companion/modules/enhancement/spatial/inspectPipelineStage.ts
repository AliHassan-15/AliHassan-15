/**
 * Stage inspection derived only from confirmed architecture prose + stage list.
 * No invented node descriptions.
 */

export type PipelineStageInspection = {
  stage: string;
  index: number;
  count: number;
  /** 1-based position label, e.g. "2 of 5". */
  position: string;
  follows: string | null;
  precedes: string | null;
  /** Sentence from architecture prose that names this stage, if any. */
  evidenceExcerpt: string | null;
};

function stripStagesClause(architectureText: string): string {
  return architectureText
    .replace(/\bstages:\s*[^.\n]+\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentencesFrom(text: string): string[] {
  return text
    .split(/(?<=[.;—])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

/**
 * Find a confirmed prose sentence that names the stage (case-insensitive).
 * Returns null when the stage appears only in the stages: list.
 */
export function excerptForStage(
  architectureText: string,
  stage: string,
): string | null {
  const needle = stage.trim().toLowerCase();
  if (!needle) {
    return null;
  }

  const body = stripStagesClause(architectureText);
  const match = sentencesFrom(body).find((sentence) =>
    sentence.toLowerCase().includes(needle),
  );

  return match ?? null;
}

export function inspectPipelineStage(
  architectureText: string,
  stages: string[],
  index: number,
): PipelineStageInspection | null {
  if (index < 0 || index >= stages.length) {
    return null;
  }

  const stage = stages[index];
  if (!stage) {
    return null;
  }

  return {
    stage,
    index,
    count: stages.length,
    position: `${index + 1} of ${stages.length}`,
    follows: index > 0 ? (stages[index - 1] ?? null) : null,
    precedes: index < stages.length - 1 ? (stages[index + 1] ?? null) : null,
    evidenceExcerpt: excerptForStage(architectureText, stage),
  };
}
