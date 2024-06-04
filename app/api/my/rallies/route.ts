import { NextResponse } from 'next/server';
import { prisma, rallySelect } from '@/lib/prisma';

// TODO: MVP 이후 페이지네이션, 파람 구현
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  try {
    const rallies = await prisma.rally.findMany({ where: { starterId: userId }, select: rallySelect });

    return NextResponse.json({
      data: rallies,
      meta: {
        totalRallies: rallies.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
