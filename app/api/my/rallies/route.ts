import { NextResponse } from 'next/server';
import { prisma, rallySelect } from '@/lib/prisma';
import { auth } from '@/auth';

// TODO: MVP 이후 페이지네이션, 파람 구현
export async function GET() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  try {
    const rallies = await prisma.rally.findMany({ where: { starterId: currentUser.id }, select: rallySelect });

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
