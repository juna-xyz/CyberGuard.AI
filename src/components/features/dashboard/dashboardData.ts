export interface ThreatTactic {
  title: string;
  description: string;
  badgeText: string;
}

export const THREAT_TACTICS: ThreatTactic[] = [
  {
    title: 'Urgensi Waktu Palsu',
    description: 'Menciptakan batas waktu panik (15 menit, 24 jam) agar korban tidak sempat berpikir jernih.',
    badgeText: 'Manipulasi Psikologis'
  },
  {
    title: 'Permintaan OTP & Kredensial',
    description: 'Meminta kode OTP SMS, PIN, atau kata sandi dengan dalih verifikasi keamanan atau pembaruan sistem.',
    badgeText: 'Pencurian Akses'
  },
  {
    title: 'Unduhan Berkas (.APK)',
    description: 'Menyamarkan malware penguras rekening sebagai dokumen resi paket, surat tilang, atau undangan nikah.',
    badgeText: 'Malware Android'
  },
  {
    title: 'Iming-iming Hadiah & Bansos',
    description: 'Menjanjikan saldo tunai atau kuota gratis dengan syarat memasukkan data pribadi atau menyebar tautan.',
    badgeText: 'Umpan Finansial'
  }
];

export interface TeaserPreset {
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

export const TEASER_PRESETS: TeaserPreset[] = [
  {
    id: 'apk-courier',
    name: 'Resi Paket (.APK)',
    sender: '+62 821-4921-XXXX (Tidak Dikenal)',
    timestamp: '14:02 WIB',
    text: 'Halo Bapak/Ibu, paket pengiriman resi J&X Anda tertahan di gudang logistik. Mohon segera unduh & pasang file Surat_Resi_Pengiriman.apk untuk verifikasi pelacakan sebelum dibatalkan otomatis sore ini.',
    highlightPhrase: 'Surat_Resi_Pengiriman.apk',
    threatVectors: [
      {
        title: 'Ekstensi File .APK Berbahaya',
        description: 'Modus Trojan perbankan untuk membajak izin membaca SMS dan meneruskan kode OTP.',
        severity: 'CRITICAL'
      },
      {
        title: 'Manipulasi Urgensi Waktu Palsu',
        description: 'Menciptakan batas waktu "sore ini" agar korban tergesa-gesa tanpa berpikir rasional.',
        severity: 'WARNING'
      },
      {
        title: 'Saluran Kontak Tak Resmi',
        description: 'Ekspedisi resmi tidak melacak paket melalui pengiriman dokumen APK via WhatsApp.',
        severity: 'CRITICAL'
      }
    ]
  },
  {
    id: 'bank-alert',
    name: 'Peringatan Bank (.XYZ)',
    sender: 'SMS: BANK-ALERT',
    timestamp: '09:15 WIB',
    text: 'PERINGATAN DARURAT: Rekening Anda terdeteksi diakses dari perangkat asing. Transaksi akan dibekukan dalam 15 menit. Segera batalkan di http://bca-klik-verifikasi.xyz/login sebelum diblokir permanen.',
    highlightPhrase: 'http://bca-klik-verifikasi.xyz/login',
    threatVectors: [
      {
        title: 'Domain Phishing Tidak Resmi',
        description: 'Alamat domain .xyz tiruan yang dibuat menyerupai portal resmi perbankan.',
        severity: 'CRITICAL'
      },
      {
        title: 'Desakan Panik 15 Menit',
        description: 'Taktik psikologis rekayasa sosial agar korban segera mengklik tanpa konfirmasi.',
        severity: 'WARNING'
      },
      {
        title: 'Pancingan Kredensial & OTP',
        description: 'Menggiring korban memasukkan User ID dan token perbankan ke formulir palsu.',
        severity: 'CRITICAL'
      }
    ]
  },
  {
    id: 'prize-lure',
    name: 'Undian Tunai 50 Juta',
    sender: '+62 858-1293-XXXX (Info Pemenang)',
    timestamp: 'Kemarin, 19:40 WIB',
    text: 'SELAMAT! Nomor Anda resmi meraih hadiah apresiasi tunai Rp 50.000.000 tanpa diundi. Klaim hadiah segera dengan mengirimkan foto KTP dan membayar biaya administrasi Rp 150.000 ke rekening bendahara.',
    highlightPhrase: 'foto KTP dan membayar biaya administrasi',
    threatVectors: [
      {
        title: 'Iming-iming Finansial Tanpa Undian',
        description: 'Eksploitasi euforia instan dengan dalih apresiasi hadiah marketplace tanpa pendaftaran.',
        severity: 'CRITICAL'
      },
      {
        title: 'Pungutan Biaya Administrasi di Awal',
        description: 'Trik penipuan klasik yang mewajibkan transfer uang muka untuk mencairkan hadiah semu.',
        severity: 'CRITICAL'
      },
      {
        title: 'Pencurian Data Identitas KTP',
        description: 'Foto identitas pribadi KTP dapat disalahgunakan pelaku untuk pinjaman online ilegal.',
        severity: 'WARNING'
      }
    ]
  }
];
