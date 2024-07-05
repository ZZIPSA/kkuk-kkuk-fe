import { NextResponse } from 'next/server';
import { prisma } from '@/app/api/lib/prisma';
import { BadRequestError, NotFoundRallyError, ServerError, StampLimitError } from '@/app/api/lib/errors';
import { getRallyStatus } from '@/app/api/lib/utils';

type PatchRallyParams = { params: { id: string } };

export async function PATCH(_: Request, { params }: PatchRallyParams) {
  const { id: rallyId } = params;

  if (!rallyId) return BadRequestError;

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId },
      include: { kit: { include: { _count: { select: { stamps: true } } } } },
    });

    if (!rally) return NotFoundRallyError;
    if (rally.stampCount >= rally.kit._count.stamps) return StampLimitError;

    const updatedStampCount = rally.stampCount + 1;
    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: { stampCount: updatedStampCount, status: getRallyStatus(updatedStampCount), lastStampDate: new Date() },
    });

    return NextResponse.json(updatedRally);
  } catch (error) {
    return ServerError;
  }
}
