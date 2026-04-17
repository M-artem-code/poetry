"use client";

import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/src/shared/api";
import type { Category } from "@/src/shared/types";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCategory = (slug: string) => {
  return useQuery<Category>({
    queryKey: ["category", slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};
