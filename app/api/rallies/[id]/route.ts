import prisma from '@/lib/prisma';
import { RallyStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const rally = await prisma.rally.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      kit: true,
      starter: true,
      stampCount: true,
    },
  });

  return Response.json({ data: rally });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const body = await request.json();
  const { stampCount } = body;

  if (stampCount === undefined || typeof stampCount !== 'number' || stampCount < 0) {
    return NextResponse.json({ error: '필수 항목을 확인해주세요.' }, { status: 400 });
  }

  try {
    const status = stampCount === 6 ? RallyStatus.inactive : RallyStatus.active;

    const updatedRally = await prisma.rally.update({
      where: { id },
      data: { stampCount, status },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        kit: {
          select: {
            id: true,
            title: true,
          },
        },
        starter: {
          select: {
            id: true,
            nickname: true,
          },
        },
        stampCount: true,
      },
    });

    return NextResponse.json({ data: updatedRally }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '예기치 못한 에러로 랠리를 업데이트하지 못했습니다.' }, { status: 500 });
  }
}
