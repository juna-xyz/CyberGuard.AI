import { AnalysisReport, ObservableIndicator, RiskLevel, SampleMessage } from '../../types';

// Daftar contoh kasus fiktif aman untuk demo cepat
export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: 'sample-apk',
    title: 'Kurir Paket (.APK)',
    scenarioType: 'WhatsApp Smishing',
    preview: 'Surat Foto Paket J&T Express...',
    fullText: 'Selamat siang kak, kami dari kurir J&T Express mengabarkan paket atas nama Anda tertahan karena alamat kurang jelas. Silakan unduh dan pasang aplikasi cek resi resmi pada berkas LIHAT_FOTO_PAKET.apk berikut untuk melacak ulang paket Anda sebelum kami retur hari ini.'
  },
  {
    id: 'sample-bank',
    title: 'Peringatan Rekening Bank',
    scenarioType: 'SMS Phishing (Smishing)',
    preview: 'Rekening Anda ditangguhkan...',
    fullText: 'Pemberitahuan Resmi: Rekening Anda terdeteksi melakukan transaksi mencurigakan dan akan DINONAKTIFKAN dalam waktu 1x24 jam. Segera konfirmasi kepemilikan dan masukkan kode OTP Anda melalui tautan resmi: http://bca-klik-verifikasi.xyz/login agar akun tidak diblokir permanen.'
  },
  {
    id: 'sample-hadiah',
    title: 'Undian Saldo Instan',
    scenarioType: 'Social Media Scam',
    preview: 'Selamat! Anda terpilih menerima...',
    fullText: 'SELAMAT! Nomor WhatsApp Anda terpilih sebagai pemenang gebyar undian akhir tahun berhadiah saldo tunai Rp 25.000.000 dari program apresiasi nasabah. Klaim hadiah Anda tanpa diundi dengan mengirimkan foto KTP dan nomor rekening ke admin WhatsApp kami sekarang juga!'
  }
];

