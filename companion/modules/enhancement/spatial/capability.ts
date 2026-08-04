import type { SpatialCapability, SpatialGateReason } from "./types";
import { releaseWebglContext } from "./releaseWebglContext";

export type SpatialGateResult = {
  capability: SpatialCapability;
  reason: SpatialGateReason;
};

/**
 * Fail-closed capability probe — spatial never required for meaning.
 * Runs only in the browser; callers must treat server as off.
 */
export function probeSpatialCapability(): SpatialGateResult {
  if (typeof window === "undefined") {
    return { capability: "off", reason: "server" };
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { capability: "off", reason: "reduced-motion" };
  }

  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
    return { capability: "off", reason: "reduced-data" };
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  if (connection?.saveData) {
    return { capability: "off", reason: "save-data" };
  }

  const probe = document.createElement("div");
  probe.style.cssText =
    "perspective:1px;position:absolute;visibility:hidden;pointer-events:none";
  document.documentElement.appendChild(probe);
  const supported = getComputedStyle(probe).perspective === "1px";
  probe.remove();

  if (!supported) {
    return { capability: "off", reason: "no-perspective" };
  }

  if (!probeWebglSupport()) {
    return { capability: "off", reason: "no-webgl" };
  }

  return { capability: "full", reason: "ok" };
}

/**
 * Cheap, disposable WebGL context probe — never reused for real rendering.
 * Every scene in the Companion is progressive enhancement; if this fails,
 * the fallback path (static image, CSS, or plain text) carries full meaning.
 */
function probeWebglSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl || typeof gl !== "object") {
      return false;
    }
    releaseWebglContext(gl as WebGLRenderingContext | WebGL2RenderingContext);
    return true;
  } catch {
    return false;
  }
}
