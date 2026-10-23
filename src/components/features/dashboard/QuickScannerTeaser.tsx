import React, { useState, useMemo, useEffect } from 'react';
import { ActiveTab, AnalysisReport } from '../../../types';
import { analyzeMessageLocally } from '../../../services/analyzer/heuristicEngine';
import { TEASER_PRESETS, TeaserPreset } from './dashboardData';
import { TEASER_PRESETS_EN } from '../../../i18n/translations';
import { useSettings } from '../../../context/SettingsContext';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import {
  Smartphone,
  ShieldAlert,
  Search,
  ArrowRight,
  Lock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface QuickScannerTeaserProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const QuickScannerTeaser: React.FC<QuickScannerTeaserProps> = ({ onNavigate }) => {
  const { t, language } = useSettings();
  const presets = language === 'en' ? TEASER_PRESETS_EN : TEASER_PRESETS;

  const [selectedPresetId, setSelectedPresetId] = useState<string>('apk-courier');
  const [inputText, setInputText] = useState<string>(presets[0].text);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Perbarui inputText jika bahasa berubah dan bukan dalam mode kustom
  useEffect(() => {
    if (!isCustomMode) {
      const match = presets.find(p => p.id === selectedPresetId) || presets[0];
      setInputText(match.text);
    }
  }, [language, isCustomMode, selectedPresetId, presets]);

  const currentPreset = useMemo(
    () => presets.find(p => p.id === selectedPresetId) || presets[0],
    [selectedPresetId, presets]
  );

  // Analisis heuristik reaktif saat dalam mode custom
  const customReport: AnalysisReport | null = useMemo(() => {
    if (!isCustomMode || inputText.trim().length < 5) return null;
    try {
      return analyzeMessageLocally(inputText);
    } catch {
      return null;
    }
  }, [isCustomMode, inputText]);

  const handleSelectPreset = (preset: TeaserPreset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    setIsCustomMode(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setIsCustomMode(true);
  };

  const handleResetToPreset = () => {
    setInputText(currentPreset.text);
    setIsCustomMode(false);
  };

  const renderHighlightedMessage = (text: string, highlight: string) => {
    if (!highlight || !text.includes(highlight)) {
      return text;
    }
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="bg-risk-high-soft text-risk-high px-1 py-0.5 rounded font-semibold underline decoration-wavy decoration-risk-high">
          {highlight}
        </span>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <section className="space-y-6 pt-6 border-t border-hairline" id="analisis-teaser">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-soft border border-brand-border text-brand text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
            <span>{t('teaserBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {t('teaserHeading')}
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            {t('teaserDesc')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-ink-muted bg-surface p-2.5 rounded-control border border-hairline shadow-subtle shrink-0">
          <Lock className="w-4 h-4 text-brand shrink-0" />
          <span>{t('clientSideNotice')}</span>
        </div>
      </div>

      {/* 2-COLUMN SCANNER & PREVIEW WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KOLOM KIRI (7/12 cols): Interactive Preset & Input Form */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="space-y-4 border-hairline shadow-card">
            {/* Preset Selector Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink uppercase tracking-wider block">
                {t('presetLabel')}
              </label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => {
                  const isActive = !isCustomMode && selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset as TeaserPreset)}
                      className={`text-xs px-3 py-1.5 rounded-control font-medium transition-all border ${
                        isActive
                          ? 'bg-brand text-white border-brand shadow-sm'
                          : 'bg-surface hover:bg-surface-muted text-ink border-hairline'
                      }`}
                    >
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Textarea Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t('inputLabel')}</span>
                {isCustomMode && (
                  <button
                    type="button"
                    onClick={handleResetToPreset}
                    className="inline-flex items-center gap-1 text-brand hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t('backToSample')}</span>
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={handleTextChange}
                rows={4}
                placeholder={t('inputPlaceholder')}
                className="w-full rounded-control border border-hairline p-3.5 text-xs sm:text-sm text-ink bg-surface focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all leading-relaxed resize-none"
              />
            </div>

            {/* Pattern Badges & Navigation Buttons */}
            <div className="pt-2 border-t border-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-ink-muted flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                <span>{t('detectNotice')}</span>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('analyzer')}
                className="w-full sm:w-auto"
              >
                <span>{t('openFullAnalyzer')}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* KOLOM KANAN (5/12 cols): WhatsApp Preview & Forensic Breakdown Card */}
        <div className="lg:col-span-5 relative">
          {/* Floating Brand Anchor Pill */}
          <div className="absolute -top-3 right-6 z-10 bg-ink text-white px-3 py-1 rounded-full text-[11px] font-semibold shadow-md flex items-center gap-1.5 border border-white/20">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            <span>Think Before You Click</span>
          </div>

          <Card className="space-y-4 border-hairline shadow-card pt-6">
            {/* Simulation Header */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-high animate-ping" />
                <h3 className="text-sm font-bold text-ink">{t('simulationTitle')}</h3>
              </div>
              <Badge variant={!isCustomMode || (customReport && customReport.riskLevel === 'HIGH') ? 'high' : customReport && customReport.riskLevel === 'MEDIUM' ? 'medium' : 'low'}>
                {!isCustomMode || (customReport && customReport.riskLevel === 'HIGH')
                  ? t('riskHigh')
                  : customReport && customReport.riskLevel === 'MEDIUM'
                    ? t('riskMedium')
                    : t('riskLow')}
              </Badge>
            </div>

            {/* Fictional WhatsApp Message Box Bubble */}
            <div className="rounded-control bg-surface-muted dark:bg-[#182C48] border border-hairline dark:border-[#335583] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-ink-muted pb-1.5 border-b border-hairline dark:border-[#335583]">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <Smartphone className="w-3.5 h-3.5 text-brand" />
                  {!isCustomMode ? currentPreset.sender : '+62 8XX-XXXX-XXXX'}
                </span>
                <span>{!isCustomMode ? currentPreset.timestamp : (language === 'en' ? 'Just now' : 'Baru saja')}</span>
              </div>
              <p className="text-xs text-ink leading-relaxed font-sans bg-surface dark:bg-[#223B5B] p-3 rounded border border-hairline dark:border-[#335583]">
                {!isCustomMode
                  ? renderHighlightedMessage(currentPreset.text, currentPreset.highlightPhrase)
                  : inputText || (language === 'en' ? '(Empty message)' : '(Pesan kosong)')}
              </p>
            </div>

            {/* Attack Vector Findings Section */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                {t('threatVectorHeading')}
              </div>

              <div className="space-y-2">
                {!isCustomMode ? (
                  currentPreset.threatVectors.map((vector, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-control bg-surface border border-hairline text-xs"
                    >
                      {vector.severity === 'CRITICAL' ? (
                        <ShieldAlert className="w-4 h-4 text-risk-high shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-risk-medium shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5">
                        <span className={`font-bold block ${vector.severity === 'CRITICAL' ? 'text-risk-high' : 'text-risk-medium'}`}>
                          [{vector.title}]
                        </span>
                        <p className="text-[11px] text-ink-muted leading-relaxed">
                          {vector.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : customReport && customReport.detectedIndicators.length > 0 ? (
                  customReport.detectedIndicators.slice(0, 3).map((ind, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-control bg-surface border border-hairline text-xs"
                    >
                      <ShieldAlert className="w-4 h-4 text-risk-high shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-risk-high block">
                          [{ind.label}]
                        </span>
                        <p className="text-[11px] text-ink-muted leading-relaxed">
                          {ind.educationalAdvice}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-control bg-risk-low-soft border border-risk-low-border flex items-center gap-2 text-xs text-risk-low">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t('noThreatsDetected')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Heuristic Safety Verdict Bar */}
            <div className="pt-3 border-t border-hairline space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">{t('verdictHeading')}</span>
                <span className="font-bold text-risk-high">
                  {!isCustomMode || (customReport && customReport.riskLevel === 'HIGH')
                    ? t('actionDontClick')
                    : t('actionVerify')}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted italic">
                {t('courierTip')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
