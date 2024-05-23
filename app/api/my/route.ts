import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });

  return NextResponse.json({ data: user });
}
