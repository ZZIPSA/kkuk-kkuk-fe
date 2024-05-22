import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const kits = await prisma.kit.findMany({});

  return NextResponse.json({ data: kits });
}

export async function POST(request: Request) {
  // TODO: 업로더 아이디는 세션에서 취득
  const uploaderId = 'clwhgit8j0001doaigd5t2qt5';
  const { title, description, imageUrls, thumbnailImage, rewardImage, tags } = await request.json();

  if (!title || !Array.isArray(imageUrls) || !thumbnailImage || !rewardImage) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
  }

  const lastKit = await prisma.kit.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });
  const lastId = parseInt(lastKit[0].id, 10);
  const newId = (lastId + 1).toString().padStart(7, '0');

  try {
    const kit = await prisma.kit.create({
      data: {
        id: newId,
        title,
        description,
        stamps: {
          create: imageUrls.map((url: string) => {
            return {
              image: url,
            };
          }),
        },
        rewardImage,
        thumbnailImage,
        tags,
        uploaderId,
      },
    });

    return NextResponse.json({ data: kit });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: '키트를 생성하지 못했습니다.' }, { status: 500 });
  }
}
