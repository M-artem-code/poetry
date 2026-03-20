import { Collection } from "@/poetry-backend/generated/prisma";
import { apiClient } from "./client";

export const collectionsApi = {
  getAll: async (): Promise<Collection[]> => {
    const response = await apiClient.get<Collection[]>("/collections");
    return response.data;
  },

  getOne: async (id: number): Promise<Collection> => {
    const response = await apiClient.get<Collection>(`/collections/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Collection> => {
    const response = await apiClient.get<Collection>(
      `/collections/slug/${slug}`,
    );
    return response.data;
  },

  getByCategory: async (categoryId: number): Promise<Collection[]> => {
    const response = await apiClient.get<Collection[]>(
      `/collections/category/${categoryId}`,
    );
    return response.data;
  },
};
