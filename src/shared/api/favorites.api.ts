import { apiClient } from './client';
import type { Favorite } from '../types/favorite.types';
import type { Poem } from '../types/poem.types';

export interface FavoriteWithPoem extends Favorite {
  poem: Poem;
}

export const favoritesApi = {
  // Получить все избранные стихи пользователя
  getAll: async (): Promise<FavoriteWithPoem[]> => {
    const response = await apiClient.get<FavoriteWithPoem[]>('/favorites');
    return response.data;
  },

  // Добавить в избранное
  add: async (poemId: number): Promise<Favorite> => {
    const response = await apiClient.post<Favorite>(`/favorites/${poemId}`);
    return response.data;
  },

  // Удалить из избранного
  remove: async (poemId: number): Promise<void> => {
    await apiClient.delete(`/favorites/${poemId}`);
  },

  // Проверить, в избранном ли стих
  check: async (poemId: number): Promise<{ isFavorite: boolean }> => {
    const response = await apiClient.get<{ isFavorite: boolean }>(`/favorites/check/${poemId}`);
    return response.data;
  },

  // Toggle избранное
  toggle: async (poemId: number, isFavorite: boolean): Promise<void> => {
    if (isFavorite) {
      await favoritesApi.remove(poemId);
    } else {
      await favoritesApi.add(poemId);
    }
  },
};
