import { z } from "zod";
import { evidenceStringListSchema, evidenceStringSchema } from "./discovery";

export const projectTierSchema = z.enum(["flagship", "supporting", "archive"]);

export const aiUsageClassSchema = z.enum([
  "essential",
  "conventional",
  "unspecified",
]);

/**
 * Case-study sections — structure always present; values Discovery-honest.
 * Order: problem → overview → architecture → decisions → trade-offs → lessons
 * (Identity §18.1; CA §6.1).
 */
export const caseStudySectionsSchema = z.object({
  problem: evidenceStringSchema,
  overview: evidenceStringSchema,
  architecture: evidenceStringSchema,
  decisions: evidenceStringSchema,
  tradeoffs: evidenceStringSchema,
  lessons: evidenceStringSchema,
  constraints: evidenceStringSchema,
  rejectedApproaches: evidenceStringSchema,
});

export type CaseStudySections = z.infer<typeof caseStudySectionsSchema>;

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tier: projectTierSchema,
  /** Entrance (README) selected work list */
  selectedForEntrance: z.boolean(),
  /** README Evidence table row */
  includeInEvidenceTable: z.boolean(),
  /** Product Archive index + case-study route */
  includeInArchive: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  /** Display title after em dash, e.g. "AI Healthcare Platform" */
  subtitle: evidenceStringSchema,
  typeLabels: evidenceStringListSchema,
  /** Short status label, e.g. Completed (Final Year Project) */
  completionStatus: evidenceStringSchema,
  objective: evidenceStringSchema,
  role: evidenceStringSchema,
  creditLine: evidenceStringSchema,
  technologies: evidenceStringListSchema,
  repositoryUrl: evidenceStringSchema,
  /** Public evidence label override (e.g. testing/QA companion) */
  evidenceLabel: evidenceStringSchema,
  repositoryNote: evidenceStringSchema,
  measuredOutcomes: evidenceStringSchema,
  liveDemo: evidenceStringSchema,
  aiUsageClass: aiUsageClassSchema,
  caseStudy: caseStudySectionsSchema,
});

export type ProjectContent = z.infer<typeof projectSchema>;

export const projectCatalogSchema = z.object({
  projects: z.array(z.string().min(1)).min(1),
});

export type ProjectCatalog = z.infer<typeof projectCatalogSchema>;
