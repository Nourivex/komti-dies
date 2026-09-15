-- ============================================================
-- TIKA KNOWLEDGE EXPANSION: FAQ MABA TEKNIK INFORMATIKA
-- Date: 2026-09-16
-- Prinsip ANTI-NGASAL:
--  Tier 1 OFFICIAL_VERIFIED = dari https://pmb.harkatnegeri.ac.id/ (fetched 2026-09-15)
--    - syarat, biaya daftar, gelombang, kelas, CBT, kontak, daftar beasiswa
--  Tier 2 GENERAL_GUIDANCE = konsensus umum prodi TI Indonesia
--    (Amikom, UI, Telkom, UPGRIS, Masoem, Unikma - lihat komentar sumber)
--    - coding dari nol, matematika diskrit, laptop, prospek umum
--    - TIDAK diklaim sebagai kurikulum resmi UHN
--  Yang TIDAK boleh diklaim: matkul per-semester UHN, nama dosen,
--  akreditasi spesifik, spek lab detail, gaji pasti, jaminan magang.
--  Untuk hal itu jawaban mengarahkan ke hotline resmi.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Syarat Masuk S-1 Teknik Informatika (TIER 1)
-- Sumber: pmb.harkatnegeri.ac.id - bagian S-1 TEKNIK INFORMATIKA
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Syarat Masuk S1 Teknik Informatika UHN',
    ARRAY['syarat ti', 'syarat informatika', 'syarat masuk ti', 'daftar ti', 'dokumen ti', 'lulusan apa bisa masuk ti'],
    '📋 Syarat Masuk S-1 Teknik Informatika UHN (Tahun 2026/2027):

• WNI / WNA, Laki-laki / Perempuan
• Lulus SMA / SMK / MA / Kejar Paket C — SEMUA jurusan bisa (IPA, IPS, SMK non-IT)
• Fotocopy Ijazah / SKL (jika belum lulus: rapor semester terakhir)
• Membayar biaya pendaftaran Rp 250.000
• Lulus tes seleksi (CBT)

🌐 Daftar: https://pmb.harkatnegeri.ac.id/pendaftaran
📞 Konfirmasi: +62 877-2211-2002

