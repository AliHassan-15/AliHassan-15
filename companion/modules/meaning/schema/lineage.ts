import { z } from "zod";
import { evidenceStringSchema } from "./discovery";

/**
 * ADR lineage — each step is Discovery-honest.
 * Present only when confirmed engineering case files expose structure.
 */
export const decisionLineageSchema = z.object({
  id: z.string().min(1),
  decision: evidenceStringSchema,
  why: evidenceStringSchema,
  alternativeRejected: evidenceStringSchema,
  validation: evidenceStringSchema,
  futureDirection: evidenceStringSchema,
  /** Atlas or project ids that restate this decision — never invent. */
  referencedAgainBy: z
    .array(
      z.object({
        kind: z.enum([
          "atlas-system",
          "atlas-decision",
          "atlas-validation",
          "atlas-glossary",
          "project",
        ]),
        id: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .default([]),
});

export type DecisionLineage = z.infer<typeof decisionLineageSchema>;
