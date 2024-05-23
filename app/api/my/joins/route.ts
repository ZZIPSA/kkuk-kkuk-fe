import { NextResponse } from 'next/server';
import { RallyStatus } from '@prisma/client';
import { auth, signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { JoinedRally } from '@/types/Rally';

export async function GET() {
  const {
    data: { user },
  } = await auth();
  if (!user) return signIn();
  const { id } = user;

  const data: JoinedRally[] = await prisma.rally.findMany({
    where: { starterId: id, status: RallyStatus.active },
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
