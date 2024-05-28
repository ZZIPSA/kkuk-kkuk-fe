import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { MyRally } from '@/types/Rally';

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const data =
    /* await prisma.rally.findMany({
    where: { starterId: id },
    select: {
      id: true,
      status: true,
      stampCount: true,
      kit: {
        select: {
          thumbnailImage: true,
          title: true,
        },
      },
    },
  }); */
    Array.from(
      { length: 40 },
      (_, i) =>
        ({
          id: i.toString(),
          status: i < 20 ? ('active' as const) : ('inactive' as const),
          stampCount: 0,
          updatedAt: i < 20 ? null : new Date(2024, 4, i + 1),
          kit: {
            thumbnailImage: `https://picsum.photos/${360 + i}`,
            title: `Kit Title ${i}`,
            _count: { stamps: 6 },
          },
        }) satisfies MyRally,
    );

  return NextResponse.json({ data });
}
