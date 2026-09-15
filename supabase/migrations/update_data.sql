-- ============================================================
-- TIKA KNOWLEDGE UPDATE
-- FASILITAS + KONTAK + LOKASI UHN
-- Updated: September 2026
-- ============================================================


-- ============================================================
-- 1. UPDATE FASILITAS KAMPUS
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'fasilitas',
        'fasilitas kampus',
        'gedung',
        'laboratorium',
        'lab',
        'perpustakaan',
        'co working space',
        'coworking',
        'aula',
        'auditorium',
        'olahraga',
        'masjid',
        'kantin',
        'wifi',
        'internet',
        'smart classroom',
        'komputer',
        'cbt',
        'teaching factory',
        'vokasi'
    ],

    answer = '🏫 Fasilitas Unggulan Universitas Harkat Negeri (UHN)

Untuk mendukung kenyamanan belajar dan mempersiapkan mahasiswa menghadapi dunia kerja, UHN menyediakan berbagai fasilitas pembelajaran, fasilitas umum, laboratorium, dan fasilitas simulasi sesuai kebutuhan bidang keahlian.

📚 FASILITAS PEMBELAJARAN
• Ruang kelas modern / Smart Classroom
• Perpustakaan Digital
• Co-Working Space untuk ruang diskusi dan kolaborasi mahasiswa

🏢 FASILITAS UMUM & OLAHRAGA
• Aula pertemuan / Auditorium
• Area olahraga mahasiswa
• Masjid Kampus
• Kantin
• Akses internet Wi-Fi di lingkungan kampus

💻 LABORATORIUM KOMPUTER TERPADU
• Laboratorium Komputer di Gedung B
• Digunakan untuk ujian berbasis komputer (CBT)
• Mendukung kegiatan praktikum Sains Data, Teknik Informatika, dan Sistem Informasi

🔧 FASILITAS SIMULASI & VOKASI
• Laboratorium khusus sesuai rumpun keahlian sains terapan
• Mendukung metode pembelajaran teaching factory

TIKA tidak menyebutkan spesifikasi teknis perangkat laboratorium apabila informasi tersebut belum tersedia dalam data resmi yang terverifikasi.',

    priority = 90,

    metadata = jsonb_build_object(
        'type', 'facilities',
        'academic_year', '2026/2027',
        'source', 'Latest UHN facilities information',
        'last_updated', '2026-09-15',
        'verified_scope', ARRAY[
            'learning facilities',
            'general facilities',
            'sports facilities',
            'integrated computer laboratory',
            'vocational simulation facilities'
        ]
    ),

    updated_at = now()

WHERE title = 'Fasilitas Kampus';


-- ============================================================
-- 2. UPDATE KONTAK & LOKASI
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'kontak',
        'kontak kampus',
        'hubungi',
        'telepon',
        'phone',
        'wa',
        'whatsapp',
        'hotline',
        'cs',
        'pmb',
        'alamat',
        'lokasi',
        'kampus',
        'kampus mataram',
        'kampus pendidikan',
        'kampus kalisoga',
        'email',
        'website'
    ],

    answer = '🏢 Kontak & Lokasi Resmi Universitas Harkat Negeri (UHN)

Untuk informasi pendaftaran mahasiswa baru, biaya kuliah, beasiswa, informasi akademik, maupun layanan informasi lainnya, silakan menggunakan saluran resmi UHN berikut.

📞 LAYANAN KONTAK RESMI

• Hotline PMB & Konseling (WhatsApp/Call):
  +62 877-2211-2002

• Telepon Kantor:
  (0283) 352000

• Email Resmi:
  info@harkatnegeri.ac.id
  pmb@harkatnegeri.ac.id

🌐 SITUS RESMI

• Website UHN:
  https://harkatnegeri.ac.id/

• Portal Pendaftaran PMB:
  https://pmb.harkatnegeri.ac.id/

📍 LOKASI KAMPUS

• Kampus Mataram (Pusat):
  Jl. Mataram No. 9, Tegal, Jawa Tengah

• Kampus Pendidikan:
  Jl. Pendidikan No. 1, Tegal, Jawa Tengah

