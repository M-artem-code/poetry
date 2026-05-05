"use client";

import { useQuery } from "@tanstack/react-query";
import { quizApi } from "@/src/shared/api/quiz.api";
import type { QuizPublic } from "@/src/shared/types/quiz.types";

export const useQuiz = (id: string) => {
  return useQuery<QuizPublic>({
    queryKey: ["quiz", id],
    queryFn: () => quizApi.getById(id),
    enabled: !!id,
  });
};
