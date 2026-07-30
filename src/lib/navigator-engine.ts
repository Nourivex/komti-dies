/**
 * Adaptive Career Navigator Engine
 *
 * Sistem pakar tanpa backend menggunakan Decision Tree + Weighted Scoring.
 * Soal dinamis berdasarkan jawaban sebelumnya — user merasa "dipahami".
 */

export type CareerId =
  | "ai_engineer"
  | "frontend_dev"
  | "uiux_designer"
  | "data_analyst"
  | "cyber_security"
  | "software_engineer"
  | "cloud_engineer"
  | "it_pm"
  | "digital_marketing"
  | "content_creator"
  | "graphic_designer"
  | "robotics_engineer"
  | "it_support"
  | "accountant"
  | "lawyer"
  | "edtech_dev"
  | "user_researcher";

export type InterestCluster =
  | "tech_logic"
  | "creative_visual"
  | "people_leadership"
  | "data_analysis"
  | "security_systems";

export interface AdaptiveOption {
  label: string;
  scores: Partial<Record<CareerId, number>>;
  cluster: InterestCluster;
  /** If set, this answer triggers a specific follow-up branch */
  branchTo?: string;
}

export interface AdaptiveQuestion {
  id: string;
  /** Phase 1 = broad detection, Phase 2 = deep dive per cluster */
  phase: 1 | 2;
  title: string;
  description?: string;
  options: AdaptiveOption[];
  /** Which cluster this question belongs to (for phase 2) */
  cluster?: InterestCluster;
}

export interface QuestionPath {
  questionId: string;
  answerIndex: number;
  cluster: InterestCluster;
}

