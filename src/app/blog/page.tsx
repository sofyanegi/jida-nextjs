import { Metadata } from 'next';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostList from '@/components/post-list';

export const metadata: Metadata = { title: 'Blog' };

export default async function Page() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-8 flex flex-col justify-center items-start md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">Kumpulan artikel tentang pengembangan web, teknologi, dan lainnya.</p>
        </div>
        <Link href="/blog/create" className="inline">
          <Button>
            Create New Post <PlusCircle className="h-4 w-4" />
          </Button>
        </Link>
      </header>
      <PostList />
    </div>
  );
}
