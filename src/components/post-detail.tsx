import { Post } from '@/lib/definitions';
import DeleteButton from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PenBoxIcon } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostDetail(post: Post) {
  const { slug, title, createdAt, description } = post;

  if (!post) return null;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground pt-2">Diterbitkan pada {formatDate(createdAt!)}</p>
        <div className="flex items-center gap-2">
          <DeleteButton params={slug} url="/api/posts" succesMessage="Success delete Post" />
          <Link href={`/blog/${slug}/edit`} className="hover:text-accent">
            <Button variant="secondary" size="icon">
              <PenBoxIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">{description}</p>
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
  );
}
