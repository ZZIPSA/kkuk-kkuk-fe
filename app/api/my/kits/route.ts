import { NextResponse } from 'next/server';
import { kitSelect, prisma } from '@/app/api/lib/prisma';
import { SortOrder } from '@/app/api/lib/types';
import { UnauthorizedError } from '@/app/api/lib/errors';

// TODO: MVP 이후 페이지네이션 구현
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const orderParam = searchParams.get('order') || 'desc';
  const order: SortOrder = orderParam === 'asc' ? 'asc' : 'desc';

  if (!userId) return UnauthorizedError;

  const data = await prisma.kit.findMany({
    where: { uploaderId: userId },
    orderBy: {
      createdAt: order,
    },
    select: kitSelect,
  });

  return NextResponse.json({
    data,
    meta: {
      totalKits: data.length,
    },
  });
}
