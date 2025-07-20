export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Post = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type NewPost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePost = Omit<Post, 'createdAt' | 'updatedAt'>;
