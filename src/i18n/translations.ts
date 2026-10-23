export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';

export interface ThreatTacticI18n {
  title: string;
  description: string;
  badgeText: string;
}

export interface TeaserPresetI18n {
  id: string;
  name: string;
  sender: string;
  timestamp: string;
  text: string;
  highlightPhrase: string;
  threatVectors: {
    title: string;
    description: string;
    severity: 'WARNING' | 'CRITICAL';
  }[];
}

export interface SampleMessageI18n {
  id: string;
  title: string;
  scenarioType: string;
  preview: string;
  fullText: string;
}

export const TRANSLATIONS = {
  id: {
    // Header & Navigation
    navHome: 'Beranda',
    navAnalyzer: 'Analisis Pesan',
    navQuiz: 'Kuis Keputusan',
    categoryBadge: 'Edukasi & Riset',
    tagline: 'Think Before You Click.',
    settingsTitle: 'Pengaturan',
    languageLabel: 'Bahasa',
    themeLabel: 'Tampilan',
    themeLight: 'Terang',
    themeDark: 'Gelap',
    close: 'Tutup',

    // Dashboard Hero
    heroBadge: 'Platform Literasi Rekayasa Sosial',
    heroHeading: 'Kenali Taktik Manipulasi Digital Sebelum Terlambat.',
    heroDesc: 'Edukasi interaktif untuk membantu pelajar dan masyarakat umum mendeteksi pesan penipuan, tautan phishing, dan berkas berbahaya secara mandiri dan aman.',
    heroCtaAnalyze: 'Mulai Analisis Pesan',
    heroCtaQuiz: 'Uji di Kuis Interaktif',
    heroPill1: 'Edukatif & Terbuka',
    heroPill2: 'Tanpa Skor Numerik Palsu',
    heroPill3: 'Privasi Terlindungi',
    heroOverlayTitle: 'Kerangka Kerja Verifikasi',
    heroOverlaySubtitle: 'Praktikkan kebiasaan kritis digital setiap saat.',

    // 3-Step Framework
    frameworkHeading: 'Kerangka Kerja 3-Langkah',
    frameworkDesc: 'Tiga kebiasaan sederhana untuk melindungi diri Anda dari jeratan rekayasa sosial di internet.',
    step1Num: '01',
    step1Title: 'Telaah Teks',
    step1Subtitle: 'Identifikasi Pola Desakan',
    step1Desc: 'Waspadai pesan yang menuntut respons tergesa-gesa dalam hitungan menit atau mengancam pemblokiran akun mendadak.',
    step2Num: '02',
    step2Title: 'Uji Bukti',
    step2Subtitle: 'Verifikasi Tautan & Sumber',
    step2Desc: 'Periksa apakah domain resmi atau mencurigakan (.xyz, .club) dan waspadai dokumen berekstensi aplikasi (.apk).',
    step3Num: '03',
    step3Title: 'Ambil Sikap Aman',
    step3Subtitle: 'Putus Rantai Penipuan',
    step3Desc: 'Jangan klik tautan, jangan bagikan OTP, dan konfirmasi ke kanal resmi independen sebelum mengambil keputusan finansial.',

    // Threat Tactics Section
    tacticsHeading: '4 Pola Rekayasa Sosial Populer',
    tacticsDesc: 'Pelajari anatomi trik psikologis yang paling sering digunakan pelaku kejahatan siber.',
    exploreAnalyzerPrompt: 'Ingin menguji pesan mencurigakan yang Anda terima?',
    openAnalyzerCta: 'Buka Penganalisis Pesan Mandiri',

    // Quick Scanner Teaser
    teaserBadge: 'HEURISTIK SCANNER MANDIRI',
    teaserHeading: 'Uji Coba Analisis Teks Pesan Mencurigakan',
    teaserDesc: 'Tempel pesan SMS atau WhatsApp yang Anda terima untuk mendeteksi tanda bahaya manipulasi digital secara instan di peramban Anda.',
    clientSideNotice: 'Pemrosesan Sisi-Klien (Data Tidak Disimpan)',
    presetLabel: 'Pilih Skenario Kasus Uji Siap Pakai:',
    inputLabel: 'Isi Teks Pesan untuk Diuji:',
    backToSample: 'Kembali ke Contoh',
    inputPlaceholder: 'Salin dan tempel kalimat pesan mencurigakan di sini untuk diuji...',
    detectNotice: 'Mendeteksi: URL Phishing, File .APK, & Tekanan Panik',
    openFullAnalyzer: 'Buka di Penganalisis Lengkap',
    simulationTitle: 'Simulasi Inspeksi WhatsApp',
    threatVectorHeading: 'Temuan Vektor Serangan:',
    verdictHeading: 'Penilaian Heuristik:',
    actionDontClick: 'Tindakan: JANGAN KLIK / PASANG',
    actionVerify: 'Tindakan: Verifikasi Mandiri',
    courierTip: '💡 Pihak kurir dan perbankan resmi tidak pernah meminta pemasangan berkas APK atau pengisian formulir via WhatsApp.',
    noThreatsDetected: 'Tidak terdeteksi kata kunci ancaman berbahaya umum.',

    // Analyzer Screen
    analyzerBadge: 'Inspektur Forensik Teks',
    analyzerHeading: 'Penganalisis Pesan & Tautan Mencurigakan',
    analyzerDesc: 'Periksa SMS, pesan chat WhatsApp, atau email untuk mengidentifikasi indikator rekayasa sosial secara aman dan lokal.',
    casesAvailable: 'Kasus Tersedia',
    inputBoxTitle: 'Tempel Teks Pesan Yang Ingin Diperiksa',
    privacyPill: 'Analisis berjalan lokal di peramban (privasi terjaga)',
    clearBtn: 'Bersihkan Teks',
    analyzeBtn: 'Analisis Pesan Sekarang',
    analyzingBtn: 'Memindai Teks...',
    charCount: 'karakter',
    minCharError: 'Teks terlalu pendek. Masukkan minimal 10 karakter pesan.',

    // Evidence Report
    analysisVerdictTitle: 'Hasil Evaluasi Heuristik',
    riskHigh: 'TERDETEKSI BERISIKO TINGGI',
    riskMedium: 'TERDETEKSI BERISIKO SEDANG',
    riskLow: 'TERDETEKSI BERISIKO RENDAH',
    evidenceStatusTitle: 'Status Penilaian Bukti',
    forensicMethodology: 'Metodologi Forensik',
    heuristicDetectionLabel: 'Deteksi Rekayasa Sosial Heuristik',
    evidenceSummaryTitle: 'Ringkasan Bukti',
    threatClassificationTitle: 'Klasifikasi Ancaman',
    criticalLabel: 'Kritis',
    warningLabel: 'Waspada',
    cleanLabel: 'Bersih',
    detectedLabel: 'Terdeteksi',
    observedIndicatorsTitle: 'Indikator Teramati',
    noIndicators: 'Tidak ditemukan indikator ancaman umum dalam pesan ini.',
    triggerWordInspection: 'Inspeksi Kata Pemicu dalam Pesan',
    criticalTrigger: 'Pemicu Kritis',
    warningTrigger: 'Pemicu Waspada',
    hoverWordHint: '💡 Arahkan kursor pada kata bergaris gelombang untuk melihat jenis manipulasi yang terdeteksi.',
    socialIndicatorsTitle: 'Temuan Indikator Rekayasa Sosial',
    cleanMessageNote: 'Teks tidak memuat pola bahaya umum seperti desakan waktu semu, lampiran APK, atau tautan domain mencurigakan.',
    triggerWordLabel: 'Kata Pemicu:',
    tacticsSectionTitle: 'Taktik Rekayasa Sosial Terdeteksi',
    tacticsSectionDesc: 'Vektor manipulasi psikologis yang digunakan pelaku untuk memengaruhi keputusan korban.',
    noTacticsDetected: 'Tidak terdeteksi taktik manipulasi psikologis umum (urgensi palsu, intimidasi, umpan hadiah, peniruan otoritas, atau kerahasiaan paksa).',
    tacticsDetectedCount: 'Taktik Teridentifikasi',
    tacticTriggerSnippet: 'Pemicu:',
    whyDangerousTitle: 'Mengapa Pola Ini Berbahaya?',
    mitigationProtocolTitle: 'Protokol Tindakan Mitigasi Segera',
    securedOf: 'diamankan',
    safeNextStepsTitle: 'Langkah Pencegahan Aman Yang Disarankan',
    stepMarkDone: 'Tandai Selesai',
    stepDone: 'Selesai',

    // AI Explanation
    aiTitle: 'AI Explanation',
    aiOptional: 'Powered by Gemini',
    aiConsentPrompt: 'Minta Penjelasan dari Gemini AI?',
    aiConsentDesc: 'AI akan menerima ringkasan temuan heuristik (label indikator, tingkat risiko, dan frasa pemicu yang sudah diekstrak) — bukan teks pesan Anda yang asli. Data ini dikirim ke Google untuk diproses.',
    aiConsentWarning: '⚠️ Jangan gunakan fitur ini jika pesan mengandung informasi pribadi sensitif. Penjelasan AI bersifat edukatif dan tidak menggantikan hasil analisis lokal di atas.',
    aiExplainBtn: 'Jelaskan dengan Gemini AI',
    privacyPolicy: 'Kebijakan Privasi Google',
    aiLoading: 'Memproses temuan dengan Gemini AI...',
    aiLoadingSub: 'Mengirim ringkasan indikator (bukan teks asli) ke server. Tunggu beberapa saat.',
    cancelBtn: 'Batalkan',
    aiUnavailable: 'AI Explanation Tidak Tersedia',
    aiUnavailableDesc: 'Fitur ini memerlukan GEMINI_API_KEY yang dikonfigurasi di sisi server. Hasil analisis heuristik lokal di atas tetap valid dan lengkap.',
    aiErrorTitle: 'Gagal Menghubungi Gemini AI',
    retryBtn: 'Coba Lagi',
    aiResultHeader: 'Penjelasan AI (AI Explanation)',
    aiPrevResultBadge: 'Hasil Analisis Sebelumnya',
    aiDisclaimer: 'Penjelasan berikut dihasilkan AI berdasarkan ringkasan indikator, bukan dari teks asli Anda. Selalu prioritaskan hasil analisis heuristik di atas.',
    aiSummaryLabel: 'Ringkasan AI',
    aiIndicatorsLabel: 'Tanda Bahaya Versi AI',
    aiExplanationLabel: 'Penjelasan Mendalam',
    aiRecommendationsLabel: 'Rekomendasi Tambahan dari AI',
    reAnalyzeAi: 'Minta Analisis Ulang AI',
    aiHide: 'Sembunyikan penjelasan AI',
    aiShow: 'Tampilkan penjelasan AI',
    aiClose: 'Tutup',
    aiBack: '← Kembali',

    // Local Explanation Fallback & Rate limit cooldown
    localExplanationBadge: 'Penjelasan Lokal (Tanpa AI)',
    localExplanationTitle: 'Penjelasan Forensik Heuristik Lokal',
    localExplanationSubtitle: 'Dihasilkan secara instan oleh mesin heuristik lokal tanpa menggunakan kuota Gemini AI.',
    localSummaryLabel: 'Ringkasan Forensik Lokal',
    localTacticsLabel: 'Taktik Rekayasa Sosial Terdeteksi',
    localSafetyLabel: 'Rekomendasi Tindakan Keamanan',
    rateLimitCooldownText: 'Batas kuota/permintaan tercapai (HTTP 429). Mohon jeda sejenak sebelum mencoba kembali. Gunakan Penjelasan Lokal di bawah ini.',
    retryInCooldown: 'Coba Lagi ({seconds}d)',

    // Quiz Screen
    quizBadge: 'Laboratorium Keputusan Siber',
    quizHeading: 'Kuis Keputusan Siber',
    quizDesc: 'Hadapi 5 skenario studi kasus nyata di Indonesia. Uji apakah naluri Anda dapat membedakan niat jahat di balik pesan.',
    interactiveQuizBadge: 'Interactive Quiz',
    quizBadgeSub: 'Latihan Pengambilan Keputusan Aman',
    scenarioLabel: 'Skenario',
    scenarioOf: 'dari',
    scenarioTrackerTitle: 'Pelacak Skenario',
    scenarioProgressTitle: 'Progres Skenario',
    activeLabel: 'Aktif',
    scoringTitle: 'Aturan Penilaian',
    scoringRule1: 'Pilih tindakan aman → 1 poin ketahanan siber.',
    scoringRule2: 'Pilih tindakan berisiko → 0 poin, baca penjelasan edukatifnya.',
    scoringRule3: '5/5 → "Sangat Waspada". ≥3/5 → "Cukup Waspada".',
    thinkBeforeReminderTitle: 'Think Before You Click.',
    thinkBeforeReminderDesc: 'Verifikasi selalu melalui kanal resmi yang independen dari pesan yang Anda terima.',
    submitAnswer: 'Kunci Jawaban',
    optionLabel: 'Pilihan',
    selectedBadge: 'Pilihan Terpilih',
    safestRecommendation: 'Rekomendasi Aman',
    unverifiedSenderPill: 'Bukan Kontak Terdaftar',
    threatLevelCritical: 'Tingkat Ancaman: Kritis',
    chooseOnePrompt: 'Pilih satu keputusan paling tepat sebelum mengonfirmasi jawaban:',
    nextScenario: 'Skenario Berikutnya',
    finishQuiz: 'Lihat Skor Akhir',
    feedbackCorrect: 'PILIHAN TEPAT & AMAN!',
    feedbackIncorrect: 'TINDAKAN BERISIKO TINGGI!',
    decisionSafe: 'Keputusan Aman (Tepat)',
    decisionRisky: 'Keputusan Berisiko Tinggi',
    learningPoint: 'Poin Pembelajaran Kunci:',
    explainTrapTitle: 'Bedah Taktik Jebakan (Explain the Trap)',
    explainTrapSubtitle: 'Bedah taktik rekayasa sosial dan manipulasi psikologis di balik skenario ini.',
    tacticNameLabel: 'Taktik Rekayasa Sosial:',
    howItManipulatesLabel: 'Cara Memanipulasi Korban:',
    practicalLessonLabel: 'Pelajaran Keamanan Praktis:',
    quizCompleteHeading: 'Evaluasi Kuis Selesai!',
    retakeQuiz: 'Ulangi Kuis dari Awal',
    retakeQuizBtn: 'Ulangi Kuis',
    goToAnalyzer: 'Coba Penganalisis Pesan',
    tryAnalyzePersonal: 'Coba Analisis Pesan Pribadi',
    goToHome: 'Kembali ke Beranda',
    scenarioEvaluation: 'Evaluasi Skenario:',
    safeLabel: 'Aman',
    riskyLabel: 'Berisiko',
    scoreHeadingTitle: 'Skor:',
    scoreHeadingSub: 'Keputusan Tepat',
    verdictHighlyVigilant: 'Sangat Waspada (Ketahanan Siber Maksimal)',
    verdictAdequatelyVigilant: 'Cukup Waspada (Nalar Kritis Baik)',
    verdictNeedsVigilance: 'Perlu Waspada (Tingkatkan Kewaspadaan)',
    quizResultPerfect: 'Luar Biasa! Naluri pertahanan digital Anda sangat tajam. Anda siap menjadi agen literasi digital bagi keluarga dan teman.',
    quizResultGood: 'Bagus! Anda memahami sebagian besar prinsip verifikasi mandiri, namun tetap waspadai taktik desakan panik.',
    quizResultNeedsPractice: 'Perlu Latihan! Beberapa skenario masih berhasil memancing tindakan tergesa-gesa. Ingat selalu: Think Before You Click.',

    // Footer
    footerDesc: 'Inisiatif literasi keamanan siber untuk memberdayakan pelajar dan masyarakat Indonesia agar senantiasa kritis sebelum mengklik tautan atau membagikan data.',
    footerNavTitle: 'Navigasi Fitur',
    footerNavHome: 'Beranda Literasi & 3-Langkah Aman',
    footerNavAnalyzer: 'Penganalisis Pesan Forensik (Inspeksi Heuristik)',
    footerNavQuiz: 'Kuis Keputusan Siber (5 Skenario Indonesia)',
    footerHotlineTitle: 'Saluran Aduan Siber Resmi',
    footerEmergency: 'Layanan perbankan darurat: Hubungi kontak resmi di balik kartu ATM Anda.',
    footerDisclaimer: 'Catatan: Hasil analisis adalah instrumen edukasi estimasi risiko, bukan jaminan verifikasi mutlak.',
    footerCopyright: 'CyberGuard AI. Hackathon Edukasi & Riset.',
  },
  en: {
    // Header & Navigation
    navHome: 'Home',
    navAnalyzer: 'Message Analyzer',
    navQuiz: 'Decision Quiz',
    categoryBadge: 'Education & Research',
    tagline: 'Think Before You Click.',
    settingsTitle: 'Settings',
    languageLabel: 'Language',
    themeLabel: 'Appearance',
    themeLight: 'Light',
    themeDark: 'Dark',
    close: 'Close',

    // Dashboard Hero
    heroBadge: 'Social Engineering Literacy Platform',
    heroHeading: 'Recognize Digital Manipulation Tactics Before It Is Too Late.',
    heroDesc: 'Interactive education empowering students and everyday users to detect scam messages, phishing links, and malicious files independently and safely.',
    heroCtaAnalyze: 'Start Message Analysis',
    heroCtaQuiz: 'Take Interactive Quiz',
    heroPill1: 'Educational & Transparent',
    heroPill2: 'No Deceptive Numeric Scores',
    heroPill3: 'Privacy Preserved',
    heroOverlayTitle: 'Verification Framework',
    heroOverlaySubtitle: 'Practice digital vigilance at all times.',

    // 3-Step Framework
    frameworkHeading: '3-Step Verification Framework',
    frameworkDesc: 'Three simple daily habits to protect yourself from social engineering traps on the internet.',
    step1Num: '01',
    step1Title: 'Inspect Text',
    step1Subtitle: 'Identify Urgency Patterns',
    step1Desc: 'Beware of messages demanding rushed responses within minutes or threatening sudden account suspension.',
    step2Num: '02',
    step2Title: 'Test Evidence',
    step2Subtitle: 'Verify Links & Sources',
    step2Desc: 'Check whether web domains are legitimate or suspicious (.xyz, .club) and watch out for app files (.apk).',
    step3Num: '03',
    step3Title: 'Take Safe Action',
    step3Subtitle: 'Break the Scam Chain',
    step3Desc: 'Never click untrusted links, never share OTPs, and verify via independent official channels before making financial decisions.',

    // Threat Tactics Section
    tacticsHeading: '4 Common Social Engineering Patterns',
    tacticsDesc: 'Learn the anatomy of psychological tricks most commonly deployed by cybercriminals.',
    exploreAnalyzerPrompt: 'Received a suspicious message you want to test?',
    openAnalyzerCta: 'Open Standalone Message Analyzer',

    // Quick Scanner Teaser
    teaserBadge: 'STANDALONE HEURISTIC SCANNER',
    teaserHeading: 'Try Analyzing a Suspicious Message',
    teaserDesc: 'Paste an SMS or WhatsApp message you received to instantly identify signs of digital manipulation directly in your browser.',
    clientSideNotice: 'Client-Side Processing (Zero Data Stored)',
    presetLabel: 'Choose a Ready-to-Test Scenario:',
    inputLabel: 'Message Content to Test:',
    backToSample: 'Back to Sample',
    inputPlaceholder: 'Copy and paste a suspicious message here to inspect...',
    detectNotice: 'Detects: Phishing URLs, .APK Files, & Panic Pressure',
    openFullAnalyzer: 'Open in Full Analyzer',
    simulationTitle: 'WhatsApp Inspection Simulation',
    threatVectorHeading: 'Identified Threat Vectors:',
    verdictHeading: 'Heuristic Assessment:',
    actionDontClick: 'Action: DO NOT CLICK / INSTALL',
    actionVerify: 'Action: Verify Independently',
    courierTip: '💡 Official couriers and banks never ask you to install APK files or fill forms through WhatsApp.',
    noThreatsDetected: 'No common malicious threat indicators detected.',

    // Analyzer Screen
    analyzerBadge: 'Forensic Text Inspector',
    analyzerHeading: 'Suspicious Message & Link Analyzer',
    analyzerDesc: 'Inspect SMS, WhatsApp chat messages, or emails to safely identify social engineering indicators locally.',
    casesAvailable: 'Cases Available',
    inputBoxTitle: 'Paste the Message You Want to Inspect',
    privacyPill: 'Analysis runs entirely locally in your browser (privacy preserved)',
    clearBtn: 'Clear Text',
    analyzeBtn: 'Analyze Message Now',
    analyzingBtn: 'Scanning Text...',
    charCount: 'characters',
    minCharError: 'Text is too short. Please enter at least 10 characters.',

    // Evidence Report
    analysisVerdictTitle: 'Heuristic Evaluation Findings',
    riskHigh: 'DETECTED HIGH RISK',
    riskMedium: 'DETECTED MEDIUM RISK',
    riskLow: 'DETECTED LOW RISK',
    evidenceStatusTitle: 'Evidence Evaluation Status',
    forensicMethodology: 'Forensic Methodology',
    heuristicDetectionLabel: 'Heuristic Social Engineering Detection',
    evidenceSummaryTitle: 'Evidence Summary',
    threatClassificationTitle: 'Threat Classification',
    criticalLabel: 'Critical',
    warningLabel: 'Warning',
    cleanLabel: 'Clean',
    detectedLabel: 'Detected',
    observedIndicatorsTitle: 'Observed Indicators',
    noIndicators: 'No common threat indicators found in this message.',
    triggerWordInspection: 'Trigger Words Inspection in Message',
    criticalTrigger: 'Critical Trigger',
    warningTrigger: 'Warning Trigger',
    hoverWordHint: '💡 Hover over wavy-underlined words to see the detected manipulation type.',
    socialIndicatorsTitle: 'Social Engineering Indicator Findings',
    cleanMessageNote: 'The text does not contain common threat patterns such as false urgency, APK attachments, or suspicious domain links.',
    triggerWordLabel: 'Trigger Word:',
    tacticsSectionTitle: 'Detected Social Engineering Tactics',
    tacticsSectionDesc: 'Psychological manipulation vectors deployed to bypass critical thinking.',
    noTacticsDetected: 'No common psychological manipulation tactics detected (false urgency, intimidation, reward bait, authority impersonation, or forced secrecy).',
    tacticsDetectedCount: 'Tactics Identified',
    tacticTriggerSnippet: 'Trigger:',
    whyDangerousTitle: 'Why Is This Pattern Dangerous?',
    mitigationProtocolTitle: 'Immediate Mitigation Action Protocol',
    securedOf: 'secured',
    safeNextStepsTitle: 'Recommended Safe Next Steps',
    stepMarkDone: 'Mark Complete',
    stepDone: 'Completed',

    // AI Explanation
    aiTitle: 'AI Explanation',
    aiOptional: 'Powered by Gemini',
    aiConsentPrompt: 'Request Explanation from Gemini AI?',
    aiConsentDesc: 'The AI will receive a sanitized summary of heuristic findings (indicator labels, risk level, and extracted trigger phrases) — not your original message. This data is sent to Google for processing.',
    aiConsentWarning: '⚠️ Do not use this feature if the message contains sensitive personal information. AI explanations are educational and do not replace the local heuristic analysis above.',
    aiExplainBtn: 'Explain with Gemini AI',
    privacyPolicy: 'Google Privacy Policy',
    aiLoading: 'Processing findings with Gemini AI...',
    aiLoadingSub: 'Sending indicator summary (not raw text) to server. Wait a moment.',
    cancelBtn: 'Cancel',
    aiUnavailable: 'AI Explanation Unavailable',
    aiUnavailableDesc: 'This feature requires GEMINI_API_KEY configured on the server. The local heuristic analysis above remains valid and complete.',
    aiErrorTitle: 'Failed to Connect to Gemini AI',
    retryBtn: 'Retry',
    aiResultHeader: 'AI Explanation',
    aiPrevResultBadge: 'Previous Analysis Result',
    aiDisclaimer: 'The explanation below is generated by AI based on extracted indicator summaries, not your raw text. Always prioritize the heuristic analysis above.',
    aiSummaryLabel: 'AI Summary',
    aiIndicatorsLabel: 'AI Threat Indicators',
    aiExplanationLabel: 'In-Depth Explanation',
    aiRecommendationsLabel: 'Additional Recommendations from AI',
    reAnalyzeAi: 'Request AI Re-Analysis',
    aiHide: 'Hide AI explanation',
    aiShow: 'Show AI explanation',
    aiClose: 'Close',
    aiBack: '← Back',

    // Local Explanation Fallback & Rate limit cooldown
    localExplanationBadge: 'Local Explanation (No AI)',
    localExplanationTitle: 'Local Heuristic Forensic Explanation',
    localExplanationSubtitle: 'Generated instantly by the local heuristic engine without consuming Gemini AI quota.',
    localSummaryLabel: 'Local Forensic Summary',
    localTacticsLabel: 'Detected Social Engineering Tactics',
    localSafetyLabel: 'Recommended Safety Actions',
    rateLimitCooldownText: 'API quota or rate limit reached (HTTP 429). Please pause briefly before retrying. Use the Local Explanation below.',
    retryInCooldown: 'Retry in {seconds}s',

    // Quiz Screen
    quizBadge: 'Cyber Decision Lab',
    quizHeading: 'Cyber Decision Quiz',
    quizDesc: 'Face 5 realistic case scenarios in Indonesia. Test whether your instincts can discern malicious intent behind messages.',
    interactiveQuizBadge: 'Interactive Quiz',
    quizBadgeSub: 'Safe Decision Making Practice',
    scenarioLabel: 'Scenario',
    scenarioOf: 'of',
    scenarioTrackerTitle: 'Scenario Tracker',
    scenarioProgressTitle: 'Scenario Progress',
    activeLabel: 'Active',
    scoringTitle: 'Scoring Rules',
    scoringRule1: 'Choose safe action → 1 cyber resilience point.',
    scoringRule2: 'Choose risky action → 0 points, read educational explanation.',
    scoringRule3: '5/5 → "Highly Vigilant". ≥3/5 → "Adequately Vigilant".',
    thinkBeforeReminderTitle: 'Think Before You Click.',
    thinkBeforeReminderDesc: 'Always verify through official channels independent from the message you received.',
    submitAnswer: 'Confirm Choice',
    optionLabel: 'Option',
    selectedBadge: 'Selected Choice',
    safestRecommendation: 'Safest Recommendation',
    unverifiedSenderPill: 'Unverified Sender',
    threatLevelCritical: 'Threat Level: Critical',
    chooseOnePrompt: 'Choose the safest decision before confirming your answer:',
    nextScenario: 'Next Scenario',
    finishQuiz: 'View Final Score',
    feedbackCorrect: 'CORRECT & SAFE CHOICE!',
    feedbackIncorrect: 'HIGH RISK ACTION!',
    decisionSafe: 'Safe Decision (Correct)',
    decisionRisky: 'High-Risk Decision',
    learningPoint: 'Key Learning Takeaway:',
    explainTrapTitle: 'Explain the Trap',
    explainTrapSubtitle: 'Analysis of the psychological manipulation and cyber tactics behind this scenario.',
    tacticNameLabel: 'Psychological Tactic:',
    howItManipulatesLabel: 'How It Manipulates Victims:',
    practicalLessonLabel: 'Practical Safety Lesson:',
    quizCompleteHeading: 'Quiz Evaluation Complete!',
    retakeQuiz: 'Retake Quiz from Beginning',
    retakeQuizBtn: 'Retake Quiz',
    goToAnalyzer: 'Try Message Analyzer',
    tryAnalyzePersonal: 'Try Message Analyzer',
    goToHome: 'Return to Home',
    scenarioEvaluation: 'Scenario Evaluation:',
    safeLabel: 'Safe',
    riskyLabel: 'Risky',
    scoreHeadingTitle: 'Score:',
    scoreHeadingSub: 'Correct Decisions',
    verdictHighlyVigilant: 'Highly Vigilant (Maximum Cyber Resilience)',
    verdictAdequatelyVigilant: 'Adequately Vigilant (Good Critical Thinking)',
    verdictNeedsVigilance: 'Needs Vigilance (Improve Awareness)',
    quizResultPerfect: 'Outstanding! Your digital defense instincts are sharp. You are ready to champion cyber hygiene for your family and peers.',
    quizResultGood: 'Great Job! You understand core verification habits, but remain on guard against rushed panic tactics.',
    quizResultNeedsPractice: 'Needs Practice! Some scenarios lured you into rushed actions. Always remember: Think Before You Click.',

    // Footer
    footerDesc: 'A cybersecurity literacy initiative empowering students and the public to stay critical before clicking links or sharing personal data.',
    footerNavTitle: 'Feature Navigation',
    footerNavHome: 'Literacy Home & 3-Step Guide',
    footerNavAnalyzer: 'Forensic Message Analyzer (Heuristic Inspection)',
    footerNavQuiz: 'Cyber Decision Quiz (5 Real Scenarios)',
    footerHotlineTitle: 'Official Cyber Incident Reporting',
    footerEmergency: 'Emergency banking service: Call the official phone number printed on the back of your ATM card.',
    footerDisclaimer: 'Note: Analysis results are educational risk estimation tools, not an absolute guarantee of fraud or safety.',
    footerCopyright: 'CyberGuard AI. Education & Research Hackathon.',
  }
};

