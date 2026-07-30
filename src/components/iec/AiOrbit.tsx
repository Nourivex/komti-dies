import { Cloud, Code2, Database, Lock, UserRound } from "lucide-react";

const nodes = [
  { icon: Code2, label: "Software", angle: -90 },
  { icon: Lock, label: "Security", angle: -18 },
  { icon: Cloud, label: "Cloud", angle: 54 },
  { icon: Database, label: "Data", angle: 126 },
  { icon: UserRound, label: "Product", angle: 198 },
];

/** Radar + orbit visualization for the AI Career Navigator card. */
export function AiOrbit() {
  const radius = 108;

  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="absolute h-52 w-52 rounded-full bg-[radial-gradient(circle,var(--wine),transparent_68%)] opacity-60 blur-2xl" />

      {[1, 0.72, 0.46].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-rose/25"
          style={{ width: 260 * scale, height: 260 * scale }}
        />
      ))}

      {/* radar sweep */}
      <div
        className="animate-spin-slow absolute h-[260px] w-[260px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--rose) 35%, transparent) 40deg, transparent 70deg)",
          maskImage: "radial-gradient(circle, black 62%, transparent 70%)",
        }}
      />

      <div className="animate-spin-reverse absolute h-[220px] w-[220px] rounded-full border border-dashed border-rose/20" />

      {/* center avatar */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-rose/40 bg-glass backdrop-blur-md">
        <UserRound className="h-7 w-7 text-rose" />
        <span className="absolute inset-0 animate-pulse-soft rounded-full shadow-[0_0_36px_var(--rose)]" />
      </div>

      {nodes.map(({ icon: Icon, label, angle }) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <div
            key={label}
            className="absolute"
            style={{
              transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`,
            }}
          >
            <div
              className="animate-float-slow flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass shadow-[0_0_28px_-8px_var(--wine)] backdrop-blur-md"
              style={{ animationDelay: `${(angle + 180) / 120}s` }}
            >
              <Icon className="h-4.5 w-4.5 text-foreground/80" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
