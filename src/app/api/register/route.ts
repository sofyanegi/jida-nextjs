import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, email, password } = await req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const userExist = await prisma.user.findUnique({ where: { email: email } });

    if (userExist) throw new Error('User already exist');

    await prisma.user.create({ data: { name: name, email: email, password: passwordHash } });

    return NextResponse.json({ status: 201, message: 'success register new user' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error, message: 'Internal Server Error' }, { status: 500 });
  }
}
