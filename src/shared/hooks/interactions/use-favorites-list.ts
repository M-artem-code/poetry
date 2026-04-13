import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../../api/favorites.api";
import { interactionKeys } from "./use-poem-interactions";
import { Favorite } from "../../types";
import { useUserStore } from "@/src/entities/user";

export const favoritesKeys = {
  my: () => ["favorites", "my"] as const,
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (poemId: number) => favoritesApi.removeFavorite(poemId),
    onSuccess: (_data, poemId) => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.my() });
      queryClient.invalidateQueries({
        queryKey: interactionKeys.data(poemId),
      });
    },
  });
};

export const useFavorites = () => {
  const { isAuthenticated } = useUserStore();

  const { data, isLoading, isError, error, refetch } = useQuery<Favorite[]>({
    queryKey: favoritesKeys.my(),
    queryFn: () => favoritesApi.getMyFavorites(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    favorites: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
};
