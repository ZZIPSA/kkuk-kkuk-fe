import { NextResponse } from 'next/server';
import { kitSelect, prisma, rallySelect, userSelect } from '@/app/api/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  const user = await prisma.user.findUnique({
    select: { rallies: { select: rallySelect }, kits: { select: kitSelect }, ...userSelect },
    where: { id: userId },
  });

  return NextResponse.json({ data: user });
}
