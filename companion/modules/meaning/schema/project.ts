import { z } from "zod";
import {
  engineeringReferencesFieldSchema,
  evidenceStringListSchema,
  evidenceStringSchema,
} from "./discovery";
import { decisionLineageSchema } from "./lineage";

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

/**
 * Engineering case file — ADR-style documentation layered on Discovery honesty.
 * Values must be Confirmed only from Identity, repository archaeology, or
 * committed reports. Never invent rejected approaches, metrics, or timelines.
 */
export const engineeringCaseFileSchema = z.object({
  timeline: evidenceStringSchema,
  decisionRecords: evidenceStringSchema,
  validationMethodology: evidenceStringSchema,
  technicalRisks: evidenceStringSchema,
  failureModes: evidenceStringSchema,
  knownLimitations: evidenceStringSchema,
  futureDirections: evidenceStringSchema,
  /** Confirmed asset URLs or paths (reports, diagrams, notebooks, docs). */
  assets: evidenceStringListSchema,
  /**
   * Structured ADR lineages — optional. Empty when not yet extracted.
   * Missing lineage steps stay Missing; never invent alternatives.
   */
  decisionLineages: z.array(decisionLineageSchema).default([]),
});

export type EngineeringCaseFile = z.infer<typeof engineeringCaseFileSchema>;

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
  engineeringCaseFile: engineeringCaseFileSchema,
  /** Inspectable engineering references — flagships prefer Confirmed lists. */
  engineeringReferences: engineeringReferencesFieldSchema,
});

export type ProjectContent = z.infer<typeof projectSchema>;

export const projectCatalogSchema = z.object({
  projects: z.array(z.string().min(1)).min(1),
});

export type ProjectCatalog = z.infer<typeof projectCatalogSchema>;

/** Cross-project engineering pattern — requires ≥2 confirmed project ids. */
export const engineeringPatternSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  statement: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(2),
  confidence: z.enum(["confirmed", "readme-attributed", "public-artifact"]),
});

export type EngineeringPattern = z.infer<typeof engineeringPatternSchema>;

export const engineeringPatternsSchema = z.object({
  patterns: z.array(engineeringPatternSchema),
});

export type EngineeringPatternsContent = z.infer<
  typeof engineeringPatternsSchema
>;