export function analyzeMessageLocally(rawText: string): AnalysisReport {
  const text = rawText.trim();
  const detectedIndicators: ObservableIndicator[] = [];

  // 1. Modul Deteksi: Urgensi & Desakan Waktu (Urgency & Coercion)
  const urgencyRegex = /(segera|dalam 24 jam|1x24 jam|15 menit|hari ini juga|sebelum diblokir|dinonaktifkan|terkunci permanen|batas waktu|sebelum terlambat)/i;
  const urgencyMatch = text.match(urgencyRegex);
  if (urgencyMatch) {
    detectedIndicators.push({
      id: 'ind-urgency',
      category: 'URGENCY',
      label: 'Desakan Waktu & Ancaman Pemblokiran',
      detectedSnippet: urgencyMatch[0],
      severity: 'WARNING',
      educationalAdvice: 'Penipu sengaja menciptakan kepanikan agar korban bertindak gegabah tanpa berpikir kritis.'
    });
  }

  // 2. Modul Deteksi: Permintaan Informasi Sensitif / Kredensial (Credential Solicitation)
  const credentialRegex = /(kode otp|otp anda|masukkan pin|kata sandi|password|cvv|3 digit kartu|verifikasi data|nomor kartu atm|foto ktp)/i;
  const credentialMatch = text.match(credentialRegex);
  if (credentialMatch) {
    detectedIndicators.push({
      id: 'ind-credential',
      category: 'CREDENTIAL',
      label: 'Permintaan Data Rahasia Pribadi / OTP',
      detectedSnippet: credentialMatch[0],
      severity: 'CRITICAL',
      educationalAdvice: 'Lembaga keuangan resmi dan kurir TIDAK PERNAH meminta kode OTP, PIN, atau kata sandi melalui pesan teks.'
    });
  }

  // 3. Modul Deteksi: Tautan Mencurigakan & Berkas Berbahaya (.APK)
  const apkRegex = /(\.apk\b|unduh aplikasi|pasang aplikasi|surat_tilang|foto_paket|dokumen_resi)/i;
  const apkMatch = text.match(apkRegex);
  if (apkMatch) {
    detectedIndicators.push({
      id: 'ind-malicious-apk',
      category: 'MALICIOUS_LINK',
      label: 'Penyebaran Berkas Malware Android (.APK)',
      detectedSnippet: apkMatch[0],
      severity: 'CRITICAL',
      educationalAdvice: 'Berkas .apk dari nomor tidak dikenal adalah modus pencurian SMS/OTP perbankan yang sangat berbahaya.'
    });
  }

  const suspiciousDomainRegex = /(https?:\/\/[^\s]+(\.xyz|\.top|\.club|\.click|\.site|\.ru|\.cfd|\.online|bca-[a-z0-9]|bri-[a-z0-9]|mandiri-[a-z0-9]))/i;
  const domainMatch = text.match(suspiciousDomainRegex);
  if (domainMatch) {
    detectedIndicators.push({
      id: 'ind-suspicious-domain',
      category: 'MALICIOUS_LINK',
      label: 'Tautan Domain Tidak Resmi / Ekstensi Mencurigakan',
      detectedSnippet: domainMatch[0],
      severity: 'CRITICAL',
      educationalAdvice: 'Domain yang meniru nama institusi resmi namun berakhiran ekstensi murah sering digunakan untuk web phishing.'
    });
  }

  // 4. Modul Deteksi: Iming-iming Finansial Tidak Masuk Akal (Financial Lure)
  const lureRegex = /(selamat anda menang|hadiah rp|saldo rp|klaim hadiah|tanpa diundi|pemenang undian|dana subsidi|bansos)/i;
  const lureMatch = text.match(lureRegex);
  if (lureMatch) {
    detectedIndicators.push({
      id: 'ind-lure',
      category: 'FINANCIAL_LURE',
      label: 'Iming-iming Hadiah atau Dana Cuma-cuma',
      detectedSnippet: lureMatch[0],
      severity: 'WARNING',
      educationalAdvice: 'Janji hadiah uang instan adalah umpan psikologis klasik untuk menurunkan rasa curiga target.'
    });
  }

  // 5. Modul Deteksi: Peniruan Identitas Entitas Resmi (Authority Impersonation)
  const impersonationRegex = /(kami dari kurir|j&t express|jne|pihak bank|customer service|resmi dari|admin telegram|kemenkeu|bpjs)/i;
  const impMatch = text.match(impersonationRegex);
  if (impMatch && (urgencyMatch || credentialMatch || apkMatch || domainMatch || lureMatch)) {
    detectedIndicators.push({
      id: 'ind-impersonation',
      category: 'IMPERSONATION',
      label: 'Klaim Identitas Lembaga Resmi Bersama Indikator Bahaya',
      detectedSnippet: impMatch[0],
      severity: 'WARNING',
      educationalAdvice: 'Pelaku kejahatan siber sering mencatut nama perusahaan besar untuk membangun rasa percaya semu.'
    });
  }

  // Tentukan Tingkat Risiko Kualitatif (Bukan angka persentase artifisial)
  const criticalCount = detectedIndicators.filter(i => i.severity === 'CRITICAL').length;
  const totalCount = detectedIndicators.length;

  let riskLevel: RiskLevel = 'LOW';
  let summaryHeading = 'Pesan Tidak Menunjukkan Indikator Ancaman Umum';
  let explanation = 'Analisis leksikal tidak menemukan indikator manipulasi psikologis, desakan waktu, berkas berbahaya, maupun permintaan data rahasia. Namun, tetap terapkan prinsip kehati-hatian sebelum membuka tautan apa pun.';

  if (criticalCount >= 1 || totalCount >= 3) {
    riskLevel = 'HIGH';
    summaryHeading = 'Pesan Terindikasi Kuat Berbahaya (Risiko Tinggi)';
    explanation = 'Pesan ini memuat indikator manipulasi kritis, seperti permintaan kredensial rahasia, desakan waktu paksa, atau ajakan mengunduh berkas berbahaya (.apk). Sangat besar kemungkinan pesan ini merupakan rekayasa sosial atau penipuan perbankan.';
  } else if (totalCount >= 1) {
    riskLevel = 'MEDIUM';
    summaryHeading = 'Pesan Memiliki Indikator Mencurigakan (Risiko Sedang)';
    explanation = 'Ditemukan beberapa indikator bahasa yang menyerupai taktik rekayasa sosial umum. Disarankan untuk memverifikasi secara independen sebelum mengambil tindakan apa pun.';
  }

  // Rekomendasi langkah mitigasi konkret
  const safeNextSteps: string[] = [];
  if (riskLevel === 'HIGH') {
    safeNextSteps.push('JANGAN KLIK tautan atau mengunduh berkas lampiran apa pun.');
    safeNextSteps.push('JANGAN PERNAH membagikan kode OTP, PIN, atau kata sandi kepada siapa pun.');
    safeNextSteps.push('Blokir nomor pengirim dan tandai sebagai Spam di aplikasi perpesanan Anda.');
    safeNextSteps.push('Jika mengatasnamakan bank, hubungi Call Center resmi yang tertera di bagian belakang kartu debit/kredit Anda.');
  } else if (riskLevel === 'MEDIUM') {
    safeNextSteps.push('Jangan langsung merespons desakan waktu yang tertera pada pesan.');
    safeNextSteps.push('Periksa alamat situs web secara manual di peramban, bukan melalui tautan di pesan.');
    safeNextSteps.push('Konfirmasi kepada pihak pengirim melalui saluran komunikasi resmi yang terpisah.');
  } else {
    safeNextSteps.push('Tetap cermati nomor atau email pengirim asli.');
    safeNextSteps.push('Jangan sembarangan memasukkan informasi akun di halaman yang tidak Anda kenal.');
  }

  return {
    riskLevel,
    summaryHeading,
    explanation,
    detectedIndicators,
    safeNextSteps,
    detectionBoundaryNote: 'Hasil analisis ini merupakan estimasi edukatif berdasarkan sinyal-sinyal umum rekayasa sosial, bukan jaminan verifikasi mutlak atau sertifikasi keamanan perbankan.',
    analyzedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    engineSource: 'LOCAL_HEURISTIC'
  };
}
