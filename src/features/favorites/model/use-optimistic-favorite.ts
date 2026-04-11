import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserStore } from "@/src/entities/user";
import { queryClient } from "@/src/shared/config/query-client";
import {
  FavoriteData,
  FavoriteOptimisticContext,
} from "@/src/shared/types/favorite.types";
import { favoritesApi } from "@/src/shared/api/favorites.api";

export const FavoriteKeys = {
  all: ["favorites"] as const,
  data: (poemId: number) => [...FavoriteKeys.all, "data", poemId] as const,
};

export const useOptimisticFavorite = (poemId: number) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const {
    isLoading,
    isError,
    error,
    data: favoriteData,
  } = useQuery<FavoriteData>({
    queryKey: FavoriteKeys.data(poemId),
    queryFn: async () => {
      if (isAuthenticated) {
        const [status, count] = await Promise.all([
          favoritesApi.getFavoriteStatus(poemId),
          favoritesApi.getCount(poemId),
        ]);
        return {
          isFavorite: status.isFavorite,
          favoritesCount: count.favoritesCount,
        };
      } else {
        const count = await favoritesApi.getCount(poemId);
        return { isFavorite: false, favoritesCount: count.favoritesCount };
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const mutation = useMutation<
    FavoriteData,
    Error,
    void,
    FavoriteOptimisticContext
  >({
    mutationFn: () => favoritesApi.toggleFavorite(poemId),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: FavoriteKeys.data(poemId),
      });

      const previousData = queryClient.getQueryData<FavoriteData>(
        FavoriteKeys.data(poemId),
      );

      const action = previousData?.isFavorite ? "remove" : "add";

      queryClient.setQueryData<FavoriteData>(
        FavoriteKeys.data(poemId),
        (old) => {
          if (!old) return { isFavorite: true, favoritesCount: 1 };
          const newIsFavorite = !old.isFavorite;
          return {
            isFavorite: newIsFavorite,
            favoritesCount: Math.max(
              0,
              old.favoritesCount + (newIsFavorite ? 1 : -1),
            ),
          };
        },
      );

      return {
        previousData,
        poemId,
        action,
      };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<FavoriteData>(
          FavoriteKeys.data(poemId),
          context.previousData,
        );
      }
      queryClient.invalidateQueries({
        queryKey: FavoriteKeys.data(poemId),
        exact: true,
      });
      toast.error("Избранное не обновлено!", {
        description: "Не удалось обновить избранное",
      });
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(FavoriteKeys.data(poemId), data);

      const action = context?.action === "add" ? "дададзена" : "выдалена";
      toast.success(`Верш ${action} у избранае`, {
        description:
          context?.action === "add"
            ? "Верш паспяхова дададзены ў ваш спіс избранага"
            : "Верш выдалены з вашага спісу избранага",
      });
    },
  });

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("Увайдзіце ў сістэму", {
        description: "Каб дадаць у избранае, трэба аўтарызавацца",
      });
      return;
    }
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return {
    isLoading,
    isError,
    error,
    isMutating: mutation.isPending,
    mutationError: mutation.error,
    toggleFavorite,
    isFavorite: favoriteData?.isFavorite ?? false,
    favoriteCount: favoriteData?.favoritesCount ?? 0,
  };
};
