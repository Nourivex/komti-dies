import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { calculateAdaptiveResult } from "@/lib/navigator-adaptive-scoring";
import {
  PHASE_1_LOOKUP,
  PHASE_2_LOOKUP,
} from "@/lib/navigator-questions-lookup";
import type { NavigatorState } from "@/lib/navigator-engine";
import type { NavigatorResult } from "@/lib/navigator-adaptive-scoring";

const steps = [
  "Memahami minatmu",
  "Menganalisis kemampuan",
  "Mencocokkan dengan profesi",
  "Menyusun roadmap karier",
];

interface ProcessingScreenProps {
  navState: NavigatorState;
  userName: string;
  onDone: (result: NavigatorResult) => void;
}

export function ProcessingScreen({ navState, onDone }: ProcessingScreenProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    steps.forEach((_, i) => {
      setTimeout(
        () => {
          setCompletedSteps((prev) => [...prev, i]);
        },
        (i + 1) * 1200,
      );
    });

    const timer = setTimeout(
      () => {
        // Merge both question lookups
        const questionsMap = new Map([...PHASE_1_LOOKUP, ...PHASE_2_LOOKUP]);
        const result = calculateAdaptiveResult(navState, questionsMap);
        onDone(result);
      },
      steps.length * 1200 + 800,
    );

    return () => clearTimeout(timer);
  }, [navState, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-20 text-center"
    >
      {/* Animated aura */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,var(--rose),transparent_70%)] blur-2xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative flex h-32 w-32 items-center justify-center rounded-full border border-rose/20"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-rose/30 bg-glass backdrop-blur-md"
          >
            <span className="text-3xl">🧠</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 text-lg font-medium text-foreground/90"
      >
        {completedSteps.length < steps.length
          ? "Menganalisis jawabanmu..."
          : "Selesai! Menyiapkan hasil..."}
      </motion.p>

      {/* Checklist steps */}
      <div className="space-y-4">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.includes(i);
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isCompleted ? 1 : 0.3,
                x: 0,
              }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                className={`h-5 w-5 transition-colors duration-300 ${
                  isCompleted ? "text-rose" : "text-muted-foreground/30"
                }`}
              />
              <span
                className={`text-sm transition-colors duration-300 ${
                  isCompleted ? "text-foreground" : "text-muted-foreground/40"
                }`}
              >
                {step}
              </span>
              {isCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs text-rose"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-10 text-sm text-muted-foreground"
      >
        Sedikit lagi...
      </motion.div>
    </motion.div>
  );
}
