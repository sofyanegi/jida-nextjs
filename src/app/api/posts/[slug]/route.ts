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
  const { slug } = await params;
  const { title, description, authorId } = await req.json();

  try {
    const existingPost = await prisma.post.findUnique({ where: { slug } });

    if (!existingPost) {
      return NextResponse.json({ status: 404, message: 'Post not found' }, { status: 404 });
    }

    if (existingPost.authorId !== authorId) {
      return NextResponse.json({ status: 403, message: 'You are not authorized to edit this post' }, { status: 403 });
    }

    const updatedData: UpdatePost = {
      title,
      description,
      slug: generateUniqueSlug(title),
      authorId,
    };

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: updatedData,
    });

    return NextResponse.json({
      status: 200,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal Server Error',
        error: (error as Error).message,
      },
      { status: 500 }
    );
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
