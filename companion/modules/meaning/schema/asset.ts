import { z } from "zod";
import { discoveryStatusSchema } from "./discovery";

export const assetReferenceSchema = z.object({
  id: z.string().min(1),
  path: z.string().min(1),
  kind: z.enum(["svg", "image", "document", "other"]),
  alt: z.string(),
  status: discoveryStatusSchema,
  deferralId: z.string().min(1).optional(),
  usedBy: z.array(z.enum(["readme", "companion", "shared"])).min(1),
});

export type AssetReference = z.infer<typeof assetReferenceSchema>;

export const assetManifestSchema = z.object({
  assets: z.array(assetReferenceSchema),
});

export type AssetManifest = z.infer<typeof assetManifestSchema>;
