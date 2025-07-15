import { createPost, getPosts } from '@/lib/data';
import { Post } from '@/lib/definitions';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET(): Promise<NextResponse> {
  const posts = getPosts();
  return NextResponse.json({ status: 200, message: 'success get all posts', data: posts });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const newPost: Post = {
    id: (Math.random() * 1000000).toString(),
    slug: slugify(body.title, { lower: true, strict: true }),
    title: body.title,
    description: body.description,
    date: new Date().toISOString(),
  };

  createPost(newPost);

  return NextResponse.json({ status: 201, message: 'success add new post', data: body }, { status: 201 });
}
