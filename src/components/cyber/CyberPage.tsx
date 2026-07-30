/**
 * CyberPage - Global Cyber Intelligence Threat Map.
 *
 * Full 3D Earth visualization with GeoJSON GIS landmasses, 7 Continent Color Schemes,
 * real-time attack hotspot beacons, FPS Governor (20/30/40/60 FPS), speed controls, and telemetry feed.
 */

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ArrowLeft,
  Shield,
  Play,
  Pause,
  RotateCw,
  Filter,
  Zap,
  Flame,
  Globe2,
  Layers,
  Gauge,
} from "lucide-react";
import { CyberGlobe } from "./CyberGlobe";
import { CyberStats } from "./CyberStats";
import { CyberFeed } from "./CyberFeed";
import { CanvasErrorBoundary } from "@/components/iec/tika3d/CanvasErrorBoundary";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/navigator/ThemeToggle";
import {
  CyberEngine,
  type Attack,
  type CyberStats as StatsType,
} from "@/lib/cyber-engine";
import { ATTACK_TYPES, type City } from "@/lib/cyber-data";

export function CyberPage() {
  const { theme, toggleTheme } = useTheme();
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [targetFps, setTargetFps] = useState<number>(60);

  // Filters & Modes - Default to "continent" mode so 7 continent colors are instantly visible
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all"); // "all" | "hotspots"
  const [heatmapMode, setHeatmapMode] = useState<"spectrum" | "continent" | "heatmap">("continent");

  const [stats, setStats] = useState<StatsType>({
    attacksPerSecond: 0,
    attacksPerMinute: 0,
    activeThreats: 0,
    countriesAffected: 0,
    topTarget: "—",
    totalAttacks: 0,
    criticalAlarms: 0,
    attackTypeCounts: {},
  });

  const [ripples, setRipples] = useState<
    Array<{
      id: string;
      city: City;
      color: string;
    }>
  >([]);

  const engineRef = useRef<CyberEngine | null>(null);

  // Initialize and run engine
  useEffect(() => {
    const engine = new CyberEngine();
    engineRef.current = engine;

    engine.onAttack((attack) => {
      setAttacks((prev) => [attack, ...prev].slice(0, 100));
      setStats(engine.getStats());

      setRipples((prev) => [
        ...prev.slice(-15),
        {
          id: `ripple-${attack.id}`,
          city: attack.target,
          color: attack.type.color,
        },
      ]);
    });

    engine.start(speed);

    const statsInterval = setInterval(() => {
      setStats(engine.getStats());
    }, 500);

    return () => {
      engine.destroy();
      clearInterval(statsInterval);
    };
  }, []);

  // Compute Top Target Cities (Hotspots) in real-time
  const topTargetCities = useMemo(() => {
    const counts: Record<string, { city: City; count: number }> = {};
    attacks.forEach((a) => {
      const key = a.target.name;
      if (!counts[key]) counts[key] = { city: a.target, count: 0 };
      counts[key].count++;
    });
    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [attacks]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (!engineRef.current) return;
    if (isPlaying) {
      engineRef.current.stop();
      setIsPlaying(false);
    } else {
      engineRef.current.start(speed);
      setIsPlaying(true);
    }
  };

  // Handle Speed change
  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (engineRef.current) {
      engineRef.current.setSpeed(newSpeed);
    }
  };

  const handleExpireRipple = useCallback((id: string) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const continents = [
    { id: "all", label: "Semua Benua", color: "#ffffff" },
    { id: "Indonesia", label: "🇮🇩 Indonesia", color: "#f43f5e" },
    { id: "Asia", label: "🌏 Asia", color: "#38bdf8" },
    { id: "Africa", label: "🌍 Afrika", color: "#f97316" },
    { id: "North America", label: "🌎 Amer. Utara", color: "#f59e0b" },
    { id: "South America", label: "🌎 Amer. Selatan", color: "#a855f7" },
    { id: "Antarctica", label: "❄️ Antartika", color: "#e0f7fa" },
    { id: "Europe", label: "🌍 Eropa", color: "#10b981" },
    { id: "Oceania", label: "🌏 Australia/Oseania", color: "#facc15" },
  ];

  return (
    <div className={`${theme} relative min-h-screen overflow-hidden bg-background font-sans select-none`}>
      {/* Top Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl py-2.5 px-4 sm:px-6">
          <a
            href="/"
            className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </a>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-rose/30 bg-rose/10 px-3 py-1 text-xs font-semibold text-rose">
              <Shield className="h-3.5 w-3.5" />
              <span>GLOBAL CYBER INTELLIGENCE</span>
            </div>
            <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex h-screen flex-col pt-20 lg:flex-row">
        {/* 3D Globe Workspace */}
        <div className="relative flex-1 lg:flex-[2.5]">
          {/* Ambient Background Radial Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--rose),transparent_70%)] opacity-10" />

          {/* 3D Canvas */}
          <div className="relative h-[55vh] w-full lg:h-full">
            <CanvasErrorBoundary>
              <Canvas
                frameloop={targetFps < 60 ? "demand" : "always"}
                camera={{ position: [0, 0.4, 2.7], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                dpr={[1, 1.5]}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 4, 5]} intensity={1.2} />
                  <pointLight position={[-4, 2, -4]} intensity={0.8} color={0xf43f5e} />
                  <pointLight position={[4, -2, 4]} intensity={0.6} color={0x38bdf8} />

                  <CyberGlobe
                    attacks={attacks.filter((a) => a.active)}
                    ripples={ripples}
                    onExpireRipple={handleExpireRipple}
                    autoRotate={autoRotate}
                    selectedContinent={selectedContinent}
                    selectedCityFilter={cityFilter}
                    heatmapMode={heatmapMode}
                    topTargetCities={topTargetCities}
                    targetFps={targetFps}
                    isPlaying={isPlaying}
                  />

                  <OrbitControls
                    enableZoom={true}
                    minDistance={1.8}
                    maxDistance={4.5}
                    enablePan={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 1.3}
                  />
                </Suspense>
              </Canvas>
            </CanvasErrorBoundary>
          </div>

          {/* Control Overlay Bar (Top Left of Globe) */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            <button
              onClick={togglePlay}
              className="glass-panel flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition hover:border-rose/50"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 text-rose" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
              <span>{isPlaying ? "PAUSE" : "RESUME"}</span>
            </button>

            <button
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`glass-panel flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${autoRotate ? "border-rose/40 text-rose" : "text-muted-foreground"
                }`}
            >
              <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`} />
              <span>Rotasi {autoRotate ? "ON" : "OFF"}</span>
            </button>

            {/* Speed Selector */}
            <div className="glass-panel flex items-center gap-1 rounded-xl p-1 text-xs">
              <Zap className="ml-1 h-3.5 w-3.5 text-amber-400" />
              {[1, 2, 5].map((sp) => (
                <button
                  key={sp}
                  onClick={() => changeSpeed(sp)}
                  className={`rounded-lg px-2 py-0.5 font-mono text-[0.7rem] font-bold transition ${speed === sp ? "bg-rose text-white shadow" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {sp}x
                </button>
              ))}
            </div>

            {/* FPS Limiter Selector */}
            <div className="glass-panel flex items-center gap-1 rounded-xl p-1 text-xs">
              <Gauge className="ml-1 h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[0.65rem] font-bold text-muted-foreground pr-0.5">FPS:</span>
              {[20, 30, 40, 60].map((fps) => (
                <button
                  key={fps}
                  onClick={() => setTargetFps(fps)}
                  className={`rounded-lg px-2 py-0.5 font-mono text-[0.7rem] font-bold transition ${targetFps === fps ? "bg-emerald-500 text-white shadow" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {fps}
                </button>
              ))}
            </div>

            {/* Heatmap / Color Mode Toggle */}
            <div className="glass-panel flex items-center gap-1 rounded-xl p-1 text-xs">
              <Layers className="ml-1 h-3.5 w-3.5 text-cyan-400" />
              <button
                onClick={() => setHeatmapMode("continent")}
                className={`rounded-lg px-2.5 py-1 text-[0.65rem] font-bold transition ${heatmapMode === "continent" ? "bg-indigo-600 text-white shadow" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                🌈 7 Warna Benua
              </button>
              <button
                onClick={() => setHeatmapMode("spectrum")}
                className={`rounded-lg px-2.5 py-1 text-[0.65rem] font-bold transition ${heatmapMode === "spectrum" ? "bg-cyan-500 text-white shadow" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                ⚡ Cyber Standard
              </button>
            </div>
          </div>

          {/* Top 5 Hotspot Leaderboard Floating Widget (Top Right of Globe) */}
          <div className="absolute top-4 right-4 z-10 hidden sm:block">
            <div className="glass-panel rounded-2xl p-3 shadow-xl w-64 border-glass-border">
              <div className="flex items-center justify-between border-b border-glass-border pb-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose uppercase tracking-wider">
                  <Flame className="h-3.5 w-3.5 animate-pulse text-red-500" /> Top Hotspot Diserang
                </span>
                <button
                  onClick={() => setCityFilter((prev) => (prev === "hotspots" ? "all" : "hotspots"))}
                  className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold transition ${cityFilter === "hotspots" ? "bg-rose text-white" : "bg-muted/40 text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {cityFilter === "hotspots" ? "Hotspot Only" : "Filter Hotspot"}
                </button>
              </div>

              <div className="space-y-1.5">
                {topTargetCities.length === 0 ? (
                  <p className="text-[0.7rem] text-muted-foreground">Mengumpulkan data serangan...</p>
                ) : (
                  topTargetCities.map(({ city, count }, idx) => {
                    const pct = Math.min(Math.round((count / (attacks.length || 1)) * 100), 100);
                    return (
                      <div key={city.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold ${idx === 0 ? "bg-rose text-white" : idx === 1 ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"
                            }`}>
                            {idx + 1}
                          </span>
                          <span className="font-medium truncate">{city.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[0.7rem]">
                          <span className="text-rose font-bold">{count}</span>
                          <span className="text-muted-foreground text-[0.65rem]">({pct}%)</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Continent Filter Chips (Bottom Overlay of Globe) */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2 lg:bottom-6 lg:left-6">
            {/* Row 1: Continents */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="flex items-center gap-1 text-[0.65rem] uppercase font-bold text-muted-foreground pr-1 shrink-0">
                <Globe2 className="h-3 w-3 text-cyan-400" /> Filter Benua:
              </span>
              {continents.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedContinent(c.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shrink-0 transition ${selectedContinent === c.id
                      ? "bg-foreground text-background shadow-md scale-105"
                      : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.label}
                </button>
              ))}
            </div>

            {/* Row 2: Attack Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="flex items-center gap-1 text-[0.65rem] uppercase font-bold text-muted-foreground pr-1 shrink-0">
                <Filter className="h-3 w-3" /> Vektor:
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium shrink-0 transition ${selectedCategory === "all"
                    ? "bg-rose text-white shadow-md shadow-rose/20"
                    : "glass-panel text-muted-foreground hover:text-foreground"
                  }`}
              >
                Semua Serangan
              </button>
              <button
                onClick={() => setSelectedCategory("critical")}
                className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 transition ${selectedCategory === "critical"
                    ? "bg-amber-500 text-white shadow-md"
                    : "glass-panel text-amber-400 hover:text-amber-300"
                  }`}
              >
                ⚠️ Level Kritis
              </button>
              {ATTACK_TYPES.slice(0, 4).map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedCategory(type.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium shrink-0 transition ${selectedCategory === type.id
                      ? "text-white shadow-md"
                      : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                  style={
                    selectedCategory === type.id
                      ? { backgroundColor: type.color }
                      : {}
                  }
                >
                  {type.icon} {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Dashboard Telemetry Stats & Feed */}
        <div className="flex w-full flex-col overflow-hidden border-l border-glass-border lg:w-[420px] lg:flex-column">
          {/* Stats Section (Top Panel) */}
          <div className="h-[35vh] overflow-y-auto border-b border-glass-border p-4 lg:h-[42%]">
            <h3 className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>📊 Telemetri Real-Time</span>
              <span className="text-[0.65rem] text-rose font-mono">{stats.attacksPerMinute} serangan/mnt</span>
            </h3>
            <CyberStats stats={stats} />
          </div>

          {/* Live Feed Section (Bottom Panel) */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>🔴 Live Attack Stream</span>
              <span className="flex items-center gap-1.5 text-[0.65rem] text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> STREAMING
              </span>
            </h3>
            <CyberFeed attacks={attacks} selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
