'use client';

import { PostForm, PostFormValues } from '@/components/post-form';
import { BASE_API_URL } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: PostFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, date: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      toast.success('Post created successfully!');
      router.push('/blog');
      router.refresh();
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
