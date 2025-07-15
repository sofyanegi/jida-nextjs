import { deletePost, getPostBySlug, updatePost } from '@/lib/data';
import { Post } from '@/lib/definitions';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  return NextResponse.json({ status: 200, message: 'success get detail post', data: post });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const body = await req.json();
  const updatedData: Post = {
    ...body,
    slug: slugify(body.title, {
      lower: true,
      strict: true,
    }),
  };

  const result = updatePost(slug, updatedData);

  if (!result) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  return NextResponse.json({ status: 200, message: 'success', data: result });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const result = deletePost(slug);

  if (!result) return NextResponse.json({ status: 404, message: 'Not Found' }, { status: 404 });

  return NextResponse.json({ status: 200, message: 'success delete post' });
}
