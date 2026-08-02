import { z } from "zod";

/** Discovery honesty grades — never silently upgrade. */
export const discoveryStatusSchema = z.enum([
  "confirmed",
  "missing",
  "deferred",
]);

export type DiscoveryStatus = z.infer<typeof discoveryStatusSchema>;

export const evidenceStringSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("confirmed"),
    value: z.string().min(1),
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
