'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, PenBoxIcon } from 'lucide-react';

import { useAppDispatch } from '@/lib/hooks';
import { fetchPostBySlug, deletePost, clearSelectedPost } from '@/lib/features/slice/postsSlice';
import { useSelectedPostState } from '@/lib/features/slice/usePostsHooks';

import { Post } from '@/lib/definitions';
import { formatDate } from '@/lib/utils';

import Loading from '@/app/blog/[slug]/loading';
import DeleteButton from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';

export default function PostDetail({ slug }: { slug: Post['slug'] }) {
  const dispatch = useAppDispatch();
  const { selectedPost: post, selectedStatus: status } = useSelectedPostState();
  const { data: session } = useSession();
  const authorId: string = (session?.user as { id: string })?.id;

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));

    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, slug]);

  if (status === 'loading' || status === 'idle') return <Loading />;
  if (status === 'failed' || !post) notFound();

  const handleConfirmDelete = async () => {
    await dispatch(deletePost(slug)).unwrap();
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground pt-2">Diterbitkan pada {formatDate(post.createdAt!)}</p>
        {authorId === post.authorId && (
          <div className="flex items-center gap-2">
            <DeleteButton onConfirm={handleConfirmDelete} succesMessage="Post berhasil dihapus!" redirect="/blog" />
            <Link href={`/blog/${slug}/edit`} className="hover:text-accent">
              <Button variant="secondary" size="icon">
                <PenBoxIcon />
              </Button>
            </Link>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">{post.description}</p>
          {/* Placeholder article content */}
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
