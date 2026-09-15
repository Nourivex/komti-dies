-- ==============================================================================
-- TIKA KNOWLEDGE BASE SCHEMA & INITIAL SEED FOR SUPABASE
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.tika_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- 'profile', 'prodi', 'pmb', 'biaya', 'beasiswa', 'fasilitas', 'karier', 'kontak', 'general'
    title VARCHAR(255) NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    answer TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    priority INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tika_knowledge_category ON public.tika_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_tika_knowledge_priority ON public.tika_knowledge(priority DESC);
CREATE INDEX IF NOT EXISTS idx_tika_knowledge_keywords ON public.tika_knowledge USING GIN(keywords);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.tika_knowledge ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous read access
DROP POLICY IF EXISTS "Public can view active knowledge" ON public.tika_knowledge;
CREATE POLICY "Public can view active knowledge"
    ON public.tika_knowledge
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 4. Seed initial dataset from Universitas Harkat Negeri knowledge base
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES
(
    'general',
    'Sapaan & Halo',
    ARRAY['halo', 'hai', 'hi', 'hello', 'hey', 'selamat', 'pagi', 'siang', 'sore', 'malam'],
    'Halo! 👋 Aku TIKA, asisten digital Universitas Harkat Negeri (UHN). Ada yang bisa aku bantu seputar prodi, pendaftaran, beasiswa, atau fasilitas kampus?',
    100,
    '{"type": "greeting"}'::jsonb
),
(
    'general',
    'Identitas & Perkenalan TIKA',
    ARRAY['siapa kamu', 'kamu siapa', 'apa itu tika', 'perkenalan', 'tika'],
    'Aku TIKA (Teknik Informatika Knowledge Assistant) 🤖

Asisten digital dari komunitas Teknik Informatika Universitas Harkat Negeri (UHN). Aku dirancang buat bantu calon mahasiswa dan masyarakat umum dengan info seputar kampus secara cepat dan akurat.

Ada yang mau ditanyakan? 😊',
    95,
    '{"type": "identity"}'::jsonb
),
(
    'profile',
    'Profil & Sejarah Universitas Harkat Negeri',
    ARRAY['tentang', 'profil', 'sejarah', 'uhn', 'universitas', 'harkat negeri', 'universitas harkat negeri'],
    'Universitas Harkat Negeri (UHN)

📋 Perguruan Tinggi Terapan (hasil penyatuan Poltek Harber & STMIK YMI Tegal)
📅 Berdiri: 2024
🎯 "Membentuk lulusan unggul berkarakter kepemimpinan yang dapat memberikan dampak nyata bagi masyarakat."

📍 3 Kampus:
• Kampus Mataram: Jl. Mataram No.9, Pesurungan Lor, Kec. Margadana, Kota Tegal
• Kampus Pendidikan: Jl. Pendidikan No.1, Pesurungan Lor, Kec. Margadana, Kota Tegal
• Kampus Kalisoga: Desa Slatri, Kabupaten Brebes

🌐 https://harkatnegeri.ac.id
📞 Hotline: 0858-6970-8000',
    90,
    '{"type": "profile"}'::jsonb
),
(
    'profile',
    'Visi dan Misi UHN',
    ARRAY['visi', 'misi', 'tujuan'],
    'Visi UHN:
"Rumah Pembelajar Berdaya dengan ekosistem terhubung untuk mengangkat harkat negeri melalui kontribusi nyata."

Misi:
1. Menyelenggarakan pendidikan tinggi berkualitas berbasis digital dan teknologi mutakhir
2. Melaksanakan penelitian terapan yang inovatif dan bermanfaat bagi masyarakat
3. Menjalin kemitraan strategis dengan industri nasional dan internasional
4. Membentuk lulusan berkarakter kepemimpinan yang siap berkontribusi',
    85,
    '{"type": "vision_mission"}'::jsonb
),
(
    'prodi',
    'Daftar Semua Program Studi UHN',
    ARRAY['fakultas', 'program studi', 'prodi', 'jurusan', 'kuliah apa', 'ambil apa'],
    'Universitas Harkat Negeri memiliki 17 program studi unggulan:

🎓 SARJANA (S1):
• S-1 Teknik Informatika (Rp 250.000)
• S-1 Sistem Informasi (Rp 250.000)
• S-1 Sains Data (Rp 250.000)
• S-1 Teknik Mesin (Rp 250.000)
• S-1 Akuntansi (Rp 250.000)
• S-1 Hukum (Rp 250.000)
• S-1 Ilmu Komunikasi (Rp 250.000)
• S-1 Manajemen (Rp 250.000)
• S-1 Psikologi (Rp 250.000)
• S-1 PGSD (Rp 250.000)

📋 SARJANA TERAPAN (D4):
• D-4 Teknik Informatika (Rp 250.000)
• D-4 Akuntansi Sektor Publik (Rp 250.000)
• D-4 Kebidanan (Rp 250.000)

⚕️ PROFESI:
• Pendidikan Profesi Bidan (Rp 300.000)

🔧 DIPLOMA (D3):
• D-3 Teknik Komputer (Rp 250.000)
• D-3 Teknik Mesin (Rp 250.000)
• D-3 Farmasi (Rp 250.000)

Ketik nama prodi (misal: "Informatika", "Sains Data") untuk melihat mata kuliah, skill, lab, dan prospek kariernya!',
    85,
    '{"type": "prodi_list"}'::jsonb
),
(
    'prodi',
    'S-1 Teknik Informatika',
    ARRAY['informatika', 'teknik informatika', 'ti', 'it', 'coding', 'software'],
    'S-1 Teknik Informatika (Sarjana S1)

🎓 Fakultas: Fakultas Sains & Teknologi
🎯 Fokus: Software Engineering, AI, Cyber Security, Cloud Computing
📅 Durasi: 8 semester (4 tahun)
📋 Akreditasi: Baik

📖 Deskripsi:
Program studi unggulan yang menyiapkan lulusan sebagai software developer, AI engineer, dan cyber security analyst dengan kurikulum berbasis proyek industri.

📚 Mata Kuliah Utama:
• Pemrograman Web (React, Node.js)
• Pemrograman Mobile (Flutter, React Native)
• Kecerdasan Buatan & Machine Learning
• Keamanan Siber & Kriptografi
• Cloud Computing & DevOps
• Rekayasa Perangkat Lunak

💻 Skill: Frontend, Backend, AI/ML, Cloud & DevOps, Database
💼 Karier & Gaji: Software Engineer (Rp 7-15 jt/bln), AI Engineer (Rp 8-18 jt/bln), Cyber Security Analyst (Rp 8-16 jt/bln)
🏗️ Lab: Lab Rekayasa Perangkat Lunak, Lab AI & Data, Lab Cyber Security',
    90,
    '{"prodi": "S-1 Teknik Informatika", "faculty": "Sains & Teknologi"}'::jsonb
),
(
    'prodi',
    'S-1 Sains Data',
    ARRAY['sains data', 'data science', 'data', 'analisis data'],
    '🆕 S-1 Sains Data (Sarjana S1)

🎯 Fokus: Big Data Analytics, Machine Learning, Business Intelligence, Data Engineering
📅 Durasi: 8 semester (4 tahun)

📖 Deskripsi:
Prodi masa depan untuk mencetak Data Scientist dan Data Analyst yang sangat dicari industri di era transformasi digital.

📚 Mata Kuliah Utama:
• Python for Data Science
• Machine Learning & Deep Learning
• Big Data Technologies (Hadoop, Spark)
• Data Visualization & Storytelling
• Business Intelligence

💻 Skill: Python, R, SQL, Machine Learning, Tableau, Power BI
💼 Karier: Data Scientist (Rp 8-18 jt/bln), Data Analyst (Rp 6-12 jt/bln)',
    88,
    '{"prodi": "S-1 Sains Data"}'::jsonb
),
(
    'pmb',
    'Pendaftaran Mahasiswa Baru (PMB)',
    ARRAY['daftar', 'pendaftaran', 'registrasi', 'masuk kampus', 'pmb', 'mahasiswa baru', 'cara daftar'],
    'Pendaftaran Mahasiswa Baru Universitas Harkat Negeri:

📅 Gelombang Pendaftaran:
• Gelombang 1: 1 Nov 2025 - 28 Feb 2026
• Gelombang 2: 1 Mar 2026 - 31 Mei 2026
• Gelombang 3: 1 Jun 2026 - 31 Agu 2026

📌 Jalur Masuk:
• Jalur Prestasi (Akademik / Non-Akademik / Tahfidz)
• Jalur Reguler (Tes CBT Online / Offline)
• Jalur Beasiswa KIP Kuliah & Yayasan
• Jalur Alih Jenjang / RPL (Rekognisi Pembelajaran Lampau)

🌐 Portal Pendaftaran: https://pmb.harkatnegeri.ac.id
📞 CS Hotline: 0858-6970-8000',
    92,
    '{"type": "pmb"}'::jsonb
),
(
    'biaya',
    'Rincian Biaya Kuliah & SPP',
    ARRAY['biaya', 'uang', 'spp', 'bayar', 'kuliah berapa', 'harga'],
    'Rincian Biaya Masuk & Kuliah UHN:

• Pendaftaran: Rp 250.000 (Profesi: Rp 300.000)
• Biaya Pengembangan Mahasiswa: Rp 1.000.000 (1x di awal)
• Sumbangan Pengembangan Institusi (SPI): Rp 7.000.000 (dapat dicicil)
• SPP Bulanan: Rp 1.300.000/bulan (sudah termasuk praktikum & ujian)

💡 Tersedia 8 jenis beasiswa potongan hingga 100%! Ketik "beasiswa" untuk info lengkap.',
    89,
    '{"type": "fees"}'::jsonb
),
(
    'beasiswa',
    'Informasi Beasiswa UHN',
    ARRAY['beasiswa', 'scholarship', 'kip', 'keringanan', 'gratis'],
    'Program Beasiswa di Universitas Harkat Negeri:

🏆 Beasiswa KIP Kuliah (Bebas biaya kuliah 100% + biaya hidup dari Kemendikbudristek)
🏆 Beasiswa Prestasi Akademik (Potongan SPI hingga 100%)
🏆 Beasiswa Prestasi Olahraga & Seni (Tingkat Kabupaten/Provinsi/Nasional)
🏆 Beasiswa Tahfidz Quran (Hafal min. 5 Juz potongan 50%, 30 Juz gratis 100%)
🏆 Beasiswa Putra Daerah Brebes-Tegal
🏆 Beasiswa Kemitraan Industri

📝 Info syarat & formulir beasiswa: hubungi CS PMB di 0858-6970-8000',
    88,
    '{"type": "scholarship"}'::jsonb
),
(
    'fasilitas',
    'Fasilitas Kampus',
    ARRAY['fasilitas', 'gedung', 'lab', 'laboratorium', 'perpustakaan', 'kantin'],
    'Fasilitas Lengkap Universitas Harkat Negeri:

🏫 Umum:
• Smart Classroom ber-AC & Proyektor Interaktif
• Perpustakaan Digital & Co-Working Space
• Aula Pertemuan & Auditorium
• Lapangan Olahraga (Futsal, Basket, Voli)
• Masjid Kampus, Kantin Sehat, Free Wi-Fi 1 Gbps

💻 Khusus Informatika & Komputer:
• Lab Software Engineering (High-end PC Core i7/Ryzen 7, 32GB RAM)
• Lab AI & Big Data GPU Server (NVIDIA RTX GPUs)
• Lab Cyber Security & Jaringan Terisolasi
• Lab Hardware & IoT Development',
    82,
    '{"type": "facilities"}'::jsonb
),
(
    'kontak',
    'Kontak & Hotline Kampus',
    ARRAY['kontak', 'telepon', 'phone', 'wa', 'hotline', 'alamat', 'lokasi', 'email'],
    'Hubungi Kami - Universitas Harkat Negeri:

📞 Hotline CS PMB: 0858-6970-8000
☎️ Telepon: (0283) 352000
📧 Email: info@harkatnegeri.ac.id / pmb@harkatnegeri.ac.id
🌐 Website: https://harkatnegeri.ac.id
📱 Instagram: @universitasharkatnegeri
📍 Kampus Utama: Jl. Mataram No.9, Pesurungan Lor, Margadana, Kota Tegal, Jawa Tengah 52147',
    85,
    '{"type": "contact"}'::jsonb
);

