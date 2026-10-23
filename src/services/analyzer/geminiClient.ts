/**
 * geminiClient.ts
 * AI Explanation — client untuk proxy /api/analyze di vite.config.ts.
 * Mengirim HANYA temuan sanitasi dari heuristik lokal (bukan teks mentah pengguna).
 * Mengoptimalkan penggunaan token, membatasi bukti hingga maks 3 snippet pendek,
 * dan menyediakan cache berbasis sesi (sessionStorage) per teks analisis normalisasi + bahasa.
 */

import { AnalysisReport } from '../../types';

/** Payload sanitasi yang dikirim ke proxy Gemini — BUKAN teks mentah user */
export interface GeminiRequestPayload {
  riskLevel: string;
  indicatorCount: number;
  indicatorLabels: string[];
  detectedSnippets: string[];
}

/** Respons yang dikembalikan dari proxy */
export interface GeminiExplanation {
  riskLevel: string;
  summary: string;
  indicators: string[];
  explanation: string;
  recommendations: string[];
}

/** Status dari pemanggilan AI */
export type GeminiCallStatus =
  | 'idle'
  | 'consent_pending'
  | 'loading'
  | 'success'
  | 'error'
  | 'unavailable';

export interface ExplainOptions {
  forceRefresh?: boolean;
  originalText?: string;
}

export class GeminiApiError extends Error {
  isRateLimit: boolean;
  status?: number;

  constructor(message: string, isRateLimit = false, status?: number) {
    super(message);
    this.name = 'GeminiApiError';
    this.isRateLimit = isRateLimit;
    this.status = status;
  }
}

/** Timeout dalam milidetik untuk request ke proxy */
const TIMEOUT_MS = 15_000;

/** Prefix untuk cache penjelasan sesi */
const SESSION_CACHE_PREFIX = 'cg_ai_exp_v1_';
const memoryCache = new Map<string, GeminiExplanation>();

/** Map untuk deduplikasi request identik yang sedang berlangsung */
const inflightRequests = new Map<string, Promise<GeminiExplanation | null>>();

/**
 * Normalisasi teks input analisis: hilangkan spasi berlebih dan lowercase
 */
export function normalizeAnalysisInput(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Hashing cepat djb2 untuk kunci cache sesi yang aman dan ringkas
 */
function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Menghasilkan cache key unik berbasis data temuan analisis sanitasi + bahasa.
 */
export function getSanitizedAnalysisCacheKey(
  input: AnalysisReport | string,
  language: 'id' | 'en'
): string {
  const textToHash = typeof input === 'string'
    ? input
    : buildSanitizedText(buildSanitizedPayload(input));
  const normalized = normalizeAnalysisInput(textToHash);
  return `${SESSION_CACHE_PREFIX}${language}_${hashString(normalized)}`;
}

/**
 * Mengambil penjelasan yang tersimpan dalam sesi browser saat ini
 */
export function getCachedExplanation(
  input: AnalysisReport | string,
  language: 'id' | 'en'
): GeminiExplanation | null {
  if (!input) return null;
  const key = getSanitizedAnalysisCacheKey(input, language);

  if (memoryCache.has(key)) {
    return memoryCache.get(key) || null;
  }

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = window.sessionStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored) as GeminiExplanation;
        memoryCache.set(key, parsed);
        return parsed;
      }
    }
  } catch {
    // Abaikan kegagalan akses storage
  }

  return null;
}

/**
 * Menyimpan penjelasan ke sesi browser saat ini
 */
export function setCachedExplanation(
  input: AnalysisReport | string,
  language: 'id' | 'en',
  explanation: GeminiExplanation
): void {
  if (!input) return;
  const key = getSanitizedAnalysisCacheKey(input, language);

  memoryCache.set(key, explanation);

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(explanation));
    }
  } catch {
    // Abaikan kegagalan akses storage
  }
}

/**
 * Membangun payload sanitasi dari laporan heuristik lokal.
 * HANYA menyertakan tingkat risiko, label indikator, dan maks 3 snippet pendek (<= 60 char).
 * TIDAK PERNAH menyertakan teks mentah pengguna.
 */
export function buildSanitizedPayload(report: AnalysisReport): GeminiRequestPayload {
  const snippets = report.detectedIndicators
    .filter(i => Boolean(i.detectedSnippet && i.detectedSnippet.trim()))
    .map(i => (i.detectedSnippet as string).trim().slice(0, 60))
    .filter((snippet, idx, arr) => arr.indexOf(snippet) === idx)
    .slice(0, 3);

  return {
    riskLevel: report.riskLevel,
    indicatorCount: report.detectedIndicators.length,
    indicatorLabels: report.detectedIndicators.map(i => i.label).slice(0, 5),
    detectedSnippets: snippets,
  };
}

