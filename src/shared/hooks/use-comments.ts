import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCommentDto } from '../types';
import { commentsApi } from '../api';

export const useComments = (poemId: number) => {
  return useQuery({
    queryKey: ['comments', poemId],
    queryFn: () => commentsApi.getByPoem(poemId),
    enabled: !!poemId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentDto) => commentsApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.poemId] });
      queryClient.invalidateQueries({ queryKey: ['poem', variables.poemId] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
