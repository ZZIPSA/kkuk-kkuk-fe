import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { BadRequestError, NotFoundRallyError, ServerError, StampLimitError, UnauthorizedError } from '@/app/api/lib/errors';
import { getRallyStatus } from '@/app/api/lib/utils';

type GetRallyParams = { params: { id: string } };
type PatchRallyParams = { params: { id: string } };
type PostRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;

  const rally = await prisma.rally.findUnique({
    where: { id },
    select: rallySelect,
  });

  if (!rally) return NotFoundRallyError;

  return NextResponse.json({ data: rally });
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
      data: { stampCount: updatedStampCount, status: getRallyStatus(updatedStampCount) },
    });

    return NextResponse.json(updatedRally);
  } catch (error) {
    return ServerError;
  }
}
