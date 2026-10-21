import React, { useState } from 'react';
import { AnalysisReport } from '../../../types';
import { analyzeMessageLocally, SAMPLE_MESSAGES } from '../../../services/analyzer/heuristicEngine';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { 
  ShieldAlert, 
  Search, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const AnalyzerScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [uiState, setUiState] = useState<'empty' | 'loading' | 'error' | 'success'>('empty');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_CHAR = 2000;
  const MIN_CHAR = 10;

  const handleSelectSample = (sampleText: string) => {
    setInputText(sampleText);
    setUiState('empty');
    setReport(null);
  };

  const handleClear = () => {
    setInputText('');
    setUiState('empty');
    setReport(null);
    setErrorMessage('');
  };

  const handleAnalyze = async () => {
    const trimmed = inputText.trim();
    if (trimmed.length < MIN_CHAR) {
      setErrorMessage(`Teks terlalu pendek. Masukkan minimal ${MIN_CHAR} karakter pesan.`);
      setUiState('error');
      return;
    }

    setUiState('loading');
    setErrorMessage('');

    // Simulasi pemindaian forensik dengan sedikit jeda (400ms) untuk UX yang meyakinkan
    setTimeout(() => {
      try {
        const localResult = analyzeMessageLocally(trimmed);
        setReport(localResult);
        setUiState('success');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Terjadi kendala saat menganalisis pesan.';
        setErrorMessage(message);
        setUiState('error');
      }
    }, 450);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* HEADER & SAFETY NOTICE */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-brand-soft border border-brand-border">
            Forensic Inspector
          </span>
          <span className="text-xs text-ink-muted">Modul Analisis Mandiri</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Penganalisis Pesan Mencurigakan
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Tempelkan isi SMS, pesan WhatsApp, atau email yang Anda terima. Sistem akan membedah indikator manipulasi psikologis, desakan waktu, serta berkas berbahaya.
        </p>

        {/* Zero-Credential Privacy Safety Caution */}
        <div className="p-3.5 rounded-control bg-risk-medium-soft border border-risk-medium-border flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-risk-medium shrink-0 mt-0.5" />
          <div className="text-xs text-risk-medium space-y-0.5">
            <p className="font-bold">Peringatan Keamanan &amp; Privasi:</p>
            <p className="leading-relaxed">
              Dilarang keras menempelkan kata sandi, PIN perbankan, kode OTP aktif, atau nomor identitas resmi (NIK/KTP) pribadi Anda ke dalam sistem ini.
            </p>
          </div>
        </div>
      </div>

      {/* WORKBENCH INPUT FORM */}
      <Card className="space-y-4">
        {/* Quick Sample Selector Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-ink-muted block">
            Coba Contoh Kasus Fiktif Aman:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_MESSAGES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample.fullText)}
                className="text-xs px-3 py-1.5 rounded-full bg-surface-muted hover:bg-brand-soft hover:text-brand border border-hairline hover:border-brand-border text-ink-muted font-medium transition-all cursor-pointer focus-ring"
              >
                <Sparkles className="w-3 h-3 inline mr-1 text-brand" />
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea Input Container */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, MAX_CHAR))}
            placeholder="Tempelkan isi pesan lengkap yang mencurigakan di sini (contoh: pesan dari kurir paket, penangguhan rekening bank, atau undian berhadiah)..."
            rows={5}
            className="w-full p-4 rounded-control border border-hairline bg-surface text-ink placeholder:text-ink-subtle text-sm leading-relaxed focus-ring transition-colors resize-none"
          />
        </div>

        {/* Form Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-ink-muted">
            <span className={inputText.length > MAX_CHAR * 0.9 ? 'text-risk-high font-semibold' : ''}>
              {inputText.length}
            </span> / {MAX_CHAR} karakter
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {inputText && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClear}
                disabled={uiState === 'loading'}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Bersihkan
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handleAnalyze}
              disabled={uiState === 'loading' || !inputText.trim()}
              className="w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              {uiState === 'loading' ? 'Menganalisis Pola...' : 'Analisis Pesan Sekarang'}
            </Button>
          </div>
        </div>
      </Card>

      {/* DYNAMIC 4-STATE RESULT PANEL */}
      <div>
        {/* STATE 1: EMPTY STATE */}
        {uiState === 'empty' && (
          <Card variant="muted" className="text-center py-12 px-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface border border-hairline flex items-center justify-center mx-auto text-ink-muted">
              <FileText className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-base font-bold text-ink">Meja Kerja Forensik Siap</h3>
            <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
              Ketik atau tempelkan teks pesan mencurigakan pada kolom di atas, atau pilih salah satu contoh simulasi untuk memulai pengujian indikator bahaya.
            </p>
          </Card>
        )}

        {/* STATE 2: LOADING SKELETON STATE */}
        {uiState === 'loading' && (
          <Card className="p-6 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-surface-muted rounded w-1/3" />
              <div className="h-6 bg-surface-muted rounded w-24" />
            </div>
            <div className="h-4 bg-surface-muted rounded w-full" />
            <div className="h-4 bg-surface-muted rounded w-4/5" />
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="h-20 bg-surface-muted rounded-control" />
              <div className="h-20 bg-surface-muted rounded-control" />
            </div>
            <p className="text-center text-xs text-brand font-medium pt-2">
              Memeriksa struktur bahasa, indikator urgensi, dan pola ancaman...
            </p>
          </Card>
        )}

        {/* STATE 3: ERROR STATE */}
        {uiState === 'error' && (
          <Card className="border-risk-high-border bg-risk-high-soft p-5 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-risk-high shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-risk-high">Pemeriksaan Tidak Dapat Dilanjutkan</h4>
                <p className="text-xs text-ink leading-relaxed">
                  {errorMessage || 'Terdapat kesalahan pada teks yang dimasukkan. Silakan periksa kembali isi pesan.'}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setUiState('empty')}>
              Tutup Pesan
            </Button>
          </Card>
        )}

        {/* STATE 4: SUCCESS REPORT */}
        {uiState === 'success' && report && (
          <Card className="space-y-6 border-hairline shadow-card">
            {/* Report Header & Risk Level Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
                  Hasil Evaluasi Forensik • {report.analyzedAt}
                </span>
                <h3 className="text-lg font-bold text-ink">
                  {report.summaryHeading}
                </h3>
              </div>
              <Badge riskLevel={report.riskLevel} className="self-start sm:self-center text-sm py-1.5 px-3" />
            </div>

            {/* Visual Risk Gauge & Plain Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-surface-muted rounded-control border border-hairline">
                <img 
                  src="/assets/images/radar-gauge.svg" 
                  alt="Visualisasi Indikator Risiko Kualitatif"
                  className="w-48 h-auto"
                />
                <span className="text-[11px] font-semibold text-ink-muted mt-2">
                  Tingkat Bahaya Terestimasi
                </span>
              </div>

              <div className="md:col-span-8 space-y-3">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Uraian Analisis Edukatif</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {report.explanation}
                </p>
              </div>
            </div>

            {/* Observable Evidence Tags */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Indikator Bukti yang Teramati ({report.detectedIndicators.length})
              </h4>
              {report.detectedIndicators.length === 0 ? (
                <p className="text-xs text-ink-muted italic bg-surface-muted p-3 rounded-control border border-hairline">
                  Tidak ada indikator mencurigakan khusus yang terdeteksi dari kata kunci umum.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {report.detectedIndicators.map((indicator) => (
                    <div 
                      key={indicator.id}
                      className="p-3 rounded-control border border-hairline bg-surface-muted/50 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink">{indicator.label}</span>
                          {indicator.detectedSnippet && (
                            <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface border border-hairline text-risk-high">
                              "{indicator.detectedSnippet}"
                            </code>
                          )}
                        </div>
                        <p className="text-xs text-ink-muted">{indicator.educationalAdvice}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase self-start shrink-0 ${
                        indicator.severity === 'CRITICAL' ? 'bg-risk-high-soft text-risk-high' : 'bg-risk-medium-soft text-risk-medium'
                      }`}>
                        {indicator.severity === 'CRITICAL' ? 'KRITIS' : 'WASPADA'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Safe Next Steps */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Rekomendasi Tindakan Aman
              </h4>
              <ul className="space-y-2">
                {report.safeNextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-ink">
                    <CheckCircle2 className="w-4 h-4 text-risk-low shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detection Boundary Disclaimer */}
            <div className="p-3 rounded-control bg-surface-muted text-[11px] text-ink-subtle flex items-start gap-2 border border-hairline">
              <Info className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
              <span>{report.detectionBoundaryNote}</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
