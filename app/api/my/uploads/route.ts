import { NextResponse } from 'next/server';
import { auth, signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { KitCardInfo } from '@/types/Kit';

export async function GET() {
  const {
    data: { user },
  } = await auth();
  if (!user) return signIn();
  const { id } = user;

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
