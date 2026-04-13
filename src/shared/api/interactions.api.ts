import { PoemInteractionsData } from "../types/interactions.types";
import { apiClient } from "./client";

export const interactionsApi = {
  getInteractions: async (poemId: number): Promise<PoemInteractionsData> => {
    const response = await apiClient.get(`/poems/${poemId}/interactions`);
    return response.data;
  },
};
