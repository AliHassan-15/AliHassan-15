import type {
  AmbientEnvironmentConfig,
  AmbientLayerId,
  AmbientRoomId,
} from "./types";

const ZERO: Record<AmbientLayerId, number> = {
  base: 0,
  air: 0,
  mechanical: 0,
  resonance: 0,
};

/**
 * Multi-layer ambient registry.
 * Layers ship only when real loops exist under public/audio/.
 * Do not invent, generate, or download substitute assets.
 */
export const AMBIENT_ENVIRONMENT: AmbientEnvironmentConfig = {
  id: "eos-spatial-ambient",
  layers: [
    {
      id: "base",
      src: "/audio/base-ambience.ogg",
      shipped: true,
    },
    {
      id: "air",
      src: "/audio/low-air.ogg",
      shipped: true,
    },
    {
      id: "mechanical",
      src: "/audio/mechanical-texture.ogg",
      shipped: true,
    },
    {
      id: "resonance",
      src: "/audio/distant-resonance.ogg",
      shipped: true,
    },
  ],
  rooms: {
    arrival: {
      id: "arrival",
      weights: { base: 0.55, air: 0.35, mechanical: 0.08, resonance: 0.12 },
    },
    atlas: {
      id: "atlas",
      weights: { base: 0.5, air: 0.28, mechanical: 0.18, resonance: 0.22 },
    },
    "case-study": {
      id: "case-study",
      weights: { base: 0.48, air: 0.22, mechanical: 0.14, resonance: 0.1 },
    },
    evidence: {
      id: "evidence",
      weights: { base: 0.4, air: 0.18, mechanical: 0.06, resonance: 0.05 },
    },
    journey: {
      id: "journey",
      weights: { base: 0.52, air: 0.38, mechanical: 0.1, resonance: 0.2 },
    },
    footer: {
      id: "footer",
      weights: { base: 0.22, air: 0.1, mechanical: 0.02, resonance: 0.03 },
    },
  },
  settleDelayMs: 800,
  fadeMs: 5000,
  reducedMotionFadeMs: 0,
  masterVolume: 0.17,
};

export function areAmbientAssetsReady(
  config: AmbientEnvironmentConfig = AMBIENT_ENVIRONMENT,
): boolean {
  return config.layers.some((layer) => layer.shipped);
}

export function shippedAmbientLayers(
  config: AmbientEnvironmentConfig = AMBIENT_ENVIRONMENT,
) {
  return config.layers.filter((layer) => layer.shipped);
}

export function resolveAmbientRoom(pathname: string): AmbientRoomId {
  if (pathname.startsWith("/atlas")) {
    return "atlas";
  }
  if (pathname.startsWith("/journey")) {
    return "journey";
  }
  if (pathname.startsWith("/archive/")) {
    return "case-study";
  }
  if (pathname === "/archive") {
    return "evidence";
  }
  if (pathname === "/") {
    return "arrival";
  }
  return "arrival";
}

/** @deprecated Prefer AMBIENT_ENVIRONMENT — single-track placeholder removed. */
export const AMBIENT_TRACK = {
  id: AMBIENT_ENVIRONMENT.id,
  src: "/audio/base-ambience.ogg",
  settleDelayMs: AMBIENT_ENVIRONMENT.settleDelayMs,
  fadeMs: AMBIENT_ENVIRONMENT.fadeMs,
  targetVolume: AMBIENT_ENVIRONMENT.masterVolume,
};

export function resolveAmbientTrack() {
  return AMBIENT_TRACK;
}

export { ZERO as AMBIENT_WEIGHT_ZERO };
