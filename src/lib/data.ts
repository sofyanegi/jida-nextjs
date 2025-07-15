import { Post } from './definitions';

// eslint-disable-next-line prefer-const
export let posts: Post[] = [
  {
    id: '1',
    slug: 'belajar-nextjs-app-router',
    title: 'Panduan Lengkap Next.js App Router',
    description: 'Pelajari cara kerja App Router, dari routing dasar hingga fitur-fitur canggih.',
    date: '2024-05-10',
  },
  {
    id: '2',
    slug: 'menguasai-typescript-dalam-5-langkah',
    title: 'Menguasai TypeScript dalam 5 Langkah',
    description: 'Tips dan trik untuk meningkatkan kemampuan TypeScript Anda dengan cepat.',
    date: '2024-05-12',
  },
  {
    id: '3',
    slug: 'integrasi-shadcn-ui-dengan-nextjs',
    title: 'Integrasi Shadcn/UI dengan Next.js',
    description: 'Bangun antarmuka yang indah dan dapat disesuaikan dengan mudah.',
    date: '2024-05-15',
  },
  {
    id: '4',
    slug: 'state-management-di-react',
    title: 'State Management di React: Kapan Menggunakan Context?',
    description: 'Pahami kapan waktu yang tepat untuk menggunakan Context API vs library lain.',
    date: '2024-05-20',
  },
];

export function getPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function createPost(post: Post): Post {
  posts.push(post);
  return post;
}

export function updatePost(slug: string, updatedPost: Post): Post | undefined {
  const index = posts.findIndex((post) => post.slug === slug);

  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedPost };
    return posts[index];
  }

  return undefined;
}

export function deletePost(slug: string): boolean {
  const index = posts.findIndex((post) => post.slug === slug);

  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
}
