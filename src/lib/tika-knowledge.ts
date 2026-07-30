/**
 * TIKA Knowledge Base v2 - Data lengkap Universitas Harkat Negeri
 *
 * Update: Detail setiap prodi (kurikulum, mata kuliah, skill, karier)
 * Untuk upgrade: edit file ini langsung, tidak perlu backend.
 */

export const UHN_PROFILE = {
  name: "Universitas Harkat Negeri",
  abbreviation: "UHN",
  tagline:
    "Membentuk lulusan unggul berkarakter kepemimpinan yang dapat memberikan dampak nyata bagi masyarakat.",
  vision:
    "Rumah Pembelajar Berdaya dengan ekosistem terhubung untuk mengangkat harkat negeri melalui kontribusi nyata.",
  mission: [
    "Menyelenggarakan pendidikan tinggi berkualitas berbasis digital dan teknologi mutakhir",
    "Melaksanakan penelitian terapan yang inovatif dan bermanfaat bagi masyarakat",
    "Menjalin kemitraan strategis dengan industri nasional dan internasional",
    "Membentuk lulusan berkarakter kepemimpinan yang siap berkontribusi",
  ],
  founded: 2024,
  status:
    "Perguruan Tinggi Terapan (hasil penyatuan Poltek Harber & STMIK YMI Tegal)",
  accreditation: "Dalam Proses Pemeringkatan",
  totalStudents: "~1.500",
  totalLecturers: "~75",
};

export const CAMPUSES = [
  {
    name: "Kampus Mataram",
    address:
      "Jl. Mataram No.9, Pesurungan Lor, Kec. Margadana, Kota Tegal, Jawa Tengah 52147",
    type: "Kampus Utama",
    programs: [
      "Teknik Informatika",
      "Sistem Informasi",
      "Sains Data",
      "Teknik Mesin",
      "Manajemen",
      "Akuntansi",
      "Ilmu Komunikasi",
      "Hukum",
      "Psikologi",
      "PGSD",
    ],
  },
  {
    name: "Kampus Pendidikan",
    address:
      "Jl. Pendidikan No.1, Pesurungan Lor, Kec. Margadana, Kota Tegal, Jawa Tengah 52142",
    type: "Kampus Pendidikan",
    programs: ["Psikologi", "PGSD"],
  },
  {
    name: "Kampus Kalisoga",
    address: "Desa Slatri, Kabupaten Brebes, Jawa Tengah 52262",
    type: "Kampus Vokasi",
    programs: ["Semua program D-3 dan D-4"],
  },
];

// ═══════════════════════════════════════════════════════════
// DETAIL PROGRAM STUDI - SAINTEK
// ═══════════════════════════════════════════════════════════

export interface ProgramDetail {
  name: string;
  level: string;
  faculty: string;
  focus: string;
  description: string;
  isNew: boolean;
  accreditation: string;
  duration: string;
  keyCourses: string[];
  skills: string[];
  careers: { title: string; salary: string; description: string }[];
  labFacilities: string[];
  certifications: string[];
  whyChoose: string;
  suitableFor: string;
}

