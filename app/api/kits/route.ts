import cuid from 'cuid';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { auth } from '@/auth';
import { kitSelect, prisma } from '@/app/api/lib/prisma';
import { extractImageIdFromUrl, getPresignedUrl, getStampsCreate, uploadWebp } from '@/app/api/lib/utils';
import { S3Manager } from '@/lib/services/s3';
import { THUMBNAIL_IMAGE_INDEX } from '@/app/api/lib/constants';
import { CreateKitProps } from '@/types/Kit';
import { blurImage } from '@/lib/sharp';

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

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const session = await auth();
  const user = session?.user;
  const uploaderId = user?.id;
  const { title, description, stamps: imageUrls, tags } = (await request.json()) satisfies CreateKitProps;

  if (!title || !Array.isArray(imageUrls) || !uploaderId) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
  }
  const id = await getKitId();

  // 리워드 이미지 id 로 블러 이미지 생성
  const rewardId = extractImageIdFromUrl(imageUrls.at(-1)!);
  const blurredImage = await getBlurredImageURL(rewardId);

  try {
    const s3 = new S3Manager();
    // s3 에서 이미지를 long-term storage로 이동
    const newKeys = await s3.moveToLongTermStorage([...imageUrls, blurredImage], id);
    const stamps = getStampsCreate(newKeys);
    const data = {
      id,
      title,
      description,
      stamps,
      rewardImage: newKeys.at(-2)!,
      thumbnailImage: newKeys[THUMBNAIL_IMAGE_INDEX],
      blurredImage: newKeys.at(-1)!,
      tags,
      uploaderId,
    };
    const kit = await prisma.kit.create({ data, select: { id: true } });

    return NextResponse.json({ data: kit });
  } catch (error) {
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}

/**
 * 가장 마지막 Kit의 id를 가져와 새로운 Kit의 id를 생성합니다.
 * Kit 가 없을 경우 0000001을 반환합니다.
 *
 * @returns kitId
 */
async function getKitId() {
  const lastKit = await prisma.kit.findFirst({ orderBy: { id: 'desc' }, select: { id: true } });
  const lastId = lastKit?.id || '0';
  const kitId = String(Number(lastId) + 1).padStart(7, '0');
  return kitId;
}

/**
 * 리워드 이미지 ID를 받아 블러 처리된 이미지 URL을 반환합니다.
 *
 * @param id 리워드 이미지 ID
 * @returns 블러 처리된 이미지 URL
 */
async function getBlurredImageURL(id: string) {
  const s3 = new S3Manager();
  const signedUrl = await s3.getObjectUrl(`tmp/${id}`);
  const buffer = await fetch(signedUrl).then((res) => res.arrayBuffer());
  const blurredBuffer = await blurImage(buffer);
  const blurredUrl = await getPresignedUrl(cuid());
  await uploadWebp(blurredBuffer, blurredUrl);
  return blurredUrl;
}

async function blurImage(buffer: Buffer | Uint8Array | ArrayBuffer) {
  return sharp(buffer).blur(20).toBuffer();
}
