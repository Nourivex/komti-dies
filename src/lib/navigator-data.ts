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

export interface AnswerOption {
  label: string;
  icon?: string;
  scores: Partial<Record<CareerId, number>>;
}

export interface Question {
  id: number;
  section: string;
  title: string;
  description?: string;
  type: "single" | "multi";
  maxSelect?: number;
  options: AnswerOption[];
}

export interface RadarAxis {
  key: string;
  label: string;
}

export interface CareerProfile {
  id: CareerId;
  name: string;
  tagline: string;
  description: string;
  skills: string[];
  avgSalary?: string;
  programs: string[];
}

export interface UniversityFaculty {
  id: string;
  name: string;
  description: string;
}

export interface UniversityProgram {
  code: string;
  name: string;
  facultyId: string;
  type: "Sarjana" | "Vokasi" | "Profesi";
  focus: string;
  isNew?: boolean;
}

export interface CareerProgramMatch {
  career: CareerId;
  programCode: string;
  isPrimary: boolean;
  reason: string;
}

// ─── RADAR AXES ───────────────────────────────────────────
export const RADAR_AXES: RadarAxis[] = [
  { key: "creativity", label: "Kreativitas" },
  { key: "analytical", label: "Analitis" },
  { key: "communication", label: "Komunikasi" },
  { key: "collaboration", label: "Kolaborasi" },
  { key: "technical", label: "Teknologi" },
];