export const PROGRAM_DETAILS: ProgramDetail[] = [
  // ═══ SAINTEK ═══
  {
    name: "S-1 Teknik Informatika",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sains & Teknologi",
    focus: "Software Engineering, AI, Cyber Security, Cloud Computing",
    description:
      "Program studi unggulan yang menyiapkan lulusan sebagai software developer, AI engineer, dan cyber security analyst. Kurikulum berbasis proyek industri dengan praktik langsung menggunakan teknologi terkini.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Pemrograman Web (HTML, CSS, JavaScript, React)",
      "Pemrograman Backend (Node.js, Python, Go)",
      "Basis Data & SQL",
      "Struktur Data & Algoritma",
      "Jaringan Komputer & Keamanan",
      "Kecerdasan Buatan (AI) & Machine Learning",
      "Rekayasa Perangkat Lunak",
      "Sistem Operasi & Cloud Computing",
      "Mobile App Development",
      "Project Management",
      "Matematika Diskrit & Kalkulus",
      "Statistika & Probabilitas",
    ],
    skills: [
      "Full-Stack Web Development",
      "Mobile App Development (Android/iOS)",
      "AI & Machine Learning",
      "Cloud Deployment (AWS/GCP/Azure)",
      "Cyber Security & Ethical Hacking",
      "Database Design & Management",
      "Version Control (Git)",
      "Agile/Scrum Project Management",
    ],
    careers: [
      {
        title: "Software Engineer",
        salary: "Rp 7-12 juta/bulan",
        description: "Membangun aplikasi web, mobile, dan desktop",
      },
      {
        title: "AI Engineer",
        salary: "Rp 8-15 juta/bulan",
        description: "Mengembangkan sistem AI dan machine learning",
      },
      {
        title: "Cyber Security Analyst",
        salary: "Rp 8-14 juta/bulan",
        description: "Melindungi sistem dari serangan siber",
      },
      {
        title: "Cloud Engineer",
        salary: "Rp 8-15 juta/bulan",
        description: "Mengelola infrastruktur cloud",
      },
      {
        title: "DevOps Engineer",
        salary: "Rp 9-16 juta/bulan",
        description: "Otomasi deployment dan CI/CD",
      },
      {
        title: "Full-Stack Developer",
        salary: "Rp 7-14 juta/bulan",
        description: "Frontend + Backend development",
      },
    ],
    labFacilities: [
      "Lab Software Engineering (50 unit, high-spec)",
      "Lab Jaringan & Cyber Security",
      "Lab Cloud Computing (AWS Academy)",
      "Lab AI & Machine Learning (GPU Server)",
      "Lab Mobile Development (Mac + Android devices)",
    ],
    certifications: [
      "AWS Cloud Practitioner",
      "Cisco CCNA",
      "Google IT Support",
      "CompTIA Security+",
    ],
    whyChoose:
      "Kurikulum 70% praktik, kerjasama dengan industri tech, lulusan langsung siap kerja. Didukung lab modern dan sertifikasi internasional.",
    suitableFor:
      "Siswa yang suka coding, memecahkan masalah logis, tertarik dengan teknologi, dan ingin karier di bidang IT.",
  },
  {
    name: "S-1 Sistem Informasi",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sains & Teknologi",
    focus: "Business Analysis, IT Management, Database, Enterprise Systems",
    description:
      "Program studi yang menggabungkan teknologi informasi dengan manajemen bisnis. Lulusan mampu menjadi jembatan antara kebutuhan bisnis dan solusi IT.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Sistem Informasi Manajemen",
      "Basis Data Lanjut & Data Warehouse",
      "Analisis & Perancangan Sistem Informasi",
      "Enterprise Resource Planning (ERP)",
      "Business Intelligence & Analytics",
      "IT Governance & Strategy",
      "Pemrograman Web & Mobile",
      "Project Management (PMP)",
      "E-Commerce & Digital Business",
      "Manajemen Proyek TI",
      "Matematika & Statistika",
      "Akuntansi Sistem Informasi",
    ],
    skills: [
      "Business Process Analysis",
      "Database Design & Administration",
      "ERP Implementation (SAP/Oracle)",
      "IT Project Management",
      "Data Analysis & Reporting",
      "System Integration",
      "IT Governance (COBIT/ITIL)",
      "Digital Business Strategy",
    ],
    careers: [
      {
        title: "Business Analyst",
        salary: "Rp 7-12 juta/bulan",
        description:
          "Menganalisis kebutuhan bisnis dan menerjemahkannya menjadi solusi IT",
      },
      {
        title: "IT Consultant",
        salary: "Rp 8-15 juta/bulan",
        description: "Memberikan konsultasi strategi IT untuk perusahaan",
      },
      {
        title: "Product Manager",
        salary: "Rp 10-18 juta/bulan",
        description: "Mengelola pengembangan produk digital",
      },
      {
        title: "Database Administrator",
        salary: "Rp 7-12 juta/bulan",
        description: "Mengelola dan mengoptimalkan database",
      },
      {
        title: "ERP Consultant",
        salary: "Rp 9-16 juta/bulan",
        description: "Implementasi sistem ERP di perusahaan",
      },
      {
        title: "IT Project Manager",
        salary: "Rp 10-18 juta/bulan",
        description: "Memimpin proyek pengembangan sistem informasi",
      },
    ],
    labFacilities: [
      "Lab Sistem Informasi & ERP",
      "Lab Basis Data & Business Intelligence",
      "Lab E-Commerce & Digital Business",
      "Lab IT Governance",
    ],
    certifications: [
      "SAP Certified Application Associate",
      "ITIL Foundation",
      "Project Management Professional (PMP)",
      "Google Data Analytics",
    ],
    whyChoose:
      "Kombinasi unik teknologi + bisnis. Cocok untuk yang ingin berkarier di perusahaan besar sebagai penghubung antara tim IT dan bisnis.",
    suitableFor:
      "Siswa yang suka analisis, komunikasi, memahami bisnis, dan ingin berkarier di intersection teknologi dan manajemen.",
  },
  {
    name: "S-1 Sains Data",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sains & Teknologi",
    focus: "Data Science, Machine Learning, Statistics, Big Data",
    description:
      "Program baru yang fokus pada analisis data, machine learning, dan big data untuk mendukung pengambilan keputusan bisnis. Sangat dibutuhkan di era digital saat ini.",
    isNew: true,
    accreditation: "Dalam Proses",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Statistika & Probabilitas Lanjut",
      "Pemrograman Python & R",
      "Machine Learning & Deep Learning",
      "Big Data Processing (Hadoop, Spark)",
      "Data Visualization (Tableau, Power BI)",
      "Data Mining & Pattern Recognition",
      "Natural Language Processing (NLP)",
      "Database & SQL Lanjut",
      "Matematika Linear & Kalkulus",
      "Etika Data & Privacy",
      "Time Series Analysis",
      "Capstone Project Data Science",
    ],
    skills: [
      "Python/R Programming",
      "Machine Learning (Scikit-learn, TensorFlow)",
      "Data Visualization",
      "Statistical Analysis",
      "Big Data Tools (Hadoop, Spark)",
      "SQL & NoSQL Databases",
      "Data Cleaning & Preprocessing",
      "Storytelling with Data",
    ],
    careers: [
      {
        title: "Data Analyst",
        salary: "Rp 6-10 juta/bulan",
        description: "Menganalisis data untuk insight bisnis",
      },
      {
        title: "Data Scientist",
        salary: "Rp 8-15 juta/bulan",
        description: "Membangun model prediktif dan preskriptif",
      },
      {
        title: "Machine Learning Engineer",
        salary: "Rp 9-16 juta/bulan",
        description: "Mengembangkan dan deploy model ML",
      },
      {
        title: "Business Intelligence Analyst",
        salary: "Rp 7-12 juta/bulan",
        description: "Membuat dashboard dan laporan analitik",
      },
      {
        title: "Data Engineer",
        salary: "Rp 8-14 juta/bulan",
        description: "Membangun pipeline data",
      },
    ],
    labFacilities: [
      "Lab Data Science & Analytics (GPU Server)",
      "Lab Big Data (Hadoop Cluster)",
      "Lab Machine Learning",
    ],
    certifications: [
      "Google Data Analytics Professional",
      "IBM Data Science Professional",
      "AWS Machine Learning Specialty",
      "Tableau Desktop Specialist",
    ],
    whyChoose:
      "Program baru dengan kurikulum terkini. Demand Data Scientist sangat tinggi (15% growth per tahun). Didukung GPU server untuk praktik langsung.",
    suitableFor:
      "Siswa yang suka matematika, analisis data, pola, dan ingin berkarier di bidang yang paling dibutuhkan saat ini.",
  },
  {
    name: "S-1 Teknik Mesin",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sains & Teknologi",
    focus: "Manufacturing, Robotics, CAD/CAM, Industrial Automation",
    description:
      "Program baru yang menyiapkan lulusan di bidang manufaktur, robotika, dan otomasi industri. Menggabungkan ilmu mesin konvensional dengan teknologi modern.",
    isNew: true,
    accreditation: "Dalam Proses",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Mekanika Teknik & Teknik Mesin Dasar",
      "Termodynamika & Heat Transfer",
      "CAD/CAM (AutoCAD, SolidWorks)",
      "Robotika & Sistem Otomasi",
      "Manufaktur & Material Science",
      "Pneumatik & Hidrolik",
      "IoT untuk Industri (Industry 4.0)",
      "Kontrol Otomasi (PLC, SCADA)",
      "Pengendalian Kualitas",
      "Manajemen Produksi",
      "Matematika & Fisika Teknik",
      "Praktikum Bengkel & Lab",
    ],
    skills: [
      "CAD/CAM Design (AutoCAD, SolidWorks, Fusion 360)",
      "Robot Programming",
      "PLC Programming",
      "IoT Sensor Integration",
      "Industrial Automation",
      "Quality Control & Assurance",
      "Manufacturing Process",
      "3D Printing & Rapid Prototyping",
    ],
    careers: [
      {
        title: "Manufacturing Engineer",
        salary: "Rp 6-10 juta/bulan",
        description: "Mengoptimalkan proses produksi",
      },
      {
        title: "Robotics Engineer",
        salary: "Rp 7-12 juta/bulan",
        description: "Merancang dan memprogram robot industri",
      },
      {
        title: "Automation Engineer",
        salary: "Rp 7-12 juta/bulan",
        description: "Mengimplementasikan sistem otomasi",
      },
      {
        title: "Quality Control Engineer",
        salary: "Rp 6-10 juta/bulan",
        description: "Mengawasi kualitas produk",
      },
      {
        title: "Industrial IoT Specialist",
        salary: "Rp 8-14 juta/bulan",
        description: "Implementasi IoT di industri",
      },
    ],
    labFacilities: [
      "Lab Robotika & Otomasi",
      "Lab CAD/CAM & 3D Printing",
      "Lab Pneumatik & Hidrolik",
      "Lab Manufaktur & Bengkel",
      "Lab IoT Industri",
    ],
    certifications: [
      "SolidWorks Certified Professional",
      "FANUC Robot Programming",
      "Siemens PLC Certification",
    ],
    whyChoose:
      "Era Industry 4.0 membutuhkan engineer yang paham mesin DAN digital. Program ini menggabungkan keduanya dengan lab robotika dan otomasi lengkap.",
    suitableFor:
      "Siswa yang suka mekanik, robot, mesin, desain 3D, dan ingin berkarier di industri manufaktur modern.",
  },

  // ═══ SOSHUM ═══
  {
    name: "S-1 Akuntansi",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sosial Humaniora",
    focus: "Financial Accounting, Taxation, Auditing",
    description:
      "Program studi akuntansi yang menyiapkan lulusan sebagai akuntan profesional, tax consultant, dan auditor.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Akuntansi Dasar & Lanjut",
      "Perpajakan",
      "Auditing",
      "Akuntansi Manajemen",
      "Sistem Informasi Akuntansi",
      "Hukum Bisnis",
      "Etika Profesi Akuntansi",
    ],
    skills: [
      "Financial Reporting",
      "Tax Planning",
      "Auditing",
      "SAP/Software Akuntansi",
      "Analisis Keuangan",
    ],
    careers: [
      {
        title: "Akuntan",
        salary: "Rp 5-10 juta/bulan",
        description: "Pencatatan & pelaporan keuangan",
      },
      {
        title: "Tax Consultant",
        salary: "Rp 6-12 juta/bulan",
        description: "Konsultasi perpajakan",
      },
      {
        title: "Auditor",
        salary: "Rp 6-12 juta/bulan",
        description: "Pemeriksaan laporan keuangan",
      },
    ],
    labFacilities: ["Lab Akuntansi & Perpajakan"],
    certifications: ["Brevet Pajak A & B", "CPA (Certified Public Accountant)"],
    whyChoose:
      "Profesi akuntan selalu dibutuhkan di setiap perusahaan. Peluang kerja sangat luas.",
    suitableFor:
      "Siswa yang teliti, suka angka, dan ingin karier stabil di bidang keuangan.",
  },
  {
    name: "S-1 Hukum",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sosial Humaniora",
    focus: "Corporate Law, Cyber Law, Intellectual Property",
    description:
      "Program studi hukum dengan keunggulan di bidang hukum siber dan hukum bisnis digital.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Hukum Perdata",
      "Hukum Pidana",
      "Hukum Dagang",
      "Hukum ITE & Cyber Law",
      "Hukum Kekayaan Intelektual",
      "Negosiasi & Mediasi",
    ],
    skills: [
      "Legal Research",
      "Contract Drafting",
      "Cyber Law Analysis",
      "Negotiation",
      "Critical Thinking",
    ],
    careers: [
      {
        title: "Advokat",
        salary: "Rp 5-15 juta/bulan",
        description: "Praktik hukum di pengadilan",
      },
      {
        title: "Legal Counsel",
        salary: "Rp 8-15 juta/bulan",
        description: "Penasihat hukum perusahaan",
      },
      {
        title: "Cyber Law Specialist",
        salary: "Rp 7-12 juta/bulan",
        description: "Hukum siber & perlindungan data",
      },
    ],
    labFacilities: ["Lab Hukum & Moot Court"],
    certifications: ["Ujian Advokat", "Certified Cyber Law Professional"],
    whyChoose:
      "Era digital membutuhkan ahli hukum siber. Kombinasi hukum + teknologi sangat langka dan dibutuhkan.",
    suitableFor:
      "Siswa yang suka debat, analisis, dan ingin memahami hukum di era digital.",
  },
  {
    name: "S-1 Ilmu Komunikasi",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sosial Humaniora",
    focus: "Digital Marketing, Media Production, Content Creation",
    description:
      "Program studi komunikasi modern yang fokus pada digital marketing, produksi media, dan content creation.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Digital Marketing",
      "Public Relations",
      "Produksi Media (Video/Foto)",
      "Copywriting & Content Strategy",
      "Social Media Management",
      "Brand Management",
      "Komunikasi Bisnis",
    ],
    skills: [
      "Content Creation",
      "Video Editing",
      "Social Media Marketing",
      "Copywriting",
      "Brand Strategy",
      "Public Speaking",
    ],
    careers: [
      {
        title: "Digital Marketing Specialist",
        salary: "Rp 5-10 juta/bulan",
        description: "Strategi pemasaran digital",
      },
      {
        title: "Content Creator",
        salary: "Rp 4-12 juta/bulan",
        description: "Buat konten untuk brand",
      },
      {
        title: "Public Relations Specialist",
        salary: "Rp 6-10 juta/bulan",
        description: "Manajemen citra perusahaan",
      },
    ],
    labFacilities: [
      "Lab Broadcasting & Studio Multimedia",
      "Lab Digital Marketing",
    ],
    certifications: [
      "Google Ads Certification",
      "Meta Blueprint",
      "HubSpot Content Marketing",
    ],
    whyChoose:
      "Setiap perusahaan butuh digital marketer. Kreativitas + strategi = karier fleksibel dan fun.",
    suitableFor:
      "Siswa yang kreatif, suka konten, komunikasi, dan ingin karier di dunia kreatif digital.",
  },
  {
    name: "S-1 Manajemen",
    level: "Sarjana (S1)",
    faculty: "Fakultas Sosial Humaniora",
    focus: "Business Management, Marketing, Finance, HR",
    description:
      "Program studi manajemen bisnis yang menyiapkan lulusan sebagai manager dan leader di berbagai sektor.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Manajemen Strategis",
      "Pemasaran",
      "Manajemen Keuangan",
      "Manajemen Sumber Daya Manusia",
      "Kewirausahaan",
      "Bisnis Digital",
      "Perilaku Organisasi",
    ],
    skills: [
      "Strategic Planning",
      "Marketing Management",
      "Financial Analysis",
      "Leadership",
      "Entrepreneurship",
    ],
    careers: [
      {
        title: "Business Manager",
        salary: "Rp 7-15 juta/bulan",
        description: "Mengelola operasional bisnis",
      },
      {
        title: "Marketing Manager",
        salary: "Rp 8-15 juta/bulan",
        description: "Strategi pemasaran",
      },
      {
        title: "Entrepreneur",
        salary: "Bervariasi",
        description: "Memulai bisnis sendiri",
      },
    ],
    labFacilities: ["Lab Bisnis & Simulasi Usaha"],
    certifications: [
      "Certified Marketing Professional",
      "SHRM (HR Certification)",
    ],
    whyChoose:
      "Fundamental bisnis yang universal. Cocok untuk karier korporasi maupun berwirausaha.",
    suitableFor:
      "Siswa yang suka memimpin, berorganisasi, dan ingin memahami dunia bisnis.",
  },

  // ═══ PSIKOPEN ═══
  {
    name: "S-1 Psikologi",
    level: "Sarjana (S1)",
    faculty: "Fakultas Psikologi & Pendidikan",
    focus: "Industrial Psychology, User Research, HR Development",
    description:
      "Program psikologi modern yang menggabungkan psikologi konvensional dengan UX research dan HR development.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Psikologi Umum",
      "Psikologi Industri & Organisasi",
      "Psikometri",
      "Research Methodology",
      "User Experience Research",
      "Psikologi Klinis",
      "Bimbingan Konseling",
    ],
    skills: [
      "User Research",
      "Psychological Assessment",
      "Interview Technique",
      "Data Analysis",
      "Empathy & Communication",
    ],
    careers: [
      {
        title: "User Researcher",
        salary: "Rp 7-12 juta/bulan",
        description: "Riset perilaku pengguna di tech company",
      },
      {
        title: "HR Development Specialist",
        salary: "Rp 6-10 juta/bulan",
        description: "Pengembangan sumber daya manusia",
      },
      {
        title: "Psychologist",
        salary: "Rp 5-10 juta/bulan",
        description: "Konseling & terapi",
      },
    ],
    labFacilities: ["Lab Psikologi & Psikometri"],
    certifications: ["Psikolog (setelah profesi)", "UX Research Certificate"],
    whyChoose:
      "Psikologi + Tech = kombinasi langka. User Researcher sangat dibutuhkan di startup dan tech company.",
    suitableFor:
      "Siswa yang suka memahami perilaku manusia, empati, dan ingin berkarier di UX research atau HR.",
  },
  {
    name: "S-1 PGSD",
    level: "Sarjana (S1)",
    faculty: "Fakultas Psikologi & Pendidikan",
    focus: "Primary Education, Curriculum Design, EdTech",
    description:
      "Program pendidikan guru sekolah dasar dengan sentuhan teknologi pendidikan (EdTech) modern.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Pendidikan Anak Usia Dini",
      "Metodologi Pembelajaran",
      "Curriculum Design",
      "Educational Technology",
      "Psikologi Pendidikan",
      "Manajemen Kelas",
      "Media Pembelajaran Digital",
    ],
    skills: [
      "Teaching",
      "Curriculum Design",
      "EdTech Tools",
      "Classroom Management",
      "Child Psychology",
    ],
    careers: [
      {
        title: "Guru SD",
        salary: "Rp 4-7 juta/bulan",
        description: "Mengajar di sekolah dasar",
      },
      {
        title: "EdTech Specialist",
        salary: "Rp 5-10 juta/bulan",
        description: "Pengembang teknologi pendidikan",
      },
      {
        title: "Curriculum Designer",
        salary: "Rp 6-10 juta/bulan",
        description: "Merancang kurikulum pendidikan",
      },
    ],
    labFacilities: ["Lab Mikro Teaching", "Lab EdTech & Media Pembelajaran"],
    certifications: ["Sertifikasi Guru", "Google Educator"],
    whyChoose:
      "Guru SD selalu dibutuhkan. EdTech memberikan dimensi modern yang membedakan dari lulusan PGSD lain.",
    suitableFor:
      "Siswa yang suka mengajar, sabar dengan anak-anak, dan ingin berkontribusi di bidang pendidikan.",
  },

  // ═══ VOKASI (ringkas) ═══
  {
    name: "D-4 Teknik Informatika",
    level: "Vokasi (D4)",
    faculty: "Sekolah Vokasi",
    focus: "Applied IT, Software Dev, Networking",
    description:
      "Program vokasi praktis yang menyiapkan lulusan siap kerja di bidang IT dalam 4 tahun.",
    isNew: false,
    accreditation: "Baik",
    duration: "8 semester (4 tahun)",
    keyCourses: [
      "Pemrograman Web & Mobile",
      "Jaringan Komputer",
      "Basis Data",
      "Sistem Operasi",
      "Praktikum Industri",
    ],
    skills: [
      "Web Development",
      "Networking",
      "System Administration",
      "Technical Support",
    ],
    careers: [
      {
        title: "IT Support",
        salary: "Rp 4-7 juta/bulan",
        description: "Support teknis perusahaan",
      },
      {
        title: "Junior Developer",
        salary: "Rp 5-8 juta/bulan",
        description: "Pengembang aplikasi",
      },
      {
        title: "Network Administrator",
        salary: "Rp 5-8 juta/bulan",
        description: "Admin jaringan",
      },
    ],
    labFacilities: ["Lab Komputer & Jaringan"],
    certifications: ["CompTIA A+", "Cisco CCNA"],
    whyChoose:
      "Lebih praktis dari S1, langsung siap kerja. Praktik industri semester 7-8.",
    suitableFor:
      "Siswa yang ingin cepat kerja di bidang IT dengan skill praktis.",
  },
  {
    name: "D-3 Desain Komunikasi Visual",
    level: "Vokasi (D3)",
    faculty: "Sekolah Vokasi",
    focus: "Graphic Design, UI Design, Branding",
    description:
      "Program 3 tahun yang fokus pada desain grafis, UI/UX, dan branding.",
    isNew: false,
    accreditation: "Baik",
    duration: "6 semester (3 tahun)",
    keyCourses: [
      "Desain Grafis",
      "Typography",
      "UI/UX Design",
      "Photography",
      "Branding & Identity",
      "Motion Graphics",
    ],
    skills: [
      "Adobe Illustrator",
      "Photoshop",
      "Figma",
      "Branding",
      "Visual Communication",
    ],
    careers: [
      {
        title: "Graphic Designer",
        salary: "Rp 4-8 juta/bulan",
        description: "Desain visual untuk brand",
      },
      {
        title: "UI Designer",
        salary: "Rp 5-10 juta/bulan",
        description: "Desain antarmuka aplikasi",
      },
    ],
    labFacilities: ["Lab Desain & Multimedia"],
    certifications: ["Adobe Certified Professional"],
    whyChoose:
      "3 tahun langsung punya skill desain profesional. Portfolio-based assessment.",
    suitableFor:
      "Siswa yang kreatif, suka visual, dan ingin cepat berkarier di desain.",
  },
];

