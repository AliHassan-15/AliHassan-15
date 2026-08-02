type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/**
 * Runs an update inside the View Transitions API when available and motion
 * is allowed. Falls back to an immediate update — continuity without theater.
 */
export function runViewTransition(update: () => void): void {
  if (typeof document === "undefined") {
    update();
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionDocument;

  if (reduced || typeof doc.startViewTransition !== "function") {
    update();
    return;
  }

  doc.startViewTransition(update);
}
