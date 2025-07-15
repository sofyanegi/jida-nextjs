import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/lib/definitions';
import { PlusCircle } from 'lucide-react';
import { Metadata } from 'next';
import { BASE_API_URL } from '@/lib/definitions';

export const metadata: Metadata = { title: 'Blog' };
export default async function Page() {
  const res = await fetch(`${BASE_API_URL}/posts`, { cache: 'no-store' }).then((res) => res.json());
  const posts: Post[] = res.data;

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
          posts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.date!).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">Belum ada postingan blog.</p>
          </div>
        )}
      </div>
    </div>
  );
}