-- ============================================================
-- TIKA KNOWLEDGE UPDATE
-- Universitas Harkat Negeri
-- Updated: September 2026
-- Source: latest PMB / tuition / scholarship information
-- ============================================================


-- ============================================================
-- 1. UPDATE PMB
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'daftar',
        'pendaftaran',
        'registrasi',
        'masuk kampus',
        'pmb',
        'mahasiswa baru',
        'cara daftar',
        'gelombang',
        'jalur masuk',
        'rpl',
        'ekstensi',
        'kelas malam'
    ],
    answer = 'Pendaftaran Mahasiswa Baru Universitas Harkat Negeri (UHN) Tahun Akademik 2026/2027:

🗓️ STATUS PMB SAAT INI:
• Gelombang 3 — Agustus–September 2026

🎓 PILIHAN KELAS:
• Reguler Pagi
• Reguler Malam (Ekstensi/Karyawan)

📚 JALUR:
• Reguler
• RPL (Rekognisi Pembelajaran Lampau)

🌐 Portal Pendaftaran Resmi:
https://pmb.harkatnegeri.ac.id/

📞 Hotline Informasi & Konseling:
+62 877-2211-2002

Jika membutuhkan informasi terbaru mengenai syarat, jadwal, atau proses pendaftaran, calon mahasiswa dapat menghubungi hotline PMB UHN.',
    priority = 95,
    metadata = jsonb_build_object(
        'type', 'pmb',
        'academic_year', '2026/2027',
        'current_wave', 'Gelombang 3',
        'status', 'active',
        'last_updated', '2026-09-15',
        'source', 'Latest UHN PMB information'
    )
