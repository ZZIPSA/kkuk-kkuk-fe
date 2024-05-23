import { NextResponse } from 'next/server';
import { RallyStatus } from '@prisma/client';
import { auth, signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CompletedRally } from '@/types/Rally';

export async function GET() {
  const {
    data: { user },
  } = await auth();
  if (!user) return signIn();
  const { id } = user;

  const data: CompletedRally[] = await prisma.rally.findMany({
    where: { starterId: id, status: RallyStatus.inactive, stampCount: { equals: 6 } },
    select: {
      id: true,
      stampCount: true,
      updatedAt: true,
      kit: {
        select: {
          thumbnailImage: true,
          title: true,
        },
      },
    },
  });

  return NextResponse.json({ data });
}