• Kampus Kalisoga:
  Padepokan Kalisoga, Kabupaten Brebes, Jawa Tengah

Untuk alamat lengkap, jam layanan, atau informasi lokasi yang lebih spesifik, calon mahasiswa disarankan mengonfirmasi kepada pihak UHN melalui hotline resmi.',

    priority = 100,

    metadata = jsonb_build_object(
        'type', 'contact_location',
        'academic_year', '2026/2027',
        'source', 'Latest UHN contact and campus location information',
        'last_updated', '2026-09-15',
        'hotline', '+62 877-2211-2002',
        'office_phone', '(0283) 352000',
        'campuses', jsonb_build_array(
            jsonb_build_object(
                'name', 'Kampus Mataram',
                'label', 'Pusat',
                'address', 'Jl. Mataram No. 9, Tegal, Jawa Tengah'
            ),
            jsonb_build_object(
                'name', 'Kampus Pendidikan',
                'address', 'Jl. Pendidikan No. 1, Tegal, Jawa Tengah'
            ),
            jsonb_build_object(
                'name', 'Kampus Kalisoga',
                'address', 'Padepokan Kalisoga, Kabupaten Brebes, Jawa Tengah'
            )
        )
    ),

    updated_at = now()

WHERE title = 'Kontak & Hotline Kampus';


-- ============================================================
-- 3. UPDATE PROFIL & SEJARAH
-- ============================================================
-- Penting:
-- Entry profile lama juga mengandung alamat + hotline lama.
-- Kalau tidak diperbarui, retrieval TIKA bisa mengambil data
-- lama dan baru sekaligus.

UPDATE public.tika_knowledge
SET
    answer = 'Universitas Harkat Negeri (UHN)

📋 Perguruan Tinggi Terapan
Hasil penyatuan Poltek Harber & STMIK YMI Tegal.

📅 Berdiri:
2024

🎯 Arah:
Membentuk lulusan unggul berkarakter kepemimpinan yang dapat memberikan dampak nyata bagi masyarakat.

📍 UHN memiliki tiga lokasi kampus:

• Kampus Mataram (Pusat)
  Jl. Mataram No. 9, Tegal, Jawa Tengah

• Kampus Pendidikan
  Jl. Pendidikan No. 1, Tegal, Jawa Tengah

• Kampus Kalisoga
  Padepokan Kalisoga, Kabupaten Brebes, Jawa Tengah

🌐 Website:
https://harkatnegeri.ac.id/

📞 Hotline Informasi & Konseling:
+62 877-2211-2002

Untuk informasi pendaftaran, biaya, beasiswa, fasilitas, atau layanan kampus yang lebih spesifik, silakan hubungi kanal resmi UHN.',

    priority = 95,

    metadata = jsonb_build_object(
        'type', 'profile',
        'source', 'Latest UHN profile and campus location information',
        'last_updated', '2026-09-15',
        'campus_count', 3
    ),

    updated_at = now()

WHERE title = 'Profil & Sejarah Universitas Harkat Negeri';


-- ============================================================
-- 4. VERIFICATION
-- ============================================================

SELECT
    category,
    title,
    priority,
    is_active,
    updated_at,
    metadata
FROM public.tika_knowledge
WHERE title IN (
    'Fasilitas Kampus',
    'Kontak & Hotline Kampus',
    'Profil & Sejarah Universitas Harkat Negeri'
)
ORDER BY priority DESC, title;


UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'karier',
        'karir',
        'prospek kerja',
        'prospek karier',
        'kerja setelah lulus',
        'lulusan kerja apa',
        'pekerjaan',
        'gaji',
        'salary',
        'software engineer',
        'data analyst',
        'data scientist',
        'ai engineer',
        'cybersecurity',
        'cloud',
        'devops',
        'business analyst',
        'ui ux',
        'sistem informasi',
        'teknik informatika',
        'sains data'
    ],

    answer = '💼 Prospek Karier Lulusan Rumpun Teknologi UHN

Lulusan bidang teknologi memiliki pilihan karier yang luas dan dapat berkembang mengikuti pengalaman, spesialisasi, portfolio, sertifikasi, serta kebutuhan industri.