// ─── QUESTIONS ────────────────────────────────────────────
export const QUESTIONS: Question[] = [
  // SECTION 1: MINAT
  {
    id: 1,
    section: "Minat",
    title:
      "Kalau lagi ada waktu luang di sekolah atau rumah, kamu paling betah ngapain?",
    type: "single",
    options: [
      {
        label:
          "Ngulik aplikasi baru, nyobain fitur HP, atau benerin barang elektronik",
        scores: {
          frontend_dev: 3,
          software_engineer: 3,
          it_support: 2,
          cloud_engineer: 1,
        },
      },
      {
        label:
          "Coret-coret desain, bikin konten IG/TikTok, atau ngedit foto/video",
        scores: {
          uiux_designer: 4,
          graphic_designer: 4,
          content_creator: 3,
          digital_marketing: 2,
        },
      },
      {
        label:
          "Ngobrol sama temen, bikin acara kelas, atau ngatur tugas kelompok",
        scores: {
          it_pm: 4,
          digital_marketing: 2,
          user_researcher: 2,
          lawyer: 1,
        },
      },
      {
        label:
          "Ngumpulin data, ngitung keuangan acara, atau ngurutin file biar rapi",
        scores: { data_analyst: 4, accountant: 3, cloud_engineer: 1 },
      },
      {
        label: "Nonton YouTube soal coding, robot, atau gadget canggih",
        scores: {
          ai_engineer: 3,
          robotics_engineer: 4,
          software_engineer: 2,
          cyber_security: 2,
        },
      },
    ],
  },
  {
    id: 2,
    section: "Minat",
    title: "Kegiatan sekolah mana yang paling kamu nikmati?",
    type: "single",
    options: [
      {
        label: "Praktikum di lab komputer",
        scores: { software_engineer: 3, frontend_dev: 3, cyber_security: 2 },
      },
      {
        label: "Presentasi atau pidato depan kelas",
        scores: {
          it_pm: 3,
          digital_marketing: 3,
          lawyer: 2,
          user_researcher: 2,
        },
      },
      {
        label: "Mengerjakan proyek desain atau seni",
        scores: { uiux_designer: 4, graphic_designer: 4, content_creator: 2 },
      },
      {
        label: "Menghitung atau menganalisis angka",
        scores: { data_analyst: 4, accountant: 3, ai_engineer: 1 },
      },
      {
        label: "Diskusi atau debat tentang isu terkini",
        scores: { lawyer: 3, user_researcher: 3, it_pm: 2 },
      },
    ],
  },

  // SECTION 2: CARA BERPIKIR
  {
    id: 3,
    section: "Cara Berpikir",
    title:
      "Kalau dapet tugas kelompok yang susah banget, apa yang biasa kamu lakuin?",
    type: "single",
    options: [
      {
        label: "Mencari cara paling efektif dan cepat pakai logika",
        scores: { data_analyst: 3, software_engineer: 3, ai_engineer: 2 },
      },
      {
        label: "Bikin tampilan presentasi biar tugasnya kelihatan paling keren",
        scores: { uiux_designer: 3, graphic_designer: 3, digital_marketing: 2 },
      },
      {
        label: "Membagi tugas ke temen-temen sesuai keahlian mereka",
        scores: { it_pm: 4, user_researcher: 2 },
      },
      {
        label:
          "Cari tahu detail masalahnya satu per satu sampai ketemu solusinya",
        scores: { cyber_security: 3, software_engineer: 3, frontend_dev: 2 },
      },
    ],
  },
  {
    id: 4,
    section: "Cara Berpikir",
    title: "Kamu lebih suka...",
    type: "single",
    options: [
      {
        label: "Mengikuti langkah yang jelas dan terstruktur",
        scores: { accountant: 3, it_support: 2, cloud_engineer: 2 },
      },
      {
        label: "Mencoba hal baru dan bereksperimen",
        scores: {
          ai_engineer: 3,
          frontend_dev: 2,
          content_creator: 3,
          robotics_engineer: 2,
        },
      },
      {
        label: "Membuat sesuatu yang bisa dilihat orang banyak",
        scores: { frontend_dev: 3, uiux_designer: 3, graphic_designer: 3 },
      },
      {
        label:
          "Menyelesaikan masalah yang belum pernah diselesaikan orang lain",
        scores: { ai_engineer: 3, cyber_security: 3, software_engineer: 2 },
      },
    ],
  },

  // SECTION 3: SKILL SAAT INI
  {
    id: 5,
    section: "Skill Saat Ini",
    title: "Pilih skill yang pernah kamu coba atau pelajari:",
    type: "multi",
    maxSelect: 6,
    options: [
      {
        label: "Coding / Pemrograman",
        scores: { software_engineer: 2, frontend_dev: 2, ai_engineer: 1 },
      },
      {
        label: "Desain (Canva, Figma, Photoshop)",
        scores: { uiux_designer: 3, graphic_designer: 3, content_creator: 1 },
      },
      {
        label: "Edit video / foto",
        scores: {
          content_creator: 3,
          digital_marketing: 2,
          graphic_designer: 1,
        },
      },
      {
        label: "Public speaking / presentasi",
        scores: { it_pm: 2, digital_marketing: 2, lawyer: 2 },
      },
      {
        label: "Analisis data / Excel",
        scores: { data_analyst: 3, accountant: 2 },
      },
      {
        label: "Robotik / Arduino / elektronik",
        scores: { robotics_engineer: 4, it_support: 1 },
      },
      {
        label: "Menulis / blogging",
        scores: {
          content_creator: 3,
          digital_marketing: 2,
          user_researcher: 1,
        },
      },
      {
        label: "AI Prompt / ChatGPT",
        scores: { ai_engineer: 2, content_creator: 1, data_analyst: 1 },
      },
      {
        label: "Networking / setting WiFi / router",
        scores: { it_support: 3, cyber_security: 2, cloud_engineer: 1 },
      },
      { label: "Belum ada skill khusus", scores: {} },
    ],
  },

  // SECTION 4: GAYA KERJA
  {
    id: 6,
    section: "Gaya Kerja",
    title: "Kamu lebih nyaman kerja...",
    type: "single",
    options: [
      {
        label: "Sendiri, fokus tanpa gangguan",
        scores: { software_engineer: 3, data_analyst: 2, graphic_designer: 2 },
      },
      {
        label: "Tim kecil (2-4 orang), kolaborasi dekat",
        scores: { frontend_dev: 3, uiux_designer: 2, ai_engineer: 2 },
      },
      {
        label: "Tim besar, dengan banyak koordinasi",
        scores: { it_pm: 4, digital_marketing: 2 },
      },
    ],
  },
  {
    id: 7,
    section: "Gaya Kerja",
    title: "Kamu lebih suka...",
    type: "single",
    options: [
      {
        label: "Membuat sesuatu dari nol (build)",
        scores: { software_engineer: 3, frontend_dev: 3, content_creator: 2 },
      },
      {
        label: "Memperbaiki atau meningkatkan yang sudah ada",
        scores: { cyber_security: 2, it_support: 3, cloud_engineer: 2 },
      },
      {
        label: "Mengajar atau membimbing orang lain",
        scores: { edtech_dev: 3, user_researcher: 2, lawyer: 1 },
      },
      {
        label: "Mengatur proyek dan memastikan selesai tepat waktu",
        scores: { it_pm: 4, digital_marketing: 2 },
      },
    ],
  },

  // SECTION 5: TUJUAN
  {
    id: 8,
    section: "Tujuan",
    title: "Dalam 5 tahun ke depan, yang paling penting buat kamu adalah...",
    type: "single",
    options: [
      {
        label: "Gaji tinggi dan karier yang stabil",
        scores: {
          software_engineer: 2,
          cloud_engineer: 2,
          accountant: 2,
          data_analyst: 2,
        },
      },
      {
        label: "Kreativitas dan kebebasan berekspresi",
        scores: { uiux_designer: 3, graphic_designer: 3, content_creator: 3 },
      },
      {
        label: "Membuat dampak sosial yang nyata",
        scores: { edtech_dev: 3, user_researcher: 2, lawyer: 2 },
      },
      {
        label: "Cepat dapat kerja setelah lulus",
        scores: { it_support: 3, frontend_dev: 2, digital_marketing: 2 },
      },
      {
        label: "Memulai bisnis / startup sendiri",
        scores: { it_pm: 3, software_engineer: 2, digital_marketing: 2 },
      },
    ],
  },
  {
    id: 9,
    section: "Tujuan",
    title: "Karya apa yang paling bikin kamu bangga kalau berhasil kamu buat?",
    type: "single",
    options: [
      {
        label: "Aplikasi atau web yang beneran dipakai orang banyak",
        scores: { software_engineer: 3, frontend_dev: 4, cloud_engineer: 1 },
      },
      {
        label: "Tampilan aplikasi yang cantik, rapi, dan enak dilihat",
        scores: { uiux_designer: 4, graphic_designer: 3 },
      },
      {
        label: "Grafik atau tabel analisis yang bisa memprediksi sesuatu",
        scores: { data_analyst: 4, ai_engineer: 2 },
      },
      {
        label: "Sistem keamanan atau jaringan yang kuat dan cepat",
        scores: { cyber_security: 4, it_support: 2, cloud_engineer: 2 },
      },
    ],
  },
];

