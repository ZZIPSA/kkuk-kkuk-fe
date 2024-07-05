import { NextResponse } from 'next/server';
import { prisma } from '@/app/api/lib/prisma';
import { BadRequestError, NotFoundRallyError, ServerError, StampLimitError, UnauthorizedError } from '@/app/api/lib/errors';
import { getRallyStatus } from '@/app/api/lib/utils';
import { auth } from '@/auth';

type PatchRallyParams = { params: { id: string } };

export async function PATCH(_: Request, { params }: PatchRallyParams) {
  const session = await auth();
  const currentUser = session?.user;
  const { id: rallyId } = params;

  if (!currentUser) return UnauthorizedError;
  if (!rallyId) return BadRequestError;

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId },
      include: { kit: { include: { _count: { select: { stamps: true } } } } },
    });

    if (!rally) return NotFoundRallyError;
    if (rally.stampCount >= rally.kit._count.stamps) return StampLimitError;

    const updatedStampCount = rally.stampCount + 1;
    const isRallyComplete = rally.stampCount === rally.kit._count.stamps;
    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: {
        stampCount: updatedStampCount,
        status: getRallyStatus(updatedStampCount),
        lastStampDate: new Date(),
        completionDate: isRallyComplete ? new Date() : null,
      },
    });

    return NextResponse.json(updatedRally);
  } catch (error) {
    return ServerError;
  }
}
