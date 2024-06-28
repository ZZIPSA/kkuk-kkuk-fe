import { NextResponse } from 'next/server';
import { prisma, kitSelect, userSelect } from '@/app/api/lib/prisma';

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const body = await request.json();
  const { title, description, kitId, starterId } = body;

  if (!title || !kitId || !starterId) {
    return NextResponse.json({ error: '요청이 유효하지 않습니다.' }, { status: 400 });
  }

  try {
    const newRally = await prisma.rally.create({
      data: {
        title,
        description,
        status: 'active',
        kitId,
        starterId,
        stampCount: 0,
        updatedAt: new Date(),
      },
      include: {
        kit: { select: kitSelect },
        starter: {
          select: userSelect,
        },
      },
    });

    return NextResponse.json({ data: newRally }, { status: 201 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: '예기치 못한 에러가 발생했습니다.' }, { status: 500 });
  }
}
