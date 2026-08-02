import { z } from "zod";
import { evidenceStringSchema } from "./discovery";

export const externalLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: evidenceStringSchema,
});

export type ExternalLink = z.infer<typeof externalLinkSchema>;

export const externalLinksSchema = z.object({
  links: z.array(externalLinkSchema),
});

export type ExternalLinksContent = z.infer<typeof externalLinksSchema>;

/** Writing references reserved — Document 24. No invented essays. */
export const writingReferenceSchema = z.object({
  id: z.string().min(1),
  title: evidenceStringSchema,
  href: evidenceStringSchema,
  summary: evidenceStringSchema,
});

export const writingReferencesSchema = z.object({
  references: z.array(writingReferenceSchema),
});

export type WritingReferencesContent = z.infer<typeof writingReferencesSchema>;
