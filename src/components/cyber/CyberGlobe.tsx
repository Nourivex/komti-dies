/**
 * CyberGlobe - 3D Earth with GeoJSON GIS Geography, 7 Continent Color Identification,
 * Live Threat Heatmaps, Hotspot Beacon Indicators, and Tactical Pause Freeze Control.
 */

import { useRef, useMemo, useEffect, useState, memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CITIES, CONTINENT_COLORS, type City } from "@/lib/cyber-data";
import type { Attack } from "@/lib/cyber-engine";

// Global cache for GeoJSON dataset so it's loaded only once per session
let cachedGeoData: any = null;

// Static Geometry Singletons to prevent WebGL buffer recreation during React renders
const STATIC_SPHERE_GEOM = new THREE.SphereGeometry(1, 96, 96);
const STATIC_INNER_GLOW_GEOM = new THREE.SphereGeometry(1.03, 64, 64);
const STATIC_OUTER_GLOW_GEOM = new THREE.SphereGeometry(1.06, 64, 64);
const STATIC_CITY_NODE_GEOM = new THREE.SphereGeometry(0.012, 12, 12);

// ═══════════════════════════════════════════════════════════
// FPS GOVERNOR (Controls rendering frame rate dynamically)
// ═══════════════════════════════════════════════════════════

export function FrameGovernor({ targetFps = 60 }: { targetFps?: number }) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (targetFps >= 60) return;
    const interval = 1000 / targetFps;
    const timer = setInterval(() => {
      invalidate();
    }, interval);

    return () => clearInterval(timer);
  }, [targetFps, invalidate]);

  return null;
}

// ═══════════════════════════════════════════════════════════
// MATH & VECTOR HELPERS
// ═══════════════════════════════════════════════════════════

/** Convert lat/lng to 3D position on sphere */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Create a curved 3D parabolic arc between two points */
function createArc(start: THREE.Vector3, end: THREE.Vector3, segments = 60): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);

  const arcHeight = Math.min(Math.max(dist * 0.25, 0.15), 0.6);
  mid.normalize().multiplyScalar(1 + arcHeight);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3();
    p.x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x;
    p.y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y;
    p.z = (1 - t) * (1 - t) * start.z + 2 * (1 - t) * t * mid.z + t * t * end.z;
    points.push(p);
  }
  return points;
}

// ═══════════════════════════════════════════════════════════
// HOTSPOT BEACONS (Vertical Glowing Beams for Top Attacked Cities)
// ═══════════════════════════════════════════════════════════

interface HotspotBeaconsProps {
  hotspots: Array<{ city: City; count: number }>;
  radius: number;
}

