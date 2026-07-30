import { useState } from "react";
import { motion } from "motion/react";
import { Brain, Clock, CheckCircle2, ArrowRight, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const benefits = [
  "Profil minat & kepribadian",
  "Rekomendasi karier teknologi",
  "Skill gap analysis",
  "Roadmap belajar personal",
  "Rekomendasi jurusan di UHN",
];

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setNameError(true);
      return;
    }
    setNameError(false);
    onStart(trimmed);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      {/* Hero Icon */}
      <motion.div {...fade(0.05)} className="mb-8">
        <span className="glass-panel flex h-20 w-20 items-center justify-center rounded-3xl">
          <Brain className="h-10 w-10 text-rose" />
        </span>
      </motion.div>

      {/* Badge */}
      <motion.div {...fade(0.1)}>
        <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-foreground/80">
          AI Career Navigator
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        {...fade(0.15)}
        className="mt-6 text-balance text-3xl font-semibold leading-tight sm:text-5xl"
      >
        Temukan jalur karier{" "}
        <span className="text-gradient">teknologi masa depanmu</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        {...fade(0.25)}
        className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Temukan jalur karier teknologi yang paling sesuai dengan minat,
        kemampuan, dan potensimu dengan bantuan kecerdasan buatan.
      </motion.p>

      {/* Time estimate */}
      <motion.div
        {...fade(0.3)}
        className="glass-panel mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2"
      >
        <Clock className="h-4 w-4 text-rose" />
        <span className="text-sm text-foreground/80">
          Estimasi waktu: <strong className="text-foreground">3–5 menit</strong>
        </span>
      </motion.div>

      {/* Benefits */}
      <motion.ul {...fade(0.35)} className="mt-8 space-y-3">
        {benefits.map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 text-sm text-foreground/80"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-rose" />
            {b}
          </li>
        ))}
      </motion.ul>

      {/* Name Input */}
      <motion.div {...fade(0.4)} className="mt-10 w-full max-w-sm">
        <label
          htmlFor="navigator-name"
          className="mb-2 block text-left text-sm text-muted-foreground"
        >
          Siapa nama kamu?
        </label>
        <Input
          id="navigator-name"
          placeholder="Minimal 3 huruf..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          className={`glass-panel h-12 rounded-2xl border-glass-border bg-glass text-center text-base placeholder:text-muted-foreground/50 ${
            nameError ? "border-red-500/60" : ""
          }`}
        />
        {nameError && (
          <p className="mt-2 text-center text-xs text-red-400">
            Nama harus minimal 3 huruf
          </p>
        )}
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...fade(0.45)}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-[image:var(--gradient-cta)] text-primary-foreground shadow-[0_18px_45px_-18px_var(--wine)] hover:shadow-[0_22px_60px_-14px_var(--rose)] hover:-translate-y-0.5 h-14 px-9 text-base"
        >
          Mulai Analisis
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => setShowExample(!showExample)}
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring glass-panel text-foreground/90 hover:text-foreground hover:border-rose/40 hover:-translate-y-0.5 h-12 px-7 text-[0.95rem]"
        >
          <Eye className="h-4 w-4" />
          {showExample ? "Sembunyikan" : "Lihat Contoh Hasil"}
        </button>
      </motion.div>

      {/* Example Preview */}
      {showExample && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-panel mt-10 w-full max-w-md overflow-hidden rounded-3xl p-6 text-left"
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
            Contoh Hasil
          </p>
          <p className="mt-3 text-lg font-semibold">
            Halo Budi! Kamu adalah tipe{" "}
            <span className="text-rose">Frontend Developer</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Berdasarkan jawabanmu, kamu memiliki kecenderungan kuat dalam
            kreativitas dan pemrograman. Kamu cocok menjadi Frontend Developer!
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["AI Engineer 92%", "UI/UX Designer 85%", "Data Analyst 78%"].map(
              (c) => (
                <div
                  key={c}
                  className="rounded-xl border border-glass-border bg-background/60 p-2 text-center text-xs"
                >
                  {c}
                </div>
              ),
            )}
          </div>
        </motion.div>
      )}

      {/* Back to home */}
      <motion.p {...fade(0.5)} className="mt-12 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">
          ← Kembali ke Beranda
        </a>
      </motion.p>
    </motion.div>
  );
}
