import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { BadRequestError, NotFoundRallyError, ServerError, StampLimitError, UnauthorizedError } from '@/app/api/lib/errors';
import { getRallyStatus } from '@/app/api/lib/utils';
import { RallyData } from '@/types/Rally';

type GetRallyParams = { params: { id: string } };
type PatchRallyParams = { params: { id: string } };
type PostRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;

  try {
    const rally = (await prisma.rally.findUniqueOrThrow({
      where: { id },
      select: rallySelect,
    })) as RallyData;

    return NextResponse.json({ data: rally });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') return NotFoundRallyError;
      // TODO - handle prisma error
    }
    console.error(error);
    return ServerError;
  }
}

// TODO: 향후 랠리 연장용 API로 수정
// export async function PATCH(request: Request, { params }: PatchRallyParams) {
//   const session = await auth();
//   const currentUser = session?.user;

//   const { id } = params;
//   const body = await request.json();
//   const { stampCount } = body;

//   if (!currentUser) return UnauthorizedError;

//   if (stampCount === undefined || typeof stampCount !== 'number' || stampCount < 0) {
//     return BadRequestError;
//   }
//   try {
//     const status = getRallyStatus(stampCount);
//     const updatedRally = await prisma.rally.update({
//       where: { id },
//       data: { stampCount, status },
//       select: rallySelect,
//     });

//     return NextResponse.json({ data: updatedRally }, { status: 200 });
//   } catch (error) {
//     return ServerError;
//   }
// }

export async function PATCH(_: Request, { params }: PostRallyParams) {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return UnauthorizedError;
  const userId = user.id;

  const { id: rallyId } = params;

  if (!rallyId) return BadRequestError;

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId, starterId: userId },
      include: { kit: { include: { _count: { select: { stamps: true } } } } },
    });

    if (!rally) return UnauthorizedError;
    if (rally.stampCount >= rally.kit._count.stamps) return StampLimitError;

    const updatedStampCount = rally.stampCount + 1;
    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: { stampCount: updatedStampCount, status: getRallyStatus(updatedStampCount) },
    });

    return NextResponse.json(updatedRally);
  } catch (error) {
    return ServerError;
  }
}
