/**
 * TikaScene - 3D scene wrapper with error boundary for R3F + TanStack Router compatibility.
 */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TikaGLBLoader } from "./TikaGLBLoader";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";

interface TikaSceneProps {
  speaking?: boolean;
  thinking?: boolean;
  className?: string;
}

function SceneContent({
  speaking,
  thinking,
}: {
  speaking: boolean;
  thinking: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.6} color={0xffe8e0} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.2}
        color={0xffffff}
        castShadow
      />
      <pointLight position={[-2, 3, 2]} intensity={0.8} color={0xb23a5a} />
      <pointLight position={[2, -1, 3]} intensity={0.5} color={0x8a1f3f} />
      <TikaGLBLoader speaking={speaking} thinking={thinking} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={!speaking && !thinking}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function TikaScene({
  speaking = false,
  thinking = false,
  className = "",
}: TikaSceneProps) {
  return (
    <div className={`relative ${className}`}>
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SceneContent speaking={speaking} thinking={thinking} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
