export type ActiveTab = 'dashboard' | 'analyzer' | 'quiz';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type IndicatorCategory =
  | 'URGENCY'
  | 'CREDENTIAL'
  | 'MALICIOUS_LINK'
  | 'FINANCIAL_LURE'
  | 'IMPERSONATION';

export interface ObservableIndicator {
  id: string;
  category: IndicatorCategory;
  label: string;
  detectedSnippet?: string;
  severity: 'WARNING' | 'CRITICAL';
  educationalAdvice: string;
}

export interface AnalysisReport {
  riskLevel: RiskLevel;
  summaryHeading: string;
  explanation: string;
  detectedIndicators: ObservableIndicator[];
  safeNextSteps: string[];
  detectionBoundaryNote: string;
  analyzedAt: string;
  engineSource: 'LOCAL_HEURISTIC' | 'GEMINI_ENHANCED';
}

export interface SampleMessage {
  id: string;
  title: string;
  preview: string;
  fullText: string;
  scenarioType: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isSafe: boolean;
  feedbackExplanation: string;
}

export interface QuizQuestion {
  id: number;
  scenarioContext: string;
  senderTitle: string;
  timestamp: string;
  messageContent: string;
  questionPrompt: string;
  options: QuizOption[];
  learningTakeaway: string;
}

export interface QuizUserAnswer {
  questionId: number;
  selectedOptionId: string;
  isSafe: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedOptionId: string | null;
  isAnswerSubmitted: boolean;
  userAnswers: QuizUserAnswer[];
  isQuizCompleted: boolean;
}
