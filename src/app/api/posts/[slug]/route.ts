import { posts } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = posts.find((post) => post.slug == slug);

  if (!post) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  return NextResponse.json({ status: 200, message: 'success get detail post', data: post });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  const body = await req.json();

  posts[index] = {
    ...posts[index],
    ...body,
    slug: slugify(body.title, {
      lower: true,
      strict: true,
    }),
  };

  return NextResponse.json({ status: 200, message: 'success', data: body });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  posts.splice(index, 1);
  return NextResponse.json({ status: 200, message: 'success delete post' });
}
