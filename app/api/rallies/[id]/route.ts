import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { RallyStatus } from '@prisma/client';

type getRallyParams = { params: { id: string } };
type patchRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: getRallyParams) {
  const { id } = params;

  const rally = await prisma.rally.findUnique({
    where: { id },
    select: rallySelect,
  });

  if (!rally) return NextResponse.json({ error: '해당 랠리를 찾을 수 없습니다.' }, { status: 404 });

  return NextResponse.json({ data: rally });
}

export async function PATCH(request: Request, { params }: patchRallyParams) {
  const session = await auth();
  const currentUser = session?.user;

  const { id } = params;
  const body = await request.json();
  const { stampCount } = body;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  if (stampCount === undefined || typeof stampCount !== 'number' || stampCount < 0) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
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
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}

// TODO: 별도 파일로 분리
function getRallyStatus(stampCount: number): RallyStatus {
  return stampCount === 6 ? RallyStatus.inactive : RallyStatus.active;
}
