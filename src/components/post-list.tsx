'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { fetchPosts } from '@/lib/features/slice/postsSlice';
import PostCard from './post-card';
import { Skeleton } from './ui/skeleton';
import { notFound } from 'next/navigation';
import { usePostsState } from '@/lib/features/slice/usePostsHooks';

const PostCardSkeleton = () => (
  <div className="container mx-auto p-8 max-w-xl">
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

export default function PostList() {
  const dispatch = useAppDispatch();
  const { posts, status } = usePostsState();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts());
  }, [dispatch, status]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'failed') return notFound();

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} {...post} />)
      ) : (
        <div className="col-span-full text-center">
          <p className="text-muted-foreground">Belum ada postingan blog.</p>
        </div>
      )}
    </div>
  );
}
