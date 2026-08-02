import { validateAllContent } from "../modules/meaning";

try {
  validateAllContent();
  console.log("EOS content validation passed.");
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "EOS content validation failed.",
  );
  process.exit(1);
}