Berikut beberapa jalur karier yang relevan untuk rumpun teknologi UHN:

🧠 S-1 SAINS DATA

Prospek karier:
• Data Analyst
• Business Intelligence Analyst
• Junior Data Scientist
• Data Engineer
• Analytics Engineer
• Machine Learning / AI Engineer

Kompetensi yang relevan:
• Python
• SQL
• Statistik
• Data Visualization
• Machine Learning
• Data Engineering
• Business Intelligence

💻 S-1 TEKNIK INFORMATIKA

Prospek karier:
• Software Engineer / Developer
• Full-Stack Developer
• Backend Engineer
• Frontend Developer
• Mobile Developer
• AI / Machine Learning Engineer
• Cloud / DevOps Engineer
• Cybersecurity Analyst
• QA / Software Tester
• Automation Engineer

Kompetensi yang relevan:
• Programming
• Software Engineering
• Database
• Web & Mobile Development
• Artificial Intelligence
• Cloud Computing
• DevOps
• Cybersecurity

🌐 S-1 SISTEM INFORMASI

Prospek karier:
• Business Analyst
• Systems Analyst
• IT Business Analyst
• IT Consultant
• Product / Product Operations
• IT Project Coordinator
• Data / BI Analyst
• ERP / Enterprise Systems
• UI/UX / Product Designer

Dengan pengalaman yang cukup, beberapa jalur tersebut dapat berkembang menuju:
• IT Project Manager
• Product Manager
• IT Manager
• Solution Architect
• Technology Consultant

📈 TREN INDUSTRI

Dalam beberapa tahun terakhir, kebutuhan talenta digital Indonesia terus berkembang seiring transformasi digital dan adopsi teknologi seperti Artificial Intelligence, Big Data, Cloud Computing, Software Engineering, dan Cybersecurity.

Karena teknologi berubah cepat, kemampuan belajar berkelanjutan, problem solving, komunikasi, kolaborasi, dan kemampuan membangun portfolio juga semakin penting.

💰 TENTANG GAJI

Pendapatan di bidang teknologi sangat bervariasi berdasarkan posisi, pengalaman, lokasi, perusahaan, spesialisasi, kemampuan teknis, portfolio, dan sertifikasi.

Karena itu, angka gaji tidak dapat dianggap sebagai jaminan pendapatan lulusan UHN.

Sebagai gambaran umum, posisi entry-level biasanya memiliki kompensasi yang berbeda dengan posisi mid-level dan senior/specialist. Semakin tinggi pengalaman dan tanggung jawab, semakin besar pula potensi kompensasinya.

🎯 INTINYA

Kuliah di bidang teknologi tidak mengunci seseorang pada satu pekerjaan.

Lulusan Teknik Informatika dapat berkembang ke software engineering, AI, cloud, cybersecurity, data, maupun bidang teknologi lainnya.

Lulusan Sains Data dapat berkembang dari data analytics menuju data science, data engineering, AI, atau business intelligence.

Lulusan Sistem Informasi dapat berkembang pada persimpangan teknologi dan bisnis seperti business analysis, IT consulting, product, enterprise systems, data, dan project management.

Yang paling penting bukan hanya gelar, tetapi kemampuan yang dibangun, pengalaman proyek, portfolio, komunikasi, dan kemampuan mengikuti perkembangan teknologi.',

    priority = 88,

    metadata = jsonb_build_object(
        'type', 'career',
        'scope', 'technology_programs',
        'programs', jsonb_build_array(
            'S-1 Teknik Informatika',
            'S-1 Sistem Informasi',
            'S-1 Sains Data'
        ),
        'trend_period', '2024-2026',
        'salary_policy', 'indicative_only',
        'salary_is_not_uhn_guarantee', true,
        'last_updated', '2026-09-15',
        'source_scope', 'Indonesia digital talent and technology recruitment trends'
    ),

    updated_at = now()

WHERE title = 'Prospek Karier Lulusan UHN';

