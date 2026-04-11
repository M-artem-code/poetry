import { useQuery } from "@tanstack/react-query";
import { ViewsData } from "@/src/shared/types/views.types";
import { viewsApi } from "@/src/shared/api/views.api";

export const ViewsKeys = {
  all: ["views"] as const,
  data: (poemId: number) => [...ViewsKeys.all, "data", poemId] as const,
};

export const useOptimisticViews = (poemId: number) => {
  const {
    isLoading,
    isError,
    error,
    data: viewsData,
    refetch,
  } = useQuery<ViewsData>({
    queryKey: ViewsKeys.data(poemId),
    queryFn: async () => {
      const views = await viewsApi.getOrAddView(poemId);
      return views;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const addView = () => {
    // Просто вызываем refetch - это добавит просмотр и обновит данные
    if (!isLoading) {
      refetch();
    }
  };

  return {
    isLoading,
    isError,
    error,
    addView,
    views: viewsData?.views ?? 0,
  };
};
