import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { KitCardInfo } from '@/types/Kit';

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const data: KitCardInfo[] = await prisma.kit.findMany({
    where: { uploaderId: id },
    select: {
      id: true,
      title: true,
      thumbnailImage: true,
      tags: true,
      uploader: {
        select: { profileImage: true, nickname: true },
      },
    },
  });

  return NextResponse.json({ data });
}
