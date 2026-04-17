import { queryClient } from "../../config/query-client";
import { interactionKeys, usePoemInteractions } from "./use-poem-interactions";

export const useOptimisticViews = (poemId: number) => {
  const { isLoading, isError, error, views } = usePoemInteractions(poemId);

  const addView = () => {
    if (!isLoading) {
      queryClient.invalidateQueries({
        queryKey: interactionKeys.data(poemId),
        exact: true,
      });
    }
  };

  return {
    isLoading,
    isError,
    error,
    addView,
    views,
  };
};
