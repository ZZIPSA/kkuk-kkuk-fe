import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET() {
  const { user } = await auth();
  if (!user) return NextResponse.redirect('/signin');
  const { id } = user;

  const data = await prisma.user.findUnique({
    where: { id },
  });

  return NextResponse.json({ data });
}