WHERE title = 'Pendaftaran Mahasiswa Baru (PMB)';


-- ============================================================
-- 2. UPDATE BIAYA KULIAH
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'biaya',
        'uang',
        'spp',
        'bayar',
        'kuliah berapa',
        'harga',
        'biaya kuliah',
        'biaya masuk',
        'uang gedung',
        'spi',
        'pendaftaran'
    ],
    answer = 'Rincian Biaya Masuk & Kuliah Universitas Harkat Negeri (UHN) Tahun Akademik 2026/2027:

💳 BIAYA PENDAFTARAN:
• Rp250.000 — S-1 Teknik Informatika, S-1 Sistem Informasi, dan S-1 Sains Data
• Rp300.000 — Program studi lainnya serta program Profesi

📋 BIAYA PENGEMBANGAN MAHASISWA:
• Rp1.000.000
• Dibayarkan 1x di awal masuk

🏫 SUMBANGAN PENGEMBANGAN INSTITUSI (SPI):
• Rp7.000.000
• Merupakan uang gedung
• Dapat dicicil

📚 SPP BULANAN:
• Rp1.300.000/bulan
• Sudah termasuk biaya praktikum dan ujian
• Tidak ada biaya tersembunyi berdasarkan informasi yang tersedia

💡 UHN juga menyediakan berbagai program beasiswa. Ketik "beasiswa" untuk melihat informasinya.

