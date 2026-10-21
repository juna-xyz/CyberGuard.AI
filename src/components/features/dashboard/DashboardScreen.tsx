import React from 'react';
import { ActiveTab } from '../../../types';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import {
  ShieldCheck,
  Search,
  HelpCircle,
  Clock,
  KeyRound,
  FileWarning,
  Gift,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const threatTactics = [
    {
      icon: <Clock className="w-5 h-5 text-risk-medium" />,
      title: 'Urgensi Waktu Palsu',
      description: 'Menciptakan batas waktu panik (15 menit, 24 jam) agar korban tidak sempat berpikir jernih.',
      badgeText: 'Manipulasi Psikologis'
    },
    {
      icon: <KeyRound className="w-5 h-5 text-risk-high" />,
      title: 'Permintaan OTP & Kredensial',
      description: 'Meminta kode OTP SMS, PIN, atau kata sandi dengan dalih verifikasi keamanan atau pembaruan sistem.',
      badgeText: 'Pencurian Akses'
    },
    {
      icon: <FileWarning className="w-5 h-5 text-risk-high" />,
      title: 'Unduhan Berkas (.APK)',
      description: 'Menyamarkan malware penguras rekening sebagai dokumen resi paket, surat tilang, atau undangan nikah.',
      badgeText: 'Malware Android'
    },
    {
      icon: <Gift className="w-5 h-5 text-brand" />,
      title: 'Iming-iming Hadiah & Bansos',
      description: 'Menjanjikan saldo tunai atau kuota gratis dengan syarat memasukkan data pribadi atau menyebar tautan.',
      badgeText: 'Umpan Finansial'
    }
  ];

  return (
    <div className="space-y-16">
      {/* SECTION 1: Asymmetric 60/40 Split Hero */}
      <section className="pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: 60% Width (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-border">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold text-brand tracking-wide">
                Edukasi Keamanan Digital Indonesia
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-ink leading-[1.2] tracking-tight">
              Kenali Manipulasi Siber <br className="hidden sm:inline" />
              <span className="text-brand">Sebelum Terlambat.</span>
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-xl">
              Penipu tidak meretas sistem keamanan yang rumit — mereka memanipulasi rasa panik dan kelengahan kita. CyberGuard AI membantu Anda membedah indikator bahaya pesan secara objektif.
            </p>

            {/* Dual Primary-Secondary CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('analyzer')}
                className="w-full sm:w-auto"
              >
                <Search className="w-4 h-4 mr-2" />
                Analisis Pesan Mencurigakan
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('quiz')}
                className="w-full sm:w-auto"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Mulai Kuis Keputusan
              </Button>
            </div>

            {/* Quick Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> 100% Berbasis Bukti Nyata
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> Tanpa Skor Numerik Palsu
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> Privasi Terlindungi
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 40% Width (5/12 cols) - Framed Real Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-card overflow-hidden border border-hairline shadow-card bg-surface group">
              <img
                src="/assets/images/hero-cyberguard.jpg"
                alt="Pelajar Indonesia menganalisis pesan digital di laptop dengan kritis"
                className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />

              {/* Floating Verified Trust Badge Container */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-3.5 rounded-control border border-hairline shadow-subtle flex items-center gap-3">
                <div className="w-10 h-10 rounded-control bg-brand-soft border border-brand-border flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">Kerangka Kerja Verifikasi</h4>
                  <p className="text-[11px] text-ink-muted">Praktikkan kebiasaan kritis digital setiap saat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Kerangka Kerja 3 Langkah "Think Before You Click" */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-ink">Kerangka Kerja 3-Langkah</h2>
          <p className="text-sm text-ink-muted">
            Tiga kebiasaan sederhana untuk melindungi diri Anda dari jeratan rekayasa sosial di internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="w-8 h-8 rounded bg-surface-muted text-brand font-bold text-sm flex items-center justify-center border border-hairline">
              01
            </div>
            <h3 className="text-base font-bold text-ink">Telaah Teks</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Cermati apakah pesan memuat bahasa desakan waktu, ancaman pemblokiran, atau iming-iming hadiah yang tidak masuk akal.
            </p>
          </Card>

          <Card className="space-y-3 border-brand-border/80">
            <div className="w-8 h-8 rounded bg-brand-soft text-brand font-bold text-sm flex items-center justify-center border border-brand-border">
              02
            </div>
            <h3 className="text-base font-bold text-brand">Uji Bukti</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Periksa ekstensi berkas (hindari .apk), teliti nama domain URL, dan jangan pernah memberikan kode OTP atau password.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-8 h-8 rounded bg-surface-muted text-brand font-bold text-sm flex items-center justify-center border border-hairline">
              03
            </div>
            <h3 className="text-base font-bold text-ink">Ambil Sikap Aman</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Konfirmasikan ke nomor resmi lembaga secara terpisah, blokir nomor pengirim yang mencurigakan, dan laporkan.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 3: Grid 4 Anatomi Rekayasa Sosial */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">Anatomi Modus Manipulasi Siber</h2>
            <p className="text-sm text-ink-muted mt-1">
              Kenali empat pola umum yang paling sering menjerat korban di Indonesia.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('quiz')}
          >
            Uji Pemahaman Anda di Kuis
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {threatTactics.map((tactic, idx) => (
            <Card key={idx} variant="interactive" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-control bg-surface-muted flex items-center justify-center border border-hairline">
                  {tactic.icon}
                </div>
                <h3 className="text-sm font-bold text-ink">{tactic.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {tactic.description}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block pt-2 border-t border-hairline/60">
                {tactic.badgeText}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 4: Trust & Transparency Card */}
      <section>
        <Card variant="muted" className="border-brand-border/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5 text-brand" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-ink">Komitmen Transparansi Edukasi</h4>
              <p className="text-xs text-ink-muted leading-relaxed max-w-2xl">
                CyberGuard AI tidak memberikan jaminan keamanan mutlak atau menerbitkan sertifikasi resmi. Kami hadir sebagai instrumen pembelajaran mandiri agar masyarakat semakin tangguh dalam menjaga data pribadi.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('analyzer')}
            className="shrink-0 w-full sm:w-auto"
          >
            Mulai Analisis Pesan
          </Button>
        </Card>
      </section>
    </div>
  );
};
