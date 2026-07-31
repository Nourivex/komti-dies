/**
 * TikaGLBLoader v3 - Load GLB with animation playback.
 *
 * Uses useAnimations from drei to play idle/talking clips.
 */

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

interface TikaGLBLoaderProps {
  url?: string;
  speaking?: boolean;
  thinking?: boolean;
  scale?: number;
}

export function TikaGLBLoader({
  url = "/tika/tika.glb",
  speaking = false,
  thinking = false,
  scale: scaleProp,
}: TikaGLBLoaderProps) {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(url);
  const { names, actions } = useAnimations(animations, groupRef);
  const time = useRef(0);
  const autoScale = useMemo(() => scaleProp || 0.9, [scaleProp]);

  console.log("[TIKA] Animations available:", names);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.scale.setScalar(autoScale);

    // Position model so feet sit at y=0
    const box = new THREE.Box3().setFromObject(scene);
    scene.position.y = -box.min.y;

    group.add(scene);

    // Play first available animation (idle)
    if (names.length > 0) {
      const idleName = names.find((n) =>
        n.toLowerCase().includes("idle") ||
        n.toLowerCase().includes("standing") ||
        n.toLowerCase().includes("breath")
      ) || names[0];

      console.log("[TIKA] Playing animation:", idleName);
      Object.values(actions).forEach((action) => action?.stop());
      actions[idleName]?.play();
    }

    return () => {
      group.remove(scene);
    };
  }, [scene, autoScale, names, actions]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    time.current += delta;
    const t = time.current;

    // Subtle idle breathing overlay
    const breathe = Math.sin(t * 1.5) * 0.008;
    groupRef.current.scale.y = autoScale * (1 + breathe);
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.01;
  });

  return <group ref={groupRef} />;
}
