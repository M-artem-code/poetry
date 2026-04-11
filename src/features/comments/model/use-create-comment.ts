"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/src/shared/api/comments.api";
import type { CreateCommentDto } from "@/src/shared/types";
import { toastMessageHandler } from "@/src/shared/utils";

// Создать комментарий
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ poemId, ...data }: { poemId: number } & CreateCommentDto) =>
      commentsApi.create(poemId, data),
    onSuccess: (_, { poemId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", poemId] });
      queryClient.invalidateQueries({ queryKey: ["comments-count", poemId] });
    },
    onError: (error: any) => {
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
