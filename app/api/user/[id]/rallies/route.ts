import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JoinedRally } from '@/types/Rally';

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const data: JoinedRally[] = await prisma.rally.findMany({
    where: { starterId: id },
    select: {
      id: true,
      stampCount: true,
      kit: {
        select: {
          thumbnailImage: true,
          title: true,
          _count: {
            select: {
              stamps: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ data });
}
