import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { CareerMatch } from "@/lib/navigator-scoring";

interface CareerMatchCardProps {
  match: CareerMatch;
  rank: number;
}

const rankColors = [
  "border-rose/60 bg-rose/10", // 1st
  "border-amber-500/40 bg-amber-500/5", // 2nd
  "border-sky-500/30 bg-sky-500/5", // 3rd
];

const rankBadges = ["🏆 Top Match", "🥈 Alternatif 1", "🥉 Alternatif 2"];

export function CareerMatchCard({ match, rank }: CareerMatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className={`glass-panel group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
        rankColors[rank - 1] || rankColors[2]
      }`}
    >
      {/* Rank badge */}
      <Badge variant="outline" className="mb-4 border-rose/30 text-[0.65rem]">
        {rankBadges[rank - 1] || `#${rank}`}
      </Badge>

      {/* Career name */}
      <h3 className="text-xl font-bold">{match.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{match.tagline}</p>

      {/* Match percentage */}
      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-14 w-14">
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="var(--rose)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(match.matchPercent / 100) * 150.8} 150.8`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {match.matchPercent}%
          </span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Kecocokan</p>
          <p className="text-sm font-semibold">{match.matchPercent}% Match</p>
        </div>
      </div>

      {/* Reasons */}
      {match.reasons.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Kenapa cocok:
          </p>
          <ul className="space-y-1.5">
            {match.reasons.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-foreground/80"
              >
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {match.topSkills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-glass-border bg-background/40 px-2 py-0.5 text-[0.65rem] text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
