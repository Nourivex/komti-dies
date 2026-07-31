/**
 * TikaPage v2 - Full-page TIKA Campus Assistant
 *
 * Uses comprehensive knowledge base from tika-knowledge.ts
 */

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Send,
  Bot,
  Sparkles,
  GraduationCap,
  MapPin,
  BookOpen,
  Briefcase,
  HelpCircle,
  Building2,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { OrbitControls } from "@react-three/drei";
import { TikaGLBLoader } from "./TikaGLBLoader";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/navigator/ThemeToggle";
import {
  UHN_PROFILE,
  CAMPUSES,
  FACULTIES,
  PROGRAM_DETAILS,
  ALL_PROGRAMS,
  FACILITIES,
  ORGANIZATIONS,
  CAREER_PROSPECTS,
  SCHOLARSHIPS,
  ADMISSION,
  CONTACTS,
  INDUSTRY_PARTNERS,
  ACHIEVEMENTS,
} from "@/lib/tika-knowledge";

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

// ═══════════════════════════════════════════════════════════
// SMART RESPONSE ENGINE
// ═══════════════════════════════════════════════════════════

function findResponse(input: string): string {
  const text = input.toLowerCase().trim();

  // Greetings
  if (match(text, ["halo", "hai", "hi", "hello", "hey", "selamat"])) {
    return `Halo! 👋 Aku TIKA, asisten digital ${UHN_PROFILE.name}. Ada yang bisa aku bantu seputar kampus?`;
  }

  // Self intro
  if (match(text, ["siapa kamu", "kamu siapa", "apa itu tika"])) {
    return `Aku TIKA (Teknik Informatika Knowledge Assistant) 🤖\n\nAsisten digital dari komunitas Teknik Informatika ${UHN_PROFILE.abbreviation}. Aku dirancang buat bantu calon mahasiswa dan masyarakat umum dengan info seputar kampus.\n\nAda yang mau ditanyakan? 😊`;
  }

  // Profile & History
  if (
    match(text, [
      "tentang",
      "profil",
      "sejarah",
      "uhn",
      "universitas harkat",
      "harkat negeri",
    ])
  ) {
    return `${UHN_PROFILE.name} (${UHN_PROFILE.abbreviation})\n\n📋 ${UHN_PROFILE.status}\n📅 Berdiri: ${UHN_PROFILE.founded}\n🎯 "${UHN_PROFILE.tagline}"\n\n📍 ${CAMPUSES.length} Kampus:\n${CAMPUSES.map((c) => `• ${c.name}: ${c.address.split(",").slice(0, 2).join(",")}`).join("\n")}\n\n🌐 ${CONTACTS.website}\n📞 ${CONTACTS.hotline}`;
  }

  // Vision & Mission
  if (match(text, ["visi", "misi"])) {
    return `Visi ${UHN_PROFILE.abbreviation}:\n"${UHN_PROFILE.vision}"\n\nMisi:\n1. Menyelenggarakan pendidikan tinggi berkualitas berbasis digital\n2. Melaksanakan penelitian terapan yang inovatif\n3. Menjalin kemitraan strategis dengan industri`;
  }

  // Faculties & Programs
  if (
    match(text, [
      "fakultas",
      "program studi",
      "prodi",
      "jurusan",
      "kuliah apa",
      "ambil apa",
    ])
  ) {
    const s1 = ALL_PROGRAMS.filter((p) => p.level === "S1");
    const d4 = ALL_PROGRAMS.filter((p) => p.level === "D4");
    const profesi = ALL_PROGRAMS.filter((p) => p.level === "Profesi");
    const d3 = ALL_PROGRAMS.filter((p) => p.level === "D3");
    return `${UHN_PROFILE.abbreviation} memiliki ${ALL_PROGRAMS.length} program studi:\n\n🎓 SARJANA (S1) - ${s1.length} program:\n${s1.map((p) => `• ${p.name} (${p.registration_fee})`).join("\n")}\n\n📋 SARJANA TERAPAN (D4) - ${d4.length} program:\n${d4.map((p) => `• ${p.name} (${p.registration_fee})`).join("\n")}\n\n⚕️ PROFESI - ${profesi.length} program:\n${profesi.map((p) => `• ${p.name}`).join("\n")}\n\n🔧 DIPLOMA (D3) - ${d3.length} program:\n${d3.map((p) => `• ${p.name} (${p.registration_fee})`).join("\n")}\n\nMau tahu detail salah satu? Ketik nama prodi!`;
  }

  // Sarjana Terapan programs
  if (match(text, ["sarjana terapan", "d4"])) {
    const progs = ALL_PROGRAMS.filter((p) => p.level === "D4");
    return `📋 Sarjana Terapan (${progs.length} program):\n\n${progs.map((p) => `• ${p.name}\n  Fakultas: ${p.faculty}\n  Biaya Daftar: ${p.registration_fee}`).join("\n\n")}\n\nℹ️ Sarjana Terapan = program vokasi 4 tahun dengan fokus praktis.`;
  }

  // D3 programs
  if (match(text, ["d3", "diploma"])) {
    const progs = ALL_PROGRAMS.filter((p) => p.level === "D3");
    return `🔧 Program Diploma D3 (${progs.length} program):\n\n${progs.map((p) => `• ${p.name} (${p.registration_fee})`).join("\n")}\n\n💡 D3 = 3 tahun, langsung siap kerja dengan skill praktis.`;
  }

  // Profesi
  if (match(text, ["profesi", "bidan"])) {
    return `⚕️ Pendidikan Profesi Bidan\n\n📋 Syarat Khusus:\n• Perempuan\n• Lulusan S-1/D-4 Kebidanan\n• Lampirkan: Ijazah, Transkip, KTP, KK\n• Biaya daftar: Rp 300.000\n\n🎓 Setelah lulus, langsung mendapat gelar Profesi Bidan.`;
  }

  // Specific program: Informatika
  if (match(text, ["informatika", "teknik informatika"])) {
    const p = PROGRAM_DETAILS[0];
    return `${p.name} (${p.level})\n\n🎓 Fakultas: ${p.faculty}\n🎯 Fokus: ${p.focus}\n📅 Durasi: ${p.duration}\n📋 Akreditasi: ${p.accreditation}\n\n📖 Deskripsi:\n${p.description}\n\n📚 Mata Kuliah Utama:\n${p.keyCourses
      .slice(0, 8)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💻 Skill yang Dipelajari:\n${p.skills.map((s) => `• ${s}`).join("\n")}\n\n💼 Karier & Gaji:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}\n\n🏗️ Lab:\n${p.labFacilities.map((l) => `• ${l}`).join("\n")}\n\n📜 Sertifikasi:\n${p.certifications.map((c) => `• ${c}`).join("\n")}\n\n✨ Kenapa Pilih Ini:\n${p.whyChoose}\n\n👤 Cocok Untuk:\n${p.suitableFor}`;
  }

  // Specific program: Sistem Informasi
  if (match(text, ["sistem informasi"])) {
    const p = PROGRAM_DETAILS[1];
    return `${p.name} (${p.level})\n\n🎯 Fokus: ${p.focus}\n📅 Durasi: ${p.duration}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 7)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}\n\n✨ ${p.whyChoose}`;
  }

  // Specific program: Sains Data
  if (match(text, ["sains data", "data science"])) {
    const p = PROGRAM_DETAILS[2];
    return `🆕 ${p.name} (${p.level})\n\n🎯 Fokus: ${p.focus}\n📅 Durasi: ${p.duration}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 7)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💻 Skill:\n${p.skills.map((s) => `• ${s}`).join("\n")}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}\n\n✨ ${p.whyChoose}`;
  }

  // Specific program: Teknik Mesin
  if (match(text, ["teknik mesin"])) {
    const p = PROGRAM_DETAILS[3];
    return `🆕 ${p.name} (${p.level})\n\n🎯 Fokus: ${p.focus}\n📅 Durasi: ${p.duration}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 7)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}\n\n✨ ${p.whyChoose}`;
  }

  // Specific program: Akuntansi
  if (match(text, ["akuntansi"])) {
    const p = PROGRAM_DETAILS[4];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Specific program: Hukum
  if (match(text, ["hukum"])) {
    const p = PROGRAM_DETAILS[5];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Specific program: Ilmu Komunikasi
  if (match(text, ["ilmu komunikasi", "komunikasi"])) {
    const p = PROGRAM_DETAILS[6];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Specific program: Manajemen
  if (match(text, ["manajemen"])) {
    const p = PROGRAM_DETAILS[7];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Specific program: Psikologi
  if (match(text, ["psikologi"])) {
    const p = PROGRAM_DETAILS[8];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Specific program: PGSD
  if (match(text, ["pgsd", "guru sd", "pendidikan"])) {
    const p = PROGRAM_DETAILS[9];
    return `${p.name} (${p.level})\n\n🎯 ${p.focus}\n\n📖 ${p.description}\n\n📚 Mata Kuliah:\n${p.keyCourses
      .slice(0, 5)
      .map((c) => `• ${c}`)
      .join(
        "\n",
      )}\n\n💼 Karier:\n${p.careers.map((c) => `• ${c.title} - ${c.salary}`).join("\n")}`;
  }

  // Detail specific program
  if (match(text, ["detail", "jelaskan", "kenapa pilih", "cocok untuk"])) {
    return `Mau tahu detail program studi mana?\n\nKetik nama prodi:\n• Informatika\n• Sistem Informasi\n• Sains Data\n• Teknik Mesin\n• Akuntansi\n• Hukum\n• Ilmu Komunikasi\n• Manajemen\n• Psikologi\n• PGSD\n\nSetiap prodi punya info: kurikulum, mata kuliah, skill, karier, lab, dan sertifikasi! 📚`;
  }

  // Specific program: Vokasi
  if (match(text, ["vokasi", "d3", "d4", "diploma"])) {
    const vokasiProgs = PROGRAM_DETAILS.filter((p) => p.level.includes("Vokasi") || p.level.includes("D3") || p.level.includes("D4"));
    const progs = vokasiProgs.map((p) => `• ${p.name}`).join("\n");
    return `Sekolah Vokasi UHN:\n\n${progs}\n\n✅ Berbasis praktik langsung\n✅ Sertifikasi kompetensi\n✅ Terhubung dengan industri`;
  }

  // Facilities
  if (match(text, ["fasilitas", "gedung", "lab", "laboratorium", "kampus"])) {
    return `Fasilitas ${UHN_PROFILE.abbreviation}:\n\n🏫 Umum:\n${FACILITIES.general.map((f) => `• ${f}`).join("\n")}\n\n💻 Khusus Informatika:\n${FACILITIES.informatika.map((f) => `• ${f}`).join("\n")}`;
  }

  // Organizations
  if (
    match(text, [
      "organisasi",
      "ukm",
      "komunitas",
      "himpunan",
      "himafi",
      "kegiatan",
    ])
  ) {
    return `Organisasi & UKM ${UHN_PROFILE.abbreviation}:\n\n👥 Kemahasiswaan:\n${ORGANIZATIONS.filter(
      (o) => o.type === "Kemahasiswaan" || o.type === "Himpunan",
    )
      .map((o) => `• ${o.name}${o.full_name ? ` (${o.full_name})` : ""}`)
      .join("\n")}\n\n🎮 UKM:\n${ORGANIZATIONS.filter((o) => o.type === "UKM")
        .map((o) => `• ${o.name}`)
        .join("\n")}`;
  }

  // Career
  if (
    match(text, ["karier", "kerja", "lulusan", "prospek", "kerjaan", "gaji"])
  ) {
    return `Prospek Karier Lulusan ${UHN_PROFILE.abbreviation}:\n\n${CAREER_PROSPECTS.map((c) => `• ${c.career} - ${c.salary} (Demand: ${c.demand})`).join("\n")}\n\n🔥 Demand IT sangat tinggi di Indonesia!`;
  }

  // Scholarships
  if (match(text, ["beasiswa", "scholarship"])) {
    return `Beasiswa yang tersedia (${SCHOLARSHIPS.length} jenis):\n\n${SCHOLARSHIPS.map((s) => `🏆 ${s.name}\n   ${s.description}`).join("\n\n")}\n\n📝 Hubungi CS PMB untuk info lengkap: ${CONTACTS.hotline}`;
  }

  // Admission
  if (
    match(text, [
      "daftar",
      "pendaftaran",
      "registrasi",
      "masuk kampus",
      "pmb",
      "mahasiswa baru",
    ])
  ) {
    return `Pendaftaran Mahasiswa Baru ${ADMISSION.current_wave}:\n\n📅 Gelombang:\n${ADMISSION.waves.map((w) => `• ${w.wave}: ${w.period}`).join("\n")}\n\n📌 Jalur Masuk:\n${ADMISSION.paths.map((p) => `• ${p}`).join("\n")}\n\n📋 Kelas: Reguler Pagi, Reguler Malam (Karyawan), RPL\n📝 Ujian: CBT di Lab Komputer Gedung B\n\n💰 Biaya Masuk:\n• Pendaftaran: Rp 250.000 - 300.000\n• Pengembangan Mahasiswa: Rp 1.000.000\n• SPI: Rp 7.000.000\n• SPP: Rp 1.300.000/bulan\n\n🌐 Daftar: ${ADMISSION.portal}\n📞 CS: ${ADMISSION.contact_cs}`;
  }

  // Cost
  if (match(text, ["biaya", "uang", "spp", "bayar", "kuliah berapa"])) {
    return `Rincian Biaya Kuliah (Sumber: pmb.harkatnegeri.ac.id):\n\n${ADMISSION.cost_breakdown.components.map((c) => `• ${c.name}: ${c.amount}`).join("\n")}\n\n📊 Total Biaya Masuk: ${ADMISSION.cost_breakdown.total_entry}\n\n💡 Tersedia 8 jenis beasiswa! Ketik "beasiswa" untuk info lengkap.`;
  }

  // Location
  if (match(text, ["alamat", "lokasi", "tegal", "brebes", "dimana"])) {
    return `Lokasi Kampus:\n\n${CAMPUSES.map((c) => `📍 ${c.name} (${c.type}):\n   ${c.address}`).join("\n\n")}`;
  }

  // Contact
  if (
    match(text, ["kontak", "telepon", "phone", "wa", "konseling", "hotline"])
  ) {
    return `Kontak ${UHN_PROFILE.abbreviation}:\n\n📞 Hotline CS PMB: ${CONTACTS.hotline}\n☎️ Telp: ${CONTACTS.telepon}\n📧 Email PMB: ${CONTACTS.email_pmb}\n🌐 Website: ${CONTACTS.website}\n📱 Instagram: ${CONTACTS.instagram_handle}\n📍 Alamat: ${CONTACTS.alamat_sekretariat}`;
  }

  // Industry partners
  if (match(text, ["mitra", "industri", "kerjasama", "partner"])) {
    return `Kerjasama & Mitra Industri:\n\n${INDUSTRY_PARTNERS.map((p) => `🏢 ${p}`).join("\n")}\n\n📋 Program Magang:\n• Magang Berdampak (Kampus Merdeka)\n• Internship Program Industri 1 Semester`;
  }

  // Achievements
  if (match(text, ["prestasi", "juara", "penghargaan", "achievement"])) {
    return `Prestasi ${UHN_PROFILE.abbreviation}:\n\n${ACHIEVEMENTS.map((a) => `🏆 ${a}`).join("\n")}\n\n💪 Terus berprestasi!`;
  }

  // Thanks
  if (match(text, ["terima kasih", "makasih", "thanks", "thank you"])) {
    return "Sama-sama! 😊 Senang bisa bantu. Kalau ada pertanyaan lain, langsung tanya aja ya! Semangat kuliah! 🎓✨";
  }

  // Default
  return `Hmm, aku belum punya info spesifik tentang "${input.slice(0, 40)}" 😅\n\nCoba tanya tentang:\n🎓 Program studi (Informatika, Sains Data, SI, dll)\n📝 Pendaftaran mahasiswa baru\n🏫 Fasilitas kampus\n🏆 Beasiswa\n💼 Karier lulusan\n👥 Organisasi & UKM\n📍 Lokasi & kontak\n\nAtau ketik 'halo' untuk mulai! 👋`;
}

function match(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw));
}

// ═══════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════

const quickTopics = [
  { label: "Program Studi", icon: BookOpen, query: "program studi" },
  { label: "Pendaftaran", icon: GraduationCap, query: "cara daftar" },
  { label: "Lokasi Kampus", icon: MapPin, query: "alamat kampus" },
  { label: "Karier Lulusan", icon: Briefcase, query: "karier lulusan" },
  { label: "Fasilitas", icon: Building2, query: "fasilitas kampus" },
  { label: "Beasiswa", icon: Sparkles, query: "beasiswa" },
  { label: "Mitra Industri", icon: HelpCircle, query: "mitra industri" },
  { label: "Prestasi", icon: HelpCircle, query: "prestasi" },
];

export function TikaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: "bot",
      text: `Halo! 👋 Aku TIKA, asisten digital ${UHN_PROFILE.name}. Ada yang bisa aku bantu seputar kampus?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [charState, setCharState] = useState<"idle" | "speaking" | "thinking">(
    "idle",
  );
  const { theme, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (charState === "speaking") {
      const timer = setTimeout(() => setCharState("idle"), 2500);
      return () => clearTimeout(timer);
    }
  }, [charState]);

  // Text-to-Speech using browser SpeechSynthesis
  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text for TTS (remove emojis, markdown, special chars)
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // emoticons
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // symbols & pictographs
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // transport & map
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "") // flags
      .replace(/[•\-✓★●◆]/g, "") // bullet points
      .replace(/\n+/g, ". ") // newlines to pauses
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "id-ID"; // Indonesian
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher for friendly tone
    utterance.volume = 1.0;

    // Try to find Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith("id"));
    if (idVoice) utterance.voice = idVoice;

    utterance.onend = () => setCharState("idle");
    utterance.onerror = () => setCharState("idle");

    window.speechSynthesis.speak(utterance);
  }, []);

  const sendMessage = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg) return;

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text: msg },
      ]);
      setInput("");
      setCharState("thinking");

      setTimeout(() => {
        const response = findResponse(msg);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: response },
        ]);
        setCharState("speaking");
        speak(response);
      }, 800);
    },
    [input, speak],
  );

  return (
    <div
      className={`${theme} relative min-h-screen overflow-hidden bg-background`}
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pl-4 pr-2.5 sm:pl-6">
          <a
            href="/"
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              TIKA Campus Assistant
            </span>
            <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Layout - fixed height, no scroll on outer container */}
      <div className="flex h-screen pt-20 overflow-hidden">
        {/* LEFT: 3D Character */}
        <div className="relative hidden w-1/2 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--rose),transparent_70%)] opacity-10" />
          <div className="relative h-full w-full">
            <CanvasErrorBoundary>
              <Canvas
                camera={{ position: [0, 1.5, 4], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} color={0xffe8e0} />
                  <directionalLight position={[3, 5, 4]} intensity={1.2} />
                  <pointLight
                    position={[-2, 3, 2]}
                    intensity={0.8}
                    color={0xb23a5a}
                  />
                  <pointLight
                    position={[2, -1, 3]}
                    intensity={0.5}
                    color={0x8a1f3f}
                  />
                  <TikaGLBLoader
                    speaking={charState === "speaking"}
                    thinking={charState === "thinking"}
                  />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    target={[0, 0.8, 0]}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2.2}
                    autoRotate={charState === "idle"}
                    autoRotateSpeed={0.3}
                  />
                </Suspense>
              </Canvas>
            </CanvasErrorBoundary>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <div className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium">TIKA</span>
              <span className="text-xs text-muted-foreground">
                {charState === "speaking"
                  ? "🗣️ Berbicara..."
                  : charState === "thinking"
                    ? "🤔 Berpikir..."
                    : "✨ Online"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Chat Interface - fixed height, scrollable messages */}
        <div className="flex h-full w-full flex-col overflow-hidden border-l border-glass-border lg:w-1/2">
          {/* Mobile 3D header */}
          <div className="relative h-40 w-full shrink-0 border-b border-glass-border bg-gradient-to-b from-rose/5 to-transparent lg:hidden">
            <CanvasErrorBoundary>
              <Canvas
                camera={{ position: [0, 1.5, 4], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} color={0xffe8e0} />
                  <directionalLight position={[3, 5, 4]} intensity={1.2} />
                  <pointLight
                    position={[-2, 3, 2]}
                    intensity={0.8}
                    color={0xb23a5a}
                  />
                  <TikaGLBLoader
                    speaking={charState === "speaking"}
                    thinking={charState === "thinking"}
                  />
                </Suspense>
              </Canvas>
            </CanvasErrorBoundary>
          </div>

          {/* Quick Topics - wrap, no horizontal scroll */}
          <div className="flex flex-wrap gap-2 border-b border-glass-border px-4 py-3 shrink-0">
            {quickTopics.map((topic) => (
              <button
                key={topic.label}
                onClick={() => sendMessage(topic.query)}
                className="flex items-center gap-1.5 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[0.65rem] font-medium transition-all duration-300 hover:border-rose/40 hover:bg-rose/10"
              >
                <topic.icon className="h-3.5 w-3.5 text-rose" />
                {topic.label}
              </button>
            ))}
          </div>

          {/* Messages - only this area scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-lg space-y-5">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-cta)]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${msg.sender === "user"
                        ? "bg-[image:var(--gradient-cta)] text-white rounded-br-sm"
                        : "glass-panel rounded-bl-sm"
                      }`}
                  >
                    {msg.sender === "bot" && (
                      <span className="mb-1 block text-[0.65rem] font-medium text-rose">
                        TIKA
                      </span>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-glass-border px-6 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="mx-auto flex max-w-lg items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaanmu tentang kampus..."
                className="flex-1 rounded-full border border-glass-border bg-glass px-5 py-3 text-sm outline-none transition-colors focus:border-rose/40 focus:ring-2 focus:ring-rose/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-white shadow-[0_8px_24px_-4px_var(--wine)] transition-all duration-300 hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-2 text-center text-[0.65rem] text-muted-foreground/50">
              TIKA menggunakan basis pengetahuan lokal. Untuk info resmi,
              kunjungi {CONTACTS.website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
