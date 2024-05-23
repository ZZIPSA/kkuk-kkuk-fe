import { NextResponse } from 'next/server';
import { auth, signIn } from '@/auth';
import { prisma } from '@/lib/prisma';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET() {
  const { user } = await auth();
  if (!user) return signIn();
  const { id } = user;

  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      profileImage: true,
      nickname: true,
      accounts: { select: { provider: true, userId: true } },
      rallies: {
        select: { status: true },
      },
    },
  });

  return NextResponse.json({ data });
}