📞 Untuk konfirmasi biaya dan ketentuan terbaru:
+62 877-2211-2002',
    priority = 95,
    metadata = jsonb_build_object(
        'type', 'fees',
        'academic_year', '2026/2027',
        'registration_fee_it', 250000,
        'registration_fee_other', 300000,
        'development_fee', 1000000,
        'spi', 7000000,
        'monthly_tuition', 1300000,
        'spi_installment_available', true,
        'source', 'Latest UHN tuition information',
        'last_updated', '2026-09-15'
    )
WHERE title = 'Rincian Biaya Kuliah & SPP';


-- ============================================================
-- 3. UPDATE BEASISWA
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'beasiswa',
        'scholarship',
        'kip',
        'kip kuliah',
        'keringanan',
        'gratis',
        'prestasi',
        'ranking',
        'tahfiz',
        'organisasi',
        'influencer',
        'alumni',
        'nusantara'
    ],
    answer = 'Program Beasiswa Resmi Universitas Harkat Negeri (UHN):

🎓 BEASISWA KIP KULIAH
• Bebas biaya kuliah 100%
• Ditambah bantuan biaya hidup dari Kemendikbudristek

🏆 BEASISWA ORGANISASI SEKOLAH
• Untuk calon mahasiswa yang aktif dalam kepengurusan organisasi intra/ekstra sekolah