-- ============================================================
-- 5. MITRA INDUSTRI & EKOSISTEM TEKNOLOGI UHN
-- ============================================================
-- Catatan:
-- Entry ini memisahkan:
-- 1) Mitra/kerja sama institusional
-- 2) Ekosistem pembelajaran & sertifikasi
-- 3) Komunitas/kegiatan teknologi
--
-- Jangan menyebut seluruh pihak di bawah sebagai "mitra resmi"
-- apabila sumber hanya menunjukkan keterlibatan kegiatan/sertifikasi.

INSERT INTO public.tika_knowledge (
    category,
    title,
    keywords,
    answer,
    priority,
    metadata
)
VALUES (
    'kemitraan',
    'Mitra Industri & Ekosistem Teknologi UHN',

    ARRAY[
        'mitra',
        'mitra uhn',
        'mitra industri',
        'kemitraan',
        'kerja sama',
        'kerjasama',
        'industri',
        'perusahaan mitra',
        'partner',
        'dunia usaha',
        'dunia industri',
        'dudi',
        'teknologi',
        'informatika',
        'sistem informasi',
        'sains data',
        'aws',
        'amazon web services',
        'huawei',
        'telkomsel',
        'metrodata',
        'botika',
        'cybers blitz',
        'indi teknokreasi',
        'anime kreasi',
        'sertifikasi',
        'magang',
        'pkl',
        'internship',
        'teknologi digital',
        'cybersecurity',
        'hackviser',
        'tegalsec',
        'cisco'
    ],

    '🤝 Mitra Industri & Ekosistem Teknologi Universitas Harkat Negeri (UHN)

UHN memiliki jaringan kerja sama dengan berbagai perusahaan, lembaga, organisasi, dan institusi untuk mendukung pengembangan pendidikan, kompetensi mahasiswa, kegiatan praktik, penelitian, pengembangan SDM, serta hubungan dengan dunia usaha dan dunia industri.

💻 MITRA & KERJA SAMA BIDANG TEKNOLOGI

Beberapa mitra yang tercantum dalam jaringan kemitraan UHN antara lain:

• Amazon Web Services (AWS)
• PT Huawei Tech Investment
• PT Telkomsel
• PT Metrodata Electronics Tbk
• PT Botika Teknologi Indonesia
• PT Cybers Blitz Nusantara
• PT Indi Teknokreasi Internasional
• PT Anime Kreasi Indonesia
• PT Triutama Sistem Indonesia
• PT Inovasi Cipta Teknologi
• PT Cipta Otomasi Indonesia

Bentuk kerja sama dapat berbeda pada masing-masing mitra, antara lain:
• Pemagangan / PKL
• Pengembangan kurikulum
• Penelitian bersama
• Pengabdian kepada masyarakat
• Pengembangan sumber daya manusia
• Seminar, workshop, dan kuliah umum
• Pengembangan sistem atau produk
• Sertifikasi / uji kompetensi
• Penyaluran lulusan
• Program kerja sama lainnya

🎓 SERTIFIKASI & EKOSISTEM PEMBELAJARAN TEKNOLOGI

Mahasiswa UHN juga tercatat mengikuti berbagai program pembelajaran dan sertifikasi dari ekosistem teknologi, termasuk Cisco Networking Academy serta program dan aktivitas yang berkaitan dengan teknologi Huawei.

TIKA membedakan antara "mitra institusional resmi" dengan "platform, program sertifikasi, komunitas, atau kegiatan teknologi" agar informasi yang diberikan tidak menyesatkan.

🛡️ EKOSISTEM CYBERSECURITY

Mahasiswa dan komunitas di lingkungan UHN juga terlibat dalam kegiatan cybersecurity bersama praktisi dan komunitas teknologi, termasuk kegiatan yang berkaitan dengan Hackviser dan TegalSec.

Kegiatan tersebut dapat berupa seminar, workshop, pembelajaran cybersecurity, dan praktik ethical hacking.

📦 MAGANG & PENGALAMAN INDUSTRI

Kerja sama dengan mitra dapat mendukung kegiatan pemagangan atau PKL sesuai bentuk kerja sama masing-masing institusi.

Namun, TIKA tidak menyatakan bahwa setiap mahasiswa pasti ditempatkan pada perusahaan tertentu atau bahwa seluruh mitra menerima mahasiswa magang, kecuali terdapat informasi resmi yang secara khusus menyatakan hal tersebut.

🎯 UNTUK MAHASISWA TEKNOLOGI

Ekosistem kemitraan dan kegiatan teknologi tersebut dapat menjadi bagian dari lingkungan pembelajaran yang mempertemukan mahasiswa dengan dunia industri, praktisi, sertifikasi, proyek, penelitian, dan kegiatan pengembangan kompetensi.

Jika calon mahasiswa ingin mengetahui mitra tertentu atau bentuk kerja sama tertentu, TIKA sebaiknya menjelaskan berdasarkan data kerja sama yang tersedia dan tidak mengarang hubungan yang belum terverifikasi.',

    92,

    jsonb_build_object(
        'type', 'partnership',
        'scope', 'technology_ecosystem',
        'programs', jsonb_build_array(
            'S-1 Teknik Informatika',
            'S-1 Sistem Informasi',
            'S-1 Sains Data'
        ),
        'official_partnership_source',
        'UHN official partnership ecosystem',
        'official_partners_are_distinguished_from',
        jsonb_build_array(
            'certification platforms',
            'technology learning programs',
            'communities',
            'events',
            'student activities'
        ),
        'last_updated', '2026-09-15',
        'review_after', '2027-03-15',
        'accuracy_policy',
        'Do not claim a company, platform, community, certification program, internship placement, or partnership status unless supported by verified UHN information.'
    )
)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 6. VERIFICATION — MITRA INDUSTRI
-- ============================================================

