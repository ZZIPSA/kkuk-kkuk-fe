import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { kitSelect, prisma } from '@/lib/prisma';
import { S3Manager } from '@/lib/services/s3';
import { BLURRED_IMAGE_INDEX, REWARD_IMAGE_INDEX, THUMBNAIL_IMAGE_INDEX } from '@/lib/constants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const pageSize = searchParams.get('pageSize');

    if (pageSize) {
      const { kits, meta } = await getPagedKits(parseInt(pageSize, 10), cursor);
      return NextResponse.json({ data: kits, meta });
    } else {
      const { kits, totalKits } = await getAllKits();
      return NextResponse.json({ data: kits, meta: { totalKits } });
    }
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 401 });

  const uploaderId = currentUser.id;

  const { title, description, imageUrls, thumbnailImage, rewardImage, blurredImage, tags } = await request.json();
  const s3 = new S3Manager();

  if (!title || !Array.isArray(imageUrls) || !thumbnailImage || !rewardImage || !blurredImage || !uploaderId) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
  }

  const lastKit = await prisma.kit.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });
  const lastKitId = parseInt(lastKit[0].id, 10);
  const newKitId = (lastKitId + 1).toString().padStart(7, '0');

  try {
    const newKitUrls = await s3.moveToLongTermStorage([...imageUrls, blurredImage], uploaderId, newKitId);

    const kit = await prisma.kit.create({
      data: {
        id: newKitId,
        title,
        description,
        stamps: {
          create: newKitUrls.map((url) => ({ image: url })),
        },
        rewardImage: newKitUrls[REWARD_IMAGE_INDEX],
        thumbnailImage: newKitUrls[THUMBNAIL_IMAGE_INDEX],
        blurredImage: newKitUrls[BLURRED_IMAGE_INDEX],
        tags,
        uploaderId,
      },
    });

    return NextResponse.json({ data: kit });
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}

async function getPagedKits(pageSize: number, cursor: string | null) {
  const take = pageSize;
  const kits = await prisma.kit.findMany({
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      id: 'asc',
    },
    select: kitSelect,
  });

  const totalKits = await prisma.kit.count();
  const totalPages = Math.ceil(totalKits / pageSize);
  const nextCursor = kits.length === take ? kits[take - 1].id : null;

  return {
    kits,
    meta: {
      nextCursor,
      pageSize,
      totalKits,
      totalPages,
    },
  };
}

async function getAllKits() {
  const kits = await prisma.kit.findMany({ select: kitSelect });
  const totalKits = await prisma.kit.count();

  return { kits, totalKits };
}
