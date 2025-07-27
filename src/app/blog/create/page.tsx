'use client';

import { PostForm, PostFormValues } from '@/components/post-form';
import { addNewPost } from '@/lib/features/slice/postsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const authorId: string = (session?.user as { id: string })?.id;

  async function onSubmit(values: PostFormValues) {
    setIsSubmitting(true);
    try {
      await dispatch(addNewPost({ ...values, authorId }));
      router.push('/blog');
      router.refresh();
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Create New Blog Post</h1>
      <PostForm onSubmit={onSubmit} buttonText="Create Post" isSubmitting={isSubmitting} />
    </div>
  );
}
