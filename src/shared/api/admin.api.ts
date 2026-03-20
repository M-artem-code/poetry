'use client';

import { apiClient } from './client';
import type { Poem, Author } from '../types/poem.types';
import type { Category } from '../types/category.types';
import type {
  AdminStats,
  AdminUser,
  CreatePoemDto,
  UpdatePoemDto,
  CreateAuthorDto,
  CreateCategoryDto,
  UploadVideoResponse,
} from '../types/admin.types';

export const adminApi = {
  // Stats
  getStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  },

  // Poems
  getPoems: async (): Promise<Poem[]> => {
    const response = await apiClient.get<Poem[]>('/admin/poems');
    return response.data;
  },

  createPoem: async (data: CreatePoemDto): Promise<Poem> => {
    const response = await apiClient.post<Poem>('/admin/poems', data);
    return response.data;
  },

  updatePoem: async (id: number, data: UpdatePoemDto): Promise<Poem> => {
    const response = await apiClient.put<Poem>(`/admin/poems/${id}`, data);
    return response.data;
  },

  deletePoem: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/poems/${id}`);
  },

  // Video upload
  uploadVideo: async (file: File): Promise<UploadVideoResponse> => {
    const formData = new FormData();
    formData.append('video', file);
    const response = await apiClient.post<UploadVideoResponse>('/admin/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Authors
  getAuthors: async (): Promise<Author[]> => {
    const response = await apiClient.get<Author[]>('/admin/authors');
    return response.data;
  },

  createAuthor: async (data: CreateAuthorDto): Promise<Author> => {
    const response = await apiClient.post<Author>('/admin/authors', data);
    return response.data;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/admin/categories');
    return response.data;
  },

  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post<Category>('/admin/categories', data);
    return response.data;
  },

  // Users (Super Admin only)
  getUsers: async (): Promise<AdminUser[]> => {
    const response = await apiClient.get<AdminUser[]>('/admin/users');
    return response.data;
  },

  setUserRole: async (userId: number, role: 'USER' | 'ADMIN'): Promise<AdminUser> => {
    const response = await apiClient.put<AdminUser>(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
  },
};
