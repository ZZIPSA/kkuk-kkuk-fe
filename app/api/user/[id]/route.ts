import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { UserInfoResult } from '@/types/User';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const data =
    /* await prisma.user.findUnique({
    where: { id },
    select: {
      image: true,
      name: true,
      accounts: { select: { provider: true, userId: true } },
      rallies: {
        select: { status: true },
      },
    },
  });
 */
    {
      image: 'https://picsum.photos/100',
      name: 'test',
      accounts: [{ provider: 'twitter', userId: 'test' }],
      rallies: [{ status: 'active' }, { status: 'inactive' }],
    } satisfies UserInfoResult;

  return NextResponse.json({ data });
}
