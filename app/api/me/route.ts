import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json({ data: user });
}
