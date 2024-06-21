import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma, rallySelect } from '@/app/api/lib/prisma';
import { MAX_STMAP_LENGTH } from '@/app/api/lib/constants';
import { getRallyStatus } from '@/app/api/lib/utils';

type GetRallyParams = { params: { id: string } };
type PatchRallyParams = { params: { id: string } };
type PostRallyParams = { params: { id: string } };

export async function GET(_: Request, { params }: GetRallyParams) {
  const { id } = params;

  const rally = await prisma.rally.findUnique({
    where: { id },
    select: rallySelect,
  });

  if (!rally) return NextResponse.json({ error: '해당 랠리를 찾을 수 없습니다.' }, { status: 404 });

  return NextResponse.json({ data: rally });
}

// TODO: 향후 랠리 연장용 API로 수정
export async function PATCH(request: Request, { params }: PatchRallyParams) {
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

export async function POST(request: Request, { params }: PostRallyParams) {
  const { id: rallyId } = params;

  if (!rallyId) {
    return NextResponse.json({ error: '필수항목을 입력해주세요.' }, { status: 400 });
  }

  try {
    const rally = await prisma.rally.findUnique({
      where: { id: rallyId },
    });

    if (!rally) return NextResponse.json({ error: '해당 랠리를 찾을 수 없습니다.' }, { status: 404 });
    if (rally.stampCount >= MAX_STMAP_LENGTH) return NextResponse.json({ error: '더 이상 스탬프를 찍을 수 없습니다.' }, { status: 400 });

    const updatedStampCount = rally.stampCount + 1;
    const updatedRally = await prisma.rally.update({
      where: { id: rallyId },
      data: { stampCount: updatedStampCount, status: getRallyStatus(updatedStampCount) },
    });

    return NextResponse.json(updatedRally);
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
