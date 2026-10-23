import React, { useState } from 'react';
import { AnalysisReport } from '../../../types';
import { analyzeMessageLocally, SAMPLE_MESSAGES } from '../../../services/analyzer/heuristicEngine';
import { SAMPLE_MESSAGES_EN } from '../../../i18n/translations';
import { useSettings } from '../../../context/SettingsContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { EvidenceReportView } from './EvidenceReportView';
import { Search, RotateCcw, Sparkles, Lock, Cpu, FileText, AlertCircle } from 'lucide-react';

export const AnalyzerScreen: React.FC = () => {
  const { t, language } = useSettings();
  const sampleList = language === 'en' ? SAMPLE_MESSAGES_EN : SAMPLE_MESSAGES;

  const [inputText, setInputText] = useState('');
  const [analyzedText, setAnalyzedText] = useState('');
  const [uiState, setUiState] = useState<'empty' | 'loading' | 'error' | 'success'>('empty');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_CHAR = 2000;
  const MIN_CHAR = 10;

  const handleSelectSample = (sampleText: string) => {
    setInputText(sampleText);
    setUiState('empty');
    setReport(null);
    setErrorMessage('');
  };

  const handleClear = () => {
    setInputText('');
    setAnalyzedText('');
    setUiState('empty');
    setReport(null);
    setErrorMessage('');
  };

  const handleAnalyze = async () => {
    const trimmed = inputText.trim();
    if (trimmed.length < MIN_CHAR) {
      setErrorMessage(t('minCharError'));
      setUiState('error');
      return;
    }

    setUiState('loading');
    setErrorMessage('');

    // Jeda UX realistis (400ms) untuk pemindaian aturan heuristik
    setTimeout(() => {
      try {
        const localResult = analyzeMessageLocally(trimmed);
        setReport(localResult);
        setAnalyzedText(trimmed);
        setUiState('success');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : (language === 'en' ? 'An error occurred while analyzing message.' : 'Terjadi kendala saat menganalisis pesan.');
        setErrorMessage(message);
        setUiState('error');
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="space-y-2 border-b border-hairline pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-brand-soft border border-brand-border">
            {t('analyzerBadge')}
          </span>
          <span className="text-xs text-ink-muted">
            {language === 'en' ? 'Client-Side Self-Analysis Module' : 'Modul Analisis Mandiri Sisi-Klien'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {t('analyzerHeading')}
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed max-w-2xl">
              {t('analyzerDesc')}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-control bg-surface border border-hairline text-xs font-medium text-ink-muted shrink-0 shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span>{language === 'en' ? 'Heuristic Engine: v2.4 (Autonomous)' : 'Mesin Heuristik: v2.4 (Otonom)'}</span>
          </div>
        </div>
      </div>

      {/* 12-COLUMN WORKSTATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT FORM COLUMN (5/12 cols) ================= */}
        <section aria-label={t('inputBoxTitle')} className="lg:col-span-5 space-y-4">
          {/* Privacy Callout Alert */}
          <div className="bg-risk-medium-soft border-l-4 border-risk-medium p-4 rounded-control border border-risk-medium-border/60 shadow-subtle space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-risk-medium">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{language === 'en' ? 'Privacy & Security Notice' : 'Perhatian Privasi Keamanan'}</span>
            </div>
            <p className="text-[11px] text-ink leading-relaxed">
              {language === 'en'
                ? 'Never enter real passwords, SMS OTP codes, banking PINs, or national ID numbers into any online input box.'
                : 'Jangan pernah memasukkan kata sandi, kode OTP, PIN perbankan, atau nomor identitas (NIK/KTP) pribadi ke dalam kotak formulir.'}
            </p>
          </div>

          {/* Quick Scenario Preset Chips */}
          <Card className="space-y-2.5 border-hairline shadow-card">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-ink">
                {language === 'en' ? 'Load Test Case Scenario:' : 'Muat Contoh Skenario Nyata:'}
              </span>
              <span className="text-[11px] text-brand font-semibold">
                {sampleList.length} {t('casesAvailable')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleList.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample.fullText)}
                  className="text-xs px-3 py-1.5 rounded-full bg-surface hover:bg-brand-soft hover:text-brand border border-hairline hover:border-brand-border text-ink-muted font-medium transition-all cursor-pointer focus-ring"
                >
                  <Sparkles className="w-3 h-3 inline mr-1 text-brand" />
                  {sample.title}
                </button>
              ))}
            </div>
          </Card>

          {/* Textarea Form Card */}
          <Card className="space-y-4 border-hairline shadow-card">
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <label htmlFor="message-input" className="text-xs font-bold text-ink uppercase tracking-wider block">
                {t('inputBoxTitle')}
              </label>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-muted text-ink-muted border border-hairline">
                <Cpu className="w-3 h-3 text-brand" />
                {language === 'en' ? 'Heuristic Engine' : 'Mode Heuristik'}
              </span>
            </div>

            <div className="relative">
              <textarea
                id="message-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, MAX_CHAR))}
                placeholder={language === 'en' ? 'Paste message text from WhatsApp, SMS, or email here to inspect...' : 'Tempelkan teks pesan dari WhatsApp, SMS, atau email di sini untuk diuji...'}
                rows={6}
                className="w-full p-3.5 rounded-control border border-hairline bg-surface text-ink placeholder:text-ink-subtle text-xs sm:text-sm leading-relaxed focus-ring transition-colors resize-none font-sans"
              />
            </div>

            {/* Counter and Clear action */}
            <div className="flex items-center justify-between text-xs text-ink-muted pt-0.5">
              <span className={inputText.length > MAX_CHAR * 0.9 ? 'text-risk-high font-semibold' : ''}>
                {inputText.length} / {MAX_CHAR} {t('charCount')}
              </span>
              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={uiState === 'loading'}
                  className="text-ink-muted hover:text-risk-high transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('clearBtn')}</span>
                </button>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                disabled={uiState === 'loading' || !inputText.trim()}
                className="w-full justify-center shadow-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                {uiState === 'loading' ? t('analyzingBtn') : t('analyzeBtn')}
              </Button>
            </div>

            {/* Micro Trust Badge */}
            <div className="pt-3 border-t border-hairline flex items-center gap-2 text-[11px] text-ink-muted">
              <Lock className="w-3.5 h-3.5 text-brand shrink-0" />
              <span>{t('privacyPill')}</span>
            </div>
          </Card>
        </section>

        {/* ================= RIGHT FORENSIC RESULTS COLUMN (7/12 cols) ================= */}
        <section aria-label={t('analysisVerdictTitle')} className="lg:col-span-7">
          {/* STATE 1: EMPTY STATE */}
          {uiState === 'empty' && (
            <Card variant="muted" className="text-center py-14 px-6 space-y-3 border-hairline">
              <div className="w-12 h-12 rounded-full bg-surface border border-hairline flex items-center justify-center mx-auto text-ink-muted shadow-subtle">
                <FileText className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-base font-bold text-ink">
                {language === 'en' ? 'Forensic Workbench Ready' : 'Meja Kerja Forensik Siap'}
              </h3>
              <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
                {language === 'en'
                  ? 'Paste a suspicious message into the input box on the left, or pick one of the sample scenarios to begin scanning for threat indicators.'
                  : 'Tempelkan teks pesan mencurigakan pada formulir di sebelah kiri, atau pilih salah satu skenario contoh untuk memulai pemindaian indikator bahaya rekayasa sosial.'}
              </p>
            </Card>
          )}

          {/* STATE 2: LOADING SKELETON STATE */}
          {uiState === 'loading' && (
            <Card className="p-6 space-y-4 animate-pulse border-hairline">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="h-5 bg-surface-muted rounded w-1/3" />
                <div className="h-6 bg-surface-muted rounded-full w-28" />
              </div>
              <div className="h-20 bg-surface-muted rounded-control" />
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-surface-muted rounded w-full" />
                <div className="h-4 bg-surface-muted rounded w-4/5" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-16 bg-surface-muted rounded-control" />
                <div className="h-16 bg-surface-muted rounded-control" />
              </div>
              <p className="text-center text-xs text-brand font-medium pt-2">
                {language === 'en'
                  ? 'Deconstructing social engineering tactics, panic urgency, and manipulative links...'
                  : 'Membedah pola rekayasa sosial, urgensi palsu, dan tautan manipulatif...'}
              </p>
            </Card>
          )}

          {/* STATE 3: ERROR STATE */}
          {uiState === 'error' && (
            <Card className="border-risk-high-border bg-risk-high-soft p-5 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-risk-high shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-risk-high">
                    {language === 'en' ? 'Inspection Cannot Proceed' : 'Pemeriksaan Tidak Dapat Dilanjutkan'}
                  </h4>
                  <p className="text-xs text-ink leading-relaxed">
                    {errorMessage || (language === 'en' ? 'An issue occurred with the entered text. Please check the message content.' : 'Terdapat kesalahan pada teks yang dimasukkan. Silakan periksa kembali isi pesan.')}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setUiState('empty')}>
                {t('close')}
              </Button>
            </Card>
          )}

          {/* STATE 4: SUCCESS REPORT VIEW */}
          {uiState === 'success' && report && (
            <EvidenceReportView report={report} analyzedText={analyzedText} />
          )}
        </section>
      </div>
    </div>
  );
};
