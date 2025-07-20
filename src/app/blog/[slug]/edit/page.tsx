'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PostForm, PostFormValues } from '@/components/post-form';
import Loading from '../loading';
import { useAppDispatch } from '@/lib/hooks';
import { clearSelectedPost, fetchPostBySlug, updatePost } from '@/lib/features/slice/postsSlice';
import { useSelectedPostState } from '@/lib/features/slice/usePostsHooks';

type EditPostPageProps = { params: Promise<{ slug: string }> };

export default function Page({ params }: EditPostPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedPost: post, selectedStatus: status } = useSelectedPostState();

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));

    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, slug]);

  const onSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    try {
      const updated = await dispatch(updatePost({ slug, values })).unwrap();
      toast.success('Post updated successfully.');
      router.push(`/blog/${updated.slug}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || status === 'idle') return <Loading />;

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Edit Post</h1>
      {post && <PostForm onSubmit={onSubmit} initialData={post} buttonText="Update Post" isSubmitting={isSubmitting} />}
    </div>
  );
}