// ─── CAREER PROFILES ──────────────────────────────────────
export const CAREER_PROFILES: CareerProfile[] = [
  {
    id: "ai_engineer",
    name: "AI Engineer",
    tagline: "Si Otak di Balik Kecerdasan Buatan",
    description:
      "Membangun sistem AI yang bisa belajar dari data, mengenali pola, dan membuat keputusan otomatis. Dari chatbot sampai self-driving car.",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Math",
      "Data Processing",
    ],
    programs: ["S1-TI", "S1-SD"],
  },
  {
    id: "frontend_dev",
    name: "Frontend Developer",
    tagline: "Si Pembuat Tampilan Web Interaktif",
    description:
      "Menerjemahkan desain menjadi halaman web yang bisa diklik, di-scroll, dan dinikmati jutaan pengguna. Bagian dari website yang kamu lihat? Itu kerjaan mereka.",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "UI Libraries",
      "Responsive Design",
    ],
    programs: ["S1-TI", "D4-TI"],
  },
  {
    id: "uiux_designer",
    name: "UI/UX Designer",
    tagline: "Si Perancang Pengalaman Pengguna",
    description:
      'Memastikan aplikasi atau website tidak hanya cantik dilihat, tapi juga enak dipakai. Mereka yang bikin kamu mikir "kok gampang banget ya pakai ini?"',
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Wireframing",
      "Design Thinking",
    ],
    programs: ["S1-TI", "D3-DKV", "S1-IKOM"],
  },
  {
    id: "data_analyst",
    name: "Data Analyst",
    tagline: "Si Detektif Data",
    description:
      "Mengolah data mentah jadi insight yang bisa diambil keputusan. Dari data penjualan sampai tren social media, mereka yang tahu ceritanya.",
    skills: [
      "Excel/Sheets",
      "SQL",
      "Python",
      "Data Visualization",
      "Statistics",
    ],
    programs: ["S1-SD", "S1-TI"],
  },
  {
    id: "cyber_security",
    name: "Cyber Security Analyst",
    tagline: "Si Penjaga Gerbang Digital",
    description:
      "Melindungi sistem dan data dari serangan hacker. Mereka yang bikin password kamu aman dan data pribadi tidak bocor.",
    skills: [
      "Networking",
      "Linux",
      "Ethical Hacking",
      "Cryptography",
      "Security Tools",
    ],
    programs: ["S1-TI", "S1-SI"],
  },
  {
    id: "software_engineer",
    name: "Software Engineer",
    tagline: "Si Pembangun Digital",
    description:
      "Merancang dan membangun software yang kompleks — dari mobile apps sampai sistem bank. Mereka yang bikin teknologi berjalan.",
    skills: ["Programming", "Algorithms", "System Design", "Git", "Testing"],
    programs: ["S1-TI", "D4-TI"],
  },
  {
    id: "cloud_engineer",
    name: "Cloud Engineer",
    tagline: "Si Arsitek Internet",
    description:
      'Mengatur infrastruktur cloud yang membuat website dan aplikasi bisa diakses dari mana saja. Mereka yang bikin server "tidak pernah tidur".',
    skills: ["AWS/GCP/Azure", "Docker", "Linux", "Networking", "DevOps"],
    programs: ["S1-TI", "S1-SI", "D3-TK"],
  },
  {
    id: "it_pm",
    name: "IT Project Manager",
    tagline: "Si Pengatur Tim Teknologi",
    description:
      "Memastikan proyek teknologi selesai tepat waktu, sesuai budget, dan sesuai kebutuhan. Bridge antara tim teknis dan bisnis.",
    skills: [
      "Project Management",
      "Communication",
      "Agile/Scrum",
      "Budgeting",
      "Leadership",
    ],
    programs: ["S1-SI", "S1-MAN"],
  },
  {
    id: "digital_marketing",
    name: "Digital Marketing Specialist",
    tagline: "Si Ahli Pemasaran Online",
    description:
      "Membuat strategi pemasaran di digital — dari social media ads sampai SEO. Mereka yang bikin kamu tertarik beli produk dari Instagram.",
    skills: [
      "SEO/SEM",
      "Social Media",
      "Analytics",
      "Content Strategy",
      "Copywriting",
    ],
    programs: ["S1-IKOM", "S1-MAN"],
  },
  {
    id: "content_creator",
    name: "Content Creator",
    tagline: "Si Pembuat Konten Digital",
    description:
      "Membuat konten yang mengedukasi, menghibur, atau menginspirasi — di YouTube, TikTok, blog, atau platform lainnya.",
    skills: [
      "Video Editing",
      "Writing",
      "Photography",
      "Social Media",
      "Storytelling",
    ],
    programs: ["S1-IKOM", "D3-DKV"],
  },
  {
    id: "graphic_designer",
    name: "Graphic Designer",
    tagline: "Si Visual Storyteller",
    description:
      "Menerjemahkan ide menjadi visual yang menarik — logo, poster, packaging, hingga UI digital. Kreativitas tanpa batas.",
    skills: [
      "Adobe Illustrator",
      "Photoshop",
      "Typography",
      "Color Theory",
      "Branding",
    ],
    programs: ["D3-DKV"],
  },
  {
    id: "robotics_engineer",
    name: "Robotics Engineer",
    tagline: "Si Pencipta Robot",
    description:
      'Merancang dan membangun robot atau sistem otomasi. Dari robot industri sampai drone, mereka yang bikin mesin "hidup".',
    skills: ["Arduino/Raspberry Pi", "C++", "Mechatronics", "Sensors", "CAD"],
    programs: ["S1-TM", "D3-TE", "S1-TI"],
  },
  {
    id: "it_support",
    name: "IT Support / System Admin",
    tagline: "Si Penyelesai Masalah IT",
    description:
      "Memastikan komputer, jaringan, dan sistem berjalan lancar. Ketika IT mati, merekalah yang pertama dipanggil.",
    skills: [
      "Windows/Linux",
      "Networking",
      "Hardware",
      "Troubleshooting",
      "Help Desk",
    ],
    programs: ["D3-TK", "D4-TI", "D3-TE"],
  },
  {
    id: "accountant",
    name: "Akuntan / Financial Analyst",
    tagline: "Si Pengelola Keuangan",
    description:
      "Mengelola dan menganalisis data keuangan perusahaan. Dari pencatatan hingga strategi investasi, mereka yang menjaga keuangan tetap sehat.",
    skills: [
      "Excel",
      "Accounting Software",
      "Taxation",
      "Financial Reporting",
      "Analysis",
    ],
    programs: ["S1-AKU", "D3-AKU", "D4-ASP"],
  },
  {
    id: "lawyer",
    name: "Lawyer / Konsultan Hukum",
    tagline: "Si Pembela Keadilan",
    description:
      "Menangani masalah hukum, dari kontrak bisnis sampai sengketa digital. Di era teknologi, Cyber Law jadi bidang yang sangat dibutuhkan.",
    skills: [
      "Legal Research",
      "Writing",
      "Negotiation",
      "Critical Thinking",
      "Cyber Law",
    ],
    programs: ["S1-HUK"],
  },
  {
    id: "edtech_dev",
    name: "EdTech Developer",
    tagline: "Si Pengembang Teknologi Pendidikan",
    description:
      "Membuat teknologi yang membantu proses belajar mengajar — dari platform e-learning sampai aplikasi edukasi untuk anak-anak.",
    skills: [
      "Web Development",
      "UX Design",
      "Education Domain",
      "Content Creation",
      "Data Analysis",
    ],
    programs: ["S1-TI", "S1-PGSD"],
  },
  {
    id: "user_researcher",
    name: "User Researcher",
    tagline: "Si Ahli Memahami Pengguna",
    description:
      "Mempelajari perilaku dan kebutuhan pengguna agar produk digital bisa benar-benar berguna. Kombinasi psikologi dan teknologi.",
    skills: [
      "Interview",
      "Survey Design",
      "Data Analysis",
      "Empathy",
      "Report Writing",
    ],
    programs: ["S1-PSI", "S1-TI"],
  },
];

