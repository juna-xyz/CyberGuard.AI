import React, { useState } from 'react';
import { ActiveTab, QuizState } from '../../../types';
import { getQuizQuestions } from '../../../services/quiz/quizData';
import { useSettings } from '../../../context/SettingsContext';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Award,
  Search,
  MessageSquare,
  Lock,
  ShieldCheck,
  BookOpen,
  Check,
  AlertTriangle,
  ShieldAlert,
  Zap
} from 'lucide-react';

interface QuizScreenProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate }) => {
  const { t, language } = useSettings();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptionId: null,
    isAnswerSubmitted: false,
    userAnswers: [],
    isQuizCompleted: false
  });

  const questions = getQuizQuestions(language);
  const totalQuestions = questions.length;
  const currentQuestion = questions[quizState.currentQuestionIndex];
  const progressPercent = ((quizState.currentQuestionIndex + (quizState.isAnswerSubmitted ? 1 : 0.5)) / totalQuestions) * 100;

  // Pilih jawaban (sebelum dikunci / konfirmasi)
  const handleSelectOption = (optionId: string) => {
    if (quizState.isAnswerSubmitted) return;
    setQuizState(prev => ({
      ...prev,
      selectedOptionId: optionId
    }));
  };

  // Konfirmasi & Kunci Jawaban
  const handleSubmitAnswer = () => {
    if (!quizState.selectedOptionId || quizState.isAnswerSubmitted) return;
    const selected = currentQuestion.options.find(o => o.id === quizState.selectedOptionId);
    if (!selected) return;

    setQuizState(prev => ({
      ...prev,
      isAnswerSubmitted: true,
      userAnswers: [
        ...prev.userAnswers,
        {
          questionId: currentQuestion.id,
          selectedOptionId: quizState.selectedOptionId!,
          isSafe: selected.isSafe
        }
      ]
    }));
  };

  // Lanjut ke skenario berikutnya atau selesaikan kuis
  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < totalQuestions - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOptionId: null,
        isAnswerSubmitted: false
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        isQuizCompleted: true
      }));
    }
  };

  // Ulangi kuis dari awal
  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedOptionId: null,
      isAnswerSubmitted: false,
      userAnswers: [],
      isQuizCompleted: false
    });
  };

  // Hitung Skor Akhir
  const correctCount = quizState.userAnswers.filter(a => a.isSafe).length;
  const getScoreVerdict = () => {
    if (correctCount === totalQuestions) {
      return {
        title: t('verdictHighlyVigilant'),
        badgeColor: 'bg-risk-low-soft text-risk-low border-risk-low-border',
        description: t('quizResultPerfect')
      };
    }
    if (correctCount >= 3) {
      return {
        title: t('verdictAdequatelyVigilant'),
        badgeColor: 'bg-brand-soft text-brand border-brand-border',
        description: t('quizResultGood')
      };
    }
    return {
      title: t('verdictNeedsVigilance'),
      badgeColor: 'bg-risk-medium-soft text-risk-medium border-risk-medium-border',
      description: t('quizResultNeedsPractice')
    };
  };

  const verdict = getScoreVerdict();
  const selectedOption = currentQuestion?.options.find(o => o.id === quizState.selectedOptionId);

  // Status sidebar setiap skenario — reaktif dari quizState
  const getScenarioStatus = (idx: number): 'done' | 'active' | 'locked' => {
    if (quizState.isQuizCompleted || idx < quizState.currentQuestionIndex) return 'done';
    if (idx === quizState.currentQuestionIndex) return 'active';
    return 'locked';
  };

  const scenarioShortLabel = (context: string) =>
    context.replace('Simulasi ', '').replace('Simulation: ', '').trim();

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-brand-soft border border-brand-border">
            {t('interactiveQuizBadge')}
          </span>
          <span className="text-xs text-ink-muted">{t('quizBadgeSub')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          {t('quizHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          {t('quizDesc')}
        </p>
      </div>

      {/* VIEWPORT: ACTIVE QUIZ vs SCORECARD */}
      {!quizState.isQuizCompleted ? (
        /* ── 2-COLUMN DESKTOP LAYOUT (12-column grid) ── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* MAIN INTERACTIVE COLUMN — 8/12 cols */}
          <div className="lg:col-span-8 space-y-5">
            {/* Progress Bar & Step Counter */}
            <div className="space-y-2 p-3.5 rounded-control bg-surface dark:bg-[#1E3555] border border-hairline dark:border-[#335583] shadow-subtle">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-brand dark:text-brand-highlight font-extrabold">
                    {t('scenarioLabel')} {quizState.currentQuestionIndex + 1} {t('scenarioOf')} {totalQuestions}
                  </span>
                  <span className="text-[11px] text-ink-muted font-normal hidden sm:inline">
                    • {scenarioShortLabel(currentQuestion.scenarioContext)}
                  </span>
                </div>
                <span className="text-ink-muted font-medium">
                  {Math.round(progressPercent)}% {t('stepDone')}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-muted dark:bg-[#162740] overflow-hidden border border-hairline dark:border-[#335583]/80">
                <div
                  className="h-full bg-gradient-to-r from-brand to-brand-highlight transition-all duration-500 ease-out rounded-full shadow-xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Scenario Simulation Card */}
            <Card className="space-y-5 border-hairline dark:border-[#335583] shadow-card dark:bg-[#223B5B]">
              {/* Scenario Context Header */}
              <div className="flex items-center justify-between pb-3 border-b border-hairline dark:border-[#335583] flex-wrap gap-2">
                <span className="text-xs font-semibold text-brand dark:text-brand-highlight px-3 py-1 rounded-badge bg-brand-soft dark:bg-[#1D3B66]">
                  {currentQuestion.scenarioContext}
                </span>
                <span className="text-[11px] font-semibold text-risk-high bg-risk-high-soft px-2.5 py-1 rounded-badge border border-risk-high-border flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t('threatLevelCritical')}
                </span>
              </div>

              {/* Fictional Message Bubble (Realistic Chat Messenger Box) */}
              <div className="rounded-control border border-hairline dark:border-[#335583] bg-surface-muted/60 dark:bg-[#182C48] p-4 sm:p-5 space-y-3 shadow-subtle">
                {/* Chat App Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-hairline dark:border-[#335583]/70 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-soft dark:bg-[#1D3B66] border border-brand-border dark:border-[#335583] flex items-center justify-center font-bold text-xs text-brand dark:text-brand-highlight">
                      <MessageSquare className="w-4 h-4 text-brand dark:text-brand-highlight" />
                    </div>
                    <div>
                      <div className="font-bold text-ink flex items-center gap-2 flex-wrap">
                        <span>{currentQuestion.senderTitle}</span>
                        <span className="text-[10px] font-semibold text-risk-high bg-risk-high-soft px-1.5 py-0.5 rounded border border-risk-high-border">
                          {t('unverifiedSenderPill')}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-muted">{currentQuestion.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Message Bubble Body */}
                <div className="bg-surface dark:bg-[#223B5B] p-4 rounded-control border border-hairline dark:border-[#335583] shadow-xs">
                  <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans">
                    "{currentQuestion.messageContent}"
                  </p>
                </div>
              </div>

              {/* Guiding Question & Decision Options */}
              <div className="space-y-3 pt-1">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-ink">
                    {currentQuestion.questionPrompt}
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {t('chooseOnePrompt')}
                  </p>
                </div>

                {/* 3 Answer Options Cards (Midnight Cyber Blue in Dark, Crisp in Light) */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = quizState.selectedOptionId === option.id;
                    const optionLetter = ['A', 'B', 'C', 'D'][idx] || `${idx + 1}`;

                    let cardStyles = '';
                    let radioStyles = '';

                    if (!quizState.isAnswerSubmitted) {
                      if (isSelected) {
                        cardStyles = 'border-2 border-brand dark:border-brand bg-brand-soft/30 dark:bg-[#1D3B66] ring-1 ring-brand/20 dark:ring-brand/30 text-ink shadow-sm';
                        radioStyles = 'border-brand dark:border-brand bg-brand text-white';
                      } else {
                        cardStyles = 'border border-hairline dark:border-[#335583] bg-surface dark:bg-[#1C3252] hover:border-brand-border dark:hover:border-brand hover:bg-brand-soft/20 dark:hover:bg-[#223E66] text-ink shadow-subtle';
                        radioStyles = 'border-hairline dark:border-[#335583] bg-surface dark:bg-[#172B46] text-transparent';
                      }
                    } else {
                      // Status setelah jawaban dikunci
                      if (isSelected) {
                        if (option.isSafe) {
                          cardStyles = 'border-2 border-risk-low bg-risk-low-soft dark:bg-risk-low-soft/25 text-ink font-medium shadow-sm';
                          radioStyles = 'border-risk-low bg-risk-low text-white';
                        } else {
                          cardStyles = 'border-2 border-risk-high bg-risk-high-soft dark:bg-risk-high-soft/25 text-ink font-medium shadow-sm';
                          radioStyles = 'border-risk-high bg-risk-high text-white';
                        }
                      } else if (option.isSafe) {
                        cardStyles = 'border-2 border-risk-low/60 dark:border-risk-low/50 bg-risk-low-soft/20 dark:bg-risk-low-soft/10 text-ink-muted';
                        radioStyles = 'border-risk-low/60 text-risk-low bg-transparent';
                      } else {
                        cardStyles = 'border border-hairline dark:border-[#335583]/50 bg-surface-muted/30 dark:bg-[#162740]/60 text-ink-muted opacity-50';
                        radioStyles = 'border-hairline dark:border-[#335583] text-transparent';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={quizState.isAnswerSubmitted}
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full text-left p-4 rounded-control transition-all duration-200 flex items-start gap-3.5 cursor-pointer focus-ring ${cardStyles}`}
                      >
                        <div className="pt-0.5 shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${radioStyles}`}>
                            {quizState.isAnswerSubmitted ? (
                              isSelected ? (option.isSafe ? '✓' : '✕') : (option.isSafe ? '✓' : '')
                            ) : (
                              isSelected ? <span className="w-2 h-2 rounded-full bg-white dark:bg-[#F1F5F9]" /> : null
                            )}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              isSelected ? 'text-brand dark:text-brand-highlight' : 'text-ink-muted'
                            }`}>
                              {t('optionLabel')} {optionLetter}
                              {isSelected && !quizState.isAnswerSubmitted && ` (${t('selectedBadge')})`}
                            </span>
                            {quizState.isAnswerSubmitted && option.isSafe && (
                              <span className="text-[10px] font-bold text-risk-low bg-risk-low-soft px-2 py-0.5 rounded border border-risk-low-border">
                                {t('safestRecommendation')}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-ink leading-relaxed">
                            {option.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Confirm Action Button (Sebelum Kunci Jawaban) */}
                {!quizState.isAnswerSubmitted && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-hairline dark:border-[#335583]">
                    <span className="text-xs text-ink-muted">
                      {quizState.selectedOptionId
                        ? language === 'en' ? 'Click below to confirm your decision.' : 'Klik tombol di samping untuk mengunci keputusan Anda.'
                        : language === 'en' ? 'Select an answer above to enable confirmation.' : 'Pilih salah satu jawaban di atas untuk mengaktifkan konfirmasi.'}
                    </span>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={!quizState.selectedOptionId}
                      onClick={handleSubmitAnswer}
                      className="shadow-sm font-semibold shrink-0"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {t('submitAnswer')}
                    </Button>
                  </div>
                )}
              </div>

              {/* Instant Educational Feedback Drawer (Setelah Kunci Jawaban) */}
              {quizState.isAnswerSubmitted && selectedOption && (
                <div className={`p-4 sm:p-5 rounded-control border-2 space-y-3.5 transition-all animate-in fade-in duration-200 ${
                  selectedOption.isSafe
                    ? 'bg-risk-low-soft dark:bg-risk-low-soft/20 border-risk-low/60 dark:border-risk-low/50'
                    : 'bg-risk-high-soft dark:bg-risk-high-soft/20 border-risk-high/60 dark:border-risk-high/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {selectedOption.isSafe ? (
                        <CheckCircle2 className="w-6 h-6 text-risk-low" />
                      ) : (
                        <XCircle className="w-6 h-6 text-risk-high" />
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${
                          selectedOption.isSafe ? 'text-risk-low' : 'text-risk-high'
                        }`}>
                          {selectedOption.isSafe ? t('feedbackCorrect') : t('feedbackIncorrect')}
                        </h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          selectedOption.isSafe
                            ? 'bg-risk-low-soft text-risk-low border-risk-low-border'
                            : 'bg-risk-high-soft text-risk-high border-risk-high-border'
                        }`}>
                          {selectedOption.isSafe ? t('decisionSafe') : t('decisionRisky')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ink leading-relaxed">
                        {selectedOption.feedbackExplanation}
                      </p>

                      {/* Educational "Explain the Trap" Section */}
                      {currentQuestion.trapAnalysis && (
                        <div className="mt-3 p-3.5 sm:p-4 rounded-control bg-surface dark:bg-[#182C48] border border-brand/30 dark:border-[#335583] space-y-3 shadow-subtle">
                          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-hairline dark:border-[#335583]/70">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-brand-soft dark:bg-[#1D3B66] text-brand dark:text-brand-highlight flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-ink dark:text-[#F1F5F9]">
                                  {t('explainTrapTitle')}
                                </h5>
                                <p className="text-[11px] text-ink-muted dark:text-[#CBD5E1]">
                                  {t('explainTrapSubtitle')}
                                </p>
                              </div>
                            </div>

                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-badge bg-brand-soft dark:bg-[#1D3B66] text-brand dark:text-brand-highlight border border-brand-border dark:border-[#335583] inline-flex items-center gap-1.5 shadow-xs">
                              <Zap className="w-3.5 h-3.5 text-brand dark:text-brand-highlight" />
                              {currentQuestion.trapAnalysis.tacticName}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {/* Manipulation Mechanism */}
                            <div className="p-3 rounded-control bg-surface-muted/60 dark:bg-[#1E3555] border border-hairline dark:border-[#335583]/60 space-y-1.5">
                              <span className="font-bold text-risk-high dark:text-red-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                {t('howItManipulatesLabel')}
                              </span>
                              <p className="text-ink dark:text-[#CBD5E1] leading-relaxed">
                                {currentQuestion.trapAnalysis.manipulationMechanism}
                              </p>
                            </div>

                            {/* Practical Safety Lesson */}
                            <div className="p-3 rounded-control bg-brand-soft/25 dark:bg-[#1E3555] border border-brand-border/60 dark:border-[#335583]/60 space-y-1.5">
                              <span className="font-bold text-brand dark:text-brand-highlight flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {t('practicalLessonLabel')}
                              </span>
                              <p className="text-ink dark:text-[#CBD5E1] leading-relaxed">
                                {currentQuestion.trapAnalysis.safetyLesson}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-hairline/60 dark:border-[#335583]/50 flex items-start gap-1.5 text-xs text-ink-muted">
                        <span className="shrink-0">💡</span>
                        <span className="leading-relaxed">
                          <strong className="text-ink">{t('learningPoint')}</strong> {currentQuestion.learningTakeaway}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-hairline/40 dark:border-[#335583]/40">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleNextQuestion}
                      className="shadow-sm font-semibold"
                    >
                      {quizState.currentQuestionIndex < totalQuestions - 1 ? (
                        <>
                          {t('nextScenario')} <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          {t('finishQuiz')} <Award className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDEBAR COLUMN — 4/12 cols */}
          <aside
            className="lg:col-span-4 space-y-4"
            aria-label={t('scenarioProgressTitle')}
          >
            {/* Scenario Progress Tracker */}
            <Card className="space-y-3 border-hairline dark:border-[#335583] dark:bg-[#223B5B]">
              <div className="flex items-center justify-between pb-2 border-b border-hairline dark:border-[#335583]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand dark:text-brand-highlight shrink-0" aria-hidden="true" />
                  <h2 className="text-xs font-bold text-ink uppercase tracking-wider">{t('scenarioProgressTitle')}</h2>
                </div>
                <span className="text-[11px] font-bold text-brand dark:text-brand-highlight bg-brand-soft dark:bg-[#1D3B66] px-2 py-0.5 rounded border border-brand-border dark:border-brand/40">
                  {correctCount} / {quizState.userAnswers.length} {t('safeLabel')}
                </span>
              </div>
              <ul className="space-y-2" role="list">
                {questions.map((q, idx) => {
                  const status = getScenarioStatus(idx);
                  const answer = quizState.userAnswers.find(a => a.questionId === q.id);
                  const answeredCorrectly = answer ? answer.isSafe : null;

                  return (
                    <li
                      key={q.id}
                      className={`flex items-center gap-2.5 p-2.5 rounded-control border text-xs transition-all ${
                        status === 'active'
                          ? 'border-brand dark:border-brand bg-brand-soft/50 dark:bg-[#1D3B66] text-brand dark:text-brand-highlight shadow-xs'
                          : status === 'done'
                            ? 'border-hairline dark:border-[#335583] bg-surface dark:bg-[#1A2E4B]'
                            : 'border-hairline dark:border-[#335583]/40 bg-surface-muted/30 dark:bg-[#162740]/40 opacity-60'
                      }`}
                    >
                      <span className="shrink-0" aria-hidden="true">
                        {status === 'done' ? (
                          answeredCorrectly
                            ? <CheckCircle2 className="w-4 h-4 text-risk-low" />
                            : <XCircle className="w-4 h-4 text-risk-high" />
                        ) : status === 'active' ? (
                          <span className="w-4 h-4 rounded-full bg-brand inline-flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          </span>
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-ink-subtle" />
                        )}
                      </span>
                      <span className={`leading-tight flex-1 ${
                        status === 'active' ? 'text-brand dark:text-brand-highlight font-semibold' : 'text-ink-muted'
                      }`}>
                        <span className="font-bold text-ink-subtle">S{idx + 1}:</span>{' '}
                        {scenarioShortLabel(q.scenarioContext)}
                      </span>
                      {status === 'active' && (
                        <span className="ml-auto text-[10px] font-semibold text-brand dark:text-brand-highlight bg-brand-soft dark:bg-[#1D3B66] px-1.5 py-0.5 rounded-badge shrink-0">
                          {t('activeLabel')}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>

            {/* Scoring Rules */}
            <Card className="space-y-2 border-hairline dark:border-[#335583] bg-surface-muted/30 dark:bg-[#1D3352]">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider">{t('scoringTitle')}</h2>
              <ul className="space-y-1.5 text-[11px] text-ink-muted leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-risk-low shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t('scoringRule1')}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-risk-high shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t('scoringRule2')}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand dark:text-brand-highlight shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t('scoringRule3')}</span>
                </li>
              </ul>
            </Card>

            {/* Think Before You Click Reminder */}
            <div className="flex items-start gap-3 p-3.5 rounded-control bg-brand-soft/50 dark:bg-[#1A3152] border border-brand-border dark:border-[#335583]">
              <ShieldCheck className="w-5 h-5 text-brand dark:text-brand-highlight shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-brand dark:text-brand-highlight">{t('thinkBeforeReminderTitle')}</p>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {t('thinkBeforeReminderDesc')}
                </p>
              </div>
            </div>
          </aside>
        </div>

      ) : (
        /* END-OF-QUIZ SCORECARD */
        <Card className="text-center py-10 px-6 sm:px-10 space-y-6 border-hairline dark:border-[#335583] shadow-card dark:bg-[#223B5B]">
          <div className="w-16 h-16 rounded-full bg-brand-soft dark:bg-[#1D3B66] border border-brand-border dark:border-brand/40 flex items-center justify-center mx-auto text-brand dark:text-brand-highlight">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-badge border ${verdict.badgeColor}`}>
              {verdict.title}
            </span>
            <h2 className="text-3xl font-extrabold text-ink">
              {t('scoreHeadingTitle')} {correctCount} {t('scenarioOf')} {totalQuestions} {t('scoreHeadingSub')}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
              {verdict.description}
            </p>
          </div>

          {/* Quick Recap Grid */}
          <div className="pt-4 border-t border-hairline dark:border-[#335583] text-left space-y-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              {t('scenarioEvaluation')}
            </h3>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const answer = quizState.userAnswers.find(a => a.questionId === q.id);
                const isCorrect = answer ? answer.isSafe : false;
                return (
                  <div
                    key={q.id}
                    className="p-3 rounded-control border border-hairline dark:border-[#335583] bg-surface dark:bg-[#1B2F4C] flex items-center justify-between text-xs flex-wrap gap-2"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-ink">
                        {t('scenarioLabel')} {idx + 1}: {scenarioShortLabel(q.scenarioContext)}
                      </span>
                      {q.trapAnalysis && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-soft/60 dark:bg-[#162740] text-brand dark:text-brand-highlight border border-brand-border/40 dark:border-[#335583]/60">
                          {q.trapAnalysis.tacticName}
                        </span>
                      )}
                    </div>
                    <span className={`font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-risk-low' : 'text-risk-high'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? t('safeLabel') : t('riskyLabel')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('retakeQuizBtn')}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              {t('tryAnalyzePersonal')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