SELECT
    id,
    category,
    title,
    priority,
    is_active,
    updated_at,
    metadata
FROM public.tika_knowledge
WHERE title = 'Mitra Industri & Ekosistem Teknologi UHN';


-- ============================================================
-- 7. CEK DUPLIKASI / DATA MITRA
-- ============================================================

SELECT
    category,
    title,
    priority,
    is_active,
    updated_at
FROM public.tika_knowledge
WHERE
    title ILIKE '%mitra%'
    OR title ILIKE '%kemitraan%'
    OR answer ILIKE '%Amazon Web Services%'
    OR answer ILIKE '%Huawei%'
    OR answer ILIKE '%Telkomsel%'
ORDER BY priority DESC, title;

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'prodi',
    'Daftar Semua Program Studi UHN',
    ARRAY['fakultas', 'program studi', 'prodi', 'jurusan', 'kuliah apa', 'ambil apa'],
    'Universitas Harkat Negeri memiliki 4 Fakultas dengan total 22 Program Studi unggulan:

🎓 SARJANA (S1):
• S-1 Teknik Informatika (Pendaftaran: Rp 250.000)
• S-1 Sistem Informasi (Pendaftaran: Rp 250.000)
• S-1 Sains Data (Pendaftaran: Rp 300.000)
• S-1 Teknik Mesin (Pendaftaran: Rp 300.000)
• S-1 Akuntansi (Pendaftaran: Rp 300.000)
• S-1 Hukum (Pendaftaran: Rp 300.000)
• S-1 Ilmu Komunikasi (Pendaftaran: Rp 300.000)
• S-1 Manajemen (Pendaftaran: Rp 300.000)
• S-1 Psikologi (Pendaftaran: Rp 300.000)
• S-1 PGSD (Pendaftaran: Rp 300.000)

📋 SARJANA TERAPAN (D4):
• D-4 Teknik Informatika (Pendaftaran: Rp 300.000)
• D-4 Akuntansi Sektor Publik (Pendaftaran: Rp 300.000)
• D-4 Kebidanan (Pendaftaran: Rp 300.000)

⚕️ PROFESI:
• Pendidikan Profesi Bidan (Pendaftaran: Rp 300.000)

🔧 DIPLOMA (D3):
• D-3 Teknik Komputer (Pendaftaran: Rp 300.000)
• D-3 Teknik Mesin (Pendaftaran: Rp 300.000)
• D-3 Teknik Elektronika (Pendaftaran: Rp 300.000)
• D-3 Farmasi (Pendaftaran: Rp 300.000)
• D-3 Keperawatan (Pendaftaran: Rp 300.000)
• D-3 Perhotelan (Pendaftaran: Rp 300.000)
• D-3 Desain Komunikasi Visual (Pendaftaran: Rp 300.000)
• D-3 Akuntansi (Pendaftaran: Rp 300.000)

