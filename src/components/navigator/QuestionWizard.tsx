import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { AdaptiveQuestion } from "@/lib/navigator-engine";

interface QuestionWizardProps {
  question: AdaptiveQuestion;
  questionIndex: number;
  totalQuestions: number;
  phase: 1 | 2 | "done";
  userName: string;
  onAnswer: (answerIndex: number) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function QuestionWizard({
  question,
  questionIndex,
  totalQuestions,
  phase,
  userName,
  onAnswer,
  onComplete,
  onBack,
}: QuestionWizardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const progress =
    phase === 1
      ? (questionIndex / 10) * 50
      : 50 + (questionIndex / totalQuestions) * 50;

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;

    setDirection(1);
    onAnswer(selectedIndex);

    // Check if this was the last question
    if (phase === 2 && questionIndex >= totalQuestions - 1) {
      setTimeout(() => onComplete(), 100);
    }
  };

  const handlePrev = () => {
    if (questionIndex === 0) {
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
        <div className="flex items-center gap-3">
          {phase === 2 && (
            <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-medium text-rose">
              <Sparkles className="h-3 w-3" />
              Deep Dive
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{phase === 1 ? "Deteksi Minat" : "Analisis Mendalam"}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-3xl p-8 sm:p-10"
          >
            {/* Phase indicator */}
            {questionIndex === 0 && phase === 1 && (
              <p className="mb-4 text-sm text-rose">
                Halo {userName}! 👋 Yuk mulai kenali minatmu.
              </p>
            )}
            {questionIndex === 0 && phase === 2 && (
              <p className="mb-4 text-sm text-rose">
                ✨ Berdasarkan jawabanmu, kita dalami lagi ya!
              </p>
            )}

            {/* Question */}
            <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
              {question.title}
            </h2>

            {question.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {question.description}
              </p>
            )}

            {/* Options */}
            <div className="mt-8 space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-rose/60 bg-rose/10 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                        : "border-glass-border bg-background/40 hover:border-rose/30 hover:bg-background/60"
                    }`}
                  >
                    {/* Indicator */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "border-rose bg-rose text-white"
                          : "border-glass-border bg-glass text-transparent"
                      }`}
                    >
                      {isSelected ? (
                        <span className="text-xs font-bold">✓</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )}
                    </span>

                    {/* Label */}
                    <span
                      className={`text-sm transition-colors sm:text-base ${
                        isSelected ? "text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          disabled={selectedIndex === null}
          className="glass-panel flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {phase === 2 && questionIndex >= totalQuestions - 1
            ? "Lihat Hasil"
            : "Lanjut"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
