import { NextRequest, NextResponse } from 'next/server';
import { NewPost } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/utils';

export async function GET(): Promise<NextResponse> {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ status: 200, message: 'success get all posts', data: posts });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { title, description, authorId } = await req.json();
  const newPost: NewPost = { title: title, description: description, slug: generateUniqueSlug(title), authorId: authorId };
  try {
    const result = await prisma.post.create({ data: newPost });
    return NextResponse.json({ status: 201, message: 'success add new post', data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error, message: 'Internal Server Error' }, { status: 500 });
  }
}
