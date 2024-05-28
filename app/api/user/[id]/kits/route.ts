import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { KitCardInfo } from '@/types/Kit';

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const data =
    /* await prisma.kit.findMany({
    where: { uploaderId: id },
    select: {
      id: true,
      title: true,
      thumbnailImage: true,
      tags: true,
      uploader: {
        select: { image: true, name: true },
      },
    },
  }) */
    Array.from({ length: 20 }).map(
      (_, i) =>
        ({
          id: i.toString(),
          title: `Kit Title ${i}`,
          thumbnailImage: `https://picsum.photos/360?random=${i}`,
          tags: ['tag1', 'tag2'],
          uploader: {
            image: `https://picsum.photos/100`,
            name: `test`,
          },
        }) satisfies KitCardInfo,
    );

  return NextResponse.json({ data });
}
