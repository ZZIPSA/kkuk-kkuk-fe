import { NextResponse } from 'next/server';
import { prisma, kitSelect, rallySelect, userSelect } from '@/app/api/lib/prisma';
import { SortOrder } from '@/app/api/lib/types';
import { UnauthorizedError } from '@/app/api/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const orderParam = searchParams.get('order') || 'desc';
  const order: SortOrder = orderParam === 'asc' ? 'asc' : 'desc';

  if (!userId) return UnauthorizedError;

  const user = await prisma.user.findUnique({
    select: {
      rallies: {
        orderBy: {
          createdAt: order,
        },
        select: rallySelect,
      },
      kits: {
        orderBy: {
          createdAt: order,
        },
        select: kitSelect,
      },
      ...userSelect,
    },
    where: { id: userId, deletedAt: null },
  });

  return NextResponse.json({ data: user });
}
