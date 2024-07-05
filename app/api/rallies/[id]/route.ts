import { NextResponse } from 'next/server';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { NotFoundRallyError } from '@/app/api/lib/errors';

type GetRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;
  const rally = await prisma.rally.findUnique({
    where: { id },
    select: { ...rallySelect, stampable: true },
  });

  if (!rally) return NotFoundRallyError;

  return NextResponse.json({ data: rally });
}
