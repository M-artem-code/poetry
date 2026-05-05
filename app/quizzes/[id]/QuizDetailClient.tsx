"use client";

import { useQuiz } from "@/src/features/quiz";
import { LoadingState, ErrorState } from "@/src/shared/ui";
import QuizGame from "@/components/Quiz/QuizGame";

interface QuizDetailClientProps {
  id: string;
}

export function QuizDetailClient({ id }: QuizDetailClientProps) {
  const { data: quiz, isLoading, error } = useQuiz(id);

  if (isLoading) {
    return <LoadingState text="Загрузка квіза..." />;
  }

  if (error || !quiz) {
    return <ErrorState message="Квіз не знойдзены" />;
  }

  return <QuizGame quiz={quiz} />;
}
