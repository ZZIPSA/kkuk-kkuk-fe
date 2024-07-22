import { NextResponse } from 'next/server';
import { prisma } from '@/app/api/lib/prisma';
import { BadRequestError, NotFoundRallyError, ServerError, StampLimitError, UnauthorizedError } from '@/app/api/lib/errors';
import { getRallyStatus } from '@/app/api/lib/utils';
import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';

type PatchRallyParams = { params: { id: string } };

export async function PATCH(request: Request, { params }: PatchRallyParams) {
  const session = await auth();
  const currentUser = session?.user;
  const { id: rallyId } = params;
  const { stampCount } = await request.json();

  if (!currentUser) return UnauthorizedError;
  if (!rallyId) return BadRequestError;

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId, deletedAt: null },
      include: { kit: { include: { _count: { select: { stamps: true } } } } },
    });

    if (!rally) return NotFoundRallyError;
    if (rally.stampCount >= rally.kit._count.stamps) return StampLimitError;

    const updatedStampCount = stampCount !== null ? rally.stampCount + 1 : rally.stampCount;
    const isRallyComplete = updatedStampCount === rally.kit._count.stamps;
    const updatedAt = new Date();
    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: {
        stampCount: updatedStampCount,
        status: getRallyStatus(updatedStampCount),
        updatedAt,
        lastStampDate: updatedAt,
        completionDate: isRallyComplete ? updatedAt : null,
      },
    });
    revalidateTag(rallyId);

    return NextResponse.json(updatedRally);
  } catch (error) {
    return ServerError;
  }
}