// ─── PERSONA NAMES (for radar profile) ────────────────────
export const PERSONA_NAMES: Record<string, string> = {
  ai_engineer: "AI Explorer",
  frontend_dev: "Digital Builder",
  uiux_designer: "Experience Designer",
  data_analyst: "Data Detective",
  cyber_security: "Cyber Guardian",
  software_engineer: "Code Architect",
  cloud_engineer: "Cloud Navigator",
  it_pm: "Tech Commander",
  digital_marketing: "Digital Strategist",
  content_creator: "Content Artist",
  graphic_designer: "Visual Storyteller",
  robotics_engineer: "Robot Whisperer",
  it_support: "System Guardian",
  accountant: "Financial Analyst",
  lawyer: "Digital Advocate",
  edtech_dev: "Learning Architect",
  user_researcher: "People Observer",
};

// ─── UNIVERSITIES ─────────────────────────────────────────
export const FACULTIES: UniversityFaculty[] = [
  {
    id: "saintek",
    name: "Fakultas Sains & Teknologi (Saintek)",
    description:
      "Mendorong kemampuan mahasiswa untuk berpikir sistematis melalui berbasis proyek, eksplorasi teknologi, dan kolaborasi antarbidang.",
  },
  {
    id: "soshum",
    name: "Fakultas Sosial Humaniora (Soshum)",
    description:
      "Mengasah pemikiran kritis dan aplikatif mahasiswa dengan pemahaman lintas disiplin agar siap mengambil peran berdampak di tengah masyarakat yang terus berkembang.",
  },
  {
    id: "psikopen",
    name: "Fakultas Psikologi & Pendidikan (Psikopen)",
    description:
      "Membentuk mahasiswa yang mampu memahami, membimbing, dan mengembangkan potensi individu melalui pendekatan psikologis dan pedagogis.",
  },
  {
    id: "vokasi",
    name: "Sekolah Vokasi",
    description:
      "Menyiapkan lulusan siap kerja melalui program berbasis praktik langsung, sertifikasi kompetensi, dan terhubung dengan industri.",
  },
];

