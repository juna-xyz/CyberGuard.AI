import React, { useState, useRef } from 'react';
import { AnalysisReport, ObservableIndicator, SocialEngineeringTacticType } from '../../../types';
import { detectSocialEngineeringTactics } from '../../../services/analyzer/heuristicEngine';
import { GeminiCallStatus, GeminiExplanation, GeminiApiError, explainWithGemini, getCachedExplanation } from '../../../services/analyzer/geminiClient';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { useSettings } from '../../../context/SettingsContext';
import {
  ShieldAlert, ShieldCheck, Lightbulb, CheckSquare, Square,
  Info, Eye, FileCode, Clock, KeyRound, Gift, Building,
  Sparkles, Loader2, AlertTriangle, WifiOff, ChevronDown, ChevronUp, ExternalLink,
  BrainCircuit, Lock
} from 'lucide-react';

interface EvidenceReportViewProps {
  report: AnalysisReport;
  analyzedText: string;
}

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const EvidenceReportView: React.FC<EvidenceReportViewProps> = ({ report, analyzedText }) => {
  const { t, language } = useSettings();
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // AI Copilot state — terpisah dari heuristik lokal
  const [aiStatus, setAiStatus] = useState<GeminiCallStatus>('idle');
  const [aiResult, setAiResult] = useState<GeminiExplanation | null>(null);
  const [aiError, setAiError] = useState<string>('');
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  // Countdown timer untuk jeda klik ulang (cooldown) setelah HTTP 429
  React.useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  // Pulihkan hasil penjelasan AI dari cache sesi jika temuan analisis atau teks ini sudah pernah dianalisis
  React.useEffect(() => {
    const cached = getCachedExplanation(report, language) ||
      (analyzedText ? getCachedExplanation(analyzedText, language) : null);
    if (cached) {
      setAiResult(cached);
      setAiStatus('success');
      setAiError('');
    } else {
      // PENTING: Dilarang memanggil API secara otomatis pada page load/language switch/theme switch!
      setAiStatus('idle');
      setAiResult(null);
      setAiError('');
    }
  }, [report, analyzedText, language]);

  const handleConsentAndCall = async (forceRefresh = false) => {
    if (cooldownSeconds > 0) return;

    // Reset status error dan pasang loading, jangan hapus aiResult lama agar tetap terlihat jika retry gagal
    setAiError('');
    setAiStatus('loading');
    setAiPanelOpen(true);
    setIsRateLimited(false);

    // Batalkan request sebelumnya jika ada
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await explainWithGemini(report, controller.signal, language, {
        forceRefresh,
        originalText: analyzedText
      });
      if (result === null) {
        setAiStatus('unavailable');
      } else {
        setAiResult(result);
        setAiStatus('success');
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const is429 = (err instanceof GeminiApiError && err.isRateLimit) ||
        (err instanceof Error && (
          err.message.includes('429') ||
          err.message.toLowerCase().includes('rate limit') ||
          err.message.toLowerCase().includes('kuota')
        ));

      if (is429) {
        setIsRateLimited(true);
        setCooldownSeconds(15);
      }

      setAiError(err instanceof Error ? err.message : (language === 'en' ? 'An unexpected error occurred.' : 'Terjadi kesalahan tidak terduga.'));
      setAiStatus('error');
    }
  };

  const handleReset = () => {
    if (abortRef.current) abortRef.current.abort();
    setAiStatus('idle');
    setAiResult(null);
    setAiError('');
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Helper untuk merender teks dengan highlight kata pemicu berbahaya
  const renderHighlightedText = (text: string, indicators: ObservableIndicator[]) => {
    const validSnippets = indicators
      .filter((i): i is ObservableIndicator & { detectedSnippet: string } =>
        Boolean(i.detectedSnippet && i.detectedSnippet.trim())
      )
      .map(i => ({
        snippet: i.detectedSnippet.trim(),
        severity: i.severity,
        label: i.label
      }));

    if (validSnippets.length === 0) {
      return <span className="text-ink">{text}</span>;
    }

    // Urutkan potongan kata dari yang terpanjang agar tidak terpotong sebagian
    validSnippets.sort((a, b) => b.snippet.length - a.snippet.length);

    const pattern = new RegExp(`(${validSnippets.map(v => escapeRegExp(v.snippet)).join('|')})`, 'gi');
    const parts = text.split(pattern);

    return (
      <>
        {parts.map((part, index) => {
          const matched = validSnippets.find(v => v.snippet.toLowerCase() === part.toLowerCase());
          if (matched) {
            const isCritical = matched.severity === 'CRITICAL';
            const tooltip = language === 'en'
              ? `Detected Trigger: ${matched.label} (${isCritical ? 'Critical Severity' : 'Warning Severity'})`
              : `Pemicu Terdeteksi: ${matched.label} (${isCritical ? 'Tingkat Kritis' : 'Tingkat Waspada'})`;

            return (
              <mark
                key={index}
                className={`inline-block px-1.5 py-0.5 mx-0.5 rounded font-semibold underline decoration-wavy text-xs transition-colors ${
                  isCritical
                    ? 'bg-risk-high-soft text-risk-high decoration-risk-high border border-risk-high-border/80'
                    : 'bg-risk-medium-soft text-risk-medium decoration-risk-medium border border-risk-medium-border/80'
                }`}
                title={tooltip}
              >
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  const getCategoryMeta = (category: string) => {
    if (language === 'en') {
      switch (category) {
        case 'URGENCY':
          return { label: 'Tactic: False Urgency', subtitle: 'Psychological Manipulation', icon: <Clock className="w-4 h-4 text-risk-medium" /> };
        case 'CREDENTIAL':
          return { label: 'Credentials: Data / OTP Request', subtitle: 'Access Theft', icon: <KeyRound className="w-4 h-4 text-risk-high" /> };
        case 'MALICIOUS_LINK':
          return { label: 'Technical: File Payload / Phishing Link', subtitle: 'Malware & Domain Threats', icon: <FileCode className="w-4 h-4 text-risk-high" /> };
        case 'FINANCIAL_LURE':
          return { label: 'Lure: Fake Prizes & Balance', subtitle: 'Euphoria Exploitation', icon: <Gift className="w-4 h-4 text-brand" /> };
        case 'IMPERSONATION':
          return { label: 'Identity: Official Entity Impersonation', subtitle: 'Authority Impersonation', icon: <Building className="w-4 h-4 text-risk-medium" /> };
        default:
          return { label: 'Social Engineering Indicator', subtitle: 'Warning Sign', icon: <ShieldAlert className="w-4 h-4 text-ink-muted" /> };
      }
    }
    switch (category) {
      case 'URGENCY':
        return { label: 'Taktik: Urgensi Palsu', subtitle: 'Manipulasi Psikologis', icon: <Clock className="w-4 h-4 text-risk-medium" /> };
      case 'CREDENTIAL':
        return { label: 'Kredensial: Permintaan Data / OTP', subtitle: 'Pencurian Akses', icon: <KeyRound className="w-4 h-4 text-risk-high" /> };
      case 'MALICIOUS_LINK':
        return { label: 'Teknis: Payload File / Tautan Phishing', subtitle: 'Ancaman Malware & Domain', icon: <FileCode className="w-4 h-4 text-risk-high" /> };
      case 'FINANCIAL_LURE':
        return { label: 'Umpan: Hadiah & Saldo Semu', subtitle: 'Eksploitasi Euforia', icon: <Gift className="w-4 h-4 text-brand" /> };
      case 'IMPERSONATION':
        return { label: 'Identitas: Peniruan Entitas Resmi', subtitle: 'Pencatutan Nama Otoritas', icon: <Building className="w-4 h-4 text-risk-medium" /> };
      default:
        return { label: 'Indikator Rekayasa Sosial', subtitle: 'Tanda Bahaya', icon: <ShieldAlert className="w-4 h-4 text-ink-muted" /> };
    }
  };

  const getTacticMeta = (type: SocialEngineeringTacticType) => {
    switch (type) {
      case 'URGENCY':
        return {
          icon: <Clock className="w-4 h-4 text-risk-medium" />,
          badgeClass: 'bg-risk-medium-soft text-risk-medium border-risk-medium-border'
        };
      case 'AUTHORITY_IMPERSONATION':
        return {
          icon: <Building className="w-4 h-4 text-risk-high" />,
          badgeClass: 'bg-risk-high-soft text-risk-high border-risk-high-border'
        };
      case 'FEAR':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-risk-high" />,
          badgeClass: 'bg-risk-high-soft text-risk-high border-risk-high-border'
        };
      case 'REWARD_BAIT':
        return {
          icon: <Gift className="w-4 h-4 text-brand" />,
          badgeClass: 'bg-brand-soft text-brand border-brand-border'
        };
      case 'SECRECY':
        return {
          icon: <Lock className="w-4 h-4 text-risk-high" />,
          badgeClass: 'bg-risk-high-soft text-risk-high border-risk-high-border'
        };
      default:
        return {
          icon: <ShieldAlert className="w-4 h-4 text-ink-muted" />,
          badgeClass: 'bg-surface-muted text-ink-muted border-hairline'
        };
    }
  };

  const tactics = report.detectedTactics ?? detectSocialEngineeringTactics(analyzedText);

  const borderAccent =
    report.riskLevel === 'HIGH'
      ? 'border-l-4 border-l-risk-high'
      : report.riskLevel === 'MEDIUM'
        ? 'border-l-4 border-l-risk-medium'
        : 'border-l-4 border-l-risk-low';

  const criticalCount = report.detectedIndicators.filter(i => i.severity === 'CRITICAL').length;
  const warningCount = report.detectedIndicators.filter(i => i.severity === 'WARNING').length;

  return (
    <div className="space-y-5" role="region" aria-label={t('evidenceStatusTitle')}>
      {/* 1. EXECUTIVE RISK SUMMARY CARD */}
      <Card className={`space-y-4 border-hairline shadow-card ${borderAccent}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-hairline">
          <div>
            <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              {t('evidenceStatusTitle')}
            </span>
            <Badge riskLevel={report.riskLevel} className="text-xs py-1 px-3 shadow-xs" />
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-semibold text-ink-muted block">{t('forensicMethodology')}</span>
            <span className="text-xs font-bold text-ink">{t('heuristicDetectionLabel')} • {report.analyzedAt}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-control bg-surface-muted/60 border border-hairline space-y-1">
            <span className="text-[11px] font-semibold text-ink-muted block">{t('evidenceSummaryTitle')}</span>
            <span className="text-xs font-bold text-ink block">
              {report.detectedIndicators.length > 0
                ? (language === 'en'
                    ? `Found ${report.detectedIndicators.length} manipulation indicators detected.`
                    : `Ditemukan ${report.detectedIndicators.length} indikator manipulasi terdeteksi.`)
                : t('noIndicators')}
            </span>
          </div>
          <div className="p-3 rounded-control bg-surface-muted/60 border border-hairline space-y-1">
            <span className="text-[11px] font-semibold text-ink-muted block">{t('threatClassificationTitle')}</span>
            <span className="text-xs font-bold text-ink block">
              {criticalCount > 0 ? `${criticalCount} ${t('criticalLabel')}` : `0 ${t('criticalLabel')}`} • {warningCount > 0 ? `${warningCount} ${t('warningLabel')}` : `0 ${t('warningLabel')}`}
            </span>
          </div>
        </div>
      </Card>

      {/* 2. INSPEKSI KATA PEMICU DALAM TEKS (HIGHLIGHTED MESSAGE PREVIEW) */}
      <Card className="space-y-3.5 border-hairline shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-hairline">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-brand shrink-0" />
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              {t('triggerWordInspection')}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span className="inline-flex items-center gap-1 text-risk-high bg-risk-high-soft px-2 py-0.5 rounded border border-risk-high-border/60">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-high" /> {t('criticalTrigger')}
            </span>
            <span className="inline-flex items-center gap-1 text-risk-medium bg-risk-medium-soft px-2 py-0.5 rounded border border-risk-medium-border/60">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-medium" /> {t('warningTrigger')}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-control bg-surface-muted/80 border border-hairline leading-relaxed text-xs sm:text-sm font-sans break-words space-y-2">
          <p>{renderHighlightedText(analyzedText, report.detectedIndicators)}</p>
        </div>

        <p className="text-[11px] text-ink-subtle italic">
          {t('hoverWordHint')}
        </p>
      </Card>

      {/* 3. TAKTIK REKAYASA SOSIAL (SOCIAL ENGINEERING TACTICS) */}
      <Card className="space-y-3.5 border-hairline shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-hairline">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-brand shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                {t('tacticsSectionTitle')}
              </h3>
              <p className="text-[11px] text-ink-muted">
                {t('tacticsSectionDesc')}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-badge border self-start sm:self-auto shrink-0 ${
            tactics.length > 0
              ? 'bg-brand-soft text-brand border-brand-border'
              : 'bg-risk-low-soft text-risk-low border-risk-low-border'
          }`}>
            {tactics.length > 0 ? `${tactics.length} ${t('detectedLabel')}` : t('cleanLabel')}
          </span>
        </div>

        {tactics.length === 0 ? (
          <div className="p-3.5 rounded-control bg-risk-low-soft border border-risk-low-border flex items-center gap-2.5 text-xs text-risk-low">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t('noTacticsDetected')}</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tactics.map((tactic, idx) => {
              const meta = getTacticMeta(tactic.type);
              const isCrit = tactic.severity === 'CRITICAL';
              const title = language === 'en' ? tactic.titleEn : tactic.titleId;
              const explanation = language === 'en' ? tactic.explanationEn : tactic.explanationId;

              return (
                <div
                  key={`${tactic.type}-${idx}`}
                  className={`p-3 rounded-control border text-xs space-y-1.5 transition-all ${
                    isCrit
                      ? 'border-hairline bg-surface border-l-4 border-l-risk-high'
                      : 'border-hairline bg-surface border-l-4 border-l-risk-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {meta.icon}
                      <span className="font-bold text-ink">{title}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-badge uppercase shrink-0 ${meta.badgeClass}`}>
                      {isCrit ? t('criticalLabel') : t('warningLabel')}
                    </span>
                  </div>

                  {tactic.matchedSnippet && (
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[11px] text-ink-muted">{t('tacticTriggerSnippet')}</span>
                      <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-muted border border-hairline font-bold text-ink">
                        "{tactic.matchedSnippet}"
                      </code>
                    </div>
                  )}

                  <p className="text-xs text-ink-muted leading-relaxed pt-0.5">
                    {explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* 4. TEMUAN INDIKATOR REKAYASA SOSIAL (EVIDENCE CARDS) */}
      <Card className="space-y-3.5 border-hairline shadow-card">
        <div className="flex items-center justify-between pb-2.5 border-b border-hairline">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand shrink-0" />
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              {t('socialIndicatorsTitle')} ({report.detectedIndicators.length})
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-badge border ${
            report.detectedIndicators.length > 0
              ? 'bg-risk-high-soft text-risk-high border-risk-high-border'
              : 'bg-risk-low-soft text-risk-low border-risk-low-border'
          }`}>
            {report.detectedIndicators.length > 0 ? `${report.detectedIndicators.length} ${t('detectedLabel')}` : t('cleanLabel')}
          </span>
        </div>

        {report.detectedIndicators.length === 0 ? (
          <div className="p-3.5 rounded-control bg-risk-low-soft border border-risk-low-border flex items-center gap-2.5 text-xs text-risk-low">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t('cleanMessageNote')}</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {report.detectedIndicators.map((ind) => {
              const meta = getCategoryMeta(ind.category);
              const isCrit = ind.severity === 'CRITICAL';
              return (
                <div
                  key={ind.id}
                  className={`p-3 rounded-control border text-xs space-y-1.5 transition-all ${
                    isCrit
                      ? 'border-hairline bg-surface border-l-4 border-l-risk-high'
                      : 'border-hairline bg-surface border-l-4 border-l-risk-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {meta.icon}
                      <span className="font-bold text-ink">{meta.label}</span>
                      <span className="text-[11px] text-ink-subtle hidden sm:inline">({meta.subtitle})</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-badge uppercase shrink-0 ${
                      isCrit ? 'bg-risk-high-soft text-risk-high' : 'bg-risk-medium-soft text-risk-medium'
                    }`}>
                      {isCrit ? t('criticalLabel') : t('warningLabel')}
                    </span>
                  </div>

                  {ind.detectedSnippet && (
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[11px] text-ink-muted">{t('triggerWordLabel')}</span>
                      <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-muted border border-hairline font-bold text-ink">
                        "{ind.detectedSnippet}"
                      </code>
                    </div>
                  )}

                  <p className="text-xs text-ink-muted leading-relaxed pt-0.5">
                    {ind.educationalAdvice}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* 4. PLAIN-LANGUAGE REASONING CARD */}
      <Card className="space-y-2.5 border-hairline shadow-card">
        <div className="flex items-center gap-2 pb-2 border-b border-hairline">
          <Lightbulb className="w-4 h-4 text-brand shrink-0" />
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            {t('whyDangerousTitle')}
          </h3>
        </div>
        <p className="text-xs text-ink leading-relaxed">
          {report.explanation}
        </p>
      </Card>

      {/* 5. PROTOKOL TINDAKAN MITIGASI SEGERA (INTERACTIVE CHECKLIST) */}
      <Card className="space-y-3.5 border-hairline shadow-card">
        <div className="flex items-center justify-between pb-2 border-b border-hairline">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand shrink-0" />
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              {t('mitigationProtocolTitle')}
            </h3>
          </div>
          <span className="text-[11px] text-ink-muted font-medium">
            {Object.values(completedSteps).filter(Boolean).length} {language === 'en' ? 'of' : 'dari'} {report.safeNextSteps.length} {t('securedOf')}
          </span>
        </div>

        <div className="space-y-2">
          {report.safeNextSteps.map((step, idx) => {
            const isDone = Boolean(completedSteps[idx]);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleStep(idx)}
                className={`w-full text-left p-3 rounded-control border text-xs flex items-start gap-3 transition-colors cursor-pointer ${
                  isDone
                    ? 'border-risk-low-border bg-risk-low-soft/40 text-ink line-through opacity-80'
                    : 'border-hairline bg-surface hover:bg-surface-muted/60 text-ink'
                }`}
              >
                <span className="shrink-0 mt-0.5 text-brand" aria-hidden="true">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-risk-low" />
                  ) : (
                    <Square className="w-4 h-4 text-ink-subtle" />
                  )}
                </span>
                <span className="leading-relaxed">{step}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 6. TRANSPARENT ACADEMIC DISCLAIMER */}
      <div className="p-3.5 rounded-control bg-surface-muted/60 text-[11px] text-ink-muted flex items-start gap-2.5 border border-hairline">
        <Info className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
        <p className="leading-relaxed">{report.detectionBoundaryNote}</p>
      </div>

      {/* 7. AI FORENSIC COPILOT (OPSIONAL — TERPISAH DARI HEURISTIK) */}
      <div className="border-t-2 border-dashed border-hairline pt-5 space-y-3">
        {/* Header divider */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand shrink-0" />
          <span className="text-xs font-bold text-ink uppercase tracking-wider">{t('aiTitle')}</span>
          <span className="ml-auto text-[10px] text-ink-muted font-medium italic">{t('aiOptional')}</span>
        </div>

        {/* STATE: IDLE — tampilkan consent banner + tombol */}
        {aiStatus === 'idle' && (
          <Card className="border border-brand-border bg-brand-soft/30 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-brand/10 border border-brand-border flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-ink">{t('aiConsentPrompt')}</p>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {t('aiConsentDesc')}
                </p>
                <p className="text-[10px] text-ink-subtle leading-relaxed">
                  {t('aiConsentWarning')}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleConsentAndCall(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-brand text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t('aiExplainBtn')}
              </button>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-control border border-hairline bg-surface text-[11px] text-ink-muted hover:text-brand transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                {t('privacyPolicy')}
              </a>
            </div>
          </Card>
        )}

        {/* STATE: LOADING */}
        {aiStatus === 'loading' && (
          <Card className="border-hairline flex items-center gap-3 py-5">
            <Loader2 className="w-5 h-5 text-brand animate-spin shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-ink">{t('aiLoading')}</p>
              <p className="text-[11px] text-ink-muted">{t('aiLoadingSub')}</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto text-[11px] text-ink-muted hover:text-risk-high transition-colors cursor-pointer shrink-0"
            >
              {t('cancelBtn')}
            </button>
          </Card>
        )}

        {/* STATE: UNAVAILABLE — API key tidak dikonfigurasi */}
        {aiStatus === 'unavailable' && (
          <Card className="border-hairline bg-surface-muted/50">
            <div className="flex items-start gap-3">
              <WifiOff className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-ink">{t('aiUnavailable')}</p>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {t('aiUnavailableDesc')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 text-[11px] text-brand hover:underline cursor-pointer"
            >
              {t('aiBack')}
            </button>
          </Card>
        )}

        {/* STATE: ERROR */}
        {aiStatus === 'error' && (
          <Card className="border-risk-medium-border bg-risk-medium-soft/30 space-y-2.5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-risk-medium shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-ink">{t('aiErrorTitle')}</p>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {aiError || (language === 'en' ? 'An error occurred while processing the request.' : 'Terjadi kesalahan saat memproses permintaan.')}
                </p>
                {isRateLimited && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium leading-relaxed">
                    {t('rateLimitCooldownText')}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                disabled={cooldownSeconds > 0}
                onClick={() => handleConsentAndCall(true)}
                className={`text-[11px] font-semibold transition-opacity ${
                  cooldownSeconds > 0
                    ? 'text-ink-muted opacity-50 cursor-not-allowed'
                    : 'text-brand hover:underline cursor-pointer'
                }`}
              >
                {cooldownSeconds > 0
                  ? t('retryInCooldown').replace('{seconds}', String(cooldownSeconds))
                  : t('retryBtn')}
              </button>
              <span className="text-ink-subtle text-[11px]">·</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                {t('cancelBtn')}
              </button>
            </div>
          </Card>
        )}

        {/* LOCAL EXPLANATION (NO AI) — Tampil saat API gagal atau tidak tersedia */}
        {(aiStatus === 'error' || aiStatus === 'unavailable') && (
          <Card className="border border-brand-border/60 bg-surface dark:bg-[#1E3555] space-y-3.5 shadow-subtle">
            {/* Header Local Explanation */}
            <div className="flex items-center justify-between pb-2.5 border-b border-hairline dark:border-[#335583] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-brand dark:text-brand-highlight shrink-0" />
                <span className="text-xs font-bold text-ink dark:text-[#F1F5F9]">
                  {t('localExplanationTitle')}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-badge bg-brand-soft dark:bg-[#1D3B66] text-brand dark:text-brand-highlight border border-brand-border dark:border-[#335583]">
                {t('localExplanationBadge')}
              </span>
            </div>

            {/* Subtitle / Note */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-control bg-surface-muted/60 dark:bg-[#182C48] border border-hairline dark:border-[#335583] text-[10px] text-ink-muted dark:text-[#CBD5E1]">
              <Info className="w-3.5 h-3.5 shrink-0 text-brand dark:text-brand-highlight" />
              <span>{t('localExplanationSubtitle')}</span>
            </div>

            {/* 1. Heuristic Summary & Finding */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted dark:text-[#CBD5E1] uppercase tracking-wider block">
                {t('localSummaryLabel')}
              </span>
              <p className="text-xs text-ink dark:text-[#F1F5F9] leading-relaxed font-semibold">
                {report.summaryHeading}
              </p>
              <p className="text-xs text-ink dark:text-[#CBD5E1] leading-relaxed">
                {report.explanation}
              </p>
            </div>

            {/* 2. Detected Social Engineering Tactics */}
            {tactics && tactics.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-hairline/60 dark:border-[#335583]/60">
                <span className="text-[11px] font-bold text-ink-muted dark:text-[#CBD5E1] uppercase tracking-wider block">
                  {t('localTacticsLabel')} ({tactics.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tactics.map((tactic, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-control bg-surface-muted/50 dark:bg-[#182C48] border border-hairline dark:border-[#335583]/70 space-y-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          tactic.severity === 'CRITICAL' ? 'bg-risk-high' : 'bg-risk-medium'
                        }`} />
                        <span className="text-xs font-bold text-ink dark:text-[#F1F5F9]">
                          {language === 'en' ? tactic.titleEn : tactic.titleId}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-muted dark:text-[#CBD5E1] leading-relaxed">
                        {language === 'en' ? tactic.explanationEn : tactic.explanationId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Safety Recommendations */}
            {report.safeNextSteps && report.safeNextSteps.length > 0 && (
              <div className="space-y-1.5 pt-1 border-t border-hairline/60 dark:border-[#335583]/60">
                <span className="text-[11px] font-bold text-ink-muted dark:text-[#CBD5E1] uppercase tracking-wider block">
                  {t('localSafetyLabel')}
                </span>
                <ul className="space-y-1">
                  {report.safeNextSteps.slice(0, 3).map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink dark:text-[#F1F5F9]">
                      <ShieldCheck className="w-3.5 h-3.5 text-risk-low shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {/* HASIL AI EXPLANATION — Tampilkan jika ada hasil (tetap tampil jika retry sedang berjalan atau gagal) */}
        {aiResult && (aiStatus === 'success' || aiStatus === 'error' || aiStatus === 'loading') && (
          <Card className="border border-brand-border/60 bg-brand-soft/20 space-y-3">
            {/* Header AI result */}
            <div className="flex items-center justify-between pb-2.5 border-b border-brand-border/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-bold text-brand">{t('aiResultHeader')}</span>
                {aiStatus === 'error' && (
                  <span className="text-[10px] text-risk-medium font-semibold bg-risk-medium-soft px-1.5 py-0.5 rounded border border-risk-medium-border">
                    {t('aiPrevResultBadge')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ink-muted italic">{t('aiOptional')} · {language === 'en' ? 'Does not replace local analysis' : 'Tidak menggantikan analisis lokal'}</span>
                <button
                  type="button"
                  onClick={() => setAiPanelOpen(p => !p)}
                  className="p-1 rounded hover:bg-surface-muted transition-colors cursor-pointer"
                  aria-label={aiPanelOpen ? t('aiHide') : t('aiShow')}
                >
                  {aiPanelOpen ? <ChevronUp className="w-3.5 h-3.5 text-ink-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />}
                </button>
              </div>
            </div>

            {/* Disclaimer pembeda yang jelas */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-control bg-surface border border-hairline text-[10px] text-ink-muted">
              <Info className="w-3 h-3 shrink-0 text-brand" />
              <span>{t('aiDisclaimer')}</span>
            </div>

            {aiPanelOpen && (
              <div className="space-y-3">
                {/* AI Summary */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">{t('aiSummaryLabel')}</span>
                  <p className="text-xs text-ink leading-relaxed">{aiResult.summary}</p>
                </div>

                {/* AI Indicators */}
                {aiResult.indicators && aiResult.indicators.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">{t('aiIndicatorsLabel')}</span>
                    <ul className="space-y-1">
                      {aiResult.indicators.map((ind, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                          <span className="leading-relaxed">{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* AI Explanation */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">{t('aiExplanationLabel')}</span>
                  <p className="text-xs text-ink leading-relaxed">{aiResult.explanation}</p>
                </div>

                {/* AI Recommendations */}
                {aiResult.recommendations && aiResult.recommendations.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">{t('aiRecommendationsLabel')}</span>
                    <ul className="space-y-1">
                      {aiResult.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                          <span className="leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reset / new analysis */}
                <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={cooldownSeconds > 0}
                    onClick={() => handleConsentAndCall(true)}
                    className={`text-[11px] inline-flex items-center gap-1 transition-opacity ${
                      cooldownSeconds > 0
                        ? 'text-ink-muted opacity-50 cursor-not-allowed'
                        : 'text-brand hover:underline cursor-pointer'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {cooldownSeconds > 0
                      ? t('retryInCooldown').replace('{seconds}', String(cooldownSeconds))
                      : t('reAnalyzeAi')}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    {t('aiClose')}
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};
