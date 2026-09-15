import { supabase, isSupabaseConfigured } from "./supabase";
import {
  UHN_PROFILE,
  CAMPUSES,
  ALL_PROGRAMS,
  PROGRAM_DETAILS,
  FACILITIES,
  ORGANIZATIONS,
  CAREER_PROSPECTS,
  SCHOLARSHIPS,
  ADMISSION,
  CONTACTS,
  INDUSTRY_PARTNERS,
  ACHIEVEMENTS,
} from "./tika-knowledge";

export interface TikaKnowledgeItem {
  id?: string;
  category: string;
  title: string;
  keywords: string[];
  answer: string;
  metadata?: Record<string, unknown>;
  priority?: number;
  is_active?: boolean;
}

function match(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => text.includes(kw));
}

/**
 * Local Knowledge Engine (Deterministic Fallback)
 * Works 100% offline without database dependency.
 */
export function findLocalTikaResponse(input: string): string {
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

  // Detail prodi general
  if (match(text, ["detail", "jelaskan", "kenapa pilih", "cocok untuk"])) {
    return `Mau tahu detail program studi mana?\n\nKetik nama prodi:\n• Informatika\n• Sistem Informasi\n• Sains Data\n• Teknik Mesin\n• Akuntansi\n• Hukum\n• Ilmu Komunikasi\n• Manajemen\n• Psikologi\n• PGSD\n\nSetiap prodi punya info: kurikulum, mata kuliah, skill, karier, lab, dan sertifikasi! 📚`;
  }

  // Vokasi
  if (match(text, ["vokasi", "d3", "d4", "diploma"])) {
    const vokasiProgs = PROGRAM_DETAILS.filter(
      (p) =>
        p.level.includes("Vokasi") ||
        p.level.includes("D3") ||
        p.level.includes("D4"),
    );
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

/**
 * Main Async TIKA Response Function.
 * 1. Checks Supabase if configured.
 * 2. Queries 'tika_knowledge' table with keyword/pattern matching.
 * 3. Falls back gracefully to local knowledge base.
 */
export async function getTikaResponse(input: string): Promise<string> {
  const cleanInput = input.trim();
  if (!cleanInput) return "";

  if (isSupabaseConfigured() && supabase) {
    try {
      const words = cleanInput
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2);

      // Query active knowledge items matching keywords or text
      const { data, error } = await supabase
        .from("tika_knowledge")
        .select("answer, priority")
        .eq("is_active", true)
        .or(
          words.length > 0
            ? `keywords.ov.{${words.join(",")}},title.ilike.%${cleanInput}%`
            : `title.ilike.%${cleanInput}%`,
        )
        .order("priority", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        return data[0].answer;
      }
    } catch (err) {
      console.warn(
        "[TIKA Supabase] Query failed, using local knowledge base:",
        err,
      );
    }
  }

  // Local fallback
  return findLocalTikaResponse(cleanInput);
}
