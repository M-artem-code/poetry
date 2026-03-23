import { apiClient } from "./client";
import type { Comment } from "../types";

export interface CreateCommentDto {
  poemId: number;
  text: string;
}

export interface UpdateCommentDto {
  text: string;
}

export const commentsApi = {
  // Получить комментарии к стиху
  getByPoem: async (poemId: number): Promise<Comment[]> => {
    const response = await apiClient.get<Comment[]>(`/comments/poem/${poemId}`);
    return response.data;
  },

  // Создать комментарий
  create: async (data: CreateCommentDto): Promise<Comment> => {
    const response = await apiClient.post<Comment>("/comments", data);
    return response.data;
  },

  // Обновить комментарий
  update: async (id: number, data: UpdateCommentDto): Promise<Comment> => {
    const response = await apiClient.put<Comment>(`/comments/${id}`, data);
    return response.data;
  },

  // Удалить комментарий
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/comments/${id}`);
  },
};
