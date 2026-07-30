import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Rocket } from "lucide-react";
import type { RoadmapStep } from "@/lib/navigator-data";

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
}

export function RoadmapTimeline({ steps }: RoadmapTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-rose/20" />

        <div className="space-y-6">
          {steps.map((step, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Step number */}
                <div className="absolute left-0 flex h-12 w-12 items-center justify-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                      isExpanded
                        ? "border-rose bg-rose text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                        : "border-glass-border bg-glass text-muted-foreground"
                    }`}
                  >
                    {i === 0 ? (
                      <Rocket className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                </div>

                {/* Step card */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="glass-panel w-full rounded-2xl p-5 text-left transition-all duration-300 hover:border-rose/30"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{step.title}</h3>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 space-y-2 overflow-hidden"
                      >
                        {step.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-rose" />
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
