# Functional Requirements Specification (FR-Spec) — CyberGuard AI

**Project Name:** CyberGuard AI  
**Project Slug:** `cyberguard-ai`  
**Category:** Edukasi & Riset  
**Tagline:** Think Before You Click.  
**Language:** Bahasa Indonesia  
**Source Rules & Context:** [AGENTS.md](file:///home/rejuna/Documents/CyberGuard.AI/AGENTS.md) & [DESIGN.md](file:///home/rejuna/Documents/CyberGuard.AI/DESIGN.md)  
**Total FRs:** 3  
**Total Target UI Screens:** 3 (Strict 1:1 Deterministic Ratio Guaranteed)

---

## 1. Executive Summary & Scope Certification

CyberGuard AI adalah platform edukasi keamanan digital interaktif yang dirancang untuk pelajar, mahasiswa, dan masyarakat umum di Indonesia. Tujuannya adalah membangun kebiasaan kritis digital (*digital skepticism*) dan melatih pengguna mengenali taktik rekayasa sosial (*social engineering*) serta pesan penipuan (*phishing/smishing*) sebelum mengambil tindakan berisiko.

### Prinsip Utama Cakupan MVP:
1. **Strict 1:1 Screen Mapping:** 3 Functional Requirements dipetakan secara deterministik ke tepat 3 layar antarmuka di Stitch MCP.
2. **Rule-Based Heuristic Analyzer First:** Analisis pesan beroperasi secara penuh dan mandiri menggunakan mesin evaluasi bukti (*evidence-based heuristic engine*) tanpa ketergantungan wajib pada API eksternal. Integrasi Google Gemini API diposisikan sebagai nilai tambah (*optional bonus*) yang terisolasi di sisi server.
3. **No Uncalibrated Numerical Confidence:** Sistem **TIDAK MENGHASILKAN** angka persentase probabilitas buatan (seperti "94.2% Aman") yang tidak memiliki dasar kalibrasi matematis. Tingkat risiko disajikan secara kualitatif (**Risiko Rendah**, **Risiko Sedang**, **Risiko Tinggi**) berdasarkan akumulasi bukti dan indikator nyata yang teramati.
4. **Safety & Zero-Trust Input:** Teks yang dianalisis diperlakukan strictly sebagai data mentah (*untrusted data*) untuk mencegah serangan *prompt injection*. Sistem dilarang keras melakukan *auto-visit* atau *crawling* ke URL dalam teks pesan.
5. **No Cliché AI Slop:** Desain menggunakan *light mode* elegan, satu rumpun font Sans-Serif terpadu, kontras tinggi (WCAG AA), dan konten edukasi berbahasa Indonesia yang membumi tanpa istilah bombastis atau visual hacker bertudung klise.

---

## 2. Traceability Matrix

| FR ID | Feature Name | Target Screen ID | Route / View | Primary UI Component |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Edukasi Literasi Siber & Pusat Navigasi | `screen-01-dashboard` | `/` | `SplitHeroEducationModule` |
| **FR-02** | Penganalisis Pesan Forensik Berbasis Bukti | `screen-02-analyzer` | `/analyzer` | `ForensicMessageInspector` |
| **FR-03** | Kuis Keputusan Siber Interaktif Berbasis Skenario | `screen-03-quiz` | `/quiz` | `InteractiveScenarioQuizCard` |

---

## 3. Detailed Functional Requirements & Screen Specs

```
+---------------------------------------------------------------------------------------------------+
| FR-01: Edukasi Literasi Siber & Pusat Navigasi (screen-01-dashboard)                              |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [Zone A] Top Navigation Bar (Logo Brand + Tautan Navigasi Cepat + Indikator Status Edukasi)      |
|                                                                                                   |
|  [Zone B1] Asymmetric 2-Column Split Hero:                                                        |
|    - Kolom Kiri: H1 "Kenali Manipulasi Digital Sebelum Terlambat", Tagline, Dual CTA Button        |
|    - Kolom Kanan: Framed Architectural Visual Card (Ilustrasi Interaktif Digital Trust Shield)    |
|                                                                                                   |
|  [Zone B2] Kerangka Kerja 3-Langkah "Think Before You Click":                                     |
|    1. Telaah Teks (Identifikasi) -> 2. Uji Bukti (Verifikasi) -> 3. Ambil Sikap Aman (Mitigasi)   |
|                                                                                                   |
|  [Zone B3] Grid 4 Anatomi Rekayasa Sosial Paling Umum:                                            |
|    - Urgensi Palsu | Permintaan Kredensial/OTP | Tautan & Berkas Manipulatif | Hadiah Tak Masuk Akal |
|                                                                                                   |
|  [Zone C] Trust Note & Disclaimer Edukatif (Penjelasan Batasan & Panduan Saluran Resmi)           |
+---------------------------------------------------------------------------------------------------+
```

### FR-01: Edukasi Literasi Siber & Pusat Navigasi
- **Target Screen:** `screen-01-dashboard`
- **Route:** `/`
- **Aktor:** Pelajar, Mahasiswa, Tenaga Pendidik, Pengguna Internet Umum.
- **Tujuan (Objective):**  
  Memberikan orientasi awal mengenai pentingnya kewaspadaan digital, memperkenalkan kerangka pikir *Think Before You Click*, menyajikan ringkasan taktik rekayasa sosial paling umum di Indonesia, dan menyediakan navigasi langsung ke alat penganalisis dan kuis interaktif.
- **Alur Pengguna (User Workflow):**
  1. Pengguna membuka beranda aplikasi `/`.
  2. Pengguna membaca proposisi nilai pada hero section dan melihat visualisasi *Digital Trust Shield*.
  3. Pengguna dapat memilih salah satu aksi utama:
     - Mengklik tombol CTA primer **"Analisis Pesan Mencurigakan"** $\rightarrow$ diarahkan ke `/analyzer`.
     - Mengklik tombol CTA sekunder **"Uji Pengetahuan (Kuis)"** $\rightarrow$ diarahkan ke `/quiz`.
  4. Pengguna menggulir ke bawah untuk menelaah 3 langkah perlindungan mandiri dan 4 kartu taktik manipulasi sosial.
  5. Pengguna membaca catatan transparansi (*disclaimer*) mengenai sifat edukatif dari platform.
- **Spesifikasi Data (Input / Output):**
  - *Input:* Klik navigasi, interaksi *hover* pada kartu taktik.
  - *Output:* Tampilan statis terstruktur dengan micro-interactions, navigasi lintas halaman yang mulus.
- **Struktur Antarmuka (UI Blueprint):**
  - **Zone A (Navigation Header):** Logo CyberGuard AI, badge kategori "Edukasi & Riset", link cepat ke Beranda, Analisis, dan Kuis.
  - **Zone B (Hero & Education Pillars):**
    - *Asymmetric Split Hero (60/40):* Kolom kiri memuat *tagline*, judul utama, paragraf pengantar singkat, dan tombol CTA ganda. Kolom kanan memuat kartu ilustrasi *Digital Trust Shield* dengan aksen hairline border.
    - *3-Step Framework Container:* 3 kartu langkah terurut horizontal (1. Salin & Tempel $\rightarrow$ 2. Deteksi Indikator $\rightarrow$ 3. Langkah Mitigasi).
    - *Threat Anatomy Grid:* 4 kartu interaktif yang menjelaskan pola manipulasi psikologis di Indonesia (Urgensi Waktu, Permintaan OTP/PIN, Tautan Palsu, Iming-iming Hadiah).
  - **Zone C (Trust & Non-Guaranteed Disclaimer):** Kotak pesan berlatar *surface-muted* dengan ikon info resmi yang menegaskan bahwa hasil evaluasi adalah panduan edukatif, bukan jaminan verifikasi mutlak.
- **Validasi & Edge Cases:**
  - Tampilan responsif sempurna pada *viewport* mobile 360px hingga desktop 1440px tanpa horizontal scrollbar.
  - Aksesibilitas navigasi via keyboard (*focus-visible ring*).
- **Stitch MCP Generation Brief:**
  > "A modern, highly trustworthy digital safety learning dashboard in light mode. Centered around a 60/40 asymmetric split hero with a prominent typography headline 'Kenali Manipulasi Digital Sebelum Terlambat', deep navy text (#152238), restrained teal CTA button (#176B68), clean white surfaces, hairline borders (#DCE4ED), an interactive 3-step action guide, and a 4-card grid detailing social engineering tactics. Clean, academic, and practical without generic dark hacker tropes."

---

```
+---------------------------------------------------------------------------------------------------+
| FR-02: Penganalisis Pesan Forensik Berbasis Bukti (screen-02-analyzer)                            |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [Zone A] Header Forensik & Privacy Safety Notice:                                                |
|    - Panduan Penggunaan & Peringatan: "Dilarang Memasukkan Password, PIN, atau Data Pribadi"      |
|                                                                                                   |
|  [Zone B] Interactive Inspector Workspace:                                                        |
|    - Quick Sample Selector Pills: [Kurir Paket APK] [Peringatan Bank] [Undian Telegram]           |
|    - Multiline Textarea dengan Live Character Counter (Maksimal 2000 Karakter)                    |
|    - Tombol Aksi: [Bersihkan Input] dan [Analisis Pesan Sekarang]                                 |
|                                                                                                   |
|  [Zone C] Dynamic 4-State Analysis Result Dashboard:                                              |
|    * State 1 (Empty): Ilustrasi Panduan Awal Siap Menganalisis                                    |
|    * State 2 (Loading): Skeleton Shimmer Cards & Radar Pulse Scan                                 |
|    * State 3 (Error): Notifikasi Kegagalan + Tombol Coba Lagi                                     |
|    * State 4 (Success):                                                                           |
|        - Qualitative Risk Badge: [RISIKO TINGGI] / [RISIKO SEDANG] / [RISIKO RENDAH]              |
|        - Observable Evidence Tags: Daftar Indikator Nyata yang Terdeteksi                         |
|        - Plain-Language Explanation: Uraian Mengapa Pesan Berbahaya Tanpa Jargon Rumit            |
|        - Actionable Safe Steps: Rekomendasi Mitigasi Konkret & Saluran Resmi Aduan Siber          |
|        - Detection Boundary Disclaimer: Batasan Analisis Heuristik/AI                             |
+---------------------------------------------------------------------------------------------------+
```

### FR-02: Penganalisis Pesan Forensik Berbasis Bukti
- **Target Screen:** `screen-02-analyzer`
- **Route:** `/analyzer`
- **Aktor:** Pengguna umum, penerima pesan janggal.
- **Tujuan (Objective):**  
  Menyediakan meja kerja evaluasi pesan mencurigakan berbasis aturan heuristik transparan (dengan opsi integrasi Google Gemini API terisolasi), membedah indikator manipulasi psikologis, memberikan estimasi tingkat risiko kualitatif yang dapat dipertanggungjawabkan tanpa skor numerik artifisial, dan memandu pengguna melakukan mitigasi yang aman.
- **Alur Pengguna (User Workflow):**
  1. Pengguna membuka `/analyzer`.
  2. Pengguna membaca *Privacy Safety Notice* yang mengingatkan untuk tidak menempelkan password/PIN riil.
  3. Pengguna menempelkan teks pesan ke dalam *textarea* ATAU mengklik salah satu *Sample Pill* (contoh fiktif aman yang disediakan).
  4. Pengguna menekan tombol **"Analisis Pesan"**.
  5. Sistem menampilkan indikator loading (*skeleton shimmer*).
  6. Mesin evaluasi heuristik lokal memproses teks dan memeriksa keberadaan 5 pilar indikator:
     - Indikator 1: Desakan Waktu / Urgensi Buatan (*Artificial Urgency*)
     - Indikator 2: Permintaan Informasi Sensitif (*Credential Solicitation: OTP, PIN, Sandi*)
     - Indikator 3: Pola Tautan / Domain Janggal (*Deceptive URLs & Suspicious Extensions seperti .apk*)
     - Indikator 4: Janji Hadiah Finansial / Kompensasi Tak Wajar (*Unrealistic Rewards*)
     - Indikator 5: Peniruan Identitas Entitas Resmi (*Authority Impersonation: Bank, Ekspedisi, Instansi*)
  7. Sistem menyajikan hasil analisis terstruktur:
     - **Tingkat Risiko Kualitatif:** Ditentukan dari kombinasi indikator nyata (misal: 3+ indikator kritis = Risiko Tinggi; 1-2 indikator = Risiko Sedang; 0 indikator terdeteksi = Risiko Rendah).
     - **Tag Indikator Teramati:** Chip visual yang menjelaskan sinyal bahaya yang ditemukan.
     - **Uraian Analisis Bahasa Awam:** Narasi singkat yang menjelaskan maksud tersembunyi pesan.
     - **Langkah Aman:** Daftar cek rekomendasi (misal: "Jangan klik tautan", "Hubungi call center resmi bank").
     - **Batasan Analisis:** Catatan edukatif mengenai keterbatasan deteksi otomatis.
- **Spesifikasi Data (Input / Output):**
  - *Input:*
    ```typescript
    interface AnalyzeMessageRequest {
      messageText: string; // 10 s/d 2000 karakter
    }
    ```
  - *Output:*
    ```typescript
    type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

    interface ObservableIndicator {
      id: string;
      category: 'URGENCY' | 'CREDENTIAL' | 'MALICIOUS_LINK' | 'FINANCIAL_LURE' | 'IMPERSONATION';
      label: string;
      detectedSnippet?: string;
      severity: 'WARNING' | 'CRITICAL';
      educationalAdvice: string;
    }

    interface AnalysisReport {
      riskLevel: RiskLevel;
      summaryHeading: string;
      explanation: string;
      detectedIndicators: ObservableIndicator[];
      safeNextSteps: string[];
      detectionBoundaryNote: string;
      analyzedAt: string;
      engineSource: 'LOCAL_HEURISTIC' | 'GEMINI_ENHANCED';
    }
    ```
- **Struktur Antarmuka (UI Blueprint):**
  - **Zone A (Header & Privacy Banner):** Judul halaman, deskripsi fungsi, kotak peringatan privasi (*amber alert*) dengan ikon gembok perisai.
  - **Zone B (Inspector Form):** Deretan tombol pill contoh kasus fiktif (*Quick Sample Loader*), *textarea* berbingkai *hairline* dengan *character counter*, tombol "Bersihkan", dan tombol "Analisis Pesan" dengan transisi hover halus.
  - **Zone C (4-State Output Area):**
    - *Empty State:* Ilustrasi diagram inspeksi santai dengan petunjuk langkah awal.
    - *Loading State:* Tampilan skeleton shimmer yang meniru bentuk kartu hasil.
    - *Error State:* Banner merah lembut dengan penjelasan kendala dan tombol "Ulangi Analisis".
    - *Success State:* Kartu komprehensif berlatar putih dengan lencana tingkat risiko (Merah untuk Tinggi, Kuning-Amber untuk Sedang, Hijau untuk Rendah), deretan *chips* indikator bukti, penjelasan naratif, daftar periksa langkah mitigasi, dan kotak batasan deteksi.
- **Validasi, Keamanan, & Edge Cases:**
  - Teks < 10 karakter menampilkan pesan: "Teks terlalu pendek untuk dianalisis. Masukkan isi pesan lengkap."
  - Teks > 2000 karakter dicegah melalui atribut `maxLength` dan validasi handler.
  - **Netralisasi Prompt Injection:** Seluruh teks masukan pengguna diisolasi sebagai data mentah dalam evaluasi string murni dan tidak pernah dieksekusi sebagai perintah sistem.
  - **Larangan Auto-Visit:** Sistem tidak pernah memanggil `fetch()` atau membuka tautan URL yang tertera di pesan.
- **Stitch MCP Generation Brief:**
  > "A clinical and focused cybersecurity forensic analysis tool in light mode. Features a clean multiline textarea with a character counter, pre-filled scenario buttons for quick testing, a yellow-tinted privacy caution box, and a rich results card showing a bold qualitative risk badge (High/Medium/Low), tagged evidence chips, plain-language reasoning, and a mitigation checklist. Clear empty and loading states included."

---

```
+---------------------------------------------------------------------------------------------------+
| FR-03: Kuis Keputusan Siber Interaktif Berbasis Skenario (screen-03-quiz)                        |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [Zone A] Quiz Status & Progress Header:                                                          |
|    - Step Indicator: "Skenario 2 dari 5"                                                          |
|    - Accessible Linear Progress Bar (Aksen Teal Brand)                                            |
|                                                                                                   |
|  [Zone B] Interactive Scenario Viewport:                                                          |
|    - Context Tag: [Simulasi WhatsApp] / [Simulasi Email Kantor] / [Simulasi SMS Perbankan]        |
|    - Fictional Message Bubble Card (Pesan Realistis Bertema Kurir/Bank/Hadiah Palsu)              |
|    - Pertanyaan Inti: "Tindakan apa yang paling tepat dan aman untuk Anda lakukan?"               |
|    - 3 Opsi Pilihan Interaktif dengan Radio-Style Selection Cards                                 |
|                                                                                                   |
|  [Zone C] Dynamic Feedback Drawer & End-of-Quiz Scorecard:                                        |
|    * Saat Memilih Opsi:                                                                           |
|        - Alert Box Langsung (Hijau untuk Jawaban Aman, Merah untuk Jawaban Berisiko)              |
|        - Ulasan Edukatif: "Mengapa tindakan ini berisiko/aman?"                                   |
|        - Tombol Aksi: [Lanjut ke Skenario Berikutnya]                                             |
|    * Saat Kuis Selesai (5 Skenario Terjawab):                                                     |
|        - Kartu Evaluasi Kemampuan & Skor Total (misal: "4/5 Keputusan Tepat")                     |
|        - Label Predikat Literasi: [Sangat Waspada] / [Cukup Waspada] / [Perlu Peningkatan]        |
|        - Ringkasan Evaluasi Kelemahan & Rekomendasi Belajar Mandiri                               |
|        - Tombol Aksi: [Ulangi Kuis] dan [Analisis Pesan Sendiri]                                  |
+---------------------------------------------------------------------------------------------------+
```

### FR-03: Kuis Keputusan Siber Interaktif Berbasis Skenario
- **Target Screen:** `screen-03-quiz`
- **Route:** `/quiz`
- **Aktor:** Siswa, Mahasiswa, Pengguna Umum.
- **Tujuan (Objective):**  
  Melatih insting dan nalar kritis pengguna melalui 5 skenario studi kasus rekayasa sosial fiktif yang umum terjadi di Indonesia, memberikan umpan balik edukatif seketika (*instant educational feedback*), dan menyajikan laporan performa literasi siber di akhir kuis.
- **Alur Pengguna (User Workflow):**
  1. Pengguna membuka `/quiz`.
  2. Sistem menampilkan skenario ke-1 dari total 5 skenario terkurasi.
  3. Pengguna meninjau simulasi pesan (tampilan bergaya SMS/WhatsApp fiktif).
  4. Pengguna memilih salah satu dari 3 opsi tindakan yang tersedia.
  5. Begitu opsi diklik, antarmuka langsung menampilkan kotak umpan balik instan:
     - Jika pilihan aman: Berlatar hijau lembut (*risk-low-soft*) dengan penjelasan mengapa pilihan tersebut merupakan mitigasi yang tepat.
     - Jika pilihan berisiko: Berlatar merah lembut (*risk-high-soft*) dengan uraian bahaya laten yang akan terjadi jika tindakan itu diambil.
  6. Pilihan terkunci untuk mencegah perubahan jawaban ganda.
  7. Pengguna mengklik tombol **"Skenario Berikutnya"**.
  8. Setelah skenario ke-5 selesai, antarmuka beralih ke tampilan *Scorecard*:
     - Skor akhir ditampilkan (misal: 4 dari 5 keputusan aman).
     - Predikat literasi siber diberikan (*Pemerhati Keamanan Siber*, *Waspada*, atau *Perlu Waspada*).
     - Rangkuman catatan evaluasi untuk setiap skenario yang keliru.
     - Tombol "Ulangi Kuis" untuk mereset *state* dan tombol "Analisis Pesan" untuk praktik langsung.
- **Daftar 5 Skenario Kasus Fiktif Terkurasi (Konteks Indonesia):**
  1. **Skenario 1 (Ekspedisi Paket APK):** Pesan WhatsApp dari nomor tak dikenal mengaku kurir paket J&T/JNE mengirim file `LIHAT_FOTO_PAKET.apk` karena alamat tidak lengkap.
  2. **Skenario 2 (Urgensi Perbankan):** SMS mengaku dari bank menyatakan rekening Anda sedang ditangguhkan dan meminta login melalui tautan `bca-klik-verifikasi.xyz` dalam 15 menit.
  3. **Skenario 3 (Tagihan Berlangganan Palsu):** Email berbahasa Indonesia berformat resmi menyatakan tagihan langganan cloud/streaming sebesar Rp 850.000 berhasil didebit, dengan tombol "Batalkan Transaksi Jika Bukan Anda".
  4. **Skenario 4 (Bansos / Kuota Gratis):** Pesan berantai di grup keluarga menjanjikan saldo subsidi pemerintah Rp 500.000 dengan syarat membagikan tautan ke 5 grup WhatsApp lain.
  5. **Skenario 5 (Peniruan Rekan Kerja / Pimpinan):** Pesan mendesak dari akun Telegram dengan foto profil rekan kerja meminta transfer darurat karena aplikasi m-banking miliknya sedang terkunci.
- **Spesifikasi Data (Input / Output):**
  - *State Data:*
    ```typescript
    interface QuizOption {
      id: string;
      text: string;
      isSafe: boolean;
      feedbackExplanation: string;
    }

    interface QuizQuestion {
      id: number;
      scenarioContext: string;
      senderTitle: string;
      messageContent: string;
      questionPrompt: string;
      options: QuizOption[];
    }

    interface QuizState {
      currentQuestionIndex: number;
      selectedOptionId: string | null;
      isAnswerSubmitted: boolean;
      userAnswers: { questionId: number; selectedOptionId: string; isCorrect: boolean }[];
      isQuizCompleted: boolean;
    }
    ```
- **Struktur Antarmuka (UI Blueprint):**
  - **Zone A (Progress Section):** Header bertuliskan "Kuis Keputusan Siber", indikator pertanyaan aktif, dan *progress bar* linear.
  - **Zone B (Scenario Viewport):** Kartu berlatar *surface* dengan border *hairline*, gelembung pesan fiktif bergaya aplikasi pesan nyata, pertanyaan utama, dan 3 kartu opsi dengan *state* seleksi yang tegas.
  - **Zone C (Feedback Drawer & Scorecard):**
    - *Feedback Mode:* Kotak penjelasan interaktif dengan ikon verifikasi dan tombol "Lanjut".
    - *Scorecard Mode:* Tampilan selebrasi literasi dengan grafik lingkaran skor, lencana apresiasi, evaluasi ringkas, dan tombol aksi pengulangan.
- **Validasi & Edge Cases:**
  - Navigasi keyboard penuh menggunakan tombol panah dan spasi/enter.
  - State kuis disimpan di memori komponen React sehingga dapat diulang sewaktu-waktu tanpa perlu refresh peramban.
- **Stitch MCP Generation Brief:**
  > "An interactive, educational single-question scenario quiz screen in light mode. Displays a clean linear progress indicator, a prominent framed simulation card depicting a realistic message bubble, three distinct card-style decision options with radio selectors, an immediate color-coded educational feedback drawer, and an accessible end-of-quiz score review screen."

---

## 4. Architecture & Security Safeguards

1. **Standalone Heuristic Engine:**
   - Logika analisis pesan dieksekusi di lapisan domain murni (`/src/services/analyzer/heuristicEngine.ts`).
   - Tidak memerlukan koneksi internet atau API eksternal untuk berfungsi secara penuh dalam demonstrasi.
2. **Server-Side Gemini API Isolation (Bonus Layer):**
   - Jika pengguna menyuntikkan `GEMINI_API_KEY`, komunikasi diarahkan melalui endpoint lokal pengaman (`/api/analyze`) tanpa mengekspos token rahasia ke browser bundle.
   - Jika endpoint tidak dapat dihubungi atau kunci kosong, sistem secara transparan beralih (*graceful fallback*) ke *heuristic engine* lokal dengan pesan status yang jujur.
3. **No Uncalibrated Statistics:**
   - Dilarang keras menampilkan statistik palsu seperti "Akurasi AI: 99.8%" atau "Tingkat Kepastian: 87%". Seluruh penimbangan didasarkan pada keberadaan indikator nyata terverifikasi.
4. **URL & Payload Quarantine:**
   - Teks pesan diperiksa secara leksikal tanpa pernah mengirim *request* jaringan ke URL mana pun yang ada di dalam teks pesan pengguna.
