import { Metadata } from 'next';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Post, BASE_API_URL } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/post-card';

export const metadata: Metadata = { title: 'Blog' };

const fetchPosts = async () => {
  const res = await fetch(`${BASE_API_URL}/posts`, { cache: 'no-store' }).then((res) => res.json());
  const { data } = res;
  return data;
};

export default async function Page() {
  const posts: Post[] = await fetchPosts();
  if (!posts) return null;

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

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {posts.length ? (
          posts.map((post) => <PostCard key={post.slug} {...post} />)
        ) : (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">Belum ada postingan blog.</p>
          </div>
        )}
      </div>
    </div>
  );
}
