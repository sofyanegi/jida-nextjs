import { posts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type BlogPostPageProps = { params: { slug: string } };

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: 'Postingan tidak ditemukan' };
  }

  return { title: post.title, description: post.description };
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }: BlogPostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <div className="container mx-auto p-8 flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground pt-2">
            Diterbitkan pada{' '}
            {new Date(post.date).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg text-foreground">{post.description}</p>
            <p>Ini adalah contoh konten artikel. Dalam aplikasi nyata, konten ini akan datang dari CMS atau file markdown.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit laboriosam reiciendis explicabo itaque possimus atque culpa voluptatibus dicta? Minus sed nostrum suscipit nobis explicabo illo, laboriosam autem totam quis
              perferendis.
            </p>
          </div>
          <Button asChild className="mt-8">
            <Link href="/blog" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Blog
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
