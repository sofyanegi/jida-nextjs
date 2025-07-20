import type { Metadata } from 'next';
import { BASE_API_URL } from '@/lib/definitions';
import PostDetail from '@/components/post-detail';

type BlogPostPageProps = { params: Promise<{ slug: string }> };

const fetchPost = async (slug: string) => {
  const res = await fetch(`${BASE_API_URL}/posts/${slug}`, { cache: 'no-store' });
  if (!res.ok) return undefined;
  const { data } = await res.json();
  return data;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.description };
}

export default async function Page({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto p-8 flex justify-center">
      <PostDetail slug={slug} />
    </div>
  );
}
