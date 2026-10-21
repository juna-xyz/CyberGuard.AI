# Design System Specification (`design.md`) — CyberGuard AI

**Project Name:** CyberGuard AI  
**Project Slug:** `cyberguard-ai`  
**Category:** Edukasi & Riset  
**Tagline:** Think Before You Click.  
**Language:** Bahasa Indonesia  
**Approved Aesthetic Direction:** Trust-First Editorial Security (Modern Academic & Practical Safety)  
**Creation Date:** 2026-10-21  
**Source Rules:** [AGENTS.md](file:///home/rejuna/Documents/CyberGuard.AI/AGENTS.md) & [DESIGN.md](file:///home/rejuna/Documents/CyberGuard.AI/DESIGN.md)

---

## 1. Visual Philosophy & Anti-Slop Guardrails

CyberGuard AI dirancang sebagai produk edukasi keamanan digital yang menenangkan, berwibawa, dan mudah dipahami oleh masyarakat umum maupun pelajar. Desain ini secara sadar menolak tampilan klise "hacker film Hollywood" (latar gelap gulita, teks hijau neon bercahaya, kode terminal berjatuhan) serta layout SaaS AI generik murahan (gradasi ungu-ke-pink, kartu seragam berbayang tebal, dan panah `→` di setiap tombol).

### Prinsip Estetika Inti:
1. **Light Mode First:** Kanvas default adalah putih bersih (`#FFFFFF`) dan slate-50 yang sejuk (`#F7F9FC`), dipadukan dengan border hairline presisi (`#DCE4ED`) dan tipografi *deep navy* (`#152238`).
2. **Aturan Distribusi Warna 60-30-10:**
   - **60% (Latar/Kanvas):** `--color-canvas` (`#F7F9FC`) dan `--color-surface` (`#FFFFFF`). Memberikan ruang baca lega dan kenyamanan visual maksimal.
   - **30% (Struktur & Teks):** `--color-hairline` (`#DCE4ED`), `--color-ink` (`#152238`), dan `--color-ink-muted` (`#5D6B80`). Membentuk batas elemen yang rapi dan hierarki tipografi tajam.
   - **10% (Aksen Brand Utama):** `--color-brand` (`#176B68`, *Restrained Teal*). Dikhususkan untuk tombol CTA utama, status aktif, dan aksen fokus terpilih.
3. **Disiplin Font Tunggal (Pure Sans-Serif):** Menggunakan satu keluarga font modern terpadu (**Plus Jakarta Sans** atau **Inter**). Pembedaan hierarki dilakukan melalui skala ukuran (`text-xs` hingga `text-4xl`), ketebalan (`font-normal`, `font-medium`, `font-semibold`, `font-bold`), dan kontras warna semantik. Font monospace (`font-mono`) **HANYA** diizinkan untuk kutipan cuplikan teks mencurigakan, payload data mentah, atau nama file biner (`.apk`).
4. **Warna Risiko Kualitatif yang Bertanggung Jawab:** Merah dan kuning-amber hanya digunakan jika benar-benar ada peringatan bahaya terverifikasi; hijau digunakan untuk mitigasi aman dan apresiasi kuis. Tidak pernah mengandalkan warna semata untuk menyampaikan risiko (selalu disertai teks dan ikon).

---

## 2. Design System Tokens

### A. CSS Custom Properties (`:root`)
```css
:root {
  /* 60% Canvas & Background Surfaces */
  --color-canvas: #F7F9FC;
  --color-surface: #FFFFFF;
  --color-surface-muted: #EEF3F8;

  /* 30% Structural Hairlines & Typography Ink */
  --color-hairline: #DCE4ED;
  --color-hairline-strong: #C4D1DF;
  --color-ink: #152238;
  --color-ink-muted: #5D6B80;
  --color-ink-subtle: #8996A9;

  /* 10% Primary Brand Accent (Restrained Teal) */
  --color-brand: #176B68;
  --color-brand-hover: #105653;
  --color-brand-soft: #E2F3F0;
  --color-brand-border: #A3D5CD;

  /* Semantic Qualitative Risk Colors */
  --color-risk-high: #B93838;
  --color-risk-high-soft: #FDECEC;
  --color-risk-high-border: #F7B8B8;

  --color-risk-medium: #9A5B08;
  --color-risk-medium-soft: #FFF3D8;
  --color-risk-medium-border: #F9DA9C;

  --color-risk-low: #24734A;
  --color-risk-low-soft: #E6F6EC;
  --color-risk-low-border: #A2E2BD;

  /* Corner Radii */
  --radius-badge: 6px;
  --radius-control: 10px;
  --radius-card: 16px;
  --radius-modal: 20px;

  /* Elevation & Shadows (Subtle, Anti-Cliché) */
  --shadow-subtle: 0 1px 3px rgba(21, 34, 56, 0.05), 0 1px 2px rgba(21, 34, 56, 0.03);
  --shadow-card: 0 4px 12px rgba(21, 34, 56, 0.04), 0 1px 2px rgba(21, 34, 56, 0.02);
  --shadow-popover: 0 12px 24px rgba(21, 34, 56, 0.08), 0 4px 8px rgba(21, 34, 56, 0.04);
}
```

### B. Tailwind CSS Token Extension
```javascript
// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
        },
        hairline: {
          DEFAULT: 'var(--color-hairline)',
          strong: 'var(--color-hairline-strong)',
        },
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          soft: 'var(--color-brand-soft)',
          border: 'var(--color-brand-border)',
        },
        risk: {
          high: {
            DEFAULT: 'var(--color-risk-high)',
            soft: 'var(--color-risk-high-soft)',
            border: 'var(--color-risk-high-border)',
          },
          medium: {
            DEFAULT: 'var(--color-risk-medium)',
            soft: 'var(--color-risk-medium-soft)',
            border: 'var(--color-risk-medium-border)',
          },
          low: {
            DEFAULT: 'var(--color-risk-low)',
            soft: 'var(--color-risk-low-soft)',
            border: 'var(--color-risk-low-border)',
          },
        },
      },
      borderRadius: {
        badge: 'var(--radius-badge)',
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        modal: 'var(--radius-modal)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        card: 'var(--shadow-card)',
        popover: 'var(--shadow-popover)',
      },
    },
  },
};
```

---

## 3. Typography Scale & Layout Hierarchy

| Level | Size (Desktop / Mobile) | Weight | Line Height | Tracking | Semantic Usage |
|---|---|---|---|---|---|
| **Display H1** | `36px` / `28px` | `font-bold` (700) | `1.2` | `-0.02em` | Judul Utama Hero Beranda |
| **Section H2** | `24px` / `20px` | `font-semibold` (600) | `1.3` | `-0.015em` | Judul Fitur, Header Workspace Analyzer, Judul Kuis |
| **Subsection H3** | `18px` / `16px` | `font-semibold` (600) | `1.4` | `-0.01em` | Judul Kartu Skenario, Header Hasil Analisis |
| **Body Large** | `16px` / `15px` | `font-normal` (400) | `1.6` | `0` | Paragraf Pengantar Hero, Narasi Skenario Kuis |
| **Body Regular** | `14px` / `14px` | `font-normal` (400) | `1.5` | `0` | Isi Pesan, Uraian Indikator Bukti, Opsi Pilihan |
| **Caption / Label** | `12px` / `12px` | `font-medium` (500) | `1.4` | `+0.01em` | Badge Tingkat Risiko, Counter Karakter, Timestamp |
| **Code Snippet** | `13px` / `12px` | `font-mono` (500) | `1.4` | `0` | Cuplikan Kata Kunci Mencurigakan / Nama File `.apk` |

---

## 4. Visual & Imagery Architecture (Anti-Placeholder Protocol)

Sesuai dengan ketentuan [AGENTS.md](file:///home/rejuna/Documents/CyberGuard.AI/AGENTS.md) Bagian 4D & 4E, seluruh antarmuka bebas dari kotak abu-abu polos atau teks *"Image Placeholder"*.

### A. Hero Imagery Specification (Google Imagen `generate_image`)
Hero section pada `screen-01-dashboard` menerapkan **Pola 1 — Asymmetric 2-Column Split Hero (60/40)**.
- **Aspek Rasio:** `3:2` (untuk integrasi asimetris di kolom kanan hero desktop).
- **Pencahayaan & Suasana:** *Bright natural morning daylight*, studio key lighting yang jernih, atmosfer tenang dan cerdas tanpa kabut gelap.
- **Komposisi Subjek:** Seorang pelajar/profesional muda Indonesia sedang meninjau pesan digital di laptop dalam ruang belajar modern yang rapi. Terdapat ruang kosong bersih (*clean negative space*) yang elegan, berpadu harmonis dengan kartu bingkai ber-border hairline slate-200.
- **Rumusan Prompt Resmi Google Imagen:**
  > "A realistic editorial photograph of a young Indonesian student thoughtfully analyzing a digital message on a modern laptop in a bright, clean, sunlit study room. Natural morning window lighting, calm and focused expression, authentic modern interior with minimal books and plants. High resolution 3:2 framing, clean negative space on the edges, no dark hacker clichés or neon lights."
- **Penyimpanan Berkas:** `public/assets/images/hero-cyberguard.webp`.
- **Implementasi Komponen:** Tag `<img>` dengan `loading="eager"`, `alt="Pelajar menganalisis pesan digital dengan kritis"`, dan *skeleton shimmer fallback*.

### B. Bespoke Parametric SVG Components
Alih-alih menggunakan ilustrasi vektor generik, CyberGuard AI mengintegrasikan komponen SVG parametrik kustom yang bermakna fungsional:
1. **`DigitalTrustShieldSvg` (Hero Visual Companion):**
   - Vektor perisai digital berlapis ganda dengan garis hairline teal halus (`#176B68`), titik simpul koneksi terverifikasi, dan ikon gembok terbuka menjadi tertutup.
2. **`RiskRadarGaugeSvg` (Analyzer Result Viewport):**
   - Pengukur risiko kualitatif berbentuk setengah lingkaran (bukan persentase numerik), menampilkan 3 zona warna semantik tegas: Rendah (Hijau), Sedang (Kuning), Tinggi (Merah) dengan jarum indikator statis sesuai akumulasi bukti.
3. **`ThinkCheckActFlowSvg` (3-Step Framework):**
   - Rangkaian vektor alur 3 langkah (Ikon Mata [Telaah] $\rightarrow$ Ikon Timbangan Bukti [Verifikasi] $\rightarrow$ Ikon Perisai Mitigasi [Amankan Diri]).

### C. Standar Ikonografi (Lucide React Exclusively)
Konsistensi penuh dengan library **Lucide React**. Tidak mencampur dengan FontAwesome atau Heroicons:
- Status Aman: `ShieldCheck`, `CheckCircle2`
- Status Waspada / Sedang: `AlertTriangle`, `HelpCircle`
- Status Risiko Tinggi / Bahaya: `ShieldAlert`, `AlertOctagon`
- Interaksi Forensik: `Search`, `FileText`, `Terminal`, `Copy`, `RotateCcw`
- Navigasi & Aksi: `ArrowRight`, `ExternalLink`, `ChevronRight`

---

## 5. Screen Component Blueprints

```
+----------------------------------------------------------------------------------------------------+
| 1. SCREEN-01: BERANDA EDUKASI (screen-01-dashboard)                                               |
+----------------------------------------------------------------------------------------------------+
|  [Header / AppShell]                                                                               |
|    - Logo Shield CyberGuard AI + Tagline "Think Before You Click"                                  |
|    - Navigasi: [Beranda] [Analisis Pesan] [Kuis Siber]                                             |
|                                                                                                    |
|  [Hero Asymmetric 60/40]                                                                           |
|    - Kiri (60%): H1 "Kenali Manipulasi Digital Sebelum Terlambat", Deskripsi, Dual CTA             |
|    - Kanan (40%): Kartu Framed Visual Hero Imagen + Floating Badge "Verifikasi Bukti Nyata"        |
|                                                                                                    |
|  [Kerangka Kerja 3 Langkah "Think Before You Click"]                                               |
|    - Kartu 1: 01. Telaah Teks (Cermati bahasa desakan & pengirim)                                 |
|    - Kartu 2: 02. Uji Bukti (Periksa tautan, nomor, dan permintaan data)                           |
|    - Kartu 3: 03. Ambil Sikap Aman (Verifikasi saluran resmi, jangan klik)                         |
|                                                                                                    |
|  [Grid 4 Anatomi Rekayasa Sosial Terpopuler]                                                       |
|    - 1. Desakan Waktu Buatan | 2. Permintaan Kredensial/OTP                                        |
|    - 3. Unduhan Berkas Berbahaya (.APK) | 4. Jebakan Hadiah/Subsidi                                |
|                                                                                                    |
|  [Trust Disclaimer Footer Card]                                                                    |
|    - Penegasan bahwa CyberGuard AI adalah instrumen literasi, bukan jaminan verifikasi mutlak.     |
+----------------------------------------------------------------------------------------------------+
```

```
+----------------------------------------------------------------------------------------------------+
| 2. SCREEN-02: PENGANALISIS FORENSIK (screen-02-analyzer)                                           |
+----------------------------------------------------------------------------------------------------+
|  [Privacy & Safety Caution Banner]                                                                 |
|    - Ikon ShieldAlert (Amber) + "Penting: Jangan menempelkan kata sandi, PIN perbankan, atau NIK"  |
|                                                                                                    |
|  [Inspector Workbench Container]                                                                   |
|    - Tombol Quick Sample Pills: [Paket APK Ekspedisi] [Peringatan Blokir Rekening] [Hadiah Undian] |
|    - Textarea Multiline (Placeholder: "Tempelkan isi pesan mencurigakan di sini...")               |
|    - Footer Textarea: Live Character Counter (0 / 2000) + Tombol [Bersihkan] & [Analisis Pesan]    |
|                                                                                                    |
|  [Dynamic 4-State Result Box]                                                                      |
|    - Empty State: Card instruksi santai dengan ikon Search dan 3 tips awal telaah                  |
|    - Loading State: Skeleton Shimmer Card meniru struktur hasil + teks "Memeriksa pola bukti..."   |
|    - Error State: Alert Box merah lembut dengan pesan informatif dan tombol [Coba Lagi]            |
|    - Success State:                                                                                |
|        * Risk Level Badge: High (Merah) / Medium (Kuning) / Low (Hijau)                            |
|        * Observed Indicator Chips: Chip kategori sinyal bahaya yang ditemukan                      |
|        * Uraian Analisis Bahasa Awam: 2-3 paragraf ringkas penjelasan niat manipulatif             |
|        * Safe Next Steps Checklist: Daftar rekomendasi tindakan konkret pengguna                   |
|        * Kotak Batasan Deteksi: Disclaimer keterbatasan sistem otomatis                            |
+----------------------------------------------------------------------------------------------------+
```

```
+----------------------------------------------------------------------------------------------------+
| 3. SCREEN-03: KUIS SIBER INTERAKTIF (screen-03-quiz)                                              |
+----------------------------------------------------------------------------------------------------+
|  [Quiz Progress Header]                                                                            |
|    - Step Label: "Pertanyaan 2 dari 5" + Linear Progress Bar (Aksen Brand Teal)                    |
|                                                                                                    |
|  [Scenario Simulation Card]                                                                        |
|    - Context Tag: e.g. "Simulasi Pesan WhatsApp Kurir"                                             |
|    - Fictional Chat Bubble: Kotak pesan realistis dengan timestamp fiktif dan nama kontak pengirim |
|    - Pertanyaan Pemandu: "Apa tindakan paling aman yang harus Anda ambil?"                         |
|                                                                                                    |
|  [Interactive Decision Options]                                                                    |
|    - 3 Pilihan jawaban bergaya kartu radio dengan state hover & focus yang tegas                   |
|                                                                                                    |
|  [Instant Feedback Drawer] (Muncul seketika setelah pilihan diklik)                                |
|    - Pilihan Aman: Berlatar hijau lembut + Penjelasan mengapa tindakan ini benar                   |
|    - Pilihan Berisiko: Berlatar merah lembut + Uraian konsekuensi bahaya jika tindakan diambil     |
|    - Tombol Aksi: [Lanjut ke Skenario Berikutnya]                                                  |
|                                                                                                    |
|  [Final Performance Scorecard] (Muncul setelah 5 skenario selesai)                                 |
|    - Skor Akhir: "4 dari 5 Keputusan Tepat"                                                        |
|    - Predikat Literasi: "Waspada Siber Terlatih"                                                   |
|    - Ringkasan Catatan Evaluasi dan Rekomendasi Modul Belajar                                      |
|    - Tombol Aksi: [Ulangi Kuis] dan [Coba Analisis Pesan Pribadi]                                  |
+----------------------------------------------------------------------------------------------------+
```

---

## 6. Motion & Micro-Interactions

- **Kecepatan Transisi:** Standar 150ms–200ms dengan kurva `cubic-bezier(0.16, 1, 0.3, 1)` (*ease-out*) untuk interaksi tombol dan seleksi kartu.
- **Hover States:** Kartu interaktif dan opsi jawaban kuis bergerak naik halus setinggi 2px (`-translate-y-0.5`) dengan penguatan border hairline (`border-brand-border`).
- **Focus Rings:** Seluruh elemen interaktif wajib memiliki outline fokus keyboard yang jelas: `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`.
- **Aksesibilitas Gerak (Reduced Motion):** Menghormati pengaturan sistem pengguna melalui media query `@media (prefers-reduced-motion: reduce)`. Jika aktif, seluruh transisi instan tanpa transformasi spasial.

---

## 7. Copywriting Voice & Indonesian Micro-Copy Guidelines

- **Nada Bicara (Tone of Voice):**
  - **Empowering, Not Terrifying:** Memberdayakan nalar kritis pengguna, bukan menakut-nakuti dengan istilah kejahatan yang hiperbolis.
  - **Objektif & Transparan:** Menggunakan istilah *"Indikator Teramati"* dan *"Estimasi Risiko"*, bukan klaim absolut seperti *"Pasti Penipuan"* atau *"100% Bersih"*.
- **Konvensi Tombol Aksi (CTA Verbs):**
  - Utama: "Analisis Pesan Sekarang", "Mulai Kuis Keputusan", "Lanjut ke Skenario Berikutnya".
  - Sekunder: "Muat Contoh Kasus", "Bersihkan Teks", "Ulangi Kuis", "Pelajari Kerangka Kerja".
- **Pesan Panduan Keamanan (Security Micro-copy):**
  - *"CyberGuard AI menganalisis struktur bahasa dan pola manipulasi umum. Jangan pernah mengirimkan kata sandi, kode OTP, atau informasi finansial rahasia ke sistem mana pun."*
  - *"Hasil ini merupakan estimasi edukatif mandiri. Selalu konfirmasikan kejanggalan transaksi ke kontak resmi lembaga terkait."*
