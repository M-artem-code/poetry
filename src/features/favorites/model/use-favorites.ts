'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi, type FavoriteWithPoem } from '@/src/shared/api/favorites.api';
import { useUserStore } from '@/src/entities/user';

// Получить все избранные
export const useFavorites = () => {
  const { isAuthenticated } = useUserStore();
  
  return useQuery<FavoriteWithPoem[]>({
    queryKey: ['favorites'],
    queryFn: favoritesApi.getAll,
    enabled: isAuthenticated,
    retry: false,
  });
};

// Проверить, в избранном ли стих
export const useCheckFavorite = (poemId: number) => {
  const { isAuthenticated } = useUserStore();
  
  return useQuery({
    queryKey: ['favorites', 'check', poemId],
    queryFn: () => favoritesApi.check(poemId),
    enabled: !!poemId && isAuthenticated,
    retry: false,
  });
};

// Toggle избранное
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ poemId, isFavorite }: { poemId: number; isFavorite: boolean }) =>
      favoritesApi.toggle(poemId, isFavorite),
    onSuccess: (_, { poemId }) => {
      // Инвалидируем кэш
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorites', 'check', poemId] });
      queryClient.invalidateQueries({ queryKey: ['poem', poemId] });
    },
  });
};

// Добавить в избранное
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (poemId: number) => favoritesApi.add(poemId),
    onSuccess: (_, poemId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorites', 'check', poemId] });
    },
  });
};

// Удалить из избранного
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (poemId: number) => favoritesApi.remove(poemId),
    onSuccess: (_, poemId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorites', 'check', poemId] });
    },
  });
};
