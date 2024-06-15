import { NextResponse } from 'next/server';
import { kitSelect, prisma } from '@/app/api/lib/prisma';

// TODO: MVP 이후 페이지네이션 구현
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  const data = await prisma.kit.findMany({
    where: { uploaderId: userId },
    select: kitSelect,
  });

  return NextResponse.json({
    data,
    meta: {
      totalKits: data.length,
    },
  });
}
