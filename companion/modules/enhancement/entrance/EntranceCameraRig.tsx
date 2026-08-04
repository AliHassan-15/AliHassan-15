"use client";

import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";

const DOLLY_DEPTH = 1.6;
const DOLLY_DROP = 0.32;

/**
 * Ties the entrance's real 3D camera to scroll position via GSAP
 * ScrollTrigger — a genuine dolly through the architecture graph, not the
 * CSS-custom-property parallax `EntranceCamera` applies to the DOM layers
 * around it. Scrubbed to scroll position exactly (no eased playback, no
 * autoplay), and only ever a straight-line push/drop — never rotates,
 * zooms past the subject, or overshoots (Document 06's camera language).
 *
 * Mirrors `EntranceCamera`'s own scroll span (`window.innerHeight * 1.4`) so
 * the WebGL layer and the DOM parallax layers settle together.
 */
export function EntranceCameraRig() {
  const { camera } = useThree();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const baseZ = camera.position.z;
    const baseY = camera.position.y;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: () => `${Math.max(window.innerHeight * 1.4, 1)}px`,
      scrub: true,
      onUpdate: (self) => {
        camera.position.z = baseZ + self.progress * DOLLY_DEPTH;
        camera.position.y = baseY - self.progress * DOLLY_DROP;
      },
    });

    return () => {
      trigger.kill();
      camera.position.z = baseZ;
      camera.position.y = baseY;
    };
  }, [camera, reduced]);

  return null;
}