export type TranslationKey = keyof typeof TRANSLATIONS['id'];

export const THREAT_TACTICS_EN: ThreatTacticI18n[] = [
  {
    title: 'Artificial Time Urgency',
    description: 'Creates a panic deadline (15 minutes, 24 hours) to stop victims from thinking clearly.',
    badgeText: 'Psychological Manipulation'
  },
  {
    title: 'OTP & Credential Solicitation',
    description: 'Requests SMS OTP codes, PINs, or passwords under the guise of security verification or updates.',
    badgeText: 'Access Theft'
  },
  {
    title: 'Malicious Application (.APK)',
    description: 'Disguises bank-draining malware as shipping receipts, traffic tickets, or wedding invitations.',
    badgeText: 'Android Malware'
  },
  {
    title: 'Fake Prizes & Government Aid',
    description: 'Promises free cash or internet quotas on condition of providing personal data or forwarding links.',
    badgeText: 'Financial Lure'
  }
];

export const TEASER_PRESETS_EN: TeaserPresetI18n[] = [
  {
    id: 'apk-courier',
    name: 'Package Tracking (.APK)',
    sender: '+62 821-4921-XXXX (Unknown)',
    timestamp: '2:02 PM',
    text: 'Hello, your J&X delivery package is held at our logistics hub due to an unreadable address. Please immediately download & install the Package_Photo_Receipt.apk file to verify tracking before it is cancelled this evening.',
    highlightPhrase: 'Package_Photo_Receipt.apk',
    threatVectors: [
      {
        title: 'Dangerous .APK File Extension',
        description: 'Banking trojan tactic designed to hijack SMS reading permissions and steal OTP codes.',
        severity: 'CRITICAL'
      },
      {
        title: 'Artificial Time Pressure',
        description: 'Creates an "evening" deadline so the victim acts in haste without critical thinking.',
        severity: 'WARNING'
      },
      {
        title: 'Unofficial Communication Channel',
        description: 'Legitimate courier services never distribute APK installation files via chat apps.',
        severity: 'CRITICAL'
      }
    ]
  },
  {
    id: 'bank-alert',
    name: 'Bank Alert (.XYZ)',
    sender: 'SMS: BANK-ALERT',
    timestamp: '9:15 AM',
    text: 'URGENT ALERT: Your bank account was accessed from an unrecognized device. Transactions will freeze in 15 minutes. Cancel immediately at http://bca-klik-verifikasi.xyz/login before permanent suspension.',
    highlightPhrase: 'http://bca-klik-verifikasi.xyz/login',
    threatVectors: [
      {
        title: 'Fake Phishing Domain',
        description: 'An unofficial .xyz clone domain crafted to resemble official banking portals.',
        severity: 'CRITICAL'
      },
      {
        title: '15-Minute Panic Coercion',
        description: 'A social engineering psychological tactic forcing immediate clicks without verification.',
        severity: 'WARNING'
      },
      {
        title: 'Credential & OTP Harvesting',
        description: 'Luring victims into inputting User IDs and authentication tokens into a bogus form.',
        severity: 'CRITICAL'
      }
    ]
  },
  {
    id: 'prize-lure',
    name: 'Cash Prize $3,500',
    sender: '+62 858-1293-XXXX (Prize Notice)',
    timestamp: 'Yesterday, 7:40 PM',
    text: 'CONGRATULATIONS! Your number has won an un-drawn customer appreciation cash prize of $3,500. Claim your prize immediately by sending your ID card photo and paying a $10 admin fee.',
    highlightPhrase: 'paying a $10 admin fee',
    threatVectors: [
      {
        title: 'Advance-Fee Scam Lure',
        description: 'Demanding upfront administrative fees to release a fictitious cash prize.',
        severity: 'CRITICAL'
      },
      {
        title: 'Identity Document Harvesting',
        description: 'Requesting identity card photos to commit secondary identity fraud.',
        severity: 'CRITICAL'
      },
      {
        title: 'Unsolicited Lucky Draw Claim',
        description: 'Promising cash from competitions you never entered or registered for.',
        severity: 'WARNING'
      }
    ]
  }
];

