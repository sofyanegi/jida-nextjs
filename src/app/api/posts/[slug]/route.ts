import { NextRequest, NextResponse } from 'next/server';
import { UpdatePost } from '@/lib/definitions';
import prisma from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  try {
    const post = await prisma.post.findUnique({ where: { slug: slug } });
    if (!post) return NextResponse.json({ status: 404, message: 'Post not found' }, { status: 404 });
    return NextResponse.json({ status: 200, message: 'success get detail post', data: post });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const { title, description } = await req.json();
  const updatedData: UpdatePost = { title, description, slug: generateUniqueSlug(title) };
  try {
    await prisma.post.update({ where: { slug: slug }, data: updatedData });
    return NextResponse.json({ status: 200, message: 'success update post' });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  try {
    await prisma.post.delete({ where: { slug: slug } });
    return NextResponse.json({ status: 200, message: 'success delete post' });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error }, { status: 500 });
  }
}
