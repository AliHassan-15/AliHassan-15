import { identitySchema, type IdentityContent } from "../schema";
import { parseContent } from "./read";

let cache: IdentityContent | null = null;

export function loadIdentity(): IdentityContent {
  if (cache) {
    return cache;
  }

  cache = parseContent("identity/canonical.json", identitySchema);
  return cache;
}

/** Test helper — clears module cache between validations. */
export function clearIdentityCache(): void {
  cache = null;
}
