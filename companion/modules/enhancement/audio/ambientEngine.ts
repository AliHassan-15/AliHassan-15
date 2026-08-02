import type { AmbientTrackConfig } from "./types";

/**
 * Imperative ambient engine — no React, no UI, no work until enable.
 * Fail silently on autoplay / missing asset / decode errors.
 */
export type AmbientEngine = {
  /** Returns false when playback cannot start — callers must reset preference. */
  setEnabled: (enabled: boolean) => Promise<boolean>;
  setPageVisible: (visible: boolean) => void;
  dispose: () => void;
};

export function createAmbientEngine(track: AmbientTrackConfig): AmbientEngine {
  let audio: HTMLAudioElement | null = null;
  let desired = false;
  let pageVisible = true;
  let settleTimer: ReturnType<typeof setTimeout> | null = null;
  let fadeFrame: number | null = null;
  let generation = 0;

  function clearSettle(): void {
    if (settleTimer !== null) {
      clearTimeout(settleTimer);
      settleTimer = null;
    }
  }

  function clearFade(): void {
    if (fadeFrame !== null) {
      cancelAnimationFrame(fadeFrame);
      fadeFrame = null;
    }
  }

  function ensureElement(): HTMLAudioElement {
    if (audio) {
      return audio;
    }
    const element = new Audio();
    element.preload = "none";
    element.loop = true;
    element.src = track.src;
    element.volume = 0;
    audio = element;
    return element;
  }

  function fadeTo(target: number, durationMs: number): Promise<void> {
    const element = audio;
    if (!element) {
      return Promise.resolve();
    }

    clearFade();
    const start = element.volume;
    const delta = target - start;
    if (durationMs <= 0 || Math.abs(delta) < 0.001) {
      element.volume = clampVolume(target);
      return Promise.resolve();
    }

    const startedAt = performance.now();

    return new Promise((resolve) => {
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / durationMs);
        element.volume = clampVolume(start + delta * progress);
        if (progress < 1) {
          fadeFrame = requestAnimationFrame(step);
          return;
        }
        fadeFrame = null;
        resolve();
      };
      fadeFrame = requestAnimationFrame(step);
    });
  }

  async function release(): Promise<void> {
    clearSettle();
    clearFade();
    const element = audio;
    audio = null;
    if (!element) {
      return;
    }
    try {
      element.pause();
      element.removeAttribute("src");
      element.load();
    } catch {
      // Fail closed — never interrupt.
    }
  }

  async function stopSoft(): Promise<void> {
    clearSettle();
    const element = audio;
    if (!element) {
      return;
    }
    await fadeTo(0, track.fadeMs);
    element.pause();
  }

  async function startSession(session: number): Promise<boolean> {
    if (!desired || !pageVisible || session !== generation) {
      return false;
    }

    const element = ensureElement();

    await new Promise<void>((resolve) => {
      settleTimer = setTimeout(() => {
        settleTimer = null;
        resolve();
      }, track.settleDelayMs);
    });

    if (!desired || !pageVisible || session !== generation) {
      return false;
    }

    try {
      element.volume = 0;
      const playResult = element.play();
      if (playResult !== undefined) {
        await playResult;
      }
      if (element.error) {
        await release();
        return false;
      }
    } catch {
      await release();
      return false;
    }

    if (!desired || !pageVisible || session !== generation) {
      element.pause();
      return false;
    }

    await fadeTo(track.targetVolume, track.fadeMs);
    return true;
  }

  return {
    async setEnabled(enabled: boolean) {
      desired = enabled;
      generation += 1;
      const session = generation;

      if (!enabled) {
        await stopSoft();
        await release();
        return true;
      }

      if (!pageVisible) {
        return true;
      }

      return startSession(session);
    },

    setPageVisible(visible: boolean) {
      pageVisible = visible;
      if (!desired) {
        return;
      }

      if (!visible) {
        clearSettle();
        clearFade();
        audio?.pause();
        return;
      }

      generation += 1;
      void startSession(generation);
    },

    dispose() {
      desired = false;
      generation += 1;
      clearSettle();
      clearFade();
      void release();
    },
  };
}

function clampVolume(value: number): number {
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}