export const PROGRAMS: UniversityProgram[] = [
  // Saintek
  {
    code: "S1-TI",
    name: "S-1 Teknik Informatika",
    facultyId: "saintek",
    type: "Sarjana",
    focus: "Software Engineering, AI, Cyber Security, Cloud Computing",
  },
  {
    code: "S1-SI",
    name: "S-1 Sistem Informasi",
    facultyId: "saintek",
    type: "Sarjana",
    focus: "Business Analysis, IT Management, Database",
  },
  {
    code: "S1-SD",
    name: "S-1 Sains Data",
    facultyId: "saintek",
    type: "Sarjana",
    focus: "Data Science, ML, Statistics, Big Data",
    isNew: true,
  },
  {
    code: "S1-TM",
    name: "S-1 Teknik Mesin",
    facultyId: "saintek",
    type: "Sarjana",
    focus: "Manufacturing, Robotics, CAD/CAM",
    isNew: true,
  },
  // Soshum
  {
    code: "S1-AKU",
    name: "S-1 Akuntansi",
    facultyId: "soshum",
    type: "Sarjana",
    focus: "Financial Accounting, Taxation, Auditing",
  },
  {
    code: "S1-HUK",
    name: "S-1 Hukum",
    facultyId: "soshum",
    type: "Sarjana",
    focus: "Corporate Law, Cyber Law, Intellectual Property",
  },
  {
    code: "S1-IKOM",
    name: "S-1 Ilmu Komunikasi",
    facultyId: "soshum",
    type: "Sarjana",
    focus: "Digital Marketing, Media Production, Content Creation",
  },
  {
    code: "S1-MAN",
    name: "S-1 Manajemen",
    facultyId: "soshum",
    type: "Sarjana",
    focus: "Business Management, Marketing, Finance",
  },
  // Psikopen
  {
    code: "S1-PSI",
    name: "S-1 Psikologi",
    facultyId: "psikopen",
    type: "Sarjana",
    focus: "Industrial Psychology, User Research",
  },
  {
    code: "S1-PGSD",
    name: "S-1 PGSD",
    facultyId: "psikopen",
    type: "Sarjana",
    focus: "Primary Education, EdTech",
  },
  // Vokasi
  {
    code: "D4-ASP",
    name: "D-4 Akuntansi Sektor Publik",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Government Financial Management",
  },
  {
    code: "D4-KEB",
    name: "D-4 Kebidanan",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Midwifery, Maternal Health",
  },
  {
    code: "D4-TI",
    name: "D-4 Teknik Informatika",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Applied IT, Software Dev, Networking",
  },
  {
    code: "D3-AKU",
    name: "D-3 Akuntansi",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Accounting Practice, Bookkeeping",
  },
  {
    code: "D3-DKV",
    name: "D-3 Desain Komunikasi Visual",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Graphic Design, UI, Branding",
  },
  {
    code: "D3-FAR",
    name: "D-3 Farmasi",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Pharmaceutical Practice",
  },
  {
    code: "D3-KEP",
    name: "D-3 Keperawatan",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Nursing Practice, Patient Care",
  },
  {
    code: "D3-PRH",
    name: "D-3 Perhotelan",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Hospitality Management",
  },
  {
    code: "D3-TE",
    name: "D-3 Teknik Elektronika",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Electronic Systems, IoT",
  },
  {
    code: "D3-TK",
    name: "D-3 Teknik Komputer",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Hardware, Networking, System Maintenance",
  },
  {
    code: "D3-TM",
    name: "D-3 Teknik Mesin",
    facultyId: "vokasi",
    type: "Vokasi",
    focus: "Manufacturing, Workshop",
  },
  {
    code: "PPB",
    name: "Pendidikan Profesi Bidan",
    facultyId: "vokasi",
    type: "Profesi",
    focus: "Professional Midwifery Certification",
  },
];

// ─── CAREER → PROGRAM MAPPING ─────────────────────────────
export const CAREER_PROGRAM_MAP: CareerProgramMatch[] = [
  {
    career: "ai_engineer",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Dasar pemrograman kuat + matematika",
  },
  {
    career: "ai_engineer",
    programCode: "S1-SD",
    isPrimary: false,
    reason: "Fokus data science & ML",
  },
  {
    career: "frontend_dev",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Web technologies & UI",
  },
  {
    career: "frontend_dev",
    programCode: "D4-TI",
    isPrimary: false,
    reason: "Praktis, langsung siap kerja",
  },
  {
    career: "uiux_designer",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "HCI & software design",
  },
  {
    career: "uiux_designer",
    programCode: "D3-DKV",
    isPrimary: false,
    reason: "Desain visual praktis",
  },
  {
    career: "uiux_designer",
    programCode: "S1-IKOM",
    isPrimary: false,
    reason: "Komunikasi & user understanding",
  },
  {
    career: "data_analyst",
    programCode: "S1-SD",
    isPrimary: true,
    reason: "Statistik, ML, data visualization",
  },
  {
    career: "data_analyst",
    programCode: "S1-TI",
    isPrimary: false,
    reason: "Pemrograman & system design",
  },
  {
    career: "cyber_security",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Networking & security fundamentals",
  },
  {
    career: "cyber_security",
    programCode: "S1-SI",
    isPrimary: false,
    reason: "IT management & governance",
  },
  {
    career: "software_engineer",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Software development lifecycle",
  },
  {
    career: "software_engineer",
    programCode: "D4-TI",
    isPrimary: false,
    reason: "Practical skills, industry ready",
  },
  {
    career: "cloud_engineer",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Cloud infrastructure & DevOps",
  },
  {
    career: "cloud_engineer",
    programCode: "S1-SI",
    isPrimary: false,
    reason: "IT management",
  },
  {
    career: "it_pm",
    programCode: "S1-SI",
    isPrimary: true,
    reason: "Bridge tech & business",
  },
  {
    career: "it_pm",
    programCode: "S1-MAN",
    isPrimary: false,
    reason: "Manajemen proyek & bisnis",
  },
  {
    career: "digital_marketing",
    programCode: "S1-IKOM",
    isPrimary: true,
    reason: "Digital marketing & content",
  },
  {
    career: "digital_marketing",
    programCode: "S1-MAN",
    isPrimary: false,
    reason: "Business & marketing strategy",
  },
  {
    career: "content_creator",
    programCode: "S1-IKOM",
    isPrimary: true,
    reason: "Media production & storytelling",
  },
  {
    career: "content_creator",
    programCode: "D3-DKV",
    isPrimary: false,
    reason: "Visual creation praktis",
  },
  {
    career: "graphic_designer",
    programCode: "D3-DKV",
    isPrimary: true,
    reason: "Core competency: visual design",
  },
  {
    career: "robotics_engineer",
    programCode: "S1-TM",
    isPrimary: true,
    reason: "Engineering principles & mechatronics",
  },
  {
    career: "robotics_engineer",
    programCode: "D3-TE",
    isPrimary: false,
    reason: "Hands-on elektronika",
  },
  {
    career: "it_support",
    programCode: "D3-TK",
    isPrimary: true,
    reason: "Hardware, networking, system",
  },
  {
    career: "it_support",
    programCode: "D4-TI",
    isPrimary: false,
    reason: "Applied IT",
  },
  {
    career: "accountant",
    programCode: "S1-AKU",
    isPrimary: true,
    reason: "Analitis & konsultan",
  },
  {
    career: "accountant",
    programCode: "D3-AKU",
    isPrimary: false,
    reason: "Praktisi akuntansi",
  },
  {
    career: "lawyer",
    programCode: "S1-HUK",
    isPrimary: true,
    reason: "Hukum siber & IP",
  },
  {
    career: "edtech_dev",
    programCode: "S1-TI",
    isPrimary: true,
    reason: "Tech + education",
  },
  {
    career: "edtech_dev",
    programCode: "S1-PGSD",
    isPrimary: false,
    reason: "Education domain knowledge",
  },
  {
    career: "user_researcher",
    programCode: "S1-PSI",
    isPrimary: true,
    reason: "Psikologi + HCI",
  },
  {
    career: "user_researcher",
    programCode: "S1-TI",
    isPrimary: false,
    reason: "Tech implementation",
  },
];

