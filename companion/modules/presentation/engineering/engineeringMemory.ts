/**
 * Product memory — last engineering room + inspected object only.
 * Audio preference lives in the audio module. Motion follows system preference.
 * Never persist decorative UI.
 */

import type { EngineeringFocus } from "./engineering.types";

export const ENGINEERING_ROOM_KEY = "eos-engineering-room" as const;
export const ENGINEERING_FOCUS_KEY = "eos-engineering-focus" as const;

export type EngineeringRoomMemory = {
  pathname: string;
  hash: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function readEngineeringRoom(): EngineeringRoomMemory | null {
  if (!canUseStorage()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(ENGINEERING_ROOM_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as EngineeringRoomMemory;
    if (
      typeof parsed?.pathname !== "string" ||
      typeof parsed?.hash !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeEngineeringRoom(room: EngineeringRoomMemory): void {
  if (!canUseStorage()) {
    return;
  }
  try {
    window.localStorage.setItem(ENGINEERING_ROOM_KEY, JSON.stringify(room));
  } catch {
    // Fail closed.
  }
}

export function readEngineeringFocus(): EngineeringFocus | null {
  if (!canUseStorage()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(ENGINEERING_FOCUS_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as EngineeringFocus;
    if (
      typeof parsed?.kind !== "string" ||
      typeof parsed?.id !== "string" ||
      typeof parsed?.label !== "string"
    ) {
      return null;
    }
    return {
      kind: parsed.kind,
      id: parsed.id,
      label: parsed.label,
      related: Array.isArray(parsed.related) ? parsed.related : [],
      projectSlug:
        typeof parsed.projectSlug === "string" ? parsed.projectSlug : undefined,
      source: typeof parsed.source === "string" ? parsed.source : "memory",
    };
  } catch {
    return null;
  }
}

export function writeEngineeringFocus(focus: EngineeringFocus | null): void {
  if (!canUseStorage()) {
    return;
  }
  try {
    if (!focus) {
      window.localStorage.removeItem(ENGINEERING_FOCUS_KEY);
      return;
    }
    window.localStorage.setItem(ENGINEERING_FOCUS_KEY, JSON.stringify(focus));
  } catch {
    // Fail closed.
  }
}

/** Focus kinds valid for a given Companion pathname. */
export function focusBelongsToPath(
  focus: EngineeringFocus,
  pathname: string,
): boolean {
  if (pathname.startsWith("/atlas")) {
    return (
      focus.kind.startsWith("atlas-") ||
      focus.kind === "journey-station" ||
      focus.kind === "capability"
    );
  }
  if (pathname.startsWith("/journey")) {
    return focus.kind === "journey-station" || focus.kind === "capability";
  }
  if (pathname.startsWith("/archive/")) {
    const slug = pathname.slice("/archive/".length).split("/")[0] ?? "";
    if (focus.kind === "project") {
      return (
        !focus.projectSlug || focus.projectSlug === slug || focus.id === slug
      );
    }
    return (
      focus.kind === "walkthrough-room" ||
      focus.kind === "architecture-stage" ||
      focus.kind === "decision" ||
      focus.kind === "validation" ||
      focus.kind === "failure" ||
      focus.kind === "knowledge"
    );
  }
  if (pathname === "/archive") {
    return focus.kind === "project";
  }
  return false;
}
