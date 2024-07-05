import { NextResponse } from 'next/server';
import { kitSelect, prisma } from '@/app/api/lib/prisma';
import { NotFoundKitError, ServerError } from '@/app/api/lib/errors';
import { KitData } from '@/types/Kit';

type GetKitParams = { params: { id: string } };
type DeleteKitParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetKitParams) {
  const { id } = params;

  try {
    const kit = (await prisma.kit.findUnique({
      where: { id },
      select: kitSelect,
    })) satisfies KitData | null;

    if (!kit) return NotFoundKitError;

    return NextResponse.json({ data: kit }, { status: 200 });
  } catch (error) {
    return ServerError;
  }
}

export async function DELETE(_: Request, { params }: DeleteKitParams) {
  const { id } = params;

  try {
    const kit = await prisma.kit.findUnique({ where: { id } });

    if (!kit) NotFoundKitError;

    const deletedKit = await prisma.kit.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ data: deletedKit }, { status: 200 });
  } catch (error) {
    return ServerError;
  }
}