// ─── SKILL GAP DATA PER CAREER ────────────────────────────
export interface SkillGap {
  skill: string;
  current: number; // 0-100 estimated from answers
  required: number;
}

export const CAREER_SKILL_GAPS: Record<CareerId, SkillGap[]> = {
  ai_engineer: [
    { skill: "Python", current: 20, required: 90 },
    { skill: "Math & Statistics", current: 30, required: 85 },
    { skill: "Machine Learning", current: 10, required: 80 },
    { skill: "Data Processing", current: 15, required: 75 },
    { skill: "Problem Solving", current: 50, required: 85 },
  ],
  frontend_dev: [
    { skill: "HTML/CSS", current: 25, required: 85 },
    { skill: "JavaScript", current: 15, required: 80 },
    { skill: "React", current: 10, required: 75 },
    { skill: "UI Libraries", current: 20, required: 70 },
    { skill: "Responsive Design", current: 20, required: 80 },
  ],
  uiux_designer: [
    { skill: "Figma", current: 20, required: 85 },
    { skill: "User Research", current: 30, required: 80 },
    { skill: "Prototyping", current: 15, required: 75 },
    { skill: "Wireframing", current: 20, required: 80 },
    { skill: "Design Thinking", current: 25, required: 85 },
  ],
  data_analyst: [
    { skill: "Excel/Sheets", current: 35, required: 80 },
    { skill: "SQL", current: 10, required: 80 },
    { skill: "Python/R", current: 10, required: 75 },
    { skill: "Data Visualization", current: 20, required: 80 },
    { skill: "Statistics", current: 25, required: 85 },
  ],
  cyber_security: [
    { skill: "Networking", current: 15, required: 85 },
    { skill: "Linux", current: 10, required: 80 },
    { skill: "Ethical Hacking", current: 5, required: 75 },
    { skill: "Cryptography", current: 5, required: 70 },
    { skill: "Security Tools", current: 10, required: 80 },
  ],
  software_engineer: [
    { skill: "Programming", current: 20, required: 85 },
    { skill: "Algorithms", current: 15, required: 80 },
    { skill: "System Design", current: 10, required: 75 },
    { skill: "Git/Version Control", current: 10, required: 80 },
    { skill: "Testing", current: 10, required: 70 },
  ],
  cloud_engineer: [
    { skill: "AWS/GCP/Azure", current: 5, required: 85 },
    { skill: "Docker", current: 5, required: 80 },
    { skill: "Linux", current: 10, required: 85 },
    { skill: "Networking", current: 15, required: 80 },
    { skill: "DevOps", current: 5, required: 75 },
  ],
  it_pm: [
    { skill: "Project Management", current: 25, required: 85 },
    { skill: "Communication", current: 50, required: 90 },
    { skill: "Agile/Scrum", current: 10, required: 80 },
    { skill: "Budgeting", current: 15, required: 75 },
    { skill: "Leadership", current: 30, required: 85 },
  ],
  digital_marketing: [
    { skill: "SEO/SEM", current: 10, required: 80 },
    { skill: "Social Media", current: 40, required: 85 },
    { skill: "Analytics", current: 15, required: 75 },
    { skill: "Content Strategy", current: 20, required: 80 },
    { skill: "Copywriting", current: 25, required: 75 },
  ],
  content_creator: [
    { skill: "Video Editing", current: 20, required: 80 },
    { skill: "Writing", current: 30, required: 85 },
    { skill: "Photography", current: 15, required: 70 },
    { skill: "Social Media", current: 40, required: 85 },
    { skill: "Storytelling", current: 25, required: 80 },
  ],
  graphic_designer: [
    { skill: "Adobe Illustrator", current: 10, required: 85 },
    { skill: "Photoshop", current: 15, required: 80 },
    { skill: "Typography", current: 10, required: 80 },
    { skill: "Color Theory", current: 20, required: 85 },
    { skill: "Branding", current: 10, required: 75 },
  ],
  robotics_engineer: [
    { skill: "Arduino/RPi", current: 10, required: 85 },
    { skill: "C++", current: 5, required: 80 },
    { skill: "Mechatronics", current: 10, required: 85 },
    { skill: "Sensors", current: 10, required: 80 },
    { skill: "CAD", current: 5, required: 75 },
  ],
  it_support: [
    { skill: "Windows/Linux", current: 25, required: 85 },
    { skill: "Networking", current: 20, required: 80 },
    { skill: "Hardware", current: 20, required: 80 },
    { skill: "Troubleshooting", current: 30, required: 85 },
    { skill: "Help Desk", current: 20, required: 75 },
  ],
  accountant: [
    { skill: "Excel", current: 30, required: 85 },
    { skill: "Accounting Software", current: 5, required: 80 },
    { skill: "Taxation", current: 5, required: 80 },
    { skill: "Financial Reporting", current: 10, required: 85 },
    { skill: "Analysis", current: 20, required: 80 },
  ],
  lawyer: [
    { skill: "Legal Research", current: 5, required: 85 },
    { skill: "Writing", current: 30, required: 85 },
    { skill: "Negotiation", current: 20, required: 80 },
    { skill: "Critical Thinking", current: 30, required: 85 },
    { skill: "Cyber Law", current: 5, required: 75 },
  ],
  edtech_dev: [
    { skill: "Web Development", current: 15, required: 80 },
    { skill: "UX Design", current: 10, required: 75 },
    { skill: "Education Domain", current: 20, required: 80 },
    { skill: "Content Creation", current: 20, required: 75 },
    { skill: "Data Analysis", current: 10, required: 70 },
  ],
  user_researcher: [
    { skill: "Interview", current: 25, required: 85 },
    { skill: "Survey Design", current: 10, required: 80 },
    { skill: "Data Analysis", current: 15, required: 80 },
    { skill: "Empathy", current: 40, required: 90 },
    { skill: "Report Writing", current: 20, required: 80 },
  ],
};

