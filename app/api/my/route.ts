import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET() {
  const id = 'clwhgit8j0001doaigd5t2qt5';

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return NextResponse.json({ data: user });
}
