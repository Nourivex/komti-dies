import { useCallback } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Share2,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { RadarProfile } from "./RadarProfile";
import { CareerMatchCard } from "./CareerMatchCard";
import { SkillGapBar } from "./SkillGapBar";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { ProgramCard } from "./ProgramCard";
import { CareerAccordion } from "./CareerAccordion";
import type { NavigatorResult } from "@/lib/navigator-adaptive-scoring";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface ResultDashboardProps {
  result: NavigatorResult;
  userName: string;
  onRestart: () => void;
}

export function ResultDashboard({
  result,
  userName,
  onRestart,
}: ResultDashboardProps) {
  const scrollToPrograms = useCallback(() => {
    document
      .getElementById("navigator-programs")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToConsult = useCallback(() => {
    document
      .getElementById("navigator-consult-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `AI Career Navigator - ${result.personaName}`,
      text: `Halo! Hasil analisis karierku: ${result.personaName}. Kecocokan tertinggi: ${result.topCareer.name} (${result.topCareer.matchPercent}%). Coba juga di IEC UHN!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard?.writeText(
          `${shareData.text}\n${shareData.url}`,
        );
        alert("Link sudah disalin ke clipboard!");
      }
    } catch {
      // user cancelled share
    }
  }, [result]);

  const handleDownload = useCallback(() => {
    const content = `
AI CAREER NAVATOR - HASIL ANALISIS
====================================
Halo ${userName}!

Profil: ${result.personaName}
${result.personaDescription}

REKOMENDASI KARIER:
${result.careerMatches.map((m, i) => `${i + 1}. ${m.name} (${m.matchPercent}% match) - ${m.tagline}`).join("\n")}

SKILL YANG PERLU DIKEMBANGKAN:
${result.skillGaps.map((g) => `- ${g.skill}: ${g.current}% → ${g.required}%`).join("\n")}

ROADMAP BELAJAR:
${result.roadmap.map((s, i) => `\n${i + 1}. ${s.title}\n${s.items.map((item) => `   - ${item}`).join("\n")}`).join("\n")}

JURUSAN YANG DIREKOMENDASIKAN:
${result.programs.map((p) => `- ${p.program.name} (${p.faculty.name}) - ${p.matchReason}`).join("\n")}

---
Hasil ini dihasilkan oleh AI Career Navigator
Informatics Experience Center - Universitas Harkat Negeri
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-navigator-${userName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [userName, result]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={onRestart}
          className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Mulai Ulang
        </button>
      </div>

      {/* ═══ SECTION 1: Hero Summary ═══ */}
      <motion.div
        {...fade(0)}
        className="glass-panel mb-12 rounded-3xl p-8 text-center sm:p-12"
      >
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Hasil Analisis
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold sm:text-5xl">
          Halo {userName}! 👋
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Berdasarkan jawabanmu, kamu memiliki kecenderungan sebagai
        </p>
        <h2 className="mt-2 text-gradient text-4xl font-bold sm:text-5xl">
          {result.personaName}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {result.personaDescription}
        </p>
      </motion.div>

      {/* ═══ SECTION 2: Radar Chart ═══ */}
      <motion.div {...fade(0.1)}>
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Profil Minat & Kepribadian
        </p>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
          Kamu punya kekuatan di...
        </h2>
        <RadarProfile scores={result.radarScores} />
        <p className="mt-4 text-center text-xs text-muted-foreground/60">
          * Hasil ini adalah gambaran awal berdasarkan jawabanmu.
        </p>
      </motion.div>

      {/* ═══ SECTION 3: Career Matches ═══ */}
      <motion.div {...fade(0.15)} className="mt-20">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Rekomendasi Karier
        </p>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
          Kamu paling cocok sebagai...
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {result.careerMatches.map((match, i) => (
            <CareerMatchCard key={match.careerId} match={match} rank={i + 1} />
          ))}
        </div>
      </motion.div>

      {/* ═══ SECTION 4: Skill Gap ═══ */}
      <motion.div {...fade(0.2)} className="mt-20">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Skill Gap Analysis
        </p>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
          Skill yang perlu kamu kembangkan
        </h2>
        <div className="mx-auto max-w-2xl space-y-5">
          {result.skillGaps.map((gap) => (
            <SkillGapBar key={gap.skill} gap={gap} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Sudah
            kuat
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> Perlu
            latihan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Belum mulai
          </span>
        </div>
      </motion.div>

      {/* ═══ SECTION 5: Roadmap ═══ */}
      <motion.div {...fade(0.25)} className="mt-20">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Roadmap Belajar
        </p>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
          Langkah-langkah menuju karier impianmu
        </h2>
        <RoadmapTimeline steps={result.roadmap} />
      </motion.div>

      {/* ═══ SECTION 6: Jurusan ═══ */}
      <motion.div
        id="navigator-programs"
        {...fade(0.3)}
        className="mt-20 scroll-mt-24"
      >
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Rekomendasi Jurusan
        </p>
        <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">
          Program studi yang mendukung kariermu
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Di Universitas Harkat Negeri, berikut jurusan yang paling relevan:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.programs.map((prog) => (
            <ProgramCard key={prog.program.code} recommendation={prog} />
          ))}
        </div>
      </motion.div>

      {/* ═══ SECTION 7: Career Details ═══ */}
      <motion.div {...fade(0.35)} className="mt-20">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
          Detail Karier
        </p>
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
          Kenali lebih dalam tentang kariermu
        </h2>
        <CareerAccordion matches={result.careerMatches} />
      </motion.div>

      {/* ═══ SECTION 8: Final CTAs ═══ */}
      <motion.div
        {...fade(0.4)}
        className="mt-20 glass-panel rounded-3xl p-8 text-center sm:p-12"
      >
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Langkah selanjutnya?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Jangan berhenti di sini! Ambil langkah nyata untuk memulai karier
          teknologimu.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={scrollToPrograms}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 hover:-translate-y-0.5"
          >
            <GraduationCap className="h-4 w-4" />
            Lihat Program Studi
          </button>
          <button
            onClick={scrollToConsult}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi dengan Dosen
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 hover:-translate-y-0.5"
          >
            <Share2 className="h-4 w-4" />
            Bagikan Hasil
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            Download Hasil
          </button>
        </div>
      </motion.div>

      {/* ═══ SECTION 9: Consultation ═══ */}
      <motion.div
        {...fade(0.45)}
        id="navigator-consult-section"
        className="mt-12 rounded-3xl border border-dashed border-rose/30 p-8 text-center"
      >
        <h3 className="text-lg font-semibold">💬 Konsultasi dengan Dosen</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Masih ragu dengan hasil analisismu? Yuk bicara langsung dengan dosen
          Fakultas Informatika Universitas Harkat Negeri!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:informatika@uhn.ac.id?subject=Konsultasi%20Karier%20-%20AI%20Career%20Navigator"
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-rose/40 hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Kirim Email
          </a>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Kak%2C%20saya%20ingin%20konsultasi%20karier%20setelah%20mengikuti%20AI%20Career%20Navigator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-0.5"
          >
            Chat WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground/60">
          Atau kunjungi booth IEC di Dies Natalis 2026 untuk konsultasi langsung
        </p>
      </motion.div>

      {/* ═══ Disclaimer ═══ */}
      <motion.p
        {...fade(0.5)}
        className="mt-12 text-center text-xs text-muted-foreground/50"
      >
        Hasil ini adalah gambaran awal berdasarkan jawabanmu. Untuk hasil yang
        lebih akurat, konsultasikan dengan dosen pembimbing.
      </motion.p>
    </motion.div>
  );
}
