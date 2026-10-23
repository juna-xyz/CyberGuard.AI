import React from 'react';
import { ActiveTab } from '../../../types';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { QuickScannerTeaser } from './QuickScannerTeaser';
import { THREAT_TACTICS } from './dashboardData';
import { THREAT_TACTICS_EN } from '../../../i18n/translations';
import { useSettings } from '../../../context/SettingsContext';
import {
  ShieldCheck, Search, HelpCircle, Clock, KeyRound, FileWarning,
  Gift, CheckCircle2, AlertCircle, ArrowRight, GraduationCap
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (tab: ActiveTab) => void;
}

const TACTIC_ICONS = [
  <Clock className="w-5 h-5 text-risk-medium" key="clock" />,
  <KeyRound className="w-5 h-5 text-risk-high" key="key" />,
  <FileWarning className="w-5 h-5 text-risk-high" key="file" />,
  <Gift className="w-5 h-5 text-brand" key="gift" />
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { t, language } = useSettings();
  const currentTactics = language === 'en' ? THREAT_TACTICS_EN : THREAT_TACTICS;

  return (
    <div className="space-y-16">
      {/* SECTION 1: Asymmetric 60/40 Split Hero */}
      <section className="pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: 60% Width (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-border">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold text-brand tracking-wide">
                {t('heroBadge')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-ink leading-[1.18] tracking-tight">
              {language === 'en' ? (
                <>
                  Recognize Digital Manipulation <br className="hidden sm:inline" />
                  <span className="text-brand">Before It Is Too Late.</span>
                </>
              ) : (
                <>
                  Kenali Manipulasi Siber <br className="hidden sm:inline" />
                  <span className="text-brand">Sebelum Terlambat.</span>
                </>
              )}
            </h1>

            <p className="text-base text-ink-muted leading-relaxed max-w-xl">
              {t('heroDesc')}
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
                {t('heroCtaAnalyze')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('quiz')}
                className="w-full sm:w-auto"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                {t('heroCtaQuiz')}
              </Button>
            </div>

            {/* Quick Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> {t('heroPill1')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> {t('heroPill2')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand" /> {t('heroPill3')}
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 40% Width (5/12 cols) - Framed Real Photography Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-card overflow-hidden border border-hairline shadow-card bg-surface group">
              <img
                src="/assets/images/hero-cyberguard.jpg"
                alt={language === 'en' ? 'Teen boy looking at laptop with WhatsApp message thinking critically' : 'Remaja laki-laki menatap layar laptop berisi pesan WhatsApp sambil berpikir kritis sebelum mengklik'}
                className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />

              {/* Floating Verified Trust Badge Container */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#29231F]/88 backdrop-blur-md p-3.5 rounded-control border border-[#60A5FA]/20 shadow-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-control bg-[#1E40AF]/40 border border-[#60A5FA]/35 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#60A5FA]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F8F2E9]">{t('heroOverlayTitle')}</h4>
                  <p className="text-[11px] text-[#DBEAFE]">{t('heroOverlaySubtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Kerangka Kerja 3 Langkah "Think Before You Click" */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-ink">{t('frameworkHeading')}</h2>
          <p className="text-sm text-ink-muted">
            {t('frameworkDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="w-8 h-8 rounded bg-surface-muted text-brand font-bold text-sm flex items-center justify-center border border-hairline">
              {t('step1Num')}
            </div>
            <h3 className="text-base font-bold text-ink">{t('step1Title')}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t('step1Desc')}
            </p>
          </Card>

          <Card className="space-y-3 border-brand-border/80">
            <div className="w-8 h-8 rounded bg-brand-soft text-brand font-bold text-sm flex items-center justify-center border border-brand-border">
              {t('step2Num')}
            </div>
            <h3 className="text-base font-bold text-brand">{t('step2Title')}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t('step2Desc')}
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-8 h-8 rounded bg-surface-muted text-brand font-bold text-sm flex items-center justify-center border border-hairline">
              {t('step3Num')}
            </div>
            <h3 className="text-base font-bold text-ink">{t('step3Title')}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t('step3Desc')}
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 3: Quick Scanner Teaser */}
      <QuickScannerTeaser onNavigate={onNavigate} />

      {/* SECTION 4: Grid 4 Anatomi Rekayasa Sosial */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">{t('tacticsHeading')}</h2>
            <p className="text-sm text-ink-muted mt-1">
              {t('tacticsDesc')}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('quiz')}
          >
            {t('heroCtaQuiz')}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentTactics.map((tactic, idx) => (
            <Card key={idx} variant="interactive" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-control bg-surface-muted flex items-center justify-center border border-hairline">
                  {TACTIC_ICONS[idx]}
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

      {/* SECTION 5: High-Contrast Quiz Callout Banner */}
      <section className="rounded-card bg-surface-muted border border-hairline p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-soft text-brand border border-brand-border text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('quizBadge')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
            {t('quizHeading')}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {t('quizDesc')}
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => onNavigate('quiz')}
          className="shrink-0 w-full sm:w-auto shadow-subtle"
        >
          <span>{t('heroCtaQuiz')}</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </section>

      {/* SECTION 6: Trust & Transparency Card */}
      <section>
        <Card variant="muted" className="border-brand-border/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5 text-brand" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-ink">
                {language === 'en' ? 'Educational Transparency Commitment' : 'Komitmen Transparansi Edukasi'}
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed max-w-2xl">
                {t('footerDisclaimer')}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={() => onNavigate('analyzer')}
            className="shrink-0 w-full sm:w-auto"
          >
            {t('heroCtaAnalyze')}
          </Button>
        </Card>
      </section>
    </div>
  );
};
