import fs from "node:fs";
import path from "node:path";
import { ZodError, type ZodType } from "zod";

/**
 * Resolve repository-root `content/` from companion cwd or monorepo root.
 */
export function getContentRoot(): string {
  const fromCompanion = path.resolve(process.cwd(), "..", "content");
  if (fs.existsSync(fromCompanion)) {
    return fromCompanion;
  }

  const fromRoot = path.resolve(process.cwd(), "content");
  if (fs.existsSync(fromRoot)) {
    return fromRoot;
  }

  throw new Error(
    "EOS content root not found. Expected `content/` at the repository root.",
  );
}

export function readContentJson(relativePath: string): unknown {
  const absolutePath = path.join(getContentRoot(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`EOS content file missing: ${relativePath}`);
  }

  const raw = fs.readFileSync(absolutePath, "utf8");

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new Error(`EOS content JSON parse failed: ${relativePath}`);
  }
}

export function parseContent<T>(relativePath: string, schema: ZodType<T>): T {
  const data = readContentJson(relativePath);

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.issues
        .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n  ");
      throw new Error(
        `EOS content validation failed for ${relativePath}:\n  ${details}`,
      );
    }

    throw error;
  }
}
