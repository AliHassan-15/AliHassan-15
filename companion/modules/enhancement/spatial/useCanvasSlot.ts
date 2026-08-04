"use client";

import { useEffect, useId, useState } from "react";

/**
 * Hard cap on simultaneously live WebGL canvases. Chrome starts reclaiming
 * contexts around 8–16; each `@react-three/postprocessing` EffectComposer
 * also probes for a throwaway context. Homepage alone can mount hero +
 * portrait + constellation — without a slot, oldest contexts are lost and
 * Three.js crashes on `getProgramInfoLog(...).trim()` with a null log.
 *
 * Scenes that do not hold a slot keep rendering their meaningful fallback
 * (SVG / static carrier). Nothing is removed from the product — only the
 * live GPU footprint is budgeted.
 *
 * Priority scenes (portrait orbit) jump the wait queue so the identity
 * specimen keeps its rings when slots are contended.
 */
const MAX_LIVE_CANVASES = 3;

type Waiter = {
  id: string;
  priority: boolean;
  grant: () => void;
};

const liveOwners = new Set<string>();
const waitQueue: Waiter[] = [];

function promoteNextWaiter(): void {
  while (liveOwners.size < MAX_LIVE_CANVASES && waitQueue.length > 0) {
    const next = waitQueue.shift();
    if (!next) {
      return;
    }
    liveOwners.add(next.id);
    next.grant();
  }
}

function releaseOwner(id: string): void {
  if (liveOwners.delete(id)) {
    promoteNextWaiter();
  }
  const index = waitQueue.findIndex((waiter) => waiter.id === id);
  if (index >= 0) {
    waitQueue.splice(index, 1);
  }
}

function enqueueWaiter(waiter: Waiter): void {
  if (waiter.priority) {
    const firstNormal = waitQueue.findIndex((item) => !item.priority);
    if (firstNormal === -1) {
      waitQueue.push(waiter);
    } else {
      waitQueue.splice(firstNormal, 0, waiter);
    }
    return;
  }
  waitQueue.push(waiter);
}

/**
 * @param wantsSlot — true when this scene is capable + in view and wants a
 *   live canvas. False releases any held slot immediately.
 * @param priority — identity-critical scenes (portrait) jump the wait queue.
 * @returns whether this caller currently owns a live canvas slot.
 */
export function useCanvasSlot(wantsSlot: boolean, priority = false): boolean {
  const id = useId();
  const [owns, setOwns] = useState(false);

  useEffect(() => {
    let active = true;

    if (!wantsSlot) {
      releaseOwner(id);
      setOwns(false);
      return;
    }

    if (liveOwners.has(id)) {
      setOwns(true);
      return () => {
        active = false;
        releaseOwner(id);
        setOwns(false);
      };
    }

    if (liveOwners.size < MAX_LIVE_CANVASES) {
      liveOwners.add(id);
      setOwns(true);
      return () => {
        active = false;
        releaseOwner(id);
        setOwns(false);
      };
    }

    const waiter: Waiter = {
      id,
      priority,
      grant: () => {
        if (active) {
          setOwns(true);
        }
      },
    };
    enqueueWaiter(waiter);
    setOwns(false);

    return () => {
      active = false;
      releaseOwner(id);
      setOwns(false);
    };
  }, [id, wantsSlot, priority]);

  return owns;
}