Sumber: Portal PMB UHN resmi.',
    90,
    jsonb_build_object(
        'type', 'faq_ti_requirement',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 2. Biaya Pendaftaran TI (TIER 1) + koreksi Sains Data
-- Sumber: pmb.harkatnegeri.ac.id
-- Penting: S-1 Sains Data = Rp 300.000 (bukan 250rb)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Biaya Pendaftaran Teknik Informatika',
    ARRAY['biaya ti', 'biaya informatika', 'biaya daftar ti', 'pendaftaran ti berapa', 'spi ti', 'spp ti'],
    '💳 Biaya Masuk S-1 Teknik Informatika UHN 2026/2027:

• Pendaftaran: Rp 250.000
• Pengembangan Mahasiswa: Rp 1.000.000 (1x awal)
• SPI (uang gedung): Rp 7.000.000 (bisa dicicil)
• SPP: Rp 1.300.000/bulan (termasuk praktikum & ujian)

Catatan: S-1 Sains Data pendaftarannya Rp 300.000 (beda dengan TI/SI).

Untuk skema cicilan & total terbaru, hubungi:
📞 +62 877-2211-2002

Sumber: Portal PMB UHN resmi.',
    90,
    jsonb_build_object(
        'type', 'faq_ti_fee',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/',
        'academic_year', '2026/2027',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 3. Gelombang + Kelas Pagi/Malam/RPL + CBT (TIER 1)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Gelombang dan Kelas Kuliah TI Reguler Malam RPL',
    ARRAY['gelombang ti', 'kelas malam ti', 'kelas karyawan ti', 'rpl ti', 'ekstensi ti', 'jadwal daftar ti', 'cbt ti'],
    '🗓️ PMB TI UHN 2026/2027:

• Gelombang 1: Jan–Mar 2026
• Gelombang 2: Apr–Jul 2026
• Gelombang 3: Agu–Sep 2026 (sedang berjalan)

🎓 Pilihan kelas TI:
• Reguler Pagi
• Reguler Malam (Ekstensi/Karyawan — cocok yang sudah kerja)
• RPL (Rekognisi Pembelajaran Lampau)

📝 Seleksi: Ujian CBT di Lab Komputer Gedung B, Kampus Tegal.
Datang 30 menit awal + bawa alat tulis (pola umum CBT UHN).

🌐 https://pmb.harkatnegeri.ac.id/
📞 +62 877-2211-2002',
    89,
    jsonb_build_object(
        'type', 'faq_ti_wave_class',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 4. Cara Daftar Online TI (TIER 1)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Cara Daftar Online Teknik Informatika',
    ARRAY['cara daftar ti', 'daftar online ti', 'langkah daftar ti', 'pmb online', 'alur pendaftaran ti'],
    '📝 Cara Daftar S-1 Teknik Informatika UHN:

1. Buka https://pmb.harkatnegeri.ac.id/pendaftaran
2. Buat akun & isi data diri + asal sekolah
3. Pilih prodi: S-1 Teknik Informatika
4. Upload: Ijazah/SKL/rapor terakhir, KTP/KK
5. Bayar pendaftaran Rp 250.000
6. Ikuti tes CBT sesuai jadwal
7. Pantau pengumuman di portal / hubungi CS

Kesulitan upload / bayar?
📞 +62 877-2211-2002',
    88,
    jsonb_build_object(
        'type', 'faq_ti_howto',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/pendaftaran',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 5. S1 TI vs D4 TI vs D3 Teknik Komputer (TIER 1 sebagian + TIER 2)
-- Sumber jenjang: SNPMB (S1/D4/D3 definisi nasional) + PMB UHN (nama prodi ada)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Bedanya S1 TI D4 TI dan D3 Teknik Komputer',
    ARRAY['s1 vs d4', 'd4 vs d3', 'beda s1 d4 ti', 'sarjana terapan ti', 'd3 teknik komputer', 'pilih s1 d4 d3'],
    '⚔️ S-1 TI vs D-4 TI vs D-3 Teknik Komputer di UHN:

🎓 S-1 Teknik Informatika
• Sarjana akademik 8 semester. Kuat di konsep + software/AI/security/cloud.
• Cocok untuk Software Engineer, AI, riset.

📋 D-4 / Sarjana Terapan Teknik Informatika
• Vokasi 8 semester, porsi praktik lebih besar, siap kerja industri.
• Pendaftaran Rp 300.000 (di portal PMB UHN).

🔧 D-3 Teknik Komputer
• Diploma 6 semester, fokus teknis praktis, cepat kerja.
• Pendaftaran Rp 300.000.

Semua ada di portal PMB UHN. Pilih S-1 jika suka konsep mendalam, D-4/D-3 jika suka praktik cepat kerja. Detail kurikulum per-semester tanya hotline:
📞 +62 877-2211-2002',
    86,
    jsonb_build_object(
        'type', 'faq_ti_level',
        'tier', 'MIXED_OFFICIAL_PLUS_GENERAL',
        'source', 'https://pmb.harkatnegeri.ac.id/ + definisi jenjang SNPMB',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 6. TI vs SI vs Sains Data (TIER 2 general)
-- Sumber pola umum: Amikom, UPGRIS, Telkom FAQ
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Bedanya TI SI dan Sains Data untuk Maba',
    ARRAY['ti vs si', 'informatika vs sistem informasi', 'si vs sd', 'pilih ti si sd', 'perbedaan ti si'],
    '🔎 TI vs SI vs Sains Data (gambaran umum prodi teknologi):

💻 Teknik Informatika: bangun software/sistem — coding, algoritma, AI, security, cloud.
🌐 Sistem Informasi: jembatan bisnis + IT — analisis proses, ERP, BI, manajemen proyek IT, UI/UX.
🧠 Sains Data: olah data jadi keputusan — Python, statistik, visualisasi, machine learning.

Pilih TI jika suka ngoprek kode & problem solving logika. Pilih SI jika suka analisis bisnis + teknologi. Pilih Sains Data jika suka angka/statistik/riset.

Ini pola umum nasional. Untuk fokus resmi tiap prodi UHN, hubungi 📞 +62 877-2211-2002',
    84,
    jsonb_build_object(
        'type', 'faq_ti_compare',
        'tier', 'GENERAL_GUIDANCE',
        'source', 'Konsensus FAQ TI Indonesia (Amikom, UPGRIS, Telkom)',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 7. Harus bisa coding? (TIER 2)
-- Sumber: Unikma, Masoem, UPGRIS — konsensus: TIDAK wajib, diajari dari nol
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Apakah Masuk TI Harus Bisa Coding',
    ARRAY['harus bisa coding', 'belum bisa coding', 'ngoding', 'pemula coding', 'takut coding', 'buta coding'],
    '💡 Masuk TI harus bisa coding dulu? Jawaban umum kampus TI Indonesia: TIDAK wajib.

Semester awal biasanya mulai dari logika, algoritma, variabel, if-else — bukan langsung bikin aplikasi bank.

Yang penting: mau latihan rutin, berani debugging/error, dan belajar mandiri (baca dokumentasi/forum).

Di UHN syarat resminya hanya lulusan SMA/SMK/MA + lulus CBT, tidak ada syarat sudah bisa coding. Detail belajar semester 1 tanya hotline 📞 +62 877-2211-2002',
    87,
    jsonb_build_object(
        'type', 'faq_ti_coding',
        'tier', 'GENERAL_GUIDANCE',
        'source', 'FAQ Unikma, Masoem, UPGRIS Informatika',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 8. Matematika di TI (TIER 2)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Apakah TI Banyak Matematika dan Harus Jago',
    ARRAY['matematika ti', 'takut matematika', 'matdis', 'kalkulus ti', 'diskrit', 'benci mtk'],
    '🧮 Matematika di TI itu ada, tapi BUKAN hafalan rumus melulu.

Wajib dasar untuk semua programmer:
• Logika boolean (IF/AND/OR/NOT)
• Matematika diskrit: himpunan, graf, kombinatorika (fondasi algoritma)

Lanjutan (baru kepakai jika ambil AI/Data/Security):
• Aljabar linear, kalkulus, statistika/probabilitas

Konsensus umum: tidak perlu jenius MTK, yang penting suka teka-teki logika & tahan debugging. Komputer yang ngitung, manusia yang mikir.',
    85,
    jsonb_build_object(
        'type', 'faq_ti_math',
        'tier', 'GENERAL_GUIDANCE',
        'source', 'FAQ Masoem, UPGRIS, Amikom Informatika',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 9. Anak IPS / SMK non-IT (TIER 1 syarat + TIER 2 motivasi)
-- Sumber syarat: PMB UHN membolehkan semua jurusan untuk S-1 TI
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Anak IPS SMK Non IT Bisa Masuk TI',
    ARRAY['anak ips masuk ti', 'ips bisa ti', 'smk non it', 'bukan rpl tkj', 'latar belakang ips', 'smk otomotif masuk ti'],
    '🌱 Anak IPS / SMK non-komputer BISA masuk S-1 TI UHN.

Bukti resmi: syarat PMB UHN untuk S-1 TI tertulis Lulus SMA/SMK/MA semua jurusan — tidak dibatasi IPA/RPL/TKJ.

Tantangannya nyata di awal: teman SMK RPL mungkin sudah kenal coding. Tapi kurikulum TI umum dimulai dari nol, yang rajin latihan biasanya menyalip di tengah semester.

Tips: curi start logika + Python dasar + latihan mengetik cepat (touch typing).',
    86,
    jsonb_build_object(
        'type', 'faq_ti_background',
        'tier', 'MIXED_OFFICIAL_PLUS_GENERAL',
        'source', 'https://pmb.harkatnegeri.ac.id/ + FAQ umum TI',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 10. Laptop untuk TI (TIER 2)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Spesifikasi Laptop untuk Mahasiswa TI',
    ARRAY['laptop ti', 'spek laptop informatika', 'laptop coding', 'butuh laptop spek tinggi', 'macbook atau windows'],
    '💻 Laptop untuk TI (panduan umum, bukan syarat resmi UHN):

Minimal nyaman:
• CPU i5/Ryzen 5 ke atas, RAM 8GB (ideal 16GB), SSD 512GB
• OS: Windows/Linux/macOS — semua bisa untuk coding dasar

Baru butuh GPU/NVIDIA RTX jika fokus ML/deep learning lokal atau game berat.

Semester awal: laptop standar + lab kampus cukup. Yang lebih penting: touch typing cepat & rajin praktik. Jika ragu beli, manfaatkan lab komputer kampus dulu sambil nabung.',
    80,
    jsonb_build_object(
        'type', 'faq_ti_laptop',
        'tier', 'GENERAL_GUIDANCE',
        'is_uhn_requirement', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 11. Bahasa pemrograman pertama (TIER 2)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Bahasa Pemrograman Pertama untuk Maba TI',
    ARRAY['belajar bahasa apa', 'python atau java', 'bahasa pemrograman pemula', 'mulai coding dari mana', 'c++ python'],
    '🐍 Bahasa pertama untuk maba TI (rekomendasi umum):

• Python — sintaks paling mudah, dipakai web, data, AI, otomasi. Cocok untuk pemula.
• Lalu: JavaScript (web), Java/C++ (OOP & struktur data), SQL (database), Dart/Flutter jika minat mobile.

Prinsip: tentukan tujuan dulu (web? mobile? data? game?). Kuasai 1 bahasa + logika sampai tuntas, baru pindah. Jangan gonta-ganti tiap minggu.

Kurikulum bahasa resmi UHN per semester? Tanya hotline 📞 +62 877-2211-2002',
    81,
    jsonb_build_object(
        'type', 'faq_ti_lang',
        'tier', 'GENERAL_GUIDANCE',
        'source', 'Konsensus pembelajaran pemrograman pemula',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 12. Semester 1 TI kaget apa (TIER 2, pengalaman maba umum)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Kejutan Semester 1 Teknik Informatika',
    ARRAY['semester 1 ti', 'maba ti kaget', 'kuliah ti semester awal', 'imposter syndrome', 'tugas ti banyak'],
    '🎒 Kejutan umum semester 1 TI (berlaku di banyak kampus):

1. Awalnya bukan bikin aplikasi keren, tapi terminal hitam, variabel, if-else — membosankan tapi fondasi.
2. Dosen hanya ajari 20-30%, sisanya wajib belajar mandiri (dokumentasi, forum error, YouTube).
3. Gap background: anak SMK RPL terlihat jago di awal, anak nol besar minder — biasanya kebalik di tengah semester jika yang nol rajin.
4. Mengetik cepat (touch typing) lebih ngaruh daripada laptop mahal saat ujian praktikum dibatasi waktu.

Kunci: konsisten ngoding tiap hari 1-2 jam, jangan hanya nonton tutorial.',
    82,
    jsonb_build_object(
        'type', 'faq_ti_sem1',
        'tier', 'GENERAL_GUIDANCE',
        'source', 'Pengalaman maba TI umum (Masoem, forum mahasiswa)',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 13. Prospek kerja TI tanpa janji gaji (TIER 2 hati-hati)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Prospek Kerja Lulusan Teknik Informatika',
    ARRAY['kerja lulusan ti', 'prospek ti', 'gaji ti', 'jadi apa lulusan informatika', 'karier programmer'],
    '💼 Jalur umum lulusan TI (nasional, bukan jaminan UHN):

• Software Engineer / Full-stack / Mobile Developer
• AI/ML Engineer, Data Analyst/Engineer
• Cyber Security Analyst, Cloud/DevOps Engineer
• QA Tester, IT Support, System Analyst
• Freelance/Remote, Startup founder

Gaji sangat bervariasi (posisi, kota, portfolio, sertifikasi). TIKA tidak memberi angka pasti sebagai janji.

Yang menaikkan peluang: portfolio GitHub, magang, sertifikasi (AWS/Cisco/Google), lomba/hackathon, bahasa Inggris.',
    83,
    jsonb_build_object(
        'type', 'faq_ti_career',
        'tier', 'GENERAL_GUIDANCE',
        'salary_policy', 'no_guarantee',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 14. Magang / PKL TI (TIER 1 parsial - hati-hati klaim)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Magang PKL Mahasiswa TI UHN',
    ARRAY['magang ti', 'pkl informatika', 'internship ti', 'mitra magang', 'mbkm ti'],
    '📦 Magang/PKL TI UHN:

Portal PMB menyebut ada kelas RPL & kerja sama industri, dan pola CBT/magang diumumkan per periode. Daftar mitra teknologi yang tercantum di data kemitraan UHN antara lain AWS, Huawei, Telkomsel, Metrodata, Botika, dll — namun bentuk kerja sama tiap mitra BERBEDA (tidak semua = tempat magang pasti).

Jangan asumsikan pasti magang di perusahaan tertentu. Untuk kepastian magang/MBKM TI tahun berjalan:
📞 +62 877-2211-2002',
    78,
    jsonb_build_object(
        'type', 'faq_ti_internship',
        'tier', 'MIXED_OFFICIAL_PLUS_GENERAL',
        'accuracy_policy', 'Do not guarantee placement',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 15. Beasiswa untuk anak TI (TIER 1 daftar nama)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Beasiswa untuk Mahasiswa Teknik Informatika',
    ARRAY['beasiswa ti', 'beasiswa informatika', 'kip ti', 'beasiswa ranking ti', 'beasiswa tahfiz'],
    '🏆 Beasiswa yang bisa dipakai anak TI UHN (nama resmi dari portal PMB):

• KIP Kuliah, Beasiswa Harkat Negeri, Beasiswa Nusantara
• Beasiswa Ranking, Beasiswa Organisasi Sekolah
• Beasiswa Tahfiz, Beasiswa Influencer, Beasiswa Alumni

Syarat, kuota, dan potongan BERBEDA tiap tahun. Contoh pola umum: KIP = bebas biaya + bantuan hidup, Tahfiz/Ranking = potongan berdasarkan hafalan/prestasi.

Wajib konfirmasi terbaru ke 📞 +62 877-2211-2002',
    84,
    jsonb_build_object(
        'type', 'faq_ti_scholarship',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/ - bagian Beasiswa',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 16. Kelas karyawan TI / sudah kerja (TIER 1)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Kuliah TI Sambil Kerja Kelas Malam',
    ARRAY['kuliah sambil kerja ti', 'kelas karyawan informatika', 'reguler malam ti', 'kerja bisa kuliah ti'],
    '🌙 Bisa kuliah TI sambil kerja? Bisa.

UHN membuka Kelas Reguler Malam (Ekstensi/Karyawan) + jalur RPL untuk yang sudah punya pengalaman kerja.

Pola umum: kuliah malam + tugas proyek yang bisa disesuaikan. Tapi TI butuh waktu ngoding rutin — siapkan 1-2 jam/hari di luar kelas.

Tanya jadwal malam TI terbaru: 📞 +62 877-2211-2002',
    82,
    jsonb_build_object(
        'type', 'faq_ti_evening',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/ - Kelas Perkuliahan',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 17. AI / Cybersecurity di TI (TIER 2)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Belajar AI dan Cyber Security di TI',
    ARRAY['ai di ti', 'machine learning ti', 'cyber security ti', 'ethical hacking kuliah', 'belajar hacker kampus'],
    '🤖 AI & 🛡️ Cyber Security di TI (gambaran umum):

AI/ML: butuh Python + matematika (aljabar linear, statistika). Mulai dari data cleaning, visualisasi, baru model ML. Laptop GPU membantu tapi bisa pakai Colab/cloud gratis.

Cyber Security: yang diajari = Ethical Hacking (topi putih) — kriptografi, pentest legal di lab, forensik digital. BUKAN cara bobol wifi orang / merusak sistem.

Apakah UHN TI ada peminatan resmi AI/Security? TIKA tidak mengarang. Tanya prodi via 📞 +62 877-2211-2002. Komunitas umum seperti TegalSec/Hackviser sering jadi tempat belajar tambahan.',
    81,
    jsonb_build_object(
        'type', 'faq_ti_ai_security',
        'tier', 'GENERAL_GUIDANCE',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 18. Organisasi & komunitas TI (NEEDS VERIFICATION)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Organisasi dan Komunitas Mahasiswa TI',
    ARRAY['ukm informatika', 'himatifa ti', 'komunitas coding', 'robotik ti', 'organisasi ti uhn'],
    '👥 Organisasi/komunitas TI (data lokal, WAJIB verifikasi ke kemahasiswaan):

Tercatat di data lokal: HIMAFI/Himpunan Informatika, Game Dev, Robotics, Cyber Security, Mobile Dev, Data Science Community, UKM Olahraga/Seni/Kewirausahaan.

TIKA belum memverifikasi kepengurusan aktif 2026/2027. Untuk daftar UKM aktif, jadwal open recruitment, dan kontak pembina:
📞 +62 877-2211-2002 atau sekretariat kampus Jl. Mataram No.9 Tegal.',
    76,
    jsonb_build_object(
        'type', 'faq_ti_org',
        'tier', 'NEEDS_VERIFICATION',
        'verification_action', 'Confirm to Kemahasiswaan UHN before claiming active',
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 19. Tugas akhir / skripsi TI (TIER 2)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Tugas Akhir Skripsi Anak TI',
    ARRAY['skripsi ti', 'tugas akhir informatika', 'ta ti susah', 'judul skripsi ti', 'proyek akhir ti'],
    '📚 Tugas Akhir TI (pola umum nasional):

Bentuk umum: aplikasi/sistem + laporan (ada yang skripsi riset, ada yang proyek terapan/capstone — tergantung kampus).

Contoh topik umum: sistem informasi, aplikasi mobile, IoT, AI prediksi, keamanan jaringan, game, data dashboard.

Tips maba: dari semester 3-4 mulai simpan ide + portfolio GitHub, dekat dengan dosen/lab, ikut magang agar studi kasus TA dari masalah nyata.

Aturan TA resmi UHN TI? Tanya prodi via 📞 +62 877-2211-2002',
    77,
    jsonb_build_object(
        'type', 'faq_ti_thesis',
        'tier', 'GENERAL_GUIDANCE',
        'is_uhn_curriculum', false,
        'last_updated', '2026-09-16'
    )
);

-- ------------------------------------------------------------
-- 20. Kontak khusus tanya TI (TIER 1)
-- ------------------------------------------------------------
INSERT INTO public.tika_knowledge (category, title, keywords, answer, priority, metadata)
VALUES (
    'faq_ti',
    'Kontak Tanya Prodi Teknik Informatika',
    ARRAY['kontak ti', 'nanya ti kemana', 'cs ti', 'wa pmb ti', 'alamat tanya ti'],
    '📞 Mau nanya khusus TI UHN? Hubungi kanal resmi:

• Hotline PMB & Konseling (WA/Call): +62 877-2211-2002
• Telp kantor: (0283) 352000
• Web: https://harkatnegeri.ac.id/
• Daftar: https://pmb.harkatnegeri.ac.id/
• Alamat: Jl. Mataram No.9, Tegal

Tulis pertanyaanmu spesifik, contoh: "Syarat S-1 TI gelombang 3 apa saja?" agar CS cepat jawab.',
    88,
    jsonb_build_object(
        'type', 'faq_ti_contact',
        'tier', 'OFFICIAL_VERIFIED',
        'source', 'https://pmb.harkatnegeri.ac.id/',
        'last_updated', '2026-09-16'
    )
);

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT category, title, priority, metadata->>'tier' as tier
FROM public.tika_knowledge
WHERE category = 'faq_ti'
ORDER BY priority DESC, title;