Ketik nama prodi spesifik (misal: "Sains Data", "Sistem Informasi") untuk melihat detail syarat pendaftaran, mata kuliah, dan prospek kariernya!',
    85,
    '{"type": "prodi_list"}'::jsonb
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq',
    'Rekomendasi Spesifikasi Laptop Kuliah IT',
    ARRAY['laptop', 'komputer', 'spek laptop', 'rekomendasi laptop', 'beli laptop', 'macbook', 'windows', 'coding', 'programming'],
    '💻 Rekomendasi Spesifikasi Laptop untuk Rumpun Teknologi UHN

Untuk mendukung kelancaran coding, pengolahan data, simulasi jaringan, maupun pengerjaan proyek tugas akhir, berikut panduan spesifikasi laptop yang disarankan:

📌 SPESIFIKASI MINIMAL:
• Prosesor: Intel Core i5 (Gen 11+) / AMD Ryzen 5 (Series 5000+)
• RAM: Minimal 8 GB (Sangat disarankan 16 GB agar multitasking lancar)
• Penyimpanan: SSD 512 GB (Hindari HDD karena performanya lambat untuk kompilasi kode)
• Sistem Operasi: Windows 11 / Linux / macOS

🧠 KHUSUS JURUSAN SAINS DATA & AI:
Jika Anda berencana mendalami Machine Learning atau Deep Learning secara lokal, disarankan memilih laptop yang memiliki kartu grafis tambahan (Dedicated GPU) seperti NVIDIA RTX Series.