// ─── ROADMAP STEPS PER CAREER ─────────────────────────────
export interface RoadmapStep {
  title: string;
  items: string[];
}

export const CAREER_ROADMAPS: Record<CareerId, RoadmapStep[]> = {
  ai_engineer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Python",
        "Pahami Math & Statistics",
        "Buat mini project ML",
      ],
    },
    {
      title: "Deep Learning",
      items: [
        "Ikut course ML",
        "Bangun model prediksi",
        "Eksplorasi TensorFlow/PyTorch",
      ],
    },
    {
      title: "Portfolio & Kompetisi",
      items: [
        "Ikut kompetisi Kaggle",
        "Buat project portofolio",
        "Contributing ke open source",
      ],
    },
    {
      title: "Siap Karier",
      items: [
        "Magang di perusahaan AI",
        "Build personal brand",
        "Lamar posisi AI Engineer",
      ],
    },
  ],
  frontend_dev: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari HTML & CSS",
        "Pahami JavaScript dasar",
        "Buat website pertama",
      ],
    },
    {
      title: "Framework Modern",
      items: [
        "Belajar React/Vue",
        "Pahami Tailwind CSS",
        "Build project interaktif",
      ],
    },
    {
      title: "Advanced",
      items: [
        "State management",
        "Testing & deployment",
        "Performance optimization",
      ],
    },
    {
      title: "Siap Karier",
      items: [
        "Portofolio online",
        "Magang di startup",
        "Kontribusi open source",
      ],
    },
  ],
  uiux_designer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Figma",
        "Pahami prinsip desain",
        "Analisis UI app favorit",
      ],
    },
    {
      title: "User Research",
      items: [
        "Belajar interview user",
        "Buat user persona",
        "Wireframing & prototyping",
      ],
    },
    {
      title: "Portofolio",
      items: [
        "Redesign existing app",
        "Case study lengkap",
        "Publikasi di Dribbble/Behance",
      ],
    },
    {
      title: "Siap Karier",
      items: [
        "Magang di design agency",
        "Build personal brand",
        "Lamar posisi UI/UX",
      ],
    },
  ],
  data_analyst: [
    {
      title: "Mulai dari Dasar",
      items: ["Kuasai Excel/Sheets", "Belajar SQL dasar", "Pahami statistika"],
    },
    {
      title: "Visualisasi & Coding",
      items: [
        "Belajar Python/R",
        "Data visualization (Tableau/PowerBI)",
        "Buat dashboard interaktif",
      ],
    },
    {
      title: "Machine Learning Dasar",
      items: [
        "Regresi & klasifikasi",
        "Project prediksi",
        "Kompetisi data science",
      ],
    },
    {
      title: "Siap Karier",
      items: [
        "Portofolio analysis",
        "Magang di perusahaan",
        "Sertifikasi data analyst",
      ],
    },
  ],
  cyber_security: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari networking (TCP/IP)",
        "Install Linux",
        "Pahami sistem operasi",
      ],
    },
    {
      title: "Security Fundamentals",
      items: [
        "Ethical hacking basics",
        "Cryptography",
        "Security tools (Wireshark, Nmap)",
      ],
    },
    {
      title: "Hands-on Practice",
      items: ["CTF challenges", "Bug bounty", "Build home lab"],
    },
    {
      title: "Siap Karier",
      items: [
        "Sertifikasi (CEH, CompTIA)",
        "Magang di SOC",
        "Lamar posisi SOC Analyst",
      ],
    },
  ],
  software_engineer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari 1 bahasa pemrograman",
        "Pahami OOP",
        "Buat mini project",
      ],
    },
    {
      title: "Software Craft",
      items: [
        "Git & version control",
        "Testing & debugging",
        "Clean code principles",
      ],
    },
    {
      title: "Full Stack",
      items: ["Frontend + Backend", "Database & API", "Deployment"],
    },
    {
      title: "Siap Karier",
      items: [
        "Portofolio GitHub",
        "Magang di tech company",
        "Open source contribution",
      ],
    },
  ],
  cloud_engineer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Linux",
        "Pahami networking",
        "Command line proficiency",
      ],
    },
    {
      title: "Cloud Platform",
      items: ["AWS/GCP free tier", "Docker basics", "CI/CD pipeline"],
    },
    {
      title: "Infrastructure",
      items: ["Terraform/IaC", "Kubernetes", "Monitoring & logging"],
    },
    {
      title: "Siap Karier",
      items: [
        "Cloud certification",
        "Magang di cloud provider",
        "Build portfolio projects",
      ],
    },
  ],
  it_pm: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pahami metodologi Agile",
        "Belajar komunikasi efektif",
        "Tools manajemen proyek",
      ],
    },
    {
      title: "Leadership",
      items: [
        "Scrum Master basics",
        "Risk management",
        "Stakeholder communication",
      ],
    },
    {
      title: "Advanced",
      items: ["Budget management", "Team building", "Strategic planning"],
    },
    {
      title: "Siap Karier",
      items: [
        "PMP/CAPM certification",
        "Magang di IT department",
        "Build leadership portfolio",
      ],
    },
  ],
  digital_marketing: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pahami SEO dasar",
        "Social media management",
        "Google Analytics",
      ],
    },
    {
      title: "Paid Advertising",
      items: ["Google Ads", "Facebook/Meta Ads", "Campaign optimization"],
    },
    {
      title: "Content & Strategy",
      items: ["Content marketing", "Email marketing", "Marketing automation"],
    },
    {
      title: "Siap Karier",
      items: ["Google certification", "Magang di agency", "Build case studies"],
    },
  ],
  content_creator: [
    {
      title: "Mulai dari Dasar",
      items: ["Tentukan niche", "Pelajari editing video", "Mulai bikin konten"],
    },
    {
      title: "Growing",
      items: [
        "Konsisten upload",
        "Pahami algoritma platform",
        "Bangun komunitas",
      ],
    },
    {
      title: "Monetization",
      items: ["Brand deals", "Affiliate marketing", "Merchandise"],
    },
    {
      title: "Siap Karier",
      items: [
        "Professional portfolio",
        "Diversifikasi platform",
        "Build media company",
      ],
    },
  ],
  graphic_designer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Adobe Illustrator",
        "Pahami color theory",
        "Typography basics",
      ],
    },
    {
      title: "Branding",
      items: ["Logo design", "Brand identity", "Package design"],
    },
    {
      title: "Digital Design",
      items: ["Social media design", "Web graphics", "Motion graphics"],
    },
    {
      title: "Siap Karier",
      items: [
        "Portofolio di Behance",
        "Freelance projects",
        "Magang di agency",
      ],
    },
  ],
  robotics_engineer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Arduino",
        "Pahami elektronika dasar",
        "Buat robot sederhana",
      ],
    },
    {
      title: "Mechatronics",
      items: ["Sensor & aktuator", "C/C++ programming", "Mekanika dasar"],
    },
    {
      title: "Advanced",
      items: ["Raspberry Pi", "Computer vision", "Autonomous systems"],
    },
    {
      title: "Siap Karier",
      items: [
        "Kompetisi robotik",
        "Magang di manufacturing",
        "Build portfolio",
      ],
    },
  ],
  it_support: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari Windows/Linux",
        "Troubleshooting dasar",
        "Hardware basics",
      ],
    },
    {
      title: "Networking",
      items: ["TCP/IP & DNS", "Router & switch", "Help desk tools"],
    },
    {
      title: "Certification",
      items: ["CompTIA A+", "Network+", "ITIL foundation"],
    },
    {
      title: "Siap Karier",
      items: [
        "Magang IT department",
        "Build ticket portfolio",
        "Specialize (cloud/security)",
      ],
    },
  ],
  accountant: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pahami akuntansi dasar",
        "Kuasai Excel tingkat lanjut",
        "Software akuntansi",
      ],
    },
    {
      title: "Tax & Audit",
      items: ["Perpajakan Indonesia", "Auditing basics", "IFRS/GAAP"],
    },
    {
      title: "Specialization",
      items: ["Tax consulting", "Financial analysis", "Forensic accounting"],
    },
    {
      title: "Siap Karier",
      items: ["CPA certification", "Magang di KAP", "Build client portfolio"],
    },
  ],
  lawyer: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pahami hukum Indonesia",
        "Legal research skills",
        "Membaca putusan pengadilan",
      ],
    },
    {
      title: "Cyber Law",
      items: ["UU ITE", "Data protection", "Intellectual property"],
    },
    {
      title: "Practice",
      items: ["Moot court", "Legal aid", "Internship di firma hukum"],
    },
    {
      title: "Siap Karier",
      items: ["Ujian advokat", "Spesialisasi hukum siber", "Build reputation"],
    },
  ],
  edtech_dev: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari web development",
        "Pahami UX design",
        "Eksplor platform e-learning",
      ],
    },
    {
      title: "Education Tech",
      items: ["Learning management systems", "Gamification", "Accessibility"],
    },
    {
      title: "Build",
      items: [
        "Buat edtech prototype",
        "User testing dengan siswa",
        "Iterate berdasarkan feedback",
      ],
    },
    {
      title: "Siap Karier",
      items: [
        "Magang di edtech startup",
        "Portofolio project",
        "Magang di sekolah/universitas",
      ],
    },
  ],
  user_researcher: [
    {
      title: "Mulai dari Dasar",
      items: [
        "Pelajari psikologi dasar",
        "Interview techniques",
        "Survey design",
      ],
    },
    {
      title: "Research Methods",
      items: [
        "Qualitative research",
        "Quantitative analysis",
        "Usability testing",
      ],
    },
    {
      title: "Advanced",
      items: ["Eye tracking", "A/B testing", "Data synthesis"],
    },
    {
      title: "Siap Karier",
      items: [
        "UX research portfolio",
        "Magang di tech company",
        "Build case studies",
      ],
    },
  ],
};
