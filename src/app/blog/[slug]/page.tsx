import DeleteButton from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BASE_API_URL } from '@/lib/definitions';
import { ArrowLeft, PenBoxIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type BlogPostPageProps = { params: Promise<{ slug: string }> };

const fetchPost = async (slug: string) => {
  const res = await fetch(`${BASE_API_URL}/posts/${slug}`).then((res) => res.json());
  const { data } = res;
  return data;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: 'Postingan tidak ditemukan' };
  return { title: post.title, description: post.description };
}

export default async function Page({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

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
          <div className="flex items-center gap-2">
            <DeleteButton params={post.slug} url="/api/posts" succesMessage="Success delete Post" />
            <Link href={`/blog/${post.slug}/edit`}>
              <Button variant="secondary" size="icon">
                <PenBoxIcon />
              </Button>
            </Link>
          </div>
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