// ═══════════════════════════════════════════════════════════
// OTHER DATA
// ═══════════════════════════════════════════════════════════

export const FACULTIES = [
  {
    id: "saintek",
    name: "Fakultas Sains & Teknologi",
    abbreviation: "Saintek",
    description:
      "Mendorong kemampuan mahasiswa untuk berpikir sistematis melalui berbasis proyek, eksplorasi teknologi, dan kolaborasi antarbidang.",
  },
  {
    id: "soshum",
    name: "Fakultas Sosial Humaniora",
    abbreviation: "Soshum",
    description:
      "Mengasah pemikiran kritis dan aplikatif mahasiswa dengan pemahaman lintas disiplin.",
  },
  {
    id: "psikopen",
    name: "Fakultas Psikologi & Pendidikan",
    abbreviation: "Psikopen",
    description:
      "Membentuk mahasiswa yang mampu memahami, membimbing, dan mengembangkan potensi individu.",
  },
  {
    id: "vokasi",
    name: "Sekolah Vokasi",
    abbreviation: "Vokasi",
    description:
      "Menyiapkan lulusan siap kerja melalui program berbasis praktik langsung dan sertifikasi kompetensi.",
  },
];

/**
 * ALL 22 PROGRAM STUDI - sourced from https://pmb.harkatnegeri.ac.id/
 * Last verified: 2026-07-30
 */
