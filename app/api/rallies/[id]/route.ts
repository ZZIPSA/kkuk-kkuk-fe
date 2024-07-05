import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { NotFoundRallyError, ServerError } from '@/app/api/lib/errors';
import {} from '@/app/api/lib/utils';
import { RallyData } from '@/types/Rally';

type GetRallyParams = { params: { id: string } };
type DeleteRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;

  try {
    const rally = (await prisma.rally.findUniqueOrThrow({
      where: { id },
      select: { ...rallySelect, stampable: true },
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

export async function DELETE(_: Request, { params }: DeleteRallyParams) {
  const { id } = params;

  try {
    const rally = await prisma.rally.findUnique({ where: { id } });

    if (!rally) NotFoundRallyError;

    const deletedRally = await prisma.rally.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ data: deletedRally }, { status: 200 });
  } catch (error) {
    return ServerError;
  }
}
