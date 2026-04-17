// ========== Response types ==========

export interface QuizZone {
  id: string;
  content: string;
  questionId: string;
}

export interface QuizItem {
  id: string;
  content: string;
  questionId: string;
  correctZoneId: string;
}

export interface QuizItemPublic extends Omit<QuizItem, "correctZoneId"> {}

export interface QuizQuestion {
  id: string;
  text: string;
  quizId: string;
  items: QuizItem[];
  zones: QuizZone[];
}

export interface QuizQuestionPublic {
  id: string;
  text: string;
  quizId: string;
  items: QuizItemPublic[];
  zones: QuizZone[];
}

export interface Quiz {
  id: string;
  title: string;
  imageUrl: string;
  questions: QuizQuestion[];
}

export interface QuizPublic {
  id: string;
  title: string;
  imageUrl: string;
  questions: QuizQuestionPublic[];
}

export interface QuizListItem {
  id: string;
  title: string;
  imageUrl: string;
}

// ========== Request types ==========

export interface CreateQuizZoneDto {
  content: string;
}

export interface CreateQuizItemDto {
  content: string;
  correctZoneIndex: number;
}

export interface CreateQuizQuestionDto {
  text: string;
  items: CreateQuizItemDto[];
  zones: CreateQuizZoneDto[];
}

export interface CreateQuizDto {
  title: string;
  imageUrl: string;
  questions: CreateQuizQuestionDto[];
}

export interface UpdateQuizDto {
  title?: string;
  imageUrl?: string;
  questions?: CreateQuizQuestionDto[];
}

// ========== Check answers ==========

export interface AnswerMappingDto {
  questionId: string;
  mapping: Record<string, string>;
}

export interface CheckQuizAnswersDto {
  answers: AnswerMappingDto[];
}

export interface CheckQuizAnswersResponse {
  isCorrect: boolean;
  correctCount: number;
  total: number;
}
