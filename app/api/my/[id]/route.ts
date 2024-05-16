import { prisma } from '@/lib/prisma';

//TODO: 로그인 구현 후 id는 세션에서 취득
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return Response.json({ data: user });
}
