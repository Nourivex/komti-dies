import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./WelcomeScreen";
import { QuestionWizard } from "./QuestionWizard";
import { ProcessingScreen } from "./ProcessingScreen";
import { ResultDashboard } from "./ResultDashboard";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../ThemeProvider";
import {
  createInitialState,
  submitAnswer,
  getCurrentQuestion,
  type NavigatorState,
} from "@/lib/navigator-engine";
import type { NavigatorResult } from "@/lib/navigator-adaptive-scoring";

type Screen = "welcome" | "questionnaire" | "processing" | "results";

export function NavigatorPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [userName, setUserName] = useState("");
  const [navState, setNavState] =
    useState<NavigatorState>(createInitialState());
  const [result, setResult] = useState<NavigatorResult | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleStart = useCallback((name: string) => {
    setUserName(name);
    setNavState(createInitialState());
    setScreen("questionnaire");
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    setNavState((prev) => submitAnswer(prev, answerIndex));
  }, []);

  const handleQuestionnaireComplete = useCallback(() => {
    setScreen("processing");
  }, []);

  const handleProcessingDone = useCallback((resultData: NavigatorResult) => {
    setResult(resultData);
    setScreen("results");
  }, []);

  const handleRestart = useCallback(() => {
    setScreen("welcome");
    setUserName("");
    setNavState(createInitialState());
    setResult(null);
  }, []);

  const currentQuestion = getCurrentQuestion(navState);

  return (
    <section id="navigator" className="relative min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Theme Toggle */}
        <div className="mb-8 flex justify-end">
          <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} />
        </div>

        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}
          {screen === "questionnaire" && currentQuestion && (
            <QuestionWizard
              key={`q-${currentQuestion.id}`}
              question={currentQuestion}
              questionIndex={navState.currentQuestionIndex}
              totalQuestions={navState.questions.length}
              phase={navState.phase}
              userName={userName}
              onAnswer={handleAnswer}
              onComplete={handleQuestionnaireComplete}
              onBack={() => setScreen("welcome")}
            />
          )}
          {screen === "processing" && (
            <ProcessingScreen
              key="processing"
              navState={navState}
              userName={userName}
              onDone={handleProcessingDone}
            />
          )}
          {screen === "results" && result && (
            <ResultDashboard
              key="results"
              result={result}
              userName={userName}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
