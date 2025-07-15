export const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type Post = {
  id?: string;
  slug?: string;
  title: string;
  description: string;
  date?: string;
};
