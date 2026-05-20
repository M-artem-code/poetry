"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/src/shared/api/comments.api";
import type { CreateCommentDto } from "@/src/shared/types";
import { toastMessageHandler } from "@/src/shared/utils";
import { interactionKeys } from "@/src/shared/hooks/interactions/use-poem-interactions";
import { PoemInteractionsData } from "@/src/shared/types/interactions.types";

// Создать комментарий
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ poemId, ...data }: { poemId: number } & CreateCommentDto) =>
      commentsApi.create(poemId, data),

    onMutate: async ({ poemId }) => {
      await queryClient.cancelQueries({
        queryKey: interactionKeys.data(poemId),
      });

      const previousData = queryClient.getQueryData<PoemInteractionsData>(
        interactionKeys.data(poemId),
      );

      if (previousData) {
        queryClient.setQueryData<PoemInteractionsData>(
          interactionKeys.data(poemId),
          {
            ...previousData,
            commentsCount: previousData.commentsCount + 1,
          },
        );
      }

      return { previousData, poemId };
    },

    onSuccess: async (_, { poemId }, context) => {
      queryClient.invalidateQueries({ queryKey: ["comments", poemId] });

      // Если interactions ещё не были в кэше — onMutate не мог сделать +1, подтягиваем с сервера
      if (!context?.previousData) {
        await queryClient.refetchQueries({
          queryKey: interactionKeys.data(poemId),
          exact: true,
        });
      }
    },

    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<PoemInteractionsData>(
          interactionKeys.data(context.poemId),
          context.previousData,
        );
      } else if (context?.poemId) {
        queryClient.invalidateQueries({
          queryKey: interactionKeys.data(context.poemId),
          exact: true,
        });
      }
      if (error?.response?.status === 401) {
        toastMessageHandler({
          message: "Необходимо авторизоваться для создания комментария",
        });
      } else {
        toastMessageHandler(error);
      }
    },
  });
};
