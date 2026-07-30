import { motion } from "motion/react";
import type { SkillGapData } from "@/lib/navigator-scoring";

interface SkillGapBarProps {
  gap: SkillGapData;
}

const levelColors = {
  strong: "bg-emerald-500",
  learning: "bg-yellow-500",
  not_started: "bg-sky-500",
};

export function SkillGapBar({ gap }: SkillGapBarProps) {
  const barColor = levelColors[gap.level];

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{gap.skill}</span>
        <span className="text-xs text-muted-foreground">
          {gap.current}% / {gap.required}%
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/10">
        {/* Required level marker */}
        <div
          className="absolute inset-y-0 z-10 w-px bg-foreground/30"
          style={{ left: `${gap.required}%` }}
        />
        {/* Current level */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${gap.current}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-y-0 rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}
