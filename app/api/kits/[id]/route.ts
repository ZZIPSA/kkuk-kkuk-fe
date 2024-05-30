import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { KitResult } from '@/types/Kit';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const kit =
    /*
  await prisma.kit.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      tags: true,
      thumbnailImage: true,
      rewardImage: true,
      uploader: true,
      stamps: true,
    },
  });
  */
    {
      id: '1',
      title: 'Test Kit',
      description: 'This is a test kit.',
      tags: ['test', 'kit'],
      thumbnailImage: 'https://picsum.photos/360',
      rewardImage: 'https://picsum.photos/360?random=5',
      uploader: {
        id: '1',
        profileImage: 'https://picsum.photos/100',
        nickname: 'Test User',
      },
      stamps: Array.from({ length: 6 }, (_, i) => ({
        id: i.toString(),
        image: 'https://picsum.photos/360?random=' + i,
      })),
    } satisfies KitResult;

  return NextResponse.json({ data: kit }, { status: kit ? 200 : 404 });
}
