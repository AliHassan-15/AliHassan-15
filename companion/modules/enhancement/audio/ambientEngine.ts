import type {
  AmbientEnvironmentConfig,
  AmbientLayerId,
  AmbientRoomId,
} from "./types";
import { shippedAmbientLayers } from "./config";

/**
 * Imperative multi-layer ambient engine — no React, no UI.
 * No network work until enable. Missing assets fail closed.
 */
export type AmbientEngine = {
  /** Returns false when playback cannot start — callers must reset preference. */
  setEnabled: (enabled: boolean) => Promise<boolean>;
  setPageVisible: (visible: boolean) => void;
  setRoom: (room: AmbientRoomId) => void;
  setReducedMotion: (reduced: boolean) => void;
  dispose: () => void;
};

type LayerRuntime = {
  id: AmbientLayerId;
  element: HTMLAudioElement;
};

export function createAmbientEngine(
  config: AmbientEnvironmentConfig,
): AmbientEngine {
  const layers: LayerRuntime[] = [];
  let desired = false;
  let pageVisible = true;
  let reducedMotion = false;
  let room: AmbientRoomId = "arrival";
  let settleTimer: ReturnType<typeof setTimeout> | null = null;
  let fadeFrame: number | null = null;
  let generation = 0;

  function fadeMs(): number {
    return reducedMotion ? config.reducedMotionFadeMs : config.fadeMs;
  }

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

  function ensureLayers(): LayerRuntime[] {
    if (layers.length > 0) {
      return layers;
    }
    for (const layer of shippedAmbientLayers(config)) {
      const element = new Audio();
      element.preload = "none";
      element.loop = true;
      element.src = layer.src;
      element.volume = 0;
      layers.push({ id: layer.id, element });
    }
    return layers;
  }

  function targetVolumeFor(layerId: AmbientLayerId): number {
    const weight = config.rooms[room]?.weights[layerId] ?? 0;
    return clampVolume(config.masterVolume * weight);
  }

  function fadeLayersToTargets(durationMs: number): Promise<void> {
    const runtimes = layers;
    if (runtimes.length === 0) {
      return Promise.resolve();
    }

    clearFade();
    const starts = runtimes.map((layer) => layer.element.volume);
    const targets = runtimes.map((layer) => targetVolumeFor(layer.id));
    const deltas = targets.map(
      (target, index) => target - (starts[index] ?? 0),
    );

    if (durationMs <= 0 || deltas.every((delta) => Math.abs(delta) < 0.001)) {
      for (let index = 0; index < runtimes.length; index += 1) {
        const layer = runtimes[index];
        if (layer) {
          layer.element.volume = clampVolume(targets[index] ?? 0);
        }
      }
      return Promise.resolve();
    }

    const startedAt = performance.now();

    return new Promise((resolve) => {
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / durationMs);
        for (let index = 0; index < runtimes.length; index += 1) {
          const layer = runtimes[index];
          if (!layer) {
            continue;
          }
          layer.element.volume = clampVolume(
            (starts[index] ?? 0) + (deltas[index] ?? 0) * progress,
          );
        }
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
    const snapshot = [...layers];
    layers.length = 0;
    for (const layer of snapshot) {
      try {
        layer.element.pause();
        layer.element.removeAttribute("src");
        layer.element.load();
      } catch {
        // Fail closed.
      }
    }
  }

  async function stopSoft(): Promise<void> {
    clearSettle();
    const runtimes = layers;
    if (runtimes.length === 0) {
      return;
    }
    clearFade();
    const starts = runtimes.map((layer) => layer.element.volume);
    const duration = fadeMs();
    if (duration <= 0) {
      for (const layer of runtimes) {
        layer.element.volume = 0;
        layer.element.pause();
      }
      return;
    }
    const startedAt = performance.now();
    await new Promise<void>((resolve) => {
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        for (let index = 0; index < runtimes.length; index += 1) {
          const layer = runtimes[index];
          if (!layer) {
            continue;
          }
          layer.element.volume = clampVolume(
            (starts[index] ?? 0) * (1 - progress),
          );
        }
        if (progress < 1) {
          fadeFrame = requestAnimationFrame(step);
          return;
        }
        fadeFrame = null;
        resolve();
      };
      fadeFrame = requestAnimationFrame(step);
    });
    for (const layer of runtimes) {
      layer.element.pause();
    }
  }

  async function startSession(session: number): Promise<boolean> {
    if (!desired || !pageVisible || session !== generation) {
      return false;
    }

    const runtimes = ensureLayers();
    if (runtimes.length === 0) {
      return false;
    }

    await new Promise<void>((resolve) => {
      settleTimer = setTimeout(() => {
        settleTimer = null;
        resolve();
      }, config.settleDelayMs);
    });

    if (!desired || !pageVisible || session !== generation) {
      return false;
    }

    try {
      for (const layer of runtimes) {
        layer.element.volume = 0;
        const playResult = layer.element.play();
        if (playResult !== undefined) {
          await playResult;
        }
        if (layer.element.error) {
          await release();
          return false;
        }
      }
    } catch {
      await release();
      return false;
    }

    if (!desired || !pageVisible || session !== generation) {
      for (const layer of runtimes) {
        layer.element.pause();
      }
      return false;
    }

    await fadeLayersToTargets(fadeMs());
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
        for (const layer of layers) {
          layer.element.pause();
        }
        return;
      }

      generation += 1;
      void startSession(generation);
    },

    setRoom(next: AmbientRoomId) {
      if (room === next) {
        return;
      }
      room = next;
      if (!desired || layers.length === 0) {
        return;
      }
      void fadeLayersToTargets(fadeMs());
    },

    setReducedMotion(next: boolean) {
      reducedMotion = next;
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
