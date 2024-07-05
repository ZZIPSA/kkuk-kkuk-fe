import { NextResponse } from 'next/server';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { NotFoundRallyError, ServerError } from '@/app/api/lib/errors';

type GetRallyParams = { params: { id: string } };
type DeleteRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;
  const rally = await prisma.rally.findUnique({
    where: { id },
    select: { ...rallySelect, stampable: true },
  });

  if (!rally) return NotFoundRallyError;

  return NextResponse.json({ data: rally });
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
