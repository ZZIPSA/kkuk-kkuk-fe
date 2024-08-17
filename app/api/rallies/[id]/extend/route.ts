import { BadRequestError, NotFoundRallyError, ServerError, UnauthorizedError } from '@/app/api/lib/errors';
import { prisma } from '@/app/api/lib/prisma';
import { RallyStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
type PatchRallyParams = { params: { id: string } };

// NOTE: 랠리 연장 API
export async function PATCH(request: Request, { params }: PatchRallyParams) {
  const { id: rallyId } = params;
  const { userId } = await request.json();

  if (!userId) return UnauthorizedError;

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId, deletedAt: null },
      include: { kit: { include: { _count: { select: { stamps: true } } } } },
    });

    if (!rally) return NotFoundRallyError;
    if (userId !== rally.starterId) return UnauthorizedError;
    if (rally.extendedDueDate || !rally.dueDate) return BadRequestError;

    const remainStamp = rally.kit._count.stamps - rally.stampCount;
    const extendedDueDate = new Date();

    extendedDueDate.setDate(extendedDueDate.getDate() + remainStamp);

    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: { extendedDueDate, status: RallyStatus.active },
    });
    return NextResponse.json({ data: updatedRally }, { status: 200 });
  } catch (error) {
    return ServerError;
  }
}
