# 🎓 Informatics Experience Center — Universitas Harkat Negeri (UHN)

Pameran teknologi interaktif & platform visualisasi masa depan Fakultas Informatika **Universitas Harkat Negeri**: jelajahi AI, Cyber Security, Cloud, dan inovasi digital di Dies Natalis 2026.

---

## 🚀 Interactive Modules & Live Experience

- **🏠 Experience Center Home**: `/` — Landing page interaktif pameran teknologi & statistik prodi UHN.
- **🧠 AI Career Navigator**: `/navigator` — Diagnostik jalur karier teknologi berbasis AI & Radar Chart.
- **💬 TIKA Campus Assistant**: `/tika` — Asisten 3D interaktif UHN (Text-to-Speech & Lip-Syncing).
- **🛡️ Global Cyber Intelligence**: `/cyber` — Visualisasi 3D ancaman siber global real-time (450+ Kota GeoJSON).

---

## ✨ Fitur Utama Platform

### 🛡️ Global Cyber Intelligence 3D Map (`/cyber`)
Dashboard visualisasi ancaman siber 3D tingkat enterprise yang mensimulasikan lalu lintas cyber secara authentic dan real-time:
- **🌐 450+ Real-World Cities & GIS Nodes**: Terdistribusi presisi di seluruh 7 Benua (termasuk stasiun riset polar Antartika).
- **🗺️ Natural Earth GeoJSON 50m GIS**: Pemetaan batas geografis benua yang akurat sesuai proyeksi GIS asli (WGS84).
- **🎨 Skema 7 Warna Benua**: Identifikasi benua visual instan (Asia, Afrika, Amerika Utara, Amerika Selatan, Eropa, Oseania, Antartika & Indonesia).
- **🎯 Campaign-Based Threat Director Engine**: Simulasi ancaman realistis (Volumetric DDoS, Ransomware, APT State-Sponsored, Zero-Day Exploit dengan CVE asli, DNSSEC Amplification).
- **⏸️ Tactical Freeze Control**: Pembekuan posisi partikel 3D, busur serangan, dan denut node secara presisi saat tombol **PAUSE** ditekan.
- **⚡ Frame Rate Governor (20 / 30 / 40 / 60 FPS)**: Kontrol hemat daya GPU/CPU yang dapat dikonfigurasi secara langsung oleh pengguna.
- **🔥 Top 5 Hotspot Leaderboard & Sonar Beacons**: Menampilkan kota dengan tingkat serangan tertinggi secara visual dan statistik.
- **🚀 Zero-Flicker WebGL Architecture**: Penggunaan *Static Geometry Singletons* dan *InstancedMesh* untuk performa 60 FPS tanpa rendering lag.

### 🧠 AI Career Navigator (`/navigator`)
Mesin rekomendasi karier IT cerdas berbasis profil pengguna:
- **Adaptive Questioning**: Pertanyaan menyesuaikan tingkat keahlian dan minat pengguna (8–14 tahap).
- **Radar Chart Competency**: Visualisasi grafik 6 dimensi kemampuan teknis dan manajerial.
- **Skill Gap & Learning Roadmap**: Panduan peningkatan skill beserta rekomendasi 19 Program Studi UHN.

### 💬 TIKA Campus Assistant (`/tika`)
Chatbot 3D interaktif UHN berbasis WebGL dan AI Knowledge Base:
- **3D Interactive Character Model**: Karakter 3D GLB dengan animasi ekspresi & lip-syncing.
- **Voice Synthesis (Text-to-Speech)**: Audio penjelasan otomatis dalam Bahasa Indonesia.
- **Comprehensive Knowledge Base**: Informasi pendaftaran PMB, 22 prodi, beasiswa, dan fasilitas kampus.

---

## 🛠️ Tech Stack & Architecture

| Technology | Version | Description |
|------------|---------|-------------|
| **React** | 19.x | Modern Component & State Architecture |
| **TanStack Start / Router** | 1.x | SSR/SSG File-based Routing Engine |
| **TypeScript** | 5.x | Strict Type Safety & Data Models |
| **Three.js** | 0.184.x | High-Performance 3D WebGL Engine |
| **React Three Fiber / Drei** | 9.x | Declarative 3D Canvas Infrastructure |
| **Tailwind CSS** | 4.x | Utility-first Design System & Glassmorphism |
| **Framer Motion** | 12.x | Fluid Micro-animations & UI Transitions |
| **Recharts / D3** | 2.x | Telemetry Analytics & Interactive Data Viz |
| **Vite / Nitro** | 8.x | Next-gen Fast Build & Cloudflare SSR Deployment |

---

## 📁 Struktur Kode & Modul

```
src/
├── routes/
│   ├── __root.tsx          # Root layout, dynamic theme & global providers
│   ├── index.tsx           # Homepage Informatics Experience Center
│   ├── navigator.tsx       # AI Career Navigator Page
│   ├── tika.tsx            # TIKA 3D Campus Assistant Page
│   └── cyber.tsx           # Global Cyber Intelligence 3D Page
├── components/
│   ├── iec/                # Hero section, feature cards, stats bar
│   ├── navigator/          # Quiz engine, radar chart, career roadmap
│   ├── tika3d/             # Three.js 3D character, TTS & audio player
│   └── cyber/              # CyberGlobe, CyberStats, CyberFeed, FrameGovernor
├── lib/
│   ├── cyber-data.ts       # 450+ GIS city nodes, lat/lng, attack categories
│   ├── cyber-engine.ts     # Realistic threat campaign generator
│   ├── tika-knowledge.ts   # UHN academic & campus knowledge base
│   └── navigator-data.ts   # Career paths, quiz questions & skill mappings
└── public/
    └── tika/tika.glb       # 3D character model mesh & rig
```

---

## 🚀 Getting Started & Local Development

```bash
# 1. Clone repository
git clone https://github.com/Nourivex/komti-dies.git
cd komti-dies

# 2. Install dependencies
npm install

# 3. Jalankan server lokal (Development Mode)
npm run dev

# 4. Build untuk Produksi
npm run build
```

---

## 🔒 Security & Performance Features

- **Strict Type Validation**: Menggunakan TypeScript strict mode tanpa deprecated API.
- **Batch Drawing Canvas Optimization**: Rendering peta GIS 50m tanpa membebankan main-thread CPU.
- **Glassmorphism UI System**: Penggunaan warna kontras tinggi, tema gelap/terang, dan kompatibilitas mobile touch.

© 2026 **Universitas Harkat Negeri** — Fakultas Informatika (Nourivex Engineering).
