import type { Collection } from './collection.types';

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
