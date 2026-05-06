import type { Poem } from "./poem.types";

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

export interface Collection {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  poems?: Poem[];
}
