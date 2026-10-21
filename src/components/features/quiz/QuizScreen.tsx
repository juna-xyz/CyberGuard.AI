import React, { useState } from 'react';
import { ActiveTab, QuizState } from '../../../types';
import { QUIZ_QUESTIONS } from '../../../services/quiz/quizData';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Award,
  Search,
  MessageSquare
} from 'lucide-react';

interface QuizScreenProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptionId: null,
    isAnswerSubmitted: false,
    userAnswers: [],
    isQuizCompleted: false
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestionIndex];
  const progressPercent = ((quizState.currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionId: string) => {
    if (quizState.isAnswerSubmitted) return; // Kunci setelah memilih

    const selectedOption = currentQuestion.options.find(o => o.id === optionId);
    if (!selectedOption) return;

    setQuizState(prev => ({
      ...prev,
      selectedOptionId: optionId,
      isAnswerSubmitted: true,
      userAnswers: [
        ...prev.userAnswers,
        {
          questionId: currentQuestion.id,
          selectedOptionId: optionId,
          isSafe: selectedOption.isSafe
        }
      ]
    }));
  };

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
        title: 'Sangat Waspada (Ketahanan Siber Maksimal)',
        badgeColor: 'bg-risk-low-soft text-risk-low border-risk-low-border',
        description: 'Luar biasa! Anda memiliki kepekaan kritis yang sangat tinggi terhadap berbagai bentuk rekayasa sosial dan penipuan digital.'
      };
    }
    if (correctCount >= 3) {
      return {
        title: 'Cukup Waspada (Nalar Kritis Baik)',
        badgeColor: 'bg-brand-soft text-brand border-brand-border',
        description: 'Bagus! Anda memahami sebagian besar prinsip perlindungan mandiri, namun tetap cermati desakan waktu dan file mencurigakan.'
      };
    }
    return {
      title: 'Perlu Waspada (Tingkatkan Kewaspadaan)',
      badgeColor: 'bg-risk-medium-soft text-risk-medium border-risk-medium-border',
      description: 'Anda masih berisiko terjebak manipulasi emosional dan desakan panik. Pelajari kembali kerangka kerja 3-Langkah di Beranda.'
    };
  };

  const verdict = getScoreVerdict();
  const selectedOption = currentQuestion?.options.find(o => o.id === quizState.selectedOptionId);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* HEADER SECTION */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-brand-soft border border-brand-border">
            Interactive Quiz
          </span>
          <span className="text-xs text-ink-muted">Latihan Pengambilan Keputusan Aman</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Kuis Keputusan Siber
        </h1>
        <p className="text-sm text-ink-muted">
          Hadapi 5 skenario studi kasus nyata di Indonesia. Uji apakah naluri Anda dapat membedakan niat jahat di balik pesan.
        </p>
      </div>

      {/* VIEWPORT MODE: ACTIVE QUIZ VS END-OF-QUIZ SCORECARD */}
      {!quizState.isQuizCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar & Step Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-brand">Skenario {quizState.currentQuestionIndex + 1} dari {totalQuestions}</span>
              <span className="text-ink-muted">{Math.round(progressPercent)}% Selesai</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden border border-hairline">
              <div
                className="h-full bg-brand transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Skenario Simulation Card */}
          <Card className="space-y-5 border-hairline shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <span className="text-xs font-semibold text-brand px-2.5 py-1 rounded-badge bg-brand-soft border border-brand-border/60">
                {currentQuestion.scenarioContext}
              </span>
              <span className="text-[11px] text-ink-subtle">{currentQuestion.timestamp}</span>
            </div>

            {/* Fictional Message Bubble */}
            <div className="bg-surface-muted p-4 sm:p-5 rounded-control border border-hairline space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-ink">
                <MessageSquare className="w-4 h-4 text-brand" />
                <span>{currentQuestion.senderTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans bg-surface p-3.5 rounded border border-hairline">
                "{currentQuestion.messageContent}"
              </p>
            </div>

            {/* Guiding Question */}
            <div className="space-y-3 pt-1">
              <h3 className="text-sm sm:text-base font-bold text-ink">
                {currentQuestion.questionPrompt}
              </h3>

              {/* 3 Interactive Decision Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = quizState.selectedOptionId === option.id;
                  let optionStyles = 'border-hairline bg-surface hover:border-brand-border hover:bg-surface-muted/50 text-ink';

                  if (quizState.isAnswerSubmitted) {
                    if (isSelected) {
                      optionStyles = option.isSafe
                        ? 'border-risk-low bg-risk-low-soft text-ink font-medium'
                        : 'border-risk-high bg-risk-high-soft text-ink font-medium';
                    } else if (option.isSafe) {
                      optionStyles = 'border-risk-low/60 bg-risk-low-soft/30 text-ink-muted';
                    } else {
                      optionStyles = 'border-hairline bg-surface-muted/30 text-ink-muted opacity-60';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={quizState.isAnswerSubmitted}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-control border text-xs sm:text-sm leading-relaxed transition-all flex items-start gap-3 cursor-pointer focus-ring ${optionStyles}`}
                    >
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? (option.isSafe ? 'border-risk-low bg-risk-low text-white' : 'border-risk-high bg-risk-high text-white')
                          : 'border-hairline text-ink-muted'
                      }`}>
                        {isSelected ? (option.isSafe ? '✓' : '✕') : ''}
                      </span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instant Feedback Drawer (Muncul setelah opsi dipilih) */}
            {quizState.isAnswerSubmitted && selectedOption && (
              <div className={`p-4 rounded-control border space-y-3 transition-all ${
                selectedOption.isSafe
                  ? 'bg-risk-low-soft border-risk-low-border'
                  : 'bg-risk-high-soft border-risk-high-border'
              }`}>
                <div className="flex items-start gap-2.5">
                  {selectedOption.isSafe ? (
                    <CheckCircle2 className="w-5 h-5 text-risk-low shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-risk-high shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${
                      selectedOption.isSafe ? 'text-risk-low' : 'text-risk-high'
                    }`}>
                      {selectedOption.isSafe ? 'Keputusan Aman (Tepat)' : 'Keputusan Berisiko Tinggi'}
                    </h4>
                    <p className="text-xs text-ink leading-relaxed">
                      {selectedOption.feedbackExplanation}
                    </p>
                    <p className="text-[11px] text-ink-muted italic pt-1 border-t border-hairline/60">
                      💡 {currentQuestion.learningTakeaway}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextQuestion}
                  >
                    {quizState.currentQuestionIndex < totalQuestions - 1 ? (
                      <>
                        Skenario Berikutnya <ArrowRight className="w-4 h-4 ml-1.5" />
                      </>
                    ) : (
                      <>
                        Lihat Skor Akhir <Award className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* END-OF-QUIZ SCORECARD REVIEW */
        <Card className="text-center py-10 px-6 sm:px-10 space-y-6 border-hairline shadow-card">
          <div className="w-16 h-16 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center mx-auto text-brand">
            <Award className="w-8 h-8 text-brand" />
          </div>

          <div className="space-y-2">
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-badge border ${verdict.badgeColor}`}>
              {verdict.title}
            </span>
            <h2 className="text-3xl font-extrabold text-ink">
              Skor: {correctCount} dari {totalQuestions} Keputusan Tepat
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
              {verdict.description}
            </p>
          </div>

          {/* Quick Recap Grid */}
          <div className="pt-4 border-t border-hairline text-left space-y-3">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
              Evaluasi Skenario:
            </h4>
            <div className="space-y-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answer = quizState.userAnswers.find(a => a.questionId === q.id);
                const isCorrect = answer ? answer.isSafe : false;
                return (
                  <div
                    key={q.id}
                    className="p-3 rounded-control border border-hairline bg-surface flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-ink">
                      Skenario {idx + 1}: {q.scenarioContext.replace('Simulasi ', '')}
                    </span>
                    <span className={`font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-risk-low' : 'text-risk-high'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Aman' : 'Berisiko'}
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
              Ulangi Kuis
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Coba Analisis Pesan Pribadi
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
