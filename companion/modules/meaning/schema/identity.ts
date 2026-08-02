import { z } from "zod";
import { evidenceStringSchema } from "./discovery";

export const identitySchema = z.object({
  name: z.string().min(1),
  handle: z.string().min(1),
  title: z.string().min(1),
  canonicalSentence: z.string().min(1),
  seniorSentence: z.string().min(1),
  geography: z.string().min(1),
  educationShort: z.string().min(1),
  opportunity: z.string().min(1),
  /** Full Identity §8.1 definition */
  philosophyDefinition: z.string().min(1),
  /** Entrance-depth excerpt — Identity §8.1 prefix only */
  philosophyEntrance: z.string().min(1),
  principles: z.array(z.string().min(1)).min(1),
  links: z.object({
    githubProfile: z.string().url(),
    githubEntrance: z.string().url(),
    /** Public Companion destination — set only when production is live. */
    companionDestination: z.string().url().optional(),
  }),
  /** Reserved — Document 24. Do not invent About prose. */
  aboutProse: evidenceStringSchema,
  email: evidenceStringSchema,
  linkedIn: evidenceStringSchema,
  /** Exact availability one-liner variants — Deferred D-10 */
  availabilityOneLiner: evidenceStringSchema,
});

export type IdentityContent = z.infer<typeof identitySchema>;
