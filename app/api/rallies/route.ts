import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma, kitSelect, userSelect } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 403 });

  const starterId = currentUser.id;

  const { title, description, kitId } = body;

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
