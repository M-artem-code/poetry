"use client";

import { useQuery } from "@tanstack/react-query";
import { quizApi } from "@/src/shared/api/quiz.api";
import type { QuizListItem } from "@/src/shared/types/quiz.types";

export const useQuizzes = () => {
  return useQuery<QuizListItem[]>({
    queryKey: ["quizzes"],
    queryFn: () => quizApi.getAll(),
  });
};
