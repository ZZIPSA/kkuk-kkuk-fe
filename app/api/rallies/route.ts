import prisma from '@/lib/prisma';
import { dummyRallies } from '@/types/dummy';
import { NextRequest, NextResponse } from 'next/server';

const rallies = dummyRallies;

// TODO: 에러 메세지 통합
// TODO: 랠리 조회 API, 페이지네이션
export async function GET() {
  return NextResponse.json({ rallies });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // TODO: 로그인 구현 후 세션에서 starterId 취득
  const title = (formData.get('title') as string) || null;
  const description = (formData.get('description') as string) || null;
  const kitId = (formData.get('kitId') as string) || null;
  const starterId = (formData.get('starterId') as string) || null;

  if (!title || !kitId || !starterId) {
    return NextResponse.json({ error: '필수 항목을 확인해주세요.' }, { status: 400 });
  }

  try {
    const newRally = await prisma.rally.create({
      data: {
        title,
        description,
        status: 'active',
        kitId: +kitId,
        starterId,
        stampCount: 0,
      },
      include: {
        kit: true,
        starter: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    return NextResponse.json({ data: newRally }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '예기치 못한 에러로 랠리를 생성하지 못했습니다.' }, { status: 500 });
  }
}
