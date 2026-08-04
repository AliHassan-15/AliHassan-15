import type { SpatialTier } from "./types";
import { releaseWebglContext } from "./releaseWebglContext";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Coarse, one-time hardware budget probe — decides particle counts,
 * geometry detail, and whether postprocessing runs at all.
 * Only ever called after `probeSpatialCapability` already returned "full";
 * this never gates whether a scene renders, only how expensive it is.
 */
export function probeDeviceTier(): SpatialTier {
  if (typeof window === "undefined") {
    return "lite";
  }

  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const effectiveType = nav.connection?.effectiveType;
  const slowNetwork = effectiveType === "2g" || effectiveType === "slow-2g";

  const canvas = document.createElement("canvas");
  const webgl2Context = canvas.getContext("webgl2");
  const gl = webgl2Context ?? canvas.getContext("webgl");

  if (!gl) {
    return "lite";
  }

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debugInfo
    ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)).toLowerCase()
    : "";
  const softwareRenderer =
    renderer.includes("swiftshader") ||
    renderer.includes("llvmpipe") ||
    renderer.includes("software");

  const hasWebgl2 = Boolean(webgl2Context);
  releaseWebglContext(gl);

  if (softwareRenderer || slowNetwork || cores < 4 || memory < 4) {
    return "lite";
  }

  return hasWebgl2 ? "cinematic" : "lite";
}
