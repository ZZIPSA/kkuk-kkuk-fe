import { NextResponse } from 'next/server';
import { RallyStatus } from '@prisma/client';
import { prisma, rallySelect } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const rally = await prisma.rally.findUnique({
    where: { id },
    select: rallySelect,
  });

  if (!rally) return NextResponse.json({ error: '존재하지 않는 랠리입니다.' }, { status: 400 });

  return NextResponse.json({ data: rally });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.json();
  const { stampCount } = body;

  if (stampCount === undefined || typeof stampCount !== 'number' || stampCount < 0) {
    return NextResponse.json({ error: '요청이 유효하지 않습니다.' }, { status: 400 });
  }

  try {
    const status = getRallyStatus(stampCount);
    const updatedRally = await prisma.rally.update({
      where: { id },
      data: { stampCount, status },
      select: rallySelect,
    });

    return NextResponse.json({ data: updatedRally }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '예기치 못한 에러가 발생했습니다.' }, { status: 500 });
  }
}

// TODO: 별도 파일로 분리
function getRallyStatus(stampCount: number): RallyStatus {
  return stampCount === 6 ? RallyStatus.inactive : RallyStatus.active;
}