/**
 * Membangun teks prompt sanitasi ringkas untuk dikirim ke proxy Gemini.
 * Format ultra-kompak untuk meminimalkan token input.
 */
function buildSanitizedText(payload: GeminiRequestPayload): string {
  const indicatorList = payload.indicatorLabels.length > 0
    ? `Indicators: ${payload.indicatorLabels.join('; ')}`
    : `Indicators: None`;

  const snippetList = payload.detectedSnippets.length > 0
    ? `Snippets (max 3): ${payload.detectedSnippets.map(s => `"${s}"`).join(', ')}`
    : `Snippets: None`;

  return [
    `Risk: ${payload.riskLevel}`,
    indicatorList,
    snippetList,
  ].join('\n');
}

/**
 * Memanggil proxy /api/analyze dengan payload sanitasi.
 * Menggunakan cache sesi jika tersedia dan forceRefresh !== true.
 * Menangani HTTP 429 tanpa retry berulang otomatis.
 */
export async function explainWithGemini(
  report: AnalysisReport,
  signal?: AbortSignal,
  language: 'id' | 'en' = 'id',
  options?: ExplainOptions
): Promise<GeminiExplanation | null> {
  const cacheKey = getSanitizedAnalysisCacheKey(report, language);

  // 1. Cek cache sessionStorage/memory jika tidak dipaksa refresh
  if (!options?.forceRefresh) {
    const cached = getCachedExplanation(report, language) ||
      (options?.originalText ? getCachedExplanation(options.originalText, language) : null);
    if (cached) {
      return cached;
    }
  }

  // 2. Deduplikasi: jika request untuk temuan identik sedang berlangsung, gunakan Promise yang sama
  if (inflightRequests.has(cacheKey)) {
    return inflightRequests.get(cacheKey)!;
  }

  const payload = buildSanitizedPayload(report);
  const sanitizedText = buildSanitizedText(payload);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const effectiveSignal = signal ?? controller.signal;

  const executeRequest = async (): Promise<GeminiExplanation | null> => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sanitizedText, language }),
        signal: effectiveSignal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      // Jika server mengindikasikan API key belum dikonfigurasi
      if (data.configured === false) {
        return null;
      }

      if (!response.ok || data.error) {
        // Penanganan khusus HTTP 429 Rate Limit (tanpa auto-retry)
        if (response.status === 429 || data.rateLimited) {
          const rateLimitMessage = data.error || (language === 'en'
            ? 'Gemini API quota/rate limit reached (HTTP 429). Please pause briefly before trying again. Your local analysis remains complete.'
            : 'Batas kuota/permintaan Gemini API tercapai (HTTP 429). Mohon jeda sejenak sebelum mencoba lagi. Hasil analisis lokal Anda tetap lengkap.');
          throw new GeminiApiError(rateLimitMessage, true, 429);
        }

        const rawError = data.error || data.message || `Server status ${response.status}`;
        if (rawError.includes('503') || rawError.includes('high demand') || rawError.includes('overloaded')) {
          throw new GeminiApiError(
            language === 'en'
              ? 'Gemini AI service is temporarily experiencing high traffic (503). Please retry in a few moments.'
              : 'Layanan Gemini AI sedang mengalami lonjakan antrean trafik (503). Silakan coba lagi dalam beberapa saat.',
            false,
            503
          );
        }
        throw new GeminiApiError(rawError, false, response.status);
      }

      const result = data.result as GeminiExplanation;

      // Simpan ke cache sesi berdasarkan data analisis ternormalisasi
      if (result) {
        setCachedExplanation(report, language, result);
        if (options?.originalText) {
          setCachedExplanation(options.originalText, language, result);
        }
      }

      return result;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new GeminiApiError(
          language === 'en'
            ? 'Gemini AI request timed out (15s). Please try again.'
            : 'Permintaan ke Gemini AI melebihi batas waktu (15 detik). Silakan coba lagi.',
          false,
          408
        );
      }
      throw err;
    }
  };

  const requestPromise = executeRequest();
  inflightRequests.set(cacheKey, requestPromise);

  try {
    return await requestPromise;
  } finally {
    inflightRequests.delete(cacheKey);
  }
}
