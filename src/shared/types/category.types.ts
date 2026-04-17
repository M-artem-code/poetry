import { Collection } from "@/poetry-backend/generated/prisma";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  collections?: Collection[];
  _count?: {
    collections: number;
  };
}
