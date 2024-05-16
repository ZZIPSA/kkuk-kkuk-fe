import { NextResponse } from 'next/server';
import { prisma, kitSelect, rallySelect, userSelect } from '@/lib/prisma';

// TODO: 에러 메세지 통합
// TODO: 페이지네이션
export async function GET() {
  try {
    const rallies = prisma.rally.findMany({ select: rallySelect });

    return NextResponse.json({ data: rallies });
  } catch (error) {
    return NextResponse.json({ error: '예기치 못한 에러가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: 로그인 구현 후 세션에서 starterId 취득
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
    return NextResponse.json({ error: '예기치 못한 에러가 발생했습니다.' }, { status: 500 });
  }
}