const HotspotBeacons = memo(function HotspotBeacons({ hotspots, radius }: HotspotBeaconsProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {hotspots.map(({ city, count }, idx) => {
        const basePos = latLngToVector3(city.lat, city.lng, radius * 1.002);
        const normal = basePos.clone().normalize();
        const beamHeight = 0.12 + Math.min(count * 0.015, 0.25);
        const midPos = basePos.clone().add(normal.clone().multiplyScalar(beamHeight * 0.5));
        const colorHex = idx === 0 ? "#f43f5e" : idx === 1 ? "#fb923c" : "#facc15";

        return (
          <group key={city.name}>
            {/* Vertical Beam */}
            <mesh position={midPos} lookAt={[0, 0, 0]}>
              <cylinderGeometry args={[0.005, 0.012, beamHeight, 12]} />
              <meshBasicMaterial color={colorHex} transparent opacity={0.85} toneMapped={false} />
            </mesh>

            {/* Glowing Beacon Tip */}
            <mesh position={basePos.clone().add(normal.clone().multiplyScalar(beamHeight))}>
              <sphereGeometry args={[0.016, 12, 12]} />
              <meshBasicMaterial color={colorHex} toneMapped={false} />
            </mesh>

            {/* Ground Ring Sonar */}
            <mesh position={basePos} lookAt={[0, 0, 0]}>
              <ringGeometry args={[0.015, 0.035, 24]} />
              <meshBasicMaterial color={colorHex} transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
});

// ═══════════════════════════════════════════════════════════
// CITY MARKERS (Glowing nodes with Continent Color Tints)
// ═══════════════════════════════════════════════════════════

interface CityMarkersProps {
  radius: number;
  selectedContinent: string;
  selectedCityFilter: string;
  hotspotNames: Set<string>;
  isPlaying?: boolean;
}

const CityMarkers = memo(function CityMarkers({
  radius,
  selectedContinent,
  selectedCityFilter,
  hotspotNames,
  isPlaying = true,
}: CityMarkersProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);

  const { positions, colors, count } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    const cols: THREE.Color[] = [];

    CITIES.forEach((city) => {
      pos.push(latLngToVector3(city.lat, city.lng, radius * 1.002));
      const baseHex = city.country === "Indonesia" ? "#f43f5e" : CONTINENT_COLORS[city.continent] || "#38bdf8";
      const isHotspot = hotspotNames.has(city.name);

      let isMatch = true;
      if (selectedContinent !== "all") {
        if (selectedContinent === "Indonesia") {
          isMatch = city.country === "Indonesia";
        } else {
          isMatch = city.continent.toLowerCase() === selectedContinent.toLowerCase();
        }
      }

      if (selectedCityFilter === "hotspots" && !isHotspot) {
        isMatch = false;
      }

      const finalColor = isMatch ? baseHex : "#1e293b";
      cols.push(new THREE.Color(finalColor));
    });

    return { positions: pos, colors: cols, count: pos.length };
  }, [radius, selectedContinent, selectedCityFilter, hotspotNames]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.lookAt(0, 0, 0);

      const city = CITIES[i];
      const isIndo = city.country === "Indonesia";
      const isHotspot = hotspotNames.has(city.name);

      let scale = isIndo ? 1.4 : 1.0;
      if (isHotspot) scale *= 1.6;
      if (
        selectedContinent !== "all" &&
        city.continent.toLowerCase() !== selectedContinent.toLowerCase() &&
        !(selectedContinent === "Indonesia" && isIndo)
      ) {
        scale *= 0.4;
      }

      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, colors[i]);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [positions, colors, selectedContinent, selectedCityFilter, hotspotNames]);

  useFrame((_, delta) => {
    if (!isPlaying) return; // Freeze pulsing when paused
    time.current += delta;
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(time.current * 4) * 0.15;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <instancedMesh ref={meshRef} geometry={STATIC_CITY_NODE_GEOM} args={[undefined, undefined, count]}>
      <meshBasicMaterial transparent opacity={0.95} toneMapped={false} />
    </instancedMesh>
  );
});

// ═══════════════════════════════════════════════════════════
// ATTACK ARCS (Freezes in place when paused)
// ═══════════════════════════════════════════════════════════

interface AttackArcProps {
  attack: Attack;
  radius: number;
  selectedContinent: string;
  isPlaying?: boolean;
}

const AttackArc = memo(function AttackArc({ attack, radius, selectedContinent, isPlaying = true }: AttackArcProps) {
  const particleRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const activeElapsed = useRef(0);

  const isVisible = useMemo(() => {
    if (selectedContinent === "all") return true;
    if (selectedContinent === "Indonesia") {
      return attack.source.country === "Indonesia" || attack.target.country === "Indonesia";
    }
    return (
      attack.source.continent.toLowerCase() === selectedContinent.toLowerCase() ||
      attack.target.continent.toLowerCase() === selectedContinent.toLowerCase()
    );
  }, [attack, selectedContinent]);

  const { curve, color } = useMemo(() => {
    const start = latLngToVector3(attack.source.lat, attack.source.lng, radius);
    const end = latLngToVector3(attack.target.lat, attack.target.lng, radius);
    const points = createArc(start, end);
    const curve = new THREE.CatmullRomCurve3(points);
    const color = new THREE.Color(attack.type.color);
    return { curve, color };
  }, [attack, radius]);

  const lineObject = useMemo(() => {
    const points = curve.getPoints(60);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: isVisible ? 0.75 : 0.1,
      linewidth: 1.5,
    });
    return new THREE.Line(geom, mat);
  }, [curve, color, isVisible]);

  useFrame((_, delta) => {
    if (!isVisible) return;
    if (isPlaying) {
      activeElapsed.current += delta;
    }

    const travelTime = 1.8;
    progress.current = Math.min(activeElapsed.current / travelTime, 1);

    if (particleRef.current) {
      const point = curve.getPoint(progress.current);
      particleRef.current.position.copy(point);
      particleRef.current.visible = progress.current < 1;
    }

    if (lineObject) {
      const mat = lineObject.material as THREE.LineBasicMaterial;
      if (activeElapsed.current > travelTime) {
        mat.opacity = Math.max(0, 0.7 - (activeElapsed.current - travelTime) * 1.2);
      } else {
        mat.opacity = 0.75;
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group>
      <primitive object={lineObject} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
});

// ═══════════════════════════════════════════════════════════
// IMPACT RIPPLE (Freezes in place when paused)
// ═══════════════════════════════════════════════════════════

interface ImpactRippleProps {
  city: City;
  radius: number;
  color: string;
  id: string;
  onExpire: (id: string) => void;
  isPlaying?: boolean;
}

function ImpactRipple({ city, radius, color, id, onExpire, isPlaying = true }: ImpactRippleProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const activeElapsed = useRef(0);

  const position = useMemo(() => latLngToVector3(city.lat, city.lng, radius * 1.008), [city, radius]);

  useFrame((_, delta) => {
    if (isPlaying) {
      activeElapsed.current += delta;
    }

    if (ringRef.current) {
      const scale = 1 + activeElapsed.current * 2.5;
      ringRef.current.scale.setScalar(scale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.9 - activeElapsed.current * 0.7);
      if (activeElapsed.current > 1.3 && isPlaying) {
        onExpire(id);
      }
    }
  });

  return (
    <mesh ref={ringRef} position={position} lookAt={[0, 0, 0]}>
      <ringGeometry args={[0.008, 0.022, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════
// 7 CONTINENTS GEOGRAPHICAL CLASSIFICATION & COLOR SCHEME
// ═══════════════════════════════════════════════════════════

function classifyContinent(ring: number[][]): string {
  let sumLng = 0;
  let sumLat = 0;
  for (let i = 0; i < ring.length; i++) {
    sumLng += ring[i][0];
    sumLat += ring[i][1];
  }
  const lng = sumLng / ring.length;
  const lat = sumLat / ring.length;

  if (lat < -60) return "Antarctica";
  if (lat >= -11 && lat <= 7 && lng >= 95 && lng <= 141) return "Indonesia";
  if (lat <= 0 && lat >= -50 && lng >= 110 && lng <= 180) return "Oceania";
  if (lat >= -10 && lat <= 80 && lng >= 60 && lng <= 180) return "Asia";
  if (lat >= 35 && lat <= 80 && lng >= -25 && lng < 60) return "Europe";
  if (lat >= -35 && lat <= 38 && lng >= -20 && lng < 60) return "Africa";
  if (lat >= 7 && lat <= 85 && lng >= -170 && lng <= -20) return "North America";
  if (lat >= -60 && lat < 7 && lng >= -95 && lng <= -30) return "South America";

  return "Asia";
}

const CONTINENT_SCHEMES: Record<string, { fill: string; stroke: string }> = {
  Indonesia: { fill: "rgba(244, 63, 94, 0.55)", stroke: "#f43f5e" },
  Asia: { fill: "rgba(56, 189, 248, 0.45)", stroke: "#38bdf8" },
  Europe: { fill: "rgba(16, 185, 129, 0.45)", stroke: "#10b981" },
  Africa: { fill: "rgba(249, 115, 22, 0.45)", stroke: "#f97316" },
  "North America": { fill: "rgba(245, 158, 11, 0.45)", stroke: "#f59e0b" },
  "South America": { fill: "rgba(168, 85, 247, 0.45)", stroke: "#a855f7" },
  Oceania: { fill: "rgba(250, 204, 21, 0.45)", stroke: "#facc15" },
  Antarctica: { fill: "rgba(224, 247, 250, 0.65)", stroke: "#ffffff" },
};

// ═══════════════════════════════════════════════════════════
// HIGH-PERFORMANCE EARTH CANVAS TEXTURE GENERATOR
// ═══════════════════════════════════════════════════════════

function renderCanvasContent(
  canvas: HTMLCanvasElement,
  geoJsonData?: any,
  heatmapMode: "spectrum" | "continent" | "heatmap" = "continent",
) {
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = heatmapMode === "heatmap" ? "#030712" : "#060b18";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(30, 58, 110, 0.25)";
  ctx.lineWidth = 1;
  for (let lat = -90; lat <= 90; lat += 15) {
    const y = ((90 - lat) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 15) {
    const x = ((lng + 180) / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  const toCanvas = (lng: number, lat: number): [number, number] => [
    ((lng + 180) / 360) * canvas.width,
    ((90 - lat) / 180) * canvas.height,
  ];

  const drawRing = (ring: number[][]) => {
    if (!ring || ring.length < 3) return;
    const continentKey = classifyContinent(ring);
    const scheme = CONTINENT_SCHEMES[continentKey] || CONTINENT_SCHEMES.Asia;

    const fill = heatmapMode === "spectrum" ? "rgba(15, 35, 66, 0.85)" : scheme.fill;
    const stroke = heatmapMode === "spectrum" ? "rgba(56, 189, 248, 0.75)" : scheme.stroke;

    ctx.beginPath();
    const [startX, startY] = toCanvas(ring[0][0], ring[0][1]);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < ring.length; i++) {
      const [x, y] = toCanvas(ring[i][0], ring[i][1]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.3;
    ctx.stroke();
  };

  if (geoJsonData && geoJsonData.features) {
    geoJsonData.features.forEach((feature: any) => {
      const geom = feature.geometry;
      if (!geom) return;
      if (geom.type === "Polygon") {
        geom.coordinates.forEach((ring: number[][]) => drawRing(ring));
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach((poly: number[][][]) => {
          poly.forEach((ring: number[][]) => drawRing(ring));
        });
      }
    });
  } else {
    const fallbackLandmasses = [
      [[-168, 65], [-160, 71], [-140, 70], [-125, 69], [-100, 74], [-80, 73], [-60, 60], [-55, 47], [-66, 44], [-75, 35], [-80, 25], [-90, 20], [-98, 16], [-105, 20], [-118, 32], [-124, 48], [-140, 60], [-168, 65]],
      [[-73, 78], [-60, 83], [-20, 82], [-18, 70], [-40, 60], [-52, 60], [-73, 78]],
      [[-78, 10], [-62, 12], [-50, 4], [-35, -5], [-37, -12], [-44, -23], [-50, -32], [-65, -50], [-74, -53], [-76, -42], [-71, -30], [-78, -10], [-80, 2], [-78, 10]],
      [[-9, 36], [0, 38], [15, 38], [28, 40], [40, 45], [45, 55], [30, 60], [25, 70], [10, 62], [5, 53], [-5, 48], [-9, 36]],
      [[-17, 28], [-5, 36], [11, 37], [25, 32], [34, 28], [43, 12], [51, 11], [40, -5], [33, -26], [20, -35], [14, -23], [9, 4], [-15, 12], [-17, 28]],
      [[38, 70], [60, 72], [100, 75], [140, 72], [170, 65], [160, 50], [140, 40], [120, 30], [110, 20], [100, 10], [80, 8], [70, 20], [60, 25], [50, 30], [40, 40], [38, 70]],
      [[95, 5.5], [103, -1], [106, -5.8], [102, -4], [96, 2], [95, 5.5]],
      [[105.2, -5.9], [114.5, -7.8], [115.6, -8.4], [114.2, -8.8], [106, -7], [105.2, -5.9]],
      [[109, 6.8], [118, 4.5], [119, -4], [110, -4], [109, 6.8]],
      [[119, 1.8], [125, 1.5], [123, -5.5], [119.5, -5.2], [119, 1.8]],
      [[130.8, -0.5], [141, -2.5], [141, -9], [135, -4], [130.8, -0.5]],
      [[113, -22], [130, -12], [142, -11], [153, -28], [150, -37], [138, -35], [115, -34], [113, -22]],
    ];
    fallbackLandmasses.forEach((ring) => drawRing(ring));
  }

  // ULTRA-FAST BATCHED TECH DOT MATRIX
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  ctx.beginPath();
  for (let y = 0; y < canvas.height; y += 8) {
    for (let x = 0; x < canvas.width; x += 8) {
      const index = (y * canvas.width + x) * 4;
      if (data[index] > 10 || data[index + 1] > 10 || data[index + 2] > 10) {
        ctx.rect(x, y, 1.4, 1.4);
      }
    }
  }
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fill();
}

// ═══════════════════════════════════════════════════════════
// EARTH SPHERE COMPONENT (Memoized with Static Geometry)
// ═══════════════════════════════════════════════════════════

const Earth = memo(function Earth({ radius, heatmapMode }: { radius: number; heatmapMode: "spectrum" | "continent" | "heatmap" }) {
  const [geoData, setGeoData] = useState<any>(cachedGeoData);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (cachedGeoData) return;
    const geoJsonUrl = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson";
    fetch(geoJsonUrl)
      .then((res) => res.json())
      .then((data) => {
        cachedGeoData = data;
        setGeoData(data);
      })
      .catch(() => { });
  }, []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    canvasRef.current = canvas;
    renderCanvasContent(canvas, geoData, heatmapMode);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    textureRef.current = tex;
    return tex;
  }, [geoData]);

  // Fast In-Place Canvas Update (Zero texture destruction)
  useEffect(() => {
    if (canvasRef.current && textureRef.current) {
      renderCanvasContent(canvasRef.current, geoData, heatmapMode);
      textureRef.current.needsUpdate = true;
    }
  }, [heatmapMode, geoData]);

  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.75,
      metalness: 0.25,
      emissive: new THREE.Color(0x0a1428),
      emissiveIntensity: 0.4,
    });
  }, [texture]);

  return (
    <>
      <mesh geometry={STATIC_SPHERE_GEOM} material={earthMaterial} scale={radius} />
      {/* Atmosphere Glow */}
      <mesh geometry={STATIC_INNER_GLOW_GEOM} scale={radius}>
        <meshBasicMaterial color={0x38bdf8} transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh geometry={STATIC_OUTER_GLOW_GEOM} scale={radius}>
        <meshBasicMaterial color={0xf43f5e} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </>
  );
});

// ═══════════════════════════════════════════════════════════
// MAIN GLOBE COMPONENT
// ═══════════════════════════════════════════════════════════

interface CyberGlobeProps {
  attacks: Attack[];
  ripples: Array<{ id: string; city: City; color: string }>;
  onExpireRipple: (id: string) => void;
  autoRotate: boolean;
  selectedContinent?: string;
  selectedCityFilter?: string;
  heatmapMode?: "spectrum" | "continent" | "heatmap";
  topTargetCities?: Array<{ city: City; count: number }>;
  targetFps?: number;
  isPlaying?: boolean;
}

export const CyberGlobe = memo(function CyberGlobe({
  attacks,
  ripples,
  onExpireRipple,
  autoRotate,
  selectedContinent = "all",
  selectedCityFilter = "all",
  heatmapMode = "continent",
  topTargetCities = [],
  targetFps = 60,
  isPlaying = true,
}: CyberGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1;

  const hotspotNames = useMemo(() => new Set(topTargetCities.map((t) => t.city.name)), [topTargetCities]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && isPlaying) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <FrameGovernor targetFps={targetFps} />
      <Earth radius={radius} heatmapMode={heatmapMode} />

      <CityMarkers
        radius={radius}
        selectedContinent={selectedContinent}
        selectedCityFilter={selectedCityFilter}
        hotspotNames={hotspotNames}
        isPlaying={isPlaying}
      />

      <HotspotBeacons hotspots={topTargetCities.slice(0, 5)} radius={radius} />

      {attacks.map((attack) => (
        <AttackArc
          key={attack.id}
          attack={attack}
          radius={radius}
          selectedContinent={selectedContinent}
          isPlaying={isPlaying}
        />
      ))}

      {ripples.map((r) => (
        <ImpactRipple
          key={r.id}
          id={r.id}
          city={r.city}
          radius={radius}
          color={r.color}
          onExpire={onExpireRipple}
          isPlaying={isPlaying}
        />
      ))}
    </group>
  );
});
