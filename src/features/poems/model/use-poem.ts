"use client";

import { useQuery } from "@tanstack/react-query";
import { poemsApi } from "@/src/shared/api";
import type { Poem } from "@/src/shared/types";

export const usePoem = (id: number) => {
  return useQuery<Poem>({
    queryKey: ["poem", id],
    queryFn: () => poemsApi.getOne(id),
    enabled: !!id && id > 0,
  });
};

export const usePoemBySlug = (slug: string) => {
  return useQuery<Poem>({
    queryKey: ["poem", "slug", slug],
    queryFn: () => poemsApi.getBySlug(slug),
    enabled: !!slug,
  });
};