💡 CATATAN PENTING:
Jika belum memiliki laptop berspesifikasi tinggi saat ini, jangan berkecil hati. Anda tetap bisa memanfaatkan fasilitas Laboratorium Komputer Terpadu di Gedung B Kampus UHN untuk kegiatan praktikum terstruktur dan ujian.',
    80,
    jsonb_build_object(
        'type', 'faq_laptop',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq',
    'Perbedaan Informatika, Sistem Informasi, dan Sains Data',
    ARRAY['bedanya', 'perbedaan jurusan', 'pilih mana', 'ti atau si', 'sains data apa', 'bingung prodi', 'informatika si'],
    '🔎 Panduan Memilih: Perbedaan TI, SI, dan Sains Data di UHN

Masih bingung menentukan pilihan jurusan? Berikut adalah rangkuman fokus utama dari ketiga program studi rumpun teknologi di UHN untuk membantu Anda memilih:

💻 S-1 TEKNIK INFORMATIKA (Fokus: Software & System)
• Apa yang dipelajari? Pembuatan perangkat lunak (software), kecerdasan buatan (AI), keamanan siber (cybersecurity), cloud computing, dan logika pemrograman yang mendalam.
• Cocok untuk Anda yang suka: Menulis kode (coding), memecahkan masalah logika, dan membangun aplikasi/sistem dari nol.

🌐 S-1 SISTEM INFORMASI (Fokus: Bridge Technology & Business)
• Apa yang dipelajari? Manajemen proyek IT, analisis proses bisnis, tata kelola sistem informasi perusahaan, serta perancangan antarmuka digital (UI/UX). Jurusan ini menjembatani sisi teknis komputer dengan kebutuhan bisnis.
• Cocok untuk Anda yang suka: Manajemen proyek, menganalisis kebutuhan sistem, konsultasi IT, dan merancang strategi teknologi untuk perusahaan.

🧠 S-1 SAINS DATA (Fokus: Data & Intelligence)
• Apa yang dipelajari? Pengolahan data berskala besar (Big Data), analisis statistik digital, pemrograman Python khusus data, visualisasi data, dan pemodelan prediksi bisnis menggunakan Machine Learning.
• Cocok untuk Anda yang suka: Menganalisis grafik, statistik, mencari tren tersembunyi dari tumpukan data, dan menyukai dunia riset kecerdasan buatan.',
    82,
    jsonb_build_object(
        'type', 'faq_prodi_diff',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq',
    'Apakah Kuliah IT Harus Jago Coding',
    ARRAY['tidak bisa coding', 'ga jago coding', 'belum bisa program', 'gaptek', 'bisa masuk it', 'pemula coding', 'takut coding'],
    '💡 Tanya UHN: "Kalau belum bisa atau tidak terlalu suka coding, apakah tetap bisa kuliah di rumpun teknologi?"

Jawabannya: Tentu saja BISA! 

Kuliah di bidang teknologi tidak selalu berarti Anda harus menghabiskan waktu mengetik kode program sepanjang hari. Industri teknologi sangat luas dan membutuhkan banyak peran non-coding atau low-coding:

🎯 PILIHAN JALUR KARIER LOW-CODING / NON-CODING:
1. IT Project Manager / Coordinator: Mengelola timeline proyek teknologi, mengatur tim developer, dan berkomunikasi dengan klien.
2. Business / Systems Analyst: Menjembatani klien dengan tim teknis, menganalisis proses bisnis, dan merancang alur logika aplikasi (tanpa menulis kode langsung).
3. UI/UX Designer: Fokus pada riset pengguna, pembuatan sketsa desain, dan keindahan tampilan aplikasi menggunakan alat bantu seperti Figma.
4. Data/BI Analyst: Lebih fokus pada interpretasi data, membaca grafik statistik, dan menyusun laporan menggunakan Tableau atau Power BI untuk membantu keputusan bisnis.

🌱 CATATAN UNTUK PEMULA:
Seluruh mata kuliah pemrograman di UHN diajarkan dari tingkat dasar (basic/nol). Jadi bagi Anda yang lulusan SMA/SMK non-komputer, Anda akan dibimbing secara bertahap melalui asistensi praktikum di laboratorium komputer terpadu.',
    79,
    jsonb_build_object(
        'type', 'faq_beginner_coding',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq_ti',
    'Apakah Lulusan IPS atau SMK Non-IT Bisa Masuk Teknik Informatika',
    ARRAY['anak ips', 'jurusan ips', 'smk non it', 'bukan anak rpl', 'latar belakang', 'bisa masuk ti', 'anak rpl', 'anak tkj', 'asal sekolah'],
    '🌱 Tanya UHN: "Aku lulusan SMA IPS / SMK Non-Komputer, apakah bisa bertahan kuliah di S-1 Teknik Informatika?"

Jawabannya: Bisa banget! Latar belakang sekolahmu tidak membatasi masa depanmu di UHN.

Berikut fakta perkuliahan TI di UHN yang perlu kamu tahu:
• Kurikulum Mulai dari Nol: Semua mata kuliah pemrograman dasar (coding) diajarkan benar-benar dari dasar logika paling awal di semester 1.
• Kelas Praktikum Intensif: Kamu akan dibimbing langsung oleh dosen dan asisten praktikum di Laboratorium Komputer Terpadu, jadi kamu punya ruang penuh untuk bertanya jika bingung.
• Kuncinya adalah Konsistensi: Banyak alumni sukses TI UHN yang dulunya berasal dari jurusan IPS atau SMK Otomotif/Akuntansi, namun berhasil lulus dengan portofolio keren karena tekun mempraktikkan materi kelas.

Jadi, jangan minder ya! Pintu Teknik Informatika UHN terbuka lebar untuk semua latar belakang sekolah.',
    84,
    jsonb_build_object(
        'type', 'faq_ti_background',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq_ti',
    'Apakah Kuliah Teknik Informatika Banyak Matematika',
    ARRAY['matematika', 'it kalkulus', 'hitung-hitungan', 'rumus matematika', 'benci matematika', 'matdis', 'aljabar', 'kalkulus'],
    '🧮 Tanya UHN: "Katanya kuliah Teknik Informatika isinya matematika semua ya? Aku kurang jago berhitung nih..."

Faktanya: Matematika di Teknik Informatika itu ada, tetapi fokusnya BUKAN menghafal rumus rumit, melainkan melatih Logika dan Problem Solving!

Beberapa mata kuliah matematika yang akan kamu temui di TI UHN antara lain:
• Matematika Diskrit: Belajar tentang logika biner (0 dan 1), teori graf, dan kombinatorika yang sangat berguna untuk dasar algoritma coding.
• Aljabar Linear: Digunakan jika kamu nanti mengambil spesialisasi Kecerdasan Buatan (AI) atau Pengolahan Citra Digital.
• Kalkulus Dasar: Melatih ketajaman berpikir sistematis dalam menganalisis algoritma program.

💡 Tips dari TIKA:
Kamu tidak perlu menjadi jenius matematika untuk kuliah di sini. Selama kamu suka memecahkan teka-teki logika dan tidak mudah menyerah saat *error*, kamu akan menikmati proses belajar coding di S-1 Teknik Informatika UHN!',
    83,
    jsonb_build_object(
        'type', 'faq_ti_math',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq_ti',
    'Perbedaan S1 Teknik Informatika dan D4 Teknik Informatika',
    ARRAY['bedanya s1 d4', 's1 atau d4', 'sarjana terapan', 'd4 ti', 's1 ti', 'pilih s1 d4', 'perbedaan s1 d4'],
    '⚔️ Pilih Mana: S-1 Teknik Informatika atau D-4 Teknik Informatika (Sarjana Terapan) di UHN?

Kedua jenjang ini sama-sama setara (Gelar Sarjana) dan memiliki prospek kerja yang bagus, namun memiliki fokus metode belajar yang sedikit berbeda:

🎓 S-1 TEKNIK INFORMATIKA (Sarjana Komputer - S.Kom.)
• Fokus Pembelajaran: Seimbang antara teori dasar keilmuan komputer (konsep, arsitektur, riset algoritma) dengan implementasi praktis perangkat lunak.
• Arah Kelulusan: Menyiapkan kamu menjadi Software Engineer, AI Specialist, atau akademisi/peneliti teknologi yang mampu merancang arsitektur sistem skala besar.

📋 D-4 TEKNIK INFORMATIKA (Sarjana Terapan Komputer - S.Tr.Kom.)
• Fokus Pembelajaran: Sangat dominan pada praktikum lapangan kerja (70% praktik, 30% teori) dengan skema Teaching Factory.
• Arah Kelulusan: Menyiapkan kamu menjadi praktisi teknis yang langsung siap diterjunkan ke industri sebagai Full-Stack Developer, Mobile Programmer, atau System Administrator terapan.

💡 Kesimpulan TIKA:
Pilihlah S-1 jika kamu suka mempelajari fondasi teknologi, riset sistem, dan kecerdasan buatan secara mendalam. Pilihlah D-4 jika kamu tipe orang yang lebih suka langsung belajar praktik teknis kerja yang intensif ala vokasi.',
    82,
    jsonb_build_object(
        'type', 'faq_ti_s1_d4',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);

INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'faq_ti',
    'Belajar Apa di Peminatan Cyber Security Teknik Informatika',
    ARRAY['cyber security', 'keamanan siber', 'hacker', 'hacking', 'ethical hacking', 'belajar hacker', 'bobol wifi', 'pentest'],
    '🛡️ Tanya UHN: "Kalau ambil Teknik Informatika UHN, apakah nanti diajarkan cara menjadi Hacker?"

Jawabannya: Kamu akan diajarkan menjadi "Ethical Hacker" alias peretas putih (White Hat Hacker) yang bertugas melindungi sistem, bukan merusaknya!

Di dalam fokus Cyber Security UHN, kamu akan mempelajari hal-seperti:
1. Kriptografi: Belajar cara mengamankan data dan pesan penting menggunakan teknik enkripsi agar tidak bisa diintip orang lain.
2. Penetration Testing (Pentest): Praktik mencari celah keamanan pada website atau jaringan komputer sebelum celah tersebut dieksploitasi oleh hacker jahat.
3. Digital Forensics: Teknik melacak jejak digital dan menganalisis bukti serangan siber jika terjadi pembobolan data di sebuah instansi.

Ekosistem belajar ini didukung oleh komunitas siber kampus (seperti keterlibatan dalam lokakarya Hackviser dan TegalSec) agar kamu bisa langsung belajar dari studi kasus nyata di dunia industri siber!',
    81,
    jsonb_build_object(
        'type', 'faq_ti_cybersecurity',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-15'
    )
);
