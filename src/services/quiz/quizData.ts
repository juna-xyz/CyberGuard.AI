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
    learningTakeaway: 'Ingat: Kurir ekspedisi resmi hanya memberikan nomor resi teks untuk dilacak di web/aplikasi resmi, bukan file .apk.',
    trapAnalysis: {
      tacticName: 'Umpan File APK Berbahaya (Malicious APK Bait)',
      manipulationMechanism: 'Pelaku memanfaatkan rasa penasaran dan kecemasan paket tertahan agar korban mengabaikan peringatan keamanan Android untuk menginstal aplikasi malware pencuri SMS/OTP perbankan.',
      safetyLesson: 'Ekspedisi resmi tidak pernah meminta unduh APK lewat chat. Lacak status paket hanya via website atau aplikasi resmi dengan memasukkan nomor resi.'
    }
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
    learningTakeaway: 'Cermati domain: Bank resmi menggunakan domain berakhiran .com atau .co.id terverifikasi, bukan domain murah seperti .xyz atau .site.',
    trapAnalysis: {
      tacticName: 'Urgensi Palsu & Phishing Domain (Urgency & Phishing)',
      manipulationMechanism: 'Menciptakan kepanikan dengan tenggat waktu 15 menit dan ancaman pemblokiran rekening untuk melumpuhkan nalar kritis korban agar segera memasukkan kredensial login.',
      safetyLesson: 'Saat menerima desakan darurat dari pihak bank, abaikan tautan di pesan dan segera verifikasi mandiri melalui aplikasi m-banking atau call center resmi.'
    }
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
    learningTakeaway: 'Penipuan invoice palsu mengandalkan rasa panik kehilangan uang. Cek rekening Anda langsung di aplikasi bank resmi.',
    trapAnalysis: {
      tacticName: 'Kecemasan Finansial & Umpan Refund (Financial Fear & Refund Bait)',
      manipulationMechanism: 'Menakut-nakuti korban dengan tagihan fiktif bernominal besar, lalu memancingnya mengklik tombol pembatalan/refund untuk mencuri data kartu debit/kredit.',
      safetyLesson: 'Jadikan mutasi rekening independen sebagai sumber kebenaran tunggal. Jangan pernah menekan tombol batalkan/refund pada email mencurigakan.'
    }
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
    learningTakeaway: 'Bantuan pemerintah resmi disalurkan melalui portal resmi berakhiran .go.id, bukan domain umum seperti .club.',
    trapAnalysis: {
      tacticName: 'Umpan Hadiah & Rantai Rekayasa Sosial (Reward Bait & Social Chain)',
      manipulationMechanism: 'Memanfaatkan iming-iming bantuan subsidi pendidikan gratis dan menyaratkan forward ke grup chat agar tautan phishing menyebar cepat lewat relasi terdekat.',
      safetyLesson: 'Informasi bantuan pemerintah resmi hanya ada di situs web domain .go.id dan tidak pernah meminta pesan dibagikan berantai ke grup chat.'
    }
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
    learningTakeaway: 'Taktik peniruan memanfaatkan rasa sungkan atau empati. Hubungi nomor lama rekan Anda melalui panggilan suara langsung.',
    trapAnalysis: {
      tacticName: 'Peniruan Identitas Rekan Kerja (Authority/Peer Impersonation)',
      manipulationMechanism: 'Mencuri foto profil rekan kerja untuk membangun kepercayaan kilat, lalu membuat cerita darurat palsu demi memancing empati dan transfer uang tanpa konfirmasi.',
      safetyLesson: 'Selalu lakukan verifikasi dua arah (out-of-band verification) melalui panggilan suara atau tatap muka langsung sebelum mengirimkan dana ke nomor baru.'
    }
  }
];