export const ALL_PROGRAMS = [
  // Sarjana (S1) - 10 program
  {
    name: "S-1 Teknik Informatika",
    level: "S1",
    faculty: "Saintek",
    registration_fee: "Rp 250.000",
  },
  {
    name: "S-1 Sistem Informasi",
    level: "S1",
    faculty: "Saintek",
    registration_fee: "Rp 250.000",
  },
  {
    name: "S-1 Sains Data",
    level: "S1",
    faculty: "Saintek",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Teknik Mesin",
    level: "S1",
    faculty: "Saintek",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Akuntansi",
    level: "S1",
    faculty: "Soshum",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Hukum",
    level: "S1",
    faculty: "Soshum",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Ilmu Komunikasi",
    level: "S1",
    faculty: "Soshum",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Manajemen",
    level: "S1",
    faculty: "Soshum",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Psikologi",
    level: "S1",
    faculty: "Psikopen",
    registration_fee: "Rp 300.000",
  },
  {
    name: "S-1 Pendidikan Guru Sekolah Dasar (PGSD)",
    level: "S1",
    faculty: "Psikopen",
    registration_fee: "Rp 300.000",
  },
  // Sarjana Terapan - 3 program
  {
    name: "Sarjana Terapan Teknik Informatika",
    level: "D4",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "Sarjana Terapan Kebidanan",
    level: "D4",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "Sarjana Terapan Akuntansi Sektor Publik",
    level: "D4",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  // Profesi - 1 program
  {
    name: "Pendidikan Profesi Bidan",
    level: "Profesi",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  // Diploma (D3) - 8 program
  {
    name: "D-3 Akuntansi",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Desain Komunikasi Visual",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Farmasi",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Keperawatan",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Perhotelan",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Teknik Elektronika",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Teknik Komputer",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
  {
    name: "D-3 Teknik Mesin",
    level: "D3",
    faculty: "Vokasi",
    registration_fee: "Rp 300.000",
  },
];

export const FACILITIES = {
  general: [
    "Perpustakaan Digital",
    "Auditorium Utama",
    "Student Center",
    "Lapangan Olahraga Outdoor & Indoor",
    "Kantin Terpadu & Free Wi-Fi Zone",
    "Coworking Space 24 Jam",
    "Mushola & Tempat Ibadah",
    "Parkir Luas",
  ],
  informatika: [
    "Lab Software Engineering (50 unit, high-spec)",
    "Lab Jaringan & Cyber Security",
    "Lab Cloud Computing (AWS Academy)",
    "Lab AI & Machine Learning (GPU Server)",
    "Lab Mobile Development (Mac + Android devices)",
    "Lab Robotika & IoT",
    "Lab Data Science & Analytics",
    "Mac Lab untuk Design & Development",
  ],
};

export const ORGANIZATIONS = [
  {
    name: "BEM",
    full_name: "Badan Eksekutif Mahasiswa",
    type: "Kemahasiswaan",
  },
  {
    name: "DPM",
    full_name: "Dewan Perwakilan Mahasiswa",
    type: "Kemahasiswaan",
  },
  {
    name: "HIMAFI",
    full_name: "Himpunan Mahasiswa Informatika",
    type: "Himpunan",
  },
  { name: "Game Dev Community", full_name: "", type: "UKM" },
  { name: "Robotics Club", full_name: "", type: "UKM" },
  { name: "Cyber Security Community", full_name: "", type: "UKM" },
  { name: "Mobile Dev Community", full_name: "", type: "UKM" },
  { name: "Design Community", full_name: "", type: "UKM" },
  { name: "Data Science Community", full_name: "", type: "UKM" },
  { name: "UKM Olahraga", full_name: "", type: "UKM" },
  { name: "UKM Seni Budaya", full_name: "", type: "UKM" },
  { name: "UKM Kewirausahaan", full_name: "", type: "UKM" },
];

export const CAREER_PROSPECTS = [
  {
    career: "AI Engineer",
    salary: "Rp 8-15 juta/bulan",
    demand: "Sangat Tinggi",
  },
  {
    career: "Software Engineer",
    salary: "Rp 7-12 juta/bulan",
    demand: "Tinggi",
  },
  {
    career: "Cyber Security Analyst",
    salary: "Rp 8-14 juta/bulan",
    demand: "Tinggi",
  },
  {
    career: "Data Scientist",
    salary: "Rp 8-15 juta/bulan",
    demand: "Sangat Tinggi",
  },
  { career: "Data Analyst", salary: "Rp 6-10 juta/bulan", demand: "Tinggi" },
  {
    career: "UI/UX Designer",
    salary: "Rp 6-12 juta/bulan",
    demand: "Sedang-Tinggi",
  },
  { career: "Cloud Engineer", salary: "Rp 8-15 juta/bulan", demand: "Tinggi" },
  {
    career: "IT Project Manager",
    salary: "Rp 10-18 juta/bulan",
    demand: "Sedang",
  },
  {
    career: "Business Analyst",
    salary: "Rp 7-12 juta/bulan",
    demand: "Tinggi",
  },
  {
    career: "Digital Marketing Specialist",
    salary: "Rp 5-10 juta/bulan",
    demand: "Sedang",
  },
  {
    career: "Network Engineer",
    salary: "Rp 6-12 juta/bulan",
    demand: "Sedang",
  },
  { career: "Graphic Designer", salary: "Rp 4-8 juta/bulan", demand: "Sedang" },
  {
    career: "Robotics Engineer",
    salary: "Rp 7-12 juta/bulan",
    demand: "Sedang-Tinggi",
  },
  { career: "Akuntan", salary: "Rp 5-10 juta/bulan", demand: "Stabil" },
  {
    career: "Advokat/Cyber Law",
    salary: "Rp 7-15 juta/bulan",
    demand: "Sedang",
  },
];

/**
 * ADMISSION DATA - sourced from https://pmb.harkatnegeri.ac.id/
 * Last verified: 2026-07-30
 */
export const ADMISSION = {
  current_wave: "Gelombang 2 - Tahun Akademik 2026/2027",
  waves: [
    { wave: "Gelombang 1", period: "Januari - Maret 2026" },
    { wave: "Gelombang 2", period: "April - Juli 2026" },
    { wave: "Gelombang 3", period: "Agustus - September 2026" },
  ],
  class_types: [
    { name: "Reguler Pagi", description: "Kelas reguler pagi hari" },
    {
      name: "Reguler Malam (Ekstensi/Karyawan)",
      description: "Untuk karyawan yang ingin kuliah malam",
    },
    {
      name: "RPL (Rekognisi Pembelajaran Lampau)",
      description: "Pengakuan pengalaman kerja sebelumnya",
    },
  ],
  selection: "Ujian CBT (Computer Based Test) di Lab Komputer Gedung B",
  paths: [
    "Jalur Reguler (Gelombang 1, 2, 3) - Ujian CBT",
    "Jalur Beasiswa Bidikmisi Putra-Putri Daerah - Seleksi Administrasi + CBT",
    "Jalur Khusus PMDK - Nilai rapor minimal 75 (November-Desember)",
    "Jalur RPL - Rekognisi Pengalaman Kerja",
  ],
  general_requirements: [
    "WNI / WNA",
    "Laki-laki / Perempuan",
    "Lulus SMU / SMK / MA / Kejar Paket C",
    "Fotocopy Ijazah / SKL (Surat Keterangan Lulus)",
    "Membayar biaya pendaftaran",
    "Lulus tes seleksi CBT",
  ],
  registration_fee: {
    S1_Teknik_Informatika: "Rp 250.000",
    S1_Sistem_Informasi: "Rp 250.000",
    other_S1: "Rp 300.000",
    D3_D4: "Rp 300.000",
    Sarjana_Terapan: "Rp 300.000",
    Profesi_Bidan: "Rp 300.000",
  },
  cost_breakdown: {
    description: "Biaya masuk (bayar sekali saat daftar)",
    components: [
      { name: "Biaya Pendaftaran", amount: "Rp 250.000 - Rp 300.000" },
      { name: "Biaya Pengembangan Mahasiswa", amount: "Rp 1.000.000" },
      {
        name: "Sumbangan Pengembangan Institusi (SPI)",
        amount: "Rp 7.000.000",
      },
      { name: "SPP Bulanan", amount: "Rp 1.300.000/bulan" },
    ],
    total_entry:
      "Rp 9.600.000 (S1 Saintek) / Rp 8.600.000 - 10.600.000 (lainnya)",
  },
  special_requirements: {
    "S-1 Kebidanan": "Perempuan, tidak sedang hamil selama masa studi",
    "S-1 Profesi Bidan":
      "Perempuan, lulusan S-1/D-4 Kebidanan, lampirkan ijazah + transkip + KTP + KK",
    "D-3 DKV": "Tidak buta warna",
    "D-3 Farmasi":
      "Kelas Reguler Pagi: SMA/SMK. Kelas Malam/Ekstensi: SMK Farmasi (atau lampirkan surat kerja di bidang kefarmasian). Tidak buta warna.",
    "D-3 Keperawatan":
      "Bebas buta warna, tidak memiliki kecacatan fisik/non-fisik yang mengganggu. Laki-laki tidak bertindik, tidak memiliki tato di area terbuka.",
    "D-3 Teknik Elektronika": "Tidak buta warna",
  },
  portal: "https://pmb.harkatnegeri.ac.id/",
  contact_cs: "+62 877-2211-2002",
  email: "pmb@poltekharber.ac.id",
};

/**
 * SCHOLARSHIPS - sourced from https://pmb.harkatnegeri.ac.id/informasi-beasiswa
 * 8 types of scholarships available
 */
export const SCHOLARSHIPS = [
  {
    name: "Beasiswa Harkat Negeri",
    type: "Internal",
    description:
      "Beasiswa dari Universitas Harkat Negeri untuk mahasiswa berprestasi.",
  },
  {
    name: "Beasiswa NUSANTARA",
    type: "Pemerintah",
    description:
      "Beasiswa program Nusantara untuk mahasiswa dari berbagai daerah.",
  },
  {
    name: "Beasiswa Organisasi Sekolah",
    type: "Pihak Ketiga",
    description:
      "Beasiswa untuk ketua/anggota OSIS atau organisasi sekolah aktif.",
  },
  {
    name: "Beasiswa Ranking",
    type: "Akademik",
    description: "Beasiswa untuk siswa dengan ranking/rapor tinggi.",
  },
  {
    name: "Beasiswa Tahfiz",
    type: "Keagamaan",
    description: "Beasiswa untuk penghafal Al-Quran.",
  },
  {
    name: "Beasiswa Influencer",
    type: "Kreatif",
    description: "Beasiswa untuk content creator dan influencer digital.",
  },
  {
    name: "Beasiswa KIP",
    type: "Pemerintah",
    description: "Kartu Indonesia Pintar Kuliah - untuk siswa kurang mampu.",
  },
  {
    name: "Beasiswa Alumni",
    type: "Internal",
    description: "Beasiswa khusus anak alumni Poltek Harber / STMIK YMI.",
  },
];

export const CONTACTS = {
  hotline: "+62 877-2211-2002",
  telepon: "(0283) 352000",
  website: "https://harkatnegeri.ac.id",
  portal_pmb: "https://pmb.harkatnegeri.ac.id/",
  siakad: "https://siakad.harkatnegeri.ac.id/",
  siskerma: "https://siskerma.harkatnegeri.ac.id/",
  email_pmb: "pmb@poltekharber.ac.id",
  email_umum: "info@uhn.ac.id",
  instagram: "https://www.instagram.com/daftar_harkatnegeri",
  instagram_handle: "@daftar_harkatnegeri",
  alamat_sekretariat: "Jalan Mataram No. 9, Pesurungan Lor, Kota Tegal",
  maps: "https://www.google.com/maps/search/Politeknik+Harapan+Bersama/@-6.8697881,109.1040696,14.5z",
};

export const INDUSTRY_PARTNERS = [
  "PT Industri Teknologi Indonesia",
  "Software House Pantura Tech",
  "BUMN & Bank Mitra",
  "Gojek / Tokopedia / Shopee (Tech Companies)",
  "Bank & Financial Tech",
  "Startup & Digital Agency",
  "AWS Academy Partner",
  "Cisco Networking Academy",
];

export const ACHIEVEMENTS = [
  "Juara 1 Hackathon Nasional 2025",
  "Top 10 National Cybersecurity Competition",
  "Best Innovation Award - Tech Competition 2025",
  "Juara Liga Robot Indonesia Regional Jawa Tengah",
];
