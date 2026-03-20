'use client';

import { useQuery } from '@tanstack/react-query';
import { collectionsApi } from '@/src/shared/api';
import type { Collection } from '@/src/shared/types';

export const useCollections = () => {
  return useQuery<Collection[]>({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCollection = (slug: string) => {
  return useQuery<Collection>({
    queryKey: ['collection', slug],
    queryFn: () => collectionsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCollectionsByCategory = (categoryId: number) => {
  return useQuery<Collection[]>({
    queryKey: ['collections', 'category', categoryId],
    queryFn: () => collectionsApi.getByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};
