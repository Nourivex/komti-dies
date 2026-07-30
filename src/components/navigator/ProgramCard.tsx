import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { ProgramRecommendation } from "@/lib/navigator-scoring";

interface ProgramCardProps {
  recommendation: ProgramRecommendation;
}

const facultyColors: Record<string, string> = {
  saintek: "border-rose/40 bg-rose/5",
  soshum: "border-amber-500/30 bg-amber-500/5",
  psikopen: "border-violet-500/30 bg-violet-500/5",
  vokasi: "border-emerald-500/30 bg-emerald-500/5",
};

const facultyBadgeColors: Record<string, string> = {
  saintek: "border-rose/30 text-rose",
  soshum: "border-amber-500/30 text-amber-500",
  psikopen: "border-violet-500/30 text-violet-500",
  vokasi: "border-emerald-500/30 text-emerald-500",
};

export function ProgramCard({ recommendation }: ProgramCardProps) {
  const { program, faculty, matchReason, isPrimary } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-panel relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] ${
        facultyColors[faculty.id] || "border-glass-border"
      }`}
    >
      {isPrimary && (
        <div className="absolute right-3 top-3">
          <Badge
            variant="outline"
            className="border-rose/40 text-[0.6rem] text-rose"
          >
            Utama
          </Badge>
        </div>
      )}

      {/* Faculty badge */}
      <Badge
        variant="outline"
        className={`mb-3 text-[0.6rem] ${facultyBadgeColors[faculty.id] || ""}`}
      >
        {faculty.name.split("(")[0].trim()}
      </Badge>

      {/* Program name */}
      <h3 className="text-sm font-bold leading-snug sm:text-base">
        {program.name}
      </h3>

      {/* Type badge */}
      <span className="mt-2 inline-block rounded-full bg-background/60 px-2 py-0.5 text-[0.6rem] text-muted-foreground">
        {program.type}
        {program.isNew && " • Program Baru"}
      </span>

      {/* Reason */}
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {matchReason}
      </p>

      {/* Focus */}
      <p className="mt-2 text-[0.65rem] text-muted-foreground/60">
        {program.focus}
      </p>
    </motion.div>
  );
}
