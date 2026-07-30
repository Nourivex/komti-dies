/**
 * TikaCharacter - 3D Chibi Girl for TIKA Chatbot
 *
 * Two modes:
 * 1. Placeholder: Built-in procedural character (works immediately)
 * 2. GLB Model: Load external .glb/.gltf file (drop model in public/tika/)
 *
 * Mouth animation via morph target or scale pulse when speaking.
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TikaCharacterProps {
  speaking?: boolean;
  thinking?: boolean;
}

/**
 * Placeholder Chibi Girl - built from Three.js primitives.
 * Replace this with GLB model when ready.
 */
export function TikaCharacter({
  speaking = false,
  thinking = false,
}: TikaCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  // Animation time
  const time = useRef(0);

  // Colors
  const skinColor = useMemo(() => new THREE.Color(0xffe0cc), []);
  const hairColor = useMemo(() => new THREE.Color(0x2d1b0e), []);
  const eyeColor = useMemo(() => new THREE.Color(0x1a1a2e), []);
  const blushColor = useMemo(() => new THREE.Color(0xffb0b0), []);
  const mouthColor = useMemo(() => new THREE.Color(0xe85070), []);
  const shirtColor = useMemo(() => new THREE.Color(0xb23a5a), []);
  const skirtColor = useMemo(() => new THREE.Color(0x1a1a3e), []);

  useFrame((_, delta) => {
    if (!groupRef.current || !bodyRef.current) return;
    time.current += delta;

    // Idle breathing
    const breathe = Math.sin(time.current * 1.5) * 0.02;
    bodyRef.current.scale.y = 1 + breathe;
    bodyRef.current.scale.x = 1 - breathe * 0.3;

    // Subtle sway
    groupRef.current.rotation.z = Math.sin(time.current * 0.8) * 0.03;

    // Speaking animation - mouth opens/closes
    if (mouthRef.current) {
      if (speaking) {
        const mouthOpen = 0.5 + Math.abs(Math.sin(time.current * 12)) * 0.5;
        mouthRef.current.scale.y = 0.5 + mouthOpen * 0.8;
        mouthRef.current.scale.x = 0.8 + mouthOpen * 0.3;
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(
          mouthRef.current.scale.y,
          0.3,
          delta * 5,
        );
        mouthRef.current.scale.x = THREE.MathUtils.lerp(
          mouthRef.current.scale.x,
          1,
          delta * 5,
        );
      }
    }

    // Eye blink
    const blinkCycle = time.current % 4;
    const isBlinking = blinkCycle > 3.8 && blinkCycle < 3.95;
    const eyeScaleY = isBlinking ? 0.1 : 1;

    if (leftEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        eyeScaleY,
        delta * 20,
      );
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        eyeScaleY,
        delta * 20,
      );
    }

    // Thinking - eyes look up slightly
    if (thinking) {
      if (leftEyeRef.current) leftEyeRef.current.position.y = 0.15;
      if (rightEyeRef.current) rightEyeRef.current.position.y = 0.15;
    } else {
      if (leftEyeRef.current) {
        leftEyeRef.current.position.y = THREE.MathUtils.lerp(
          leftEyeRef.current.position.y,
          0.12,
          delta * 3,
        );
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.position.y = THREE.MathUtils.lerp(
          rightEyeRef.current.position.y,
          0.12,
          delta * 3,
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      <group ref={bodyRef}>
        {/* ═══ HEAD ═══ */}
        <group position={[0, 1.05, 0]}>
          {/* Head sphere */}
          <mesh>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>

          {/* Hair - back */}
          <mesh position={[0, 0.08, -0.12]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>

          {/* Hair - bangs */}
          <mesh position={[0, 0.25, 0.18]}>
            <sphereGeometry
              args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
            />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>

          {/* Hair - side left */}
          <mesh position={[-0.32, -0.05, 0.05]}>
            <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>

          {/* Hair - side right */}
          <mesh position={[0.32, -0.05, 0.05]}>
            <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>

          {/* Hair - ponytail */}
          <mesh position={[0, 0.1, -0.35]} rotation={[0.4, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.5, 4, 8]} />
            <meshStandardMaterial color={hairColor} roughness={0.8} />
          </mesh>

          {/* Hair tie */}
          <mesh position={[0, 0.12, -0.28]}>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial color={mouthColor} roughness={0.4} />
          </mesh>

          {/* ═══ EYES ═══ */}
          {/* Left eye white */}
          <group ref={leftEyeRef} position={[-0.14, 0.12, 0.36]}>
            <mesh>
              <circleGeometry args={[0.09, 24]} />
              <meshBasicMaterial color={0xffffff} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, -0.01, 0.01]}>
              <circleGeometry args={[0.06, 24]} />
              <meshBasicMaterial color={eyeColor} />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, -0.01, 0.02]}>
              <circleGeometry args={[0.03, 16]} />
              <meshBasicMaterial color={0x000000} />
            </mesh>
            {/* Eye highlight */}
            <mesh position={[0.02, 0.02, 0.03]}>
              <circleGeometry args={[0.015, 12]} />
              <meshBasicMaterial color={0xffffff} />
            </mesh>
          </group>

          {/* Right eye white */}
          <group ref={rightEyeRef} position={[0.14, 0.12, 0.36]}>
            <mesh>
              <circleGeometry args={[0.09, 24]} />
              <meshBasicMaterial color={0xffffff} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, -0.01, 0.01]}>
              <circleGeometry args={[0.06, 24]} />
              <meshBasicMaterial color={eyeColor} />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, -0.01, 0.02]}>
              <circleGeometry args={[0.03, 16]} />
              <meshBasicMaterial color={0x000000} />
            </mesh>
            {/* Eye highlight */}
            <mesh position={[0.02, 0.02, 0.03]}>
              <circleGeometry args={[0.015, 12]} />
              <meshBasicMaterial color={0xffffff} />
            </mesh>
          </group>

          {/* ═══ BLUSH ═══ */}
          <mesh position={[-0.25, 0.02, 0.33]}>
            <circleGeometry args={[0.055, 16]} />
            <meshBasicMaterial color={blushColor} transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.25, 0.02, 0.33]}>
            <circleGeometry args={[0.055, 16]} />
            <meshBasicMaterial color={blushColor} transparent opacity={0.5} />
          </mesh>

          {/* ═══ MOUTH ═══ */}
          <mesh ref={mouthRef} position={[0, -0.08, 0.38]} scale={[1, 0.3, 1]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color={mouthColor} />
          </mesh>

          {/* Nose */}
          <mesh position={[0, 0.02, 0.4]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>

        {/* ═══ BODY ═══ */}
        <group position={[0, 0.45, 0]}>
          {/* Neck */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>

          {/* Torso / Shirt */}
          <mesh position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.22, 0.3, 8, 16]} />
            <meshStandardMaterial color={shirtColor} roughness={0.7} />
          </mesh>

          {/* Skirt */}
          <mesh position={[0, -0.4, 0]}>
            <coneGeometry args={[0.28, 0.2, 16]} />
            <meshStandardMaterial color={skirtColor} roughness={0.7} />
          </mesh>

          {/* Collar / ribbon */}
          <mesh position={[0, 0.02, 0.2]}>
            <torusGeometry args={[0.06, 0.015, 8, 16]} />
            <meshStandardMaterial color={mouthColor} roughness={0.4} />
          </mesh>
        </group>

        {/* ═══ ARMS ═══ */}
        {/* Left arm */}
        <group position={[-0.32, 0.55, 0]} rotation={[0, 0, 0.3]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.06, 0.22, 4, 8]} />
            <meshStandardMaterial color={shirtColor} roughness={0.7} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>

        {/* Right arm */}
        <group position={[0.32, 0.55, 0]} rotation={[0, 0, -0.3]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.06, 0.22, 4, 8]} />
            <meshStandardMaterial color={shirtColor} roughness={0.7} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>

        {/* ═══ LEGS ═══ */}
        {/* Left leg */}
        <group position={[-0.12, 0.05, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.07, 0.2, 4, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.32, 0.04]}>
            <boxGeometry args={[0.1, 0.06, 0.14]} />
            <meshStandardMaterial color={0x1a1a2e} roughness={0.5} />
          </mesh>
        </group>

        {/* Right leg */}
        <group position={[0.12, 0.05, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.07, 0.2, 4, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.32, 0.04]}>
            <boxGeometry args={[0.1, 0.06, 0.14]} />
            <meshStandardMaterial color={0x1a1a2e} roughness={0.5} />
          </mesh>
        </group>

        {/* ═══ ACCESSORIES ═══ */}
        {/* Hair clip */}
        <mesh position={[-0.28, 0.35, 0.18]} rotation={[0, 0.3, 0.2]}>
          <boxGeometry args={[0.08, 0.03, 0.02]} />
          <meshStandardMaterial
            color={mouthColor}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
