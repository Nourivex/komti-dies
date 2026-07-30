import { useMemo } from "react";
import logoUhn from "@/assets/uhn.png";

/** Ambient scene: radial gradients, PCB traces, floating particles, noise, logo watermark. */
export function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37.5) % 100,
        top: (i * 61.7) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 9) * 0.9,
        duration: 9 + ((i * 3) % 11),
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* large radial glows */}
      <div className="absolute -top-[28rem] left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--wine)_0%,transparent_62%)] opacity-45 blur-[40px]" />
      <div className="absolute -left-64 top-1/3 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,var(--burgundy)_0%,transparent_65%)] opacity-40 blur-[30px]" />
      <div className="absolute -right-72 top-2/3 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,var(--rose)_0%,transparent_68%)] opacity-20 blur-[40px]" />

      {/* PCB circuit pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden>
        <defs>
          <pattern id="pcb" width="180" height="180" patternUnits="userSpaceOnUse">
            <path
              d="M10 10h60v40h50v70M170 20h-40v60h-60v90M90 0v30M30 170v-50h60"
              fill="none"
              stroke="var(--rose)"
              strokeWidth="1"
            />
            <circle cx="70" cy="50" r="3" fill="var(--rose)" />
            <circle cx="120" cy="120" r="3" fill="var(--rose)" />
            <circle cx="130" cy="20" r="2.5" fill="var(--rose)" />
          </pattern>
          <radialGradient id="pcbFade" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="pcbMask">
            <rect width="100%" height="100%" fill="url(#pcbFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb)" mask="url(#pcbMask)" />
      </svg>

      {/* animated glowing lines */}
      <div className="absolute left-0 top-[22%] h-px w-full overflow-hidden opacity-70">
        <div className="animate-sweep h-full w-1/2 bg-[var(--gradient-line)]" />
      </div>
      <div className="absolute left-0 top-[68%] h-px w-full overflow-hidden opacity-50">
        <div
          className="animate-sweep h-full w-1/3 bg-[var(--gradient-line)]"
          style={{ animationDelay: "2.2s" }}
        />
      </div>

      {/* logo watermark */}
      <img
        src={logoUhn}
        alt=""
        className="absolute -bottom-24 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 opacity-[0.18] object-contain brightness-150"
        aria-hidden
      />

      {/* floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float-slow absolute rounded-full bg-rose/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: "0 0 10px var(--rose)",
          }}
        />
      ))}

      {/* noise */}
      <div className="noise-layer absolute inset-0 opacity-[0.035] mix-blend-soft-light" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_95%)]" />
    </div>
  );
}
