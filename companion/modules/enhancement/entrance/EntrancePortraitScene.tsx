"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import { DoubleSide } from "three";
import type { SpatialTier } from "@/modules/enhancement/spatial";

type EntrancePortraitSceneProps = {
  tier: SpatialTier;
};

/**
 * Tight orbit rings around the circular DOM specimen only.
 * No full-box atmosphere photo — the soft head-shadow lives in CSS behind
 * the clear face so it reads as one portrait with depth.
 */
export function EntrancePortraitScene({ tier }: EntrancePortraitSceneProps) {
  const groupRef = useRef<Group>(null);
  const ringOuterRef = useRef<Mesh>(null);
  const ringInnerRef = useRef<Mesh>(null);
  const ringFineRef = useRef<Mesh>(null);
  const signalRefs = useRef<Array<Mesh | null>>([]);
  const scanRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.065) * 0.012;
    }

    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z = t * 0.048;
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.z = -t * 0.075;
    }
    if (ringFineRef.current) {
      ringFineRef.current.rotation.z = t * 0.11;
      const material = ringFineRef.current.material as MeshBasicMaterial;
      material.opacity = 0.14 + Math.sin(t * 0.35) * 0.04;
    }

    signalRefs.current.forEach((mesh, index) => {
      if (!mesh) {
        return;
      }
      const speed = 0.14 + index * 0.04;
      const radius = 0.9 + index * 0.08;
      const angle = t * speed + (index * Math.PI * 2) / 3;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.03,
      );
      const material = mesh.material as MeshBasicMaterial;
      material.opacity = 0.48 + Math.sin(t * 0.9 + index) * 0.28;
    });

    if (scanRef.current) {
      const cycle = (t * 0.1) % 1;
      const ease = cycle * cycle * (3 - 2 * cycle);
      scanRef.current.position.y = 0.62 * (0.5 - ease);
      const material = scanRef.current.material;
      if (!Array.isArray(material) && "opacity" in material) {
        material.opacity = cycle < 0.05 || cycle > 0.95 ? 0 : 0.1;
      }
    }
  });

  const segments = tier === "cinematic" ? 128 : 64;

  return (
    <group ref={groupRef}>
      <mesh ref={scanRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[1.15, 0.018]} />
        <meshBasicMaterial
          color="#eceae6"
          transparent
          opacity={0.1}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringOuterRef}>
        <ringGeometry args={[0.98, 0.995, segments]} />
        <meshBasicMaterial
          color="#8f8c86"
          transparent
          opacity={0.4}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringInnerRef}>
        <ringGeometry args={[0.88, 0.892, segments]} />
        <meshBasicMaterial
          color="#706d68"
          transparent
          opacity={0.32}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {tier === "cinematic" ? (
        <mesh ref={ringFineRef}>
          <ringGeometry args={[0.93, 0.94, segments]} />
          <meshBasicMaterial
            color="#c5c2bc"
            transparent
            opacity={0.18}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ) : null}

      {[0, 1, 2].map((index) => (
        <mesh
          key={`signal-${index}`}
          ref={(node) => {
            signalRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.015, 10, 10]} />
          <meshBasicMaterial
            color="#eceae6"
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
