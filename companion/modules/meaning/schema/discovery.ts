import { z } from "zod";

/** Discovery honesty grades — never silently upgrade. */
export const discoveryStatusSchema = z.enum([
  "confirmed",
  "missing",
  "deferred",
]);

export type DiscoveryStatus = z.infer<typeof discoveryStatusSchema>;

/**
 * Evidence confidence — finer than Discovery status for inspectable claims.
 * Never silently upgrade (e.g. readme-attributed → confirmed).
 */
export const evidenceConfidenceSchema = z.enum([
  "confirmed",
  "readme-attributed",
  "public-artifact",
  "deferred",
  "missing",
]);

export type EvidenceConfidence = z.infer<typeof evidenceConfidenceSchema>;

export const provenanceKindSchema = z.enum([
  "repository",
  "commit",
  "file",
  "document",
  "notebook",
  "readme",
  "issue",
  "presentation",
  "testing-report",
  "identity",
  "other",
]);

export type ProvenanceKind = z.infer<typeof provenanceKindSchema>;

/** Structured source for a confirmed engineering statement. Never invent. */
export const provenanceSourceSchema = z.object({
  kind: provenanceKindSchema,
  label: z.string().min(1),
  href: z.string().url().optional(),
  repository: z.string().min(1).optional(),
  commit: z.string().min(7).optional(),
  path: z.string().min(1).optional(),
  lines: z.string().min(1).optional(),
  section: z.string().min(1).optional(),
});

export type ProvenanceSource = z.infer<typeof provenanceSourceSchema>;

const provenanceListSchema = z.array(provenanceSourceSchema).min(1);

export const evidenceStringSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("confirmed"),
    value: z.string().min(1),
    /** Defaults to confirmed when omitted. */
    confidence: evidenceConfidenceSchema.optional(),
    provenance: provenanceListSchema.optional(),
  }),
  z.object({
    status: z.literal("missing"),
  }),
  z.object({
    status: z.literal("deferred"),
    deferralId: z.string().min(1).optional(),
  }),
]);

export type EvidenceString = z.infer<typeof evidenceStringSchema>;

export const evidenceStringListSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("confirmed"),
    value: z.array(z.string().min(1)).min(1),
    confidence: evidenceConfidenceSchema.optional(),
    provenance: provenanceListSchema.optional(),
  }),
  z.object({
    status: z.literal("missing"),
  }),
  z.object({
    status: z.literal("deferred"),
    deferralId: z.string().min(1).optional(),
  }),
]);

export type EvidenceStringList = z.infer<typeof evidenceStringListSchema>;

/** Engineering reference entry for case-study reference lists. */
export const engineeringReferenceSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  kind: provenanceKindSchema,
  confidence: evidenceConfidenceSchema,
});

export type EngineeringReference = z.infer<typeof engineeringReferenceSchema>;

export const engineeringReferencesFieldSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("confirmed"),
    value: z.array(engineeringReferenceSchema).min(1),
  }),
  z.object({
    status: z.literal("missing"),
  }),
  z.object({
    status: z.literal("deferred"),
    deferralId: z.string().min(1).optional(),
  }),
]);

export type EngineeringReferencesField = z.infer<
  typeof engineeringReferencesFieldSchema
>;
