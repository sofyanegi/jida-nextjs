export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const posts: Post[] = [
  {
    slug: 'belajar-nextjs-app-router',
    title: 'Panduan Lengkap Next.js App Router',
    description: 'Pelajari cara kerja App Router, dari routing dasar hingga fitur-fitur canggih.',
    date: '2024-05-10',
  },
  {
    slug: 'menguasai-typescript-dalam-5-langkah',
    title: 'Menguasai TypeScript dalam 5 Langkah',
    description: 'Tips dan trik untuk meningkatkan kemampuan TypeScript Anda dengan cepat.',
    date: '2024-05-12',
  },
  {
    slug: 'integrasi-shadcn-ui-dengan-nextjs',
    title: 'Integrasi Shadcn/UI dengan Next.js',
    description: 'Bangun antarmuka yang indah dan dapat disesuaikan dengan mudah.',
    date: '2024-05-15',
  },
  {
    slug: 'state-management-di-react',
    title: 'State Management di React: Kapan Menggunakan Context?',
    description: 'Pahami kapan waktu yang tepat untuk menggunakan Context API vs library lain.',
    date: '2024-05-20',
  },
];