export const SAMPLE_MESSAGES_EN: SampleMessageI18n[] = [
  {
    id: 'sample-apk',
    title: 'Courier Package (.APK)',
    scenarioType: 'WhatsApp Smishing',
    preview: 'J&T Express Package Photo...',
    fullText: 'Good afternoon, we from J&T Express courier inform you that your package is held because the delivery address is unclear. Please download and install the official tracking app from the attached VIEW_PACKAGE_PHOTO.apk to track your parcel before we return it today.'
  },
  {
    id: 'sample-bank',
    title: 'Bank Account Security Warning',
    scenarioType: 'SMS Phishing (Smishing)',
    preview: 'Your bank account has been suspended...',
    fullText: 'Official Alert: Suspicious transaction activity was detected on your account and it will be DEACTIVATED within 24 hours. Confirm your identity immediately and enter your OTP at our portal: http://bca-klik-verifikasi.xyz/login to prevent permanent restriction.'
  },
  {
    id: 'sample-hadiah',
    title: 'Instant Cash Giveaway',
    scenarioType: 'Social Media Scam',
    preview: 'Congratulations! You have been selected...',
    fullText: 'CONGRATULATIONS! Your WhatsApp number was selected as the grand winner of an end-of-year cash prize of $2,000 from customer rewards. Claim with no draw required by sending your ID photo and bank account number to our admin right now!'
  }
];
