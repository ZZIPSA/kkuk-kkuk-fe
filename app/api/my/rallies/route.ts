import { NextResponse } from 'next/server';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { MyRally } from '@/types/Rally';
import { SortOrder } from '@/app/api/lib/types';
import { UnauthorizedError } from '@/app/api/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const orderParam = searchParams.get('order') || 'desc';
  const order: SortOrder = orderParam === 'asc' ? 'asc' : 'desc';

  if (!userId) return UnauthorizedError;

  try {
    const rallies = (await prisma.rally.findMany({
      where: { starterId: userId, deletedAt: null },
      orderBy: {
        createdAt: order,
      },
      select: rallySelect,
    })) satisfies MyRally[];

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