// ═══════════════════════════════════════════════════════════
// PHASE 1: Broad Interest Detection (5 soal wajib)
// ═══════════════════════════════════════════════════════════
const PHASE_1_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: "p1_identitas",
    phase: 1,
    title: "Gimana cara kamu paling betah belajar sesuatu yang baru?",
    options: [
      {
        label: "Langsung praktek, bongkar-bongkar sendiri",
        scores: { software_engineer: 2, frontend_dev: 2, robotics_engineer: 3 },
        cluster: "tech_logic",
      },
      {
        label: "Lihat tutorial visual, tiru desain orang",
        scores: { uiux_designer: 3, graphic_designer: 3, content_creator: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Diskusi sama teman, tanya ke yang lebih tahu",
        scores: { it_pm: 3, digital_marketing: 2, user_researcher: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Baca artikel, cari data & fakta dulu",
        scores: { data_analyst: 3, ai_engineer: 2, lawyer: 2 },
        cluster: "data_analysis",
      },
    ],
  },
  {
    id: "p1_activation",
    phase: 1,
    title: "Kapan kamu merasa paling excited dan kepengen bikin sesuatu?",
    options: [
      {
        label: "Pas liat website/app keren dan kepengen bisa bikin",
        scores: { frontend_dev: 4, uiux_designer: 3, software_engineer: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Pas liat desain aesthetic, poster, atau konten viral",
        scores: { graphic_designer: 4, content_creator: 3, uiux_designer: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Pas ada masalah di sekolah/komunitas yang perlu diatasi",
        scores: { it_pm: 3, user_researcher: 3, lawyer: 2, edtech_dev: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Pas baca berita soal AI, data breach, atau gadget baru",
        scores: { ai_engineer: 3, cyber_security: 3, data_analyst: 2 },
        cluster: "data_analysis",
      },
    ],
  },
  {
    id: "p1_pride",
    phase: 1,
    title: "Karya apa yang paling bikin kamu bangga kalau berhasil kamu buat?",
    options: [
      {
        label: "Aplikasi/web yang beneran dipakai orang banyak",
        scores: { software_engineer: 3, frontend_dev: 4, cloud_engineer: 1 },
        cluster: "tech_logic",
      },
      {
        label: "Desain/visual yang bikin orang bilang 'wow keren!'",
        scores: { uiux_designer: 4, graphic_designer: 4, content_creator: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Sistem yang bikin hidup orang lebih gampang",
        scores: { it_pm: 3, edtech_dev: 3, user_researcher: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Analisis/prediksi yang ternyata bener dan berguna",
        scores: { data_analyst: 4, ai_engineer: 3, accountant: 2 },
        cluster: "data_analysis",
      },
    ],
  },
  {
    id: "p1_problem",
    phase: 1,
    title:
      "Kalau kamu nemuin bug atau error di komputer, apa reaksi pertamamu?",
    options: [
      {
        label: "Langsung googling error message-nya, cari solusi",
        scores: { software_engineer: 3, it_support: 3, cyber_security: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Coba restart dulu, kalo masih error baru cari bantuan",
        scores: { it_support: 4, cloud_engineer: 1 },
        cluster: "tech_logic",
      },
      {
        label: "Screenshot, share ke grup, minta tolong",
        scores: { it_pm: 2, digital_marketing: 2, content_creator: 1 },
        cluster: "people_leadership",
      },
      {
        label: "Bingung, males, langsung minta orang lain yang benerin",
        scores: { digital_marketing: 2, content_creator: 3 },
        cluster: "creative_visual",
      },
    ],
  },
  {
    id: "p1_goal",
    phase: 1,
    title: "Dalam 5 tahun, kamu pengen dikenal sebagai siapa?",
    options: [
      {
        label: "Developer yang bikin produk digital canggih",
        scores: { software_engineer: 4, ai_engineer: 3, frontend_dev: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Desainer yang bikin produk jadi estetik & mudah dipakai",
        scores: { uiux_designer: 4, graphic_designer: 3, content_creator: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Pemimpin tim IT atau Founder startup",
        scores: { it_pm: 4, digital_marketing: 2, lawyer: 1 },
        cluster: "people_leadership",
      },
      {
        label: "Peneliti/Detektif data yang jago ngolah informasi",
        scores: { data_analyst: 4, ai_engineer: 3, cyber_security: 2 },
        cluster: "data_analysis",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// PHASE 2: Deep Dive per Cluster (3-5 soal per cluster)
// User hanya melihat soal dari cluster yang paling kuat
// ═══════════════════════════════════════════════════════════
const PHASE_2_QUESTIONS: AdaptiveQuestion[] = [
  // ─── TECH & LOGIC ──────────────────────────────────────
  {
    id: "p2_tech_1",
    phase: 2,
    cluster: "tech_logic",
    title: "Kalau liat website keren, kamu lebih penasaran sama...",
    options: [
      {
        label: "Kode di baliknya — gimana cara kerjanya?",
        scores: { software_engineer: 3, frontend_dev: 3 },
        cluster: "tech_logic",
      },
      {
        label: "Tampilan & animasinya — gimana cara bikin smooth?",
        scores: { frontend_dev: 4, uiux_designer: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Keamanannya — apakah data aku aman di sini?",
        scores: { cyber_security: 4, cloud_engineer: 2 },
        cluster: "tech_logic",
      },
    ],
  },
  {
    id: "p2_tech_2",
    phase: 2,
    cluster: "tech_logic",
    title: "Bahasa pemrograman mana yang paling menarik buat kamu?",
    options: [
      {
        label: "JavaScript/TypeScript — bikin website interaktif",
        scores: { frontend_dev: 4, software_engineer: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Python — data science, AI, automation",
        scores: { ai_engineer: 3, data_analyst: 3, software_engineer: 2 },
        cluster: "data_analysis",
      },
      {
        label: "Belum tau, yang penting bisa solve masalah",
        scores: { software_engineer: 2, it_support: 2 },
        cluster: "tech_logic",
      },
    ],
  },
  {
    id: "p2_tech_3",
    phase: 2,
    cluster: "tech_logic",
    title: "Server down tengah malam. Kamu...",
    options: [
      {
        label: "Langsung login, cek log, diagnose masalah",
        scores: { cyber_security: 3, cloud_engineer: 4, it_support: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Panggil tim, koordinasi siapa yang handle",
        scores: { it_pm: 4, cloud_engineer: 1 },
        cluster: "people_leadership",
      },
      {
        label: "Coba restart dulu, kalo masih error baru panik",
        scores: { it_support: 3, software_engineer: 1 },
        cluster: "tech_logic",
      },
    ],
  },

  // ─── CREATIVE & VISUAL ─────────────────────────────────
  {
    id: "p2_creative_1",
    phase: 2,
    cluster: "creative_visual",
    title: "Tool desain mana yang paling kamu pengen kuasai?",
    options: [
      {
        label: "Figma — bikin UI/UX prototype",
        scores: { uiux_designer: 5, frontend_dev: 1 },
        cluster: "creative_visual",
      },
      {
        label: "Adobe Illustrator/Photoshop — desain grafis",
        scores: { graphic_designer: 5, content_creator: 1 },
        cluster: "creative_visual",
      },
      {
        label: "CapCut/Premiere — bikin konten video",
        scores: { content_creator: 5, digital_marketing: 2 },
        cluster: "creative_visual",
      },
    ],
  },
  {
    id: "p2_creative_2",
    phase: 2,
    cluster: "creative_visual",
    title: "Konten apa yang paling sering kamu konsumsi?",
    options: [
      {
        label: "Tutorial coding / dev vlog",
        scores: { frontend_dev: 3, software_engineer: 2 },
        cluster: "tech_logic",
      },
      {
        label: "Design inspiration / behance / dribbble",
        scores: { uiux_designer: 3, graphic_designer: 4 },
        cluster: "creative_visual",
      },
      {
        label: "YouTuber/TikToker yang bikin konten edukasi",
        scores: { content_creator: 4, edtech_dev: 2 },
        cluster: "creative_visual",
      },
    ],
  },
  {
    id: "p2_creative_3",
    phase: 2,
    cluster: "creative_visual",
    title: "Kalau kamu disuruh bikin poster acara sekolah, kamu...",
    options: [
      {
        label: "Desain dari nol di Canva/Figma, mikirin layout & warna",
        scores: { graphic_designer: 4, uiux_designer: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Pakai template, tinggal ganti teks & foto",
        scores: { content_creator: 3, digital_marketing: 2 },
        cluster: "creative_visual",
      },
      {
        label: "Minta tolong temen yang jago desain",
        scores: { it_pm: 2, digital_marketing: 3 },
        cluster: "people_leadership",
      },
    ],
  },

  // ─── PEOPLE & LEADERSHIP ───────────────────────────────
  {
    id: "p2_people_1",
    phase: 2,
    cluster: "people_leadership",
    title: "Di kelompok tugas, peran apa yang paling sering kamu ambil?",
    options: [
      {
        label: "Yang atur jadwal & bagi tugas",
        scores: { it_pm: 5, digital_marketing: 1 },
        cluster: "people_leadership",
      },
      {
        label: "Yang presentasi di depan kelas",
        scores: { digital_marketing: 3, lawyer: 3, user_researcher: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Yang cari data & riset",
        scores: { data_analyst: 3, user_researcher: 3 },
        cluster: "data_analysis",
      },
      {
        label: "Yang bikin tampilan/ppt paling keren",
        scores: { uiux_designer: 3, graphic_designer: 2, content_creator: 2 },
        cluster: "creative_visual",
      },
    ],
  },
  {
    id: "p2_people_2",
    phase: 2,
    cluster: "people_leadership",
    title: "Masalah sosial apa yang paling bikin kamu tergerak?",
    options: [
      {
        label: "Siswa yang kurang paham teknologi",
        scores: { edtech_dev: 4, user_researcher: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Ketidakadilan hukum / diskriminasi",
        scores: { lawyer: 4, user_researcher: 2 },
        cluster: "people_leadership",
      },
      {
        label: "Pemasaran UMKM yang belum go digital",
        scores: { digital_marketing: 4, it_pm: 2 },
        cluster: "people_leadership",
      },
    ],
  },
  {
    id: "p2_people_3",
    phase: 2,
    cluster: "people_leadership",
    title: "Gimana cara kamu mempengaruhi orang lain?",
    options: [
      {
        label: "Data & fakta — kalo aku bisa buktikan, mereka pasti percaya",
        scores: { data_analyst: 3, lawyer: 3, accountant: 2 },
        cluster: "data_analysis",
      },
      {
        label: "Cerita & emosi — kalo aku bisa bikin mereka relate",
        scores: {
          content_creator: 3,
          digital_marketing: 3,
          user_researcher: 2,
        },
        cluster: "creative_visual",
      },
      {
        label: "Logika & solusi — kalo aku bisa kasih jalan keluar",
        scores: { it_pm: 4, software_engineer: 2 },
        cluster: "tech_logic",
      },
    ],
  },

  // ─── DATA & ANALYSIS ───────────────────────────────────
  {
    id: "p2_data_1",
    phase: 2,
    cluster: "data_analysis",
    title: "Data apa yang paling menarik buat kamu?",
    options: [
      {
        label: "Data pengguna — kenapa orang pakai aplikasi ini?",
        scores: { uiux_designer: 2, data_analyst: 4, user_researcher: 3 },
        cluster: "data_analysis",
      },
      {
        label: "Data keuangan — profit, revenue, cash flow",
        scores: { accountant: 4, it_pm: 2, data_analyst: 2 },
        cluster: "data_analysis",
      },
      {
        label: "Data tren — apa yang bakal happen next?",
        scores: { ai_engineer: 3, data_analyst: 4, digital_marketing: 2 },
        cluster: "data_analysis",
      },
    ],
  },
  {
    id: "p2_data_2",
    phase: 2,
    cluster: "data_analysis",
    title: "Tool mana yang paling kamu pengen kuasai?",
    options: [
      {
        label: "Excel / Google Sheets tingkat lanjut",
        scores: { accountant: 3, data_analyst: 3, it_pm: 2 },
        cluster: "data_analysis",
      },
      {
        label: "Python / SQL untuk query data",
        scores: { data_analyst: 4, ai_engineer: 3 },
        cluster: "data_analysis",
      },
      {
        label: "Tableau / Power BI untuk visualisasi",
        scores: { data_analyst: 4, digital_marketing: 2 },
        cluster: "data_analysis",
      },
    ],
  },
  {
    id: "p2_data_3",
    phase: 2,
    cluster: "data_analysis",
    title: "AI menurut kamu paling berguna untuk...",
    options: [
      {
        label: "Prediksi — forecast penjualan, cuaca, tren",
        scores: { ai_engineer: 4, data_analyst: 3 },
        cluster: "data_analysis",
      },
      {
        label: "Otomasi — bikin kerjaan repetitif jadi cepat",
        scores: { software_engineer: 3, ai_engineer: 3, it_support: 1 },
        cluster: "tech_logic",
      },
      {
        label: "Kreativitas — generate gambar, musik, teks",
        scores: { content_creator: 3, ai_engineer: 2, graphic_designer: 2 },
        cluster: "creative_visual",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// ADAPTIVE ENGINE
// ═══════════════════════════════════════════════════════════

export interface NavigatorState {
  phase: 1 | 2 | "done";
  currentQuestionIndex: number;
  questions: AdaptiveQuestion[];
  answers: Map<string, number>;
  clusterScores: Record<InterestCluster, number>;
}

/**
 * Hitung skor cluster dari semua jawaban
 */
function calculateClusterScores(
  answers: Map<string, number>,
  allQuestions: AdaptiveQuestion[],
): Record<InterestCluster, number> {
  const scores: Record<InterestCluster, number> = {
    tech_logic: 0,
    creative_visual: 0,
    people_leadership: 0,
    data_analysis: 0,
    security_systems: 0,
  };

  for (const [questionId, answerIndex] of answers) {
    const question = allQuestions.find((q) => q.id === questionId);
    if (!question) continue;
    const option = question.options[answerIndex];
    if (!option) continue;
    scores[option.cluster] += 1;
  }

  return scores;
}

/**
 * Ambil top 2 cluster dari phase 1
 */
function getTopClusters(
  clusterScores: Record<InterestCluster, number>,
): InterestCluster[] {
  const sorted = Object.entries(clusterScores)
    .sort(([, a], [, b]) => b - a)
    .filter(([, score]) => score > 0);
  return sorted.slice(0, 2).map(([cluster]) => cluster as InterestCluster);
}

/**
 * Inisialisasi state baru
 */
export function createInitialState(): NavigatorState {
  return {
    phase: 1,
    currentQuestionIndex: 0,
    questions: [...PHASE_1_QUESTIONS],
    answers: new Map(),
    clusterScores: {
      tech_logic: 0,
      creative_visual: 0,
      people_leadership: 0,
      data_analysis: 0,
      security_systems: 0,
    },
  };
}

/**
 * Dapatkan soal saat ini
 */
export function getCurrentQuestion(
  state: NavigatorState,
): AdaptiveQuestion | null {
  if (state.phase === "done") return null;
  return state.questions[state.currentQuestionIndex] || null;
}

/**
 * Proses jawaban user dan tentukan soal berikutnya
 */
export function submitAnswer(
  state: NavigatorState,
  answerIndex: number,
): NavigatorState {
  const currentQ = getCurrentQuestion(state);
  if (!currentQ) return state;

  const newAnswers = new Map(state.answers);
  newAnswers.set(currentQ.id, answerIndex);

  const newClusterScores = calculateClusterScores(newAnswers, [
    ...PHASE_1_QUESTIONS,
    ...PHASE_2_QUESTIONS,
  ]);

  const nextIndex = state.currentQuestionIndex + 1;

  // Fase 1 selesai → tentukan phase 2 questions
  if (state.phase === 1 && nextIndex >= PHASE_1_QUESTIONS.length) {
    const topClusters = getTopClusters(newClusterScores);

    // Ambil 3-5 soal per cluster teratas
    const phase2Questions = PHASE_2_QUESTIONS.filter((q) =>
      topClusters.includes(q.cluster!),
    ).slice(0, 9); // Max 9 phase 2 questions

    return {
      ...state,
      phase: 2,
      currentQuestionIndex: 0,
      questions: phase2Questions,
      answers: newAnswers,
      clusterScores: newClusterScores,
    };
  }

  // Fase 2 selesai → done
  if (state.phase === 2 && nextIndex >= state.questions.length) {
    return {
      ...state,
      phase: "done",
      currentQuestionIndex: nextIndex,
      answers: newAnswers,
      clusterScores: newClusterScores,
    };
  }

  // Lanjut soal berikutnya
  return {
    ...state,
    currentQuestionIndex: nextIndex,
    answers: newAnswers,
    clusterScores: newClusterScores,
  };
}

/**
 * Dapatkan total progress (0-100)
 */
export function getProgress(state: NavigatorState): number {
  if (state.phase === "done") return 100;
  const totalQuestions = state.questions.length;
  const answered = state.currentQuestionIndex;
  const basePercent = state.phase === 1 ? 0 : 50;
  return basePercent + (answered / totalQuestions) * 50;
}

/**
 * Dapatkan jumlah total soal yang sudah & akan dijawab
 */
export function getQuestionCount(state: NavigatorState): {
  current: number;
  total: number;
} {
  if (state.phase === "done") {
    return { current: state.questions.length, total: state.questions.length };
  }
  return {
    current: state.currentQuestionIndex + 1,
    total: state.questions.length,
  };
}
