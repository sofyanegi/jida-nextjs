'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PostForm, PostFormValues } from '@/components/post-form';
import Loading from '../loading';
import { useAppDispatch } from '@/lib/hooks';
import { clearSelectedPost, fetchPostBySlug, updatePost } from '@/lib/features/slice/postsSlice';
import { useSelectedPostState } from '@/lib/features/slice/usePostsHooks';
import { useSession } from 'next-auth/react';

type EditPostPageProps = { params: Promise<{ slug: string }> };

export default function Page({ params }: EditPostPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const { data: session, status: sessionStatus } = useSession();
  const currentUserId = session?.user?.id;

  const { selectedPost: post, selectedStatus: postStatus } = useSelectedPostState();

  useEffect(() => {
    (async () => {
      const resolved = await params;
      setSlug(resolved.slug);
    })();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchPostBySlug(slug));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (!slug || sessionStatus === 'loading' || postStatus === 'loading') return;

    if (!session?.user) {
      router.replace(`/login?callbackUrl=/blog/${slug}/edit`);
      return;
    }

    if (post && post.authorId !== currentUserId) {
      toast.warning('You are not authorized to edit this post.');
      router.replace('/blog');
      return;
    }

    if (post && post.authorId === currentUserId) {
      setIsAuthorized(true);
    }
  }, [session, slug, post, sessionStatus, postStatus, router, currentUserId]);

  const onSubmit = async (values: PostFormValues) => {
    if (!slug) return;
    setIsSubmitting(true);

    const body = {
      authorId: currentUserId,
      slug,
      ...values,
    };

    try {
      const updated = await dispatch(updatePost(body)).unwrap();
      toast.success('Post updated successfully.');
      router.push(`/blog/${updated.slug}`);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!slug || postStatus === 'loading' || sessionStatus === 'loading' || !isAuthorized) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Edit Post</h1>
      {post && <PostForm onSubmit={onSubmit} initialData={post} buttonText="Update Post" isSubmitting={isSubmitting} />}
    </div>
  );
}
