import type { UserRole } from "./auth.types";

export interface AdminStats {
  poems: number;
  users: number;
  admins: number;
  comments: number;
  categories: number;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
  createdAt: string;
  _count: {
    comments: number;
    favorites: number;
  };
}

export interface CreatePoemDto {
  title: string;
  content: string;
  description?: string;
  authorId: number;
  year?: number;
  categoryId: number;
  videoUrl?: string;
}

export interface UpdatePoemDto {
  title?: string;
  content?: string;
  description?: string;
  authorId?: number;
  year?: number;
  categoryId?: number;
  videoUrl?: string;
}

export interface CreateAuthorDto {
  name: string;
  bio?: string;
  birthYear?: number;
  deathYear?: number;
  image?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UploadVideoResponse {
  videoUrl: string;
  filename: string;
}