export const QUIZ_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: 1,
    scenarioContext: 'Courier Delivery WhatsApp Message Simulation',
    senderTitle: 'Unknown Number (+62 821-XXXX-9901)',
    timestamp: 'Today, 1:42 PM',
    messageContent: 'Your J&T parcel for Mrs. Rahma is held at our logistics hub because the street address is unreadable. Please download the official tracking app: VIEW_PACKAGE_PHOTO.apk and install it on your phone so our courier can deliver it this afternoon.',
    questionPrompt: 'What is the most appropriate and safe action for you to take?',
    options: [
      {
        id: 'opt-1a',
        text: 'Download and install the .apk file to check your package contents.',
        isSafe: false,
        feedbackExplanation: 'This is EXTREMELY DANGEROUS. Unknown .apk files are banking trojans designed to steal SMS and OTP codes from your phone.'
      },
      {
        id: 'opt-1b',
        text: 'Ignore the file, do not install it, and check the tracking number via the official J&T Express app or website.',
        isSafe: true,
        feedbackExplanation: 'EXCELLENT CHOICE! Legitimate couriers never ask customers to install APK files through messaging apps to track parcels.'
      },
      {
        id: 'opt-1c',
        text: 'Reply to the message with a photo of your ID card so the courier knows who you are.',
        isSafe: false,
        feedbackExplanation: 'HIGH RISK. Never send personal identity documents like ID cards to unverified numbers.'
      }
    ],
    learningTakeaway: 'Remember: Real couriers provide text tracking numbers for official portals, never .apk application packages.',
    trapAnalysis: {
      tacticName: 'Malicious APK Bait (Android Trojan)',
      manipulationMechanism: 'Attackers exploit curiosity and anxiety over a held parcel, coercing victims into bypassing Android security warnings to install SMS/OTP stealing trojans.',
      safetyLesson: 'Legitimate couriers never ask customers to download APKs via chat. Track package statuses exclusively on official websites using standard tracking codes.'
    }
  },
  {
    id: 2,
    scenarioContext: 'Bank Account Security SMS Simulation',
    senderTitle: 'SMS from: BANK-ALERT',
    timestamp: 'Yesterday, 9:15 AM',
    messageContent: 'ALERT: Suspicious login activity was detected on your account from an unrecognized location. Cancel this transaction and secure your account within 15 minutes at http://bca-klik-verifikasi.xyz/login before permanent lockout.',
    questionPrompt: 'What is the wisest and safest response?',
    options: [
      {
        id: 'opt-2a',
        text: 'Click the link immediately out of fear that funds will be deducted within 15 minutes.',
        isSafe: false,
        feedbackExplanation: 'DANGEROUS. The 15-minute countdown is a panic coercion tactic designed to make you submit credentials to a fake portal.'
      },
      {
        id: 'opt-2b',
        text: 'Do not click the link, and verify transaction history directly via the official Mobile Banking app or official bank call center.',
        isSafe: true,
        feedbackExplanation: 'VERY SAFE CHOICE! You verified information through an independent official channel rather than trusting the message.'
      },
      {
        id: 'opt-2c',
        text: 'Share the link on social media to ask friends whether the site looks genuine.',
        isSafe: false,
        feedbackExplanation: 'Unadvisable. Sharing malicious links puts your network at risk of accidentally clicking it.'
      }
    ],
    learningTakeaway: 'Inspect domains: Legitimate banks use verified corporate domains (.com or .co.id), never cheap extensions like .xyz or .site.',
    trapAnalysis: {
      tacticName: 'Artificial Urgency & Phishing Domain',
      manipulationMechanism: 'Creates instant panic with a 15-minute countdown and threat of permanent lockout, disabling logical reasoning to harvest banking credentials on a fake clone page.',
      safetyLesson: 'When confronted with urgent bank account suspension alerts, never tap embedded links. Verify directly via the official mobile banking app or customer hotline.'
    }
  },
  {
    id: 3,
    scenarioContext: 'Fake Subscription Invoice Email Simulation',
    senderTitle: 'Email from: billing@support-cloudpay-invoice.com',
    timestamp: '2 days ago',
    messageContent: 'Dear Customer, your automatic payment for the Premium Cloud Suite of $60.00 has been debited. If you did not authorize this transaction, click the "Cancel and Refund" button below.',
    questionPrompt: 'What step should you take?',
    options: [
      {
        id: 'opt-3a',
        text: 'Click "Cancel and Refund" immediately to stop the charges.',
        isSafe: false,
        feedbackExplanation: 'Dangerous. Fake refund buttons are crafted to lure you into typing debit or credit card details voluntarily.'
      },
      {
        id: 'opt-3b',
        text: 'Check your real bank statement independently without clicking any links in the email.',
        isSafe: true,
        feedbackExplanation: 'EXACTLY RIGHT! Always treat independent bank records as the single source of truth, not unverified emails.'
      },
      {
        id: 'opt-3c',
        text: 'Reply with your debit card number asking for transaction verification.',
        isSafe: false,
        feedbackExplanation: 'Severe risk! Never send financial card numbers over unencrypted plain email.'
      }
    ],
    learningTakeaway: 'Fake invoice scams rely on fear of financial loss. Check your actual bank account directly.',
    trapAnalysis: {
      tacticName: 'Financial Fear & Refund Bait',
      manipulationMechanism: 'Exploits the fear of unauthorized financial loss from an unexpected charge, guiding the victim to a fake "refund" form designed to harvest payment card credentials.',
      safetyLesson: 'Always check your actual bank account or credit card statement independently. Never click cancellation or refund buttons in unsolicited billing emails.'
    }
  },
  {
    id: 4,
    scenarioContext: 'Family Group Chat Chain Message Simulation',
    senderTitle: 'Forwarded message in family WhatsApp group',
    timestamp: 'Yesterday, 7:30 PM',
    messageContent: 'Government is distributing $50 educational subsidy balances to all students. Register before quotas run out: http://subsidi-kuota-pendidikan.club/?reg. Forward to 5 groups to activate your claim code!',
    questionPrompt: 'How should you react to this message?',
    options: [
      {
        id: 'opt-4a',
        text: 'Forward the message to 5 other groups so your claim quota activates.',
        isSafe: false,
        feedbackExplanation: 'Incorrect. Spreading chain phishing messages exposes family and friends to data theft.'
      },
      {
        id: 'opt-4b',
        text: 'Open the link and enter your phone number and bank account info.',
        isSafe: false,
        feedbackExplanation: 'Very hazardous. Fake subsidy portals harvest telephone and banking records for secondary scams.'
      },
      {
        id: 'opt-4c',
        text: 'Advise group members that this is a hoax/phishing scam and look up official info on government portal (.go.id).',
        isSafe: true,
        feedbackExplanation: 'GREAT JOB! You broke the chain of social engineering and educated those close to you.'
      }
    ],
    learningTakeaway: 'Official government aid is published exclusively on verified government domains (.go.id), never generic extensions like .club.',
    trapAnalysis: {
      tacticName: 'Reward Bait & Social Chain Exploitation',
      manipulationMechanism: 'Dangles free educational cash subsidies and exploits trusted peer/family circles by conditioning rewards on forwarding, exponentially multiplying potential victims.',
      safetyLesson: 'Legitimate government subsidies are announced exclusively on official .go.id portals and never require chain-forwarding messages to group chats.'
    }
  },
  {
    id: 5,
    scenarioContext: 'Colleague / Workplace Impersonation Simulation',
    senderTitle: 'New Telegram account using your coworker photo',
    timestamp: 'Today, 10:05 AM',
    messageContent: 'Hi, this is my new emergency number, my main phone is in repair. I urgently need to pay an office vendor right now and my banking app is locked on this temporary phone. Can you spot me a $150 transfer to the vendor account? I will repay you this evening.',
    questionPrompt: 'What is the wisest action before transferring any money?',
    options: [
      {
        id: 'opt-5a',
        text: 'Transfer the funds right away because the avatar shows a colleague you know well.',
        isSafe: false,
        feedbackExplanation: 'Careless. Profile photos from social media are effortlessly copied by identity impersonators.'
      },
      {
        id: 'opt-5b',
        text: 'Call the colleague on their known old number or speak in person to confirm the request.',
        isSafe: true,
        feedbackExplanation: 'GOLD STANDARD! Always perform out-of-band verification before transferring money upon emergency requests.'
      },
      {
        id: 'opt-5c',
        text: 'Transfer half the requested amount just to be on the safe side.',
        isSafe: false,
        feedbackExplanation: 'Still risky. The primary goal is verifying authenticity, not negotiating the amount.'
      }
    ],
    learningTakeaway: 'Impersonation exploits empathy and politeness. Always verify via voice call on known contact numbers.',
    trapAnalysis: {
      tacticName: 'Colleague / Peer Impersonation',
      manipulationMechanism: 'Hijacks a recognizable profile photo to fabricate an urgent emergency, weaponizing workplace goodwill and empathy to rush an irreversible money transfer.',
      safetyLesson: 'Always conduct two-way (out-of-band) verification via a direct voice call or in-person conversation before sending funds upon an unverified emergency request.'
    }
  }
];

export function getQuizQuestions(lang: 'id' | 'en'): QuizQuestion[] {
  return lang === 'en' ? QUIZ_QUESTIONS_EN : QUIZ_QUESTIONS;
}
