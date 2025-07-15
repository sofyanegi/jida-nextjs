'use client';

import { PostForm, PostFormValues } from '@/components/post-form';
import { Post } from '@/lib/definitions';
import { notFound, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '../loading';
import { BASE_API_URL } from '@/lib/definitions';

type EditPostPageProps = { params: Promise<{ slug: string }> };

export default function Page({ params }: EditPostPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`${BASE_API_URL}/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch post:', error);
          setIsLoading(false);
        });
    }
  }, [slug]);

  async function onSubmit(values: PostFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_API_URL}/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to update post');

      toast.success('Post updated successfully!');
      router.push(`/blog`);
      router.refresh();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <Loading />;
  if (!post) return notFound();

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Edit Post</h1>
      <PostForm onSubmit={onSubmit} initialData={post} buttonText="Update Post" isSubmitting={isSubmitting} />
    </div>
  );
}
