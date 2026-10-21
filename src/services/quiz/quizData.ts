import { QuizQuestion } from '../../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenarioContext: 'Simulasi Pesan WhatsApp Kurir Ekspedisi',
    senderTitle: 'Nomor Tak Dikenal (+62 821-XXXX-9901)',
    timestamp: 'Hari ini, 13:42 WIB',
    messageContent: 'Paket J&T Anda atas nama Ibu Rahma tertahan di gudang logistik karena nama jalan tidak terbaca. Mohon unduh aplikasi cek resi resmi: LIHAT_FOTO_PAKET.apk dan pasang di ponsel agar paket dapat segera diantar kurir sore ini.',
    questionPrompt: 'Tindakan apa yang paling tepat dan aman untuk Anda lakukan?',
    options: [
      {
        id: 'opt-1a',
        text: 'Mengunduh dan memasang file .apk tersebut untuk memastikan isi paket Anda.',
        isSafe: false,
        feedbackExplanation: 'Tindakan ini SANGAT BERBAHAYA. File .apk dari pihak tak dikenal merupakan modus pencurian SMS/OTP perbankan yang dapat menyusup ke perangkat Anda.'
      },
      {
        id: 'opt-1b',
        text: 'Mengabaikan file, tidak memasangnya, dan memeriksa nomor resi melalui aplikasi atau website resmi J&T Express.',
        isSafe: true,
        feedbackExplanation: 'PILIHAN TEPAT! Ekspedisi resmi tidak pernah meminta pelanggan mengunduh file .apk melalui pesan singkat untuk melacak paket.'
      },
      {
        id: 'opt-1c',
        text: 'Membalas pesan tersebut dengan mengirimkan foto KTP Anda agar kurir tahu identitas Anda.',
        isSafe: false,
        feedbackExplanation: 'Tindakan ini BERISIKO TINGGI. Jangan pernah mengirimkan dokumen identitas pribadi seperti KTP kepada nomor yang belum terverifikasi.'
      }
    ],
    learningTakeaway: 'Ingat: Kurir ekspedisi resmi hanya memberikan nomor resi teks untuk dilacak di web/aplikasi resmi, bukan file .apk.'
  },
  {
    id: 2,
    scenarioContext: 'Simulasi SMS Peringatan Rekening Bank',
    senderTitle: 'SMS dari: BANK-ALERT',
    timestamp: 'Kemarin, 09:15 WIB',
    messageContent: 'PERINGATAN: Rekening Anda terdeteksi melakukan login tidak wajar di lokasi asing. Segera batalkan transaksi dan amankan akun Anda dalam 15 menit di http://bca-klik-verifikasi.xyz/login sebelum diblokir permanen.',
    questionPrompt: 'Bagaimana respons yang paling bijak dan aman?',
    options: [
      {
        id: 'opt-2a',
        text: 'Segera mengklik tautan tersebut karena takut uang di rekening terdebit dalam 15 menit.',
        isSafe: false,
        feedbackExplanation: 'Tindakan ini BERBAHAYA. Desakan waktu 15 menit adalah taktik rekayasa sosial agar korban panik dan memasukkan User ID serta PIN di situs palsu.'
      },
      {
        id: 'opt-2b',
        text: 'Tidak mengklik tautan, lalu memeriksa mutasi rekening langsung melalui aplikasi resmi Mobile Banking atau menghubungi Call Center resmi bank.',
        isSafe: true,
        feedbackExplanation: 'PILIHAN SANGAT AMAN! Anda memverifikasi kebenaran informasi melalui kanal resmi yang independen dari pesan yang mencurigakan.'
      },
      {
        id: 'opt-2c',
        text: 'Membagikan tautan tersebut ke media sosial untuk bertanya apakah situs tersebut asli.',
        isSafe: false,
        feedbackExplanation: 'Kurang tepat. Menyebarkan tautan berbahaya dapat membahayakan orang lain yang mungkin tidak sengaja mengkliknya.'
      }
    ],
    learningTakeaway: 'Cermati domain: Bank resmi menggunakan domain berakhiran .com atau .co.id terverifikasi, bukan domain murah seperti .xyz atau .site.'
  },
  {
    id: 3,
    scenarioContext: 'Simulasi Email Tagihan Langganan Fiktif',
    senderTitle: 'Email dari: billing@support-cloudpay-invoice.com',
    timestamp: '2 hari lalu',
    messageContent: 'Yth. Pelanggan, pembayaran otomatis langganan Premium Cloud Suite Anda sebesar Rp 850.000 telah berhasil didebit. Jika Anda tidak merasa melakukan transaksi ini, klik tombol "Batalkan dan Refund" di bawah ini.',
    questionPrompt: 'Langkah apa yang sebaiknya Anda ambil?',
    options: [
      {
        id: 'opt-3a',
        text: 'Mengklik tombol "Batalkan dan Refund" untuk menghentikan pemotongan saldo.',
        isSafe: false,
        feedbackExplanation: 'Berbahaya. Tombol refund palsu dirancang untuk memancing Anda memasukkan data kartu kredit/debit secara sukarela.'
      },
      {
        id: 'opt-3b',
        text: 'Memeriksa riwayat rekening bank Anda secara mandiri untuk mengecek apakah benar ada potongan, tanpa mengklik apa pun di email.',
        isSafe: true,
        feedbackExplanation: 'BENAR SEKALI! Selalu jadikan mutasi rekening independen sebagai sumber kebenaran, bukan klaim dari email sepihak.'
      },
      {
        id: 'opt-3c',
        text: 'Mengirim balasan email berisi nomor kartu debit Anda untuk meminta bukti transaksi.',
        isSafe: false,
        feedbackExplanation: 'Sangat berisiko! Jangan pernah mengirimkan nomor kartu debit atau informasi finansial melalui pesan email terbuka.'
      }
    ],
    learningTakeaway: 'Penipuan invoice palsu mengandalkan rasa panik kehilangan uang. Cek rekening Anda langsung di aplikasi bank resmi.'
  },
  {
    id: 4,
    scenarioContext: 'Simulasi Pesan Berantai Grup Chat Keluarga',
    senderTitle: 'Pesan diteruskan berkali-kali di Grup WhatsApp',
    timestamp: 'Kemarin, 19:30 WIB',
    messageContent: 'Pemerintah bagikan bantuan saldo subsidi pendidikan Rp 500.000 untuk pelajar dan mahasiswa. Daftar sekarang sebelum kuota habis: http://subsidi-kuota-pendidikan.club/?daftar. Sebarkan ke 5 grup untuk klaim kode pencairan!',
    questionPrompt: 'Bagaimana sikap Anda terhadap pesan tersebut?',
    options: [
      {
        id: 'opt-4a',
        text: 'Meneruskan pesan ke 5 grup lain agar kuota pencairan segera aktif.',
        isSafe: false,
        feedbackExplanation: 'Keliru. Menyebarkan pesan berantai phishing membuat keluarga dan rekan Anda berisiko menjadi korban pencurian data.'
      },
      {
        id: 'opt-4b',
        text: 'Membuka tautan dan mengisi data nomor HP serta nomor rekening bank Anda.',
        isSafe: false,
        feedbackExplanation: 'Sangat berbahaya. Situs undian/bansos palsu mengumpulkan data nomor telepon dan rekening untuk penipuan lanjutan.'
      },
      {
        id: 'opt-4c',
        text: 'Menghimbau anggota grup bahwa pesan tersebut hoaks/phishing dan mencari info resmi di situs web kementerian terkait (misal kemdikbud.go.id).',
        isSafe: true,
        feedbackExplanation: 'HEBAT! Anda memutus rantai penyebaran rekayasa sosial dan mengedukasi lingkungan terdekat Anda.'
      }
    ],
    learningTakeaway: 'Bantuan pemerintah resmi disalurkan melalui portal resmi berakhiran .go.id, bukan domain umum seperti .club.'
  },
  {
    id: 5,
    scenarioContext: 'Simulasi Peniruan Akun Rekan / Pimpinan Kerja',
    senderTitle: 'Akun Telegram Baru dengan Foto Rekan Kerja',
    timestamp: 'Hari ini, 10:05 WIB',
    messageContent: 'Halo, ini nomor darurat saya yang baru, HP utama lagi diservis. Lagi ada keperluan mendesak banget untuk bayar vendor kantor, m-banking saya belum bisa dipindah ke HP ini. Boleh pinjam transfer 2 juta dulu ke rekening vendor? Sore nanti langsung saya ganti.',
    questionPrompt: 'Apa tindakan paling bijak sebelum melakukan transfer uang?',
    options: [
      {
        id: 'opt-5a',
        text: 'Langsung mentransfer uang karena melihat foto profilnya adalah rekan kerja yang Anda kenal baik.',
        isSafe: false,
        feedbackExplanation: 'Tindakan gegabah. Foto profil media sosial sangat mudah disalin oleh pelaku penipuan identitas (impersonation).'
      },
      {
        id: 'opt-5b',
        text: 'Menghubungi rekan kerja tersebut melalui panggilan telepon biasa atau menemuinya langsung untuk mengonfirmasi kebenaran permintaan.',
        isSafe: true,
        feedbackExplanation: 'LANGKAH EMAS! Selalu lakukan verifikasi dua arah (out-of-band verification) sebelum mentransfer dana atas permintaan darurat.'
      },
      {
        id: 'opt-5c',
        text: 'Mentransfer separuh dari nominal yang diminta untuk berjaga-jaga.',
        isSafe: false,
        feedbackExplanation: 'Tetap berisiko rugi finansial. Kunci utamanya adalah memastikan keaslian identitas terlebih dahulu, bukan nominalnya.'
      }
    ],
    learningTakeaway: 'Taktik peniruan memanfaatkan rasa sungkan atau empati. Hubungi nomor lama rekan Anda melalui panggilan suara langsung.'
  }
];
