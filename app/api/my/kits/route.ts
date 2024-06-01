import { NextResponse } from 'next/server';
import { kitSelect, prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// TODO: MVP 이후 페이지네이션 구현
export async function GET() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  const data = await prisma.kit.findMany({
    where: { uploaderId: currentUser.id },
    select: kitSelect,
  });

  return NextResponse.json({
    data,
    meta: {
      totalKits: data.length,
    },
  });
}
