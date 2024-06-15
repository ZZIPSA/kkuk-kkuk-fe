import { NextResponse } from 'next/server';
import { kitSelect, prisma } from '@/app/api/lib/prisma';

type getKitParams = { params: { id: string } };

export async function GET(_: Request, { params }: getKitParams) {
  const { id } = params;

  try {
    const kit = await prisma.kit.findUnique({
      where: { id },
      select: kitSelect,
    });

    if (!kit) {
      return NextResponse.json({ error: '해당 키트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ data: kit }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
