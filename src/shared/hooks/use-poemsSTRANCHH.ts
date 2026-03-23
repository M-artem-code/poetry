import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi, poemsApi } from '../api';

export const usePoems = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['poems', page, limit],
    queryFn: () => poemsApi.getAll(page, limit),
  });
};

export const usePoem = (id: number) => {
  return useQuery({
    queryKey: ['poem', id],
    queryFn: () => poemsApi.getOne(id),
    enabled: !!id,
  });
};

export const usePoemBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['poem', 'slug', slug],
    queryFn: () => poemsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const usePoemsByCollection = (collectionId: number) => {
  return useQuery({
    queryKey: ['poems', 'collection', collectionId],
    queryFn: () => poemsApi.getByCollection(collectionId),
    enabled: !!collectionId,
  });
};

export const useSearchPoems = (query: string) => {
  return useQuery({
    queryKey: ['poems', 'search', query],
    queryFn: () => poemsApi.search(query),
    enabled: query.length > 2,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ poemId, isFavorited }: { poemId: number; isFavorited: boolean }) => {
      if (isFavorited) {
        await favoritesApi.remove(poemId);
      } else {
        await favoritesApi.add(poemId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['poem'] });
    },
  });
};
