export interface Comment {
  id: number;
  text: string;
  userId: number;
  poemId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
  };
}

export interface CreateCommentDto {
  poemId: number;
  text: string;
}
