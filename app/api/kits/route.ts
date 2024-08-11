import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/app/api/lib/prisma';
import { S3Manager } from '@/lib/services/s3';
import { extractImageIdFromUrl, getAllKits, getBlurredImageURL, getNewKitId, getPagedKits, getStampsCreate, parseTake } from '@/app/api/lib/utils';
import { BLURRED_IMAGE_INDEX, REWARD_IMAGE_INDEX, THUMBNAIL_IMAGE_INDEX } from '@/app/api/lib/constants';
import { BadRequestError, ServerError } from '@/app/api/lib/errors';
import { SortOrder } from '@/app/api/lib/types';
import { CreateKitProps } from '@/types/Kit';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const pageSize = parseTake(params.get('pageSize'));
    const cursor = params.get('cursor');
    const order = (params.get('order') ?? 'desc') as SortOrder;

    if (pageSize) {
      const { kits, meta } = await getPagedKits(pageSize, cursor, order);
      return NextResponse.json({ data: kits, meta });
    } else {
      const { kits, totalKits } = await getAllKits(order);
      return NextResponse.json({ data: kits, meta: { totalKits } });
    }
  } catch (error) {
    console.error(error);
    return ServerError;
  }
}

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const session = await auth();
  const user = session?.user;
  const uploaderId = user?.id;
  const { title, description, stamps: imageUrls, tags } = (await request.json()) satisfies CreateKitProps;

  if (!title || !Array.isArray(imageUrls) || !uploaderId) return BadRequestError;

  const id = await getNewKitId();

  // 리워드 이미지 id 로 블러 이미지 생성
  const rewardId = extractImageIdFromUrl(imageUrls.at(-1)!);
  const blurredImage = await getBlurredImageURL(rewardId);

  try {
    const s3 = new S3Manager();
    const newKeys = await s3.moveToLongTermStorage([...imageUrls, blurredImage], id);
    const kit = await prisma.kit.create({
      data: {
        id,
        title,
        description,
        stamps: getStampsCreate(newKeys),
        rewardImage: newKeys.at(REWARD_IMAGE_INDEX)!,
        thumbnailImage: newKeys[THUMBNAIL_IMAGE_INDEX],
        blurredImage: newKeys.at(BLURRED_IMAGE_INDEX)!,
        tags,
        uploaderId,
      },
      select: { id: true },
    });

    return NextResponse.json({ data: kit });
  } catch (error) {
    return ServerError;
  }
}
