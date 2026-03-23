"use client";

import { Author } from "@/src/shared";
import { authorsApi } from "@/src/shared/api/author.api";
import { useQuery } from "@tanstack/react-query";

// Получаем всех авторов
export const useAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: () => authorsApi.getAll(),
  });
};

// Получаем одного автора по slug
export const useAuthor = (slug: string) => {
  return useQuery<Author>({
    queryKey: ["author", slug],
    queryFn: () => authorsApi.getBySlug(slug),
    enabled: !!slug,
  });
};
