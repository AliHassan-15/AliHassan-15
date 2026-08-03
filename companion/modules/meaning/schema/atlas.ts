import { z } from "zod";
import { evidenceConfidenceSchema } from "./discovery";

const projectIdListSchema = z.array(z.string().min(1)).min(2);

export const atlasSystemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  projectIds: projectIdListSchema,
  confidence: evidenceConfidenceSchema,
  relatedSystemIds: z.array(z.string().min(1)).default([]),
  relatedValidationIds: z.array(z.string().min(1)).default([]),
  relatedGlossaryIds: z.array(z.string().min(1)).default([]),
  relatedArchitectureIds: z.array(z.string().min(1)).default([]),
});

export const atlasEvolutionStepSchema = z.object({
  id: z.string().min(1),
  year: z.string().min(4),
  label: z.string().min(1),
  evidence: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(1),
  confidence: evidenceConfidenceSchema,
});

export const atlasArchitectureComponentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(1),
  confidence: evidenceConfidenceSchema,
  note: z.string().min(1).optional(),
});

export const atlasDecisionSchema = z.object({
  id: z.string().min(1),
  decision: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(1),
  evidence: z.string().min(1),
  outcome: z.string().min(1),
  confidence: evidenceConfidenceSchema,
});

export const atlasFailureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  detail: z.string().min(1),
  projectId: z.string().min(1),
  confidence: evidenceConfidenceSchema,
});

export const atlasValidationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  detail: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(1),
  confidence: evidenceConfidenceSchema,
});

export const atlasGlossaryEntrySchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  definition: z.string().min(1),
  projectIds: z.array(z.string().min(1)).min(1),
});

/** Editorial architecture/system relationship chain — not a diagram. */
export const atlasRelationshipStepSchema = z.object({
  kind: z.enum([
    "system",
    "validation",
    "architecture",
    "glossary",
    "decision",
    "project",
  ]),
  id: z.string().min(1),
  label: z.string().min(1),
});

export const atlasRelationshipSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  steps: z.array(atlasRelationshipStepSchema).min(2),
});

export const engineeringAtlasSchema = z.object({
  title: z.string().min(1),
  purpose: z.string().min(1),
  systems: z.array(atlasSystemSchema).min(1),
  evolution: z.array(atlasEvolutionStepSchema).min(1),
  architectureIndex: z.array(atlasArchitectureComponentSchema).min(1),
  decisions: z.array(atlasDecisionSchema).min(1),
  failures: z.array(atlasFailureSchema).min(1),
  validationIndex: z.array(atlasValidationSchema).min(1),
  glossary: z.array(atlasGlossaryEntrySchema).min(1),
  relationships: z.array(atlasRelationshipSchema).default([]),
});

export type EngineeringAtlas = z.infer<typeof engineeringAtlasSchema>;
export type AtlasSystem = z.infer<typeof atlasSystemSchema>;
export type AtlasEvolutionStep = z.infer<typeof atlasEvolutionStepSchema>;
export type AtlasArchitectureComponent = z.infer<
  typeof atlasArchitectureComponentSchema
>;
export type AtlasDecision = z.infer<typeof atlasDecisionSchema>;
export type AtlasFailure = z.infer<typeof atlasFailureSchema>;
export type AtlasValidation = z.infer<typeof atlasValidationSchema>;
export type AtlasGlossaryEntry = z.infer<typeof atlasGlossaryEntrySchema>;
export type AtlasRelationship = z.infer<typeof atlasRelationshipSchema>;
export type AtlasRelationshipStep = z.infer<typeof atlasRelationshipStepSchema>;