🥇 BEASISWA RANKING & PRESTASI
• Potongan biaya bagi peraih peringkat paralel atau juara kompetisi akademik/non-akademik

📖 BEASISWA TAHFIZ
• Keringanan biaya bagi penghafal Al-Qur''an
• Mulai dari minimal hafal 5 juz

🌟 BEASISWA KHUSUS LAINNYA
• Beasiswa Influencer
• Beasiswa Alumni
• Beasiswa Harkat Negeri
• Beasiswa Nusantara

Untuk mengetahui persyaratan, ketentuan, kuota, dan proses pengajuan beasiswa yang berlaku, hubungi Hotline Informasi & Konseling PMB UHN:

📞 +62 877-2211-2002',
    priority = 95,
    metadata = jsonb_build_object(
        'type', 'scholarship',
        'academic_year', '2026/2027',
        'source', 'Latest UHN scholarship information',
        'last_updated', '2026-09-15'
    )
WHERE title = 'Informasi Beasiswa UHN';


-- ============================================================
-- 4. UPDATE KONTAK
-- ============================================================

UPDATE public.tika_knowledge
SET
    keywords = ARRAY[
        'kontak',
        'telepon',
        'phone',
        'wa',
        'whatsapp',
        'hotline',
        'alamat',
        'lokasi',
        'email',
        'pendaftaran',
        'pmb'
    ],
    answer = 'Kontak Informasi Universitas Harkat Negeri (UHN):

📞 Hotline Informasi & Konseling:
+62 877-2211-2002

🌐 Website:
https://harkatnegeri.ac.id

📝 Portal Pendaftaran PMB:
https://pmb.harkatnegeri.ac.id/

Untuk informasi pendaftaran, biaya kuliah, beasiswa, atau informasi akademik lainnya, silakan menghubungi Hotline Informasi & Konseling UHN.',
    priority = 95,
    metadata = jsonb_build_object(
        'type', 'contact',
        'source', 'Latest UHN contact information',
        'last_updated', '2026-09-15'
    )
WHERE title = 'Kontak & Hotline Kampus';


-- ============================================================
-- 5. OPTIONAL: UPDATE DAFTAR PRODI
-- ============================================================
-- Jangan mengubah detail program studi yang belum diberikan
-- dalam data terbaru.
--
-- Yang perlu diperhatikan untuk biaya pendaftaran:
--
-- Rp250.000:
-- - S-1 Teknik Informatika
-- - S-1 Sistem Informasi
-- - S-1 Sains Data
--
-- Rp300.000:
-- - Program studi lainnya
-- - Program Profesi
--
-- Detail biaya ini sudah menjadi source of truth pada
-- entry "Rincian Biaya Kuliah & SPP".


-- ============================================================
-- 6. VERIFICATION
-- ============================================================

SELECT
    id,
    category,
    title,
    priority,
    updated_at
FROM public.tika_knowledge
WHERE title IN (
    'Pendaftaran Mahasiswa Baru (PMB)',
    'Rincian Biaya Kuliah & SPP',
    'Informasi Beasiswa UHN',
    'Kontak & Hotline Kampus'
)
ORDER BY priority DESC, title;