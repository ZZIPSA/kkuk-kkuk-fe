import { NextResponse } from 'next/server';
import { prisma, kitSelect, userSelect } from '@/app/api/lib/prisma';
import { BadRequestError, ServerError } from '../lib/errors';

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const body = await request.json();
  const { title, description, kitId, starterId, deadline } = body;
  const dueDate = deadline ? new Date(deadline) : null;

  if (!title || !kitId || !starterId) return BadRequestError;

  try {
    const newRally = await prisma.rally.create({
      data: {
        title,
        description,
        status: 'active',
        kitId,
        starterId,
        stampCount: 0,
        dueDate,
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
    return ServerError;
  }
}
