import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET() {
  const id = 'clw812wi3000oftre6au63u1f';

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return NextResponse.json({ data: user });
}
