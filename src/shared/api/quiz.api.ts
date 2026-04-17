import type {
  QuizListItem,
  QuizPublic,
  Quiz,
  CreateQuizDto,
  UpdateQuizDto,
  CheckQuizAnswersDto,
  CheckQuizAnswersResponse,
} from "../types/quiz.types";
import { apiClient } from "./client";

export const quizApi = {
  getAll: async (): Promise<QuizListItem[]> => {
    const response = await apiClient.get<QuizListItem[]>("/quizs");
    return response.data;
  },

  getById: async (id: string): Promise<QuizPublic> => {
    const response = await apiClient.get<QuizPublic>(`/quizs/${id}`);
    return response.data;
  },

  checkAnswers: async (
    id: string,
    dto: CheckQuizAnswersDto,
  ): Promise<CheckQuizAnswersResponse> => {
    const response = await apiClient.post<CheckQuizAnswersResponse>(
      `/quizs/${id}/check`,
      dto,
    );
    return response.data;
  },

  create: async (dto: CreateQuizDto): Promise<Quiz> => {
    const response = await apiClient.post<Quiz>("/quizs", dto);
    return response.data;
  },

  update: async (id: string, dto: UpdateQuizDto): Promise<Quiz> => {
    const response = await apiClient.put<Quiz>(`/quizs/${id}`, dto);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/quizs/${id}`,
    );
    return response.data;
  },
};
