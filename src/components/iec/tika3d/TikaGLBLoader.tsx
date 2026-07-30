/**
 * TikaGLBLoader v3 — Load GLB with morph target lip sync + bone animation.
 *
 * Features:
 * - Auto-scale to fit viewport
 * - Mouth morph target animation (visemes, mouth_open, etc.)
 * - Jaw bone rotation for mouth open
 * - Hand bone wave animation when speaking
 * - Idle breathing + sway
 */

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group, Bone } from "three";
import * as THREE from "three";

interface TikaGLBLoaderProps {
  url?: string;
  speaking?: boolean;
  thinking?: boolean;
  scale?: number;
}

// Common morph target names for mouth
const MOUTH_MORPH_PATTERNS = [
  "mouth_open",
  "viseme_aa",
  "viseme_oh",
  "mouth",
  "jaw",
  "lip",
  "MouthOpen",
  "Mouth_A",
  "Mouth_O",
];

// Common bone names for jaw/mouth
const JAW_BONE_NAMES = [
  "jaw",
  "Jaw",
  "J_Bip_C_Jaw",
  "mixamorig:Jaw",
  "Chin",
  "chin",
];

// Common bone names for hands
const HAND_BONE_NAMES = [
  "hand_L",
  "Hand_L",
  "mixamorig:LeftHand",
  "J_Bip_L_Hand",
  "hand_R",
  "Hand_R",
  "mixamorig:RightHand",
  "J_Bip_R_Hand",
  "LeftHand",
  "RightHand",
];

// Common bone names for arms
const ARM_BONE_NAMES = [
  "upper_arm_L",
  "UpperArm_L",
  "mixamorig:LeftForeArm",
  "J_Bip_L_UpperArm",
  "upper_arm_R",
  "UpperArm_R",
  "mixamorig:RightForeArm",
  "J_Bip_R_UpperArm",
  "LeftForeArm",
  "RightForeArm",
];

function findBoneByName(root: THREE.Object3D, names: string[]): Bone | null {
  let found: Bone | null = null;
  root.traverse((child) => {
    if (found) return;
    if (child instanceof THREE.Bone) {
      const name = child.name.toLowerCase();
      if (names.some((n) => name.includes(n.toLowerCase()))) {
        found = child;
      }
    }
  });
  return found;
}

function findAllBonesByName(root: THREE.Object3D, names: string[]): Bone[] {
  const found: Bone[] = [];
  root.traverse((child) => {
    if (child instanceof THREE.Bone) {
      const name = child.name.toLowerCase();
      if (names.some((n) => name.includes(n.toLowerCase()))) {
        found.push(child);
      }
    }
  });
  return found;
}

export function TikaGLBLoader({
  url = "/tika/tika.glb",
  speaking = false,
  thinking = false,
  scale: scaleProp,
}: TikaGLBLoaderProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(url);
  const time = useRef(0);
  const clonedScene = useRef<THREE.Group | null>(null);

  // Bone references
  const jawBone = useRef<Bone | null>(null);
  const handBones = useRef<Bone[]>([]);
  const armBones = useRef<Bone[]>([]);

  // Morph target references
  const mouthMesh = useRef<THREE.Mesh | null>(null);
  const mouthIndex = useRef<number>(-1);

  // Force scale
  const autoScale = useMemo(() => scaleProp || 0.75, [scaleProp]);

  useEffect(() => {
    clonedScene.current = scene.clone(true);
    const group = groupRef.current;
    if (!group) return;

    group.scale.setScalar(autoScale);

    // Center model
    const box = new THREE.Box3().setFromObject(clonedScene.current);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.current.position.y = -center.y;

    group.add(clonedScene.current);

    // Find bones
    jawBone.current = findBoneByName(clonedScene.current, JAW_BONE_NAMES);
    handBones.current = findAllBonesByName(
      clonedScene.current,
      HAND_BONE_NAMES,
    );
    armBones.current = findAllBonesByName(clonedScene.current, ARM_BONE_NAMES);

    // Find mouth morph target
    clonedScene.current.traverse((child) => {
      if (mouthMesh.current) return;
      if (child instanceof THREE.Mesh && child.morphTargetDictionary) {
        const names = Object.keys(child.morphTargetDictionary);
        const mouthName = names.find((n) =>
          MOUTH_MORPH_PATTERNS.some((p) =>
            n.toLowerCase().includes(p.toLowerCase()),
          ),
        );
        if (mouthName !== undefined) {
          mouthMesh.current = child;
          mouthIndex.current = child.morphTargetDictionary[mouthName] ?? -1;
        }
      }
    });

    console.log("[TIKA] Model loaded:", {
      jawBone: jawBone.current?.name || "not found",
      handBones: handBones.current.map((b) => b.name),
      armBones: armBones.current.map((b) => b.name),
      mouthMorph: mouthIndex.current >= 0 ? "found" : "not found",
    });

    return () => {
      if (clonedScene.current && group) {
        group.remove(clonedScene.current);
      }
    };
  }, [scene, autoScale]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    time.current += delta;
    const t = time.current;

    // ─── Idle breathing ───
    const breathe = Math.sin(t * 1.5) * 0.015;
    groupRef.current.scale.y = autoScale * (1 + breathe);
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;

    // ─── Mouth animation ───
    // Method 1: Morph target
    if (
      mouthMesh.current &&
      mouthIndex.current >= 0 &&
      mouthMesh.current.morphTargetInfluences
    ) {
      if (speaking) {
        mouthMesh.current.morphTargetInfluences[mouthIndex.current] =
          0.4 + Math.abs(Math.sin(t * 10)) * 0.6;
      } else {
        mouthMesh.current.morphTargetInfluences[mouthIndex.current] =
          THREE.MathUtils.lerp(
            mouthMesh.current.morphTargetInfluences[mouthIndex.current],
            0,
            delta * 8,
          );
      }
    }

    // Method 2: Jaw bone rotation
    if (jawBone.current) {
      const targetX = speaking ? Math.sin(t * 10) * 0.15 : 0;
      jawBone.current.rotation.x = THREE.MathUtils.lerp(
        jawBone.current.rotation.x,
        targetX,
        delta * (speaking ? 15 : 8),
      );
    }

    // ─── Hand/wave animation ───
    handBones.current.forEach((bone, i) => {
      if (speaking) {
        // Subtle wave when speaking
        const wave = Math.sin(t * 3 + i * Math.PI) * 0.2;
        bone.rotation.z = THREE.MathUtils.lerp(
          bone.rotation.z,
          wave,
          delta * 5,
        );
        bone.rotation.x = THREE.MathUtils.lerp(
          bone.rotation.x,
          Math.sin(t * 2.5 + i) * 0.1,
          delta * 5,
        );
      } else {
        bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, 0, delta * 3);
        bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, 0, delta * 3);
      }
    });

    // ─── Arm gesture animation ───
    armBones.current.forEach((bone, i) => {
      if (speaking) {
        // Subtle arm movement when speaking
        const gesture = Math.sin(t * 2 + i * 1.5) * 0.1;
        bone.rotation.z = THREE.MathUtils.lerp(
          bone.rotation.z,
          gesture,
          delta * 4,
        );
      } else {
        bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, 0, delta * 3);
      }
    });
  });

  return <group ref={groupRef} />;
}
