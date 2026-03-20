import { apiClient } from './client';
import type { Category } from '../types/category.types';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  getOne: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/slug/${slug}`);
    return response.data;
  },
};
