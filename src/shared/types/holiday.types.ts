import type { Poem } from './poem.types';

export enum Season {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  AUTUMN = 'AUTUMN',
}

export interface Holiday {
  id: string;
  name: string;
  slug: string;
  day: number;
  month: number;
  season: Season;
  image: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  poems?: Poem[];
}

export interface HolidayWithPoems extends Holiday {
  poems: Poem[];
}

export interface HolidaysResponse {
  holidays: Holiday[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}