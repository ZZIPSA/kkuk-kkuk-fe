import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { S3Manager } from '@/lib/services/s3';
import { BUCKET_NAME, REGION } from '@/lib/constants';

export async function GET() {
  const kits = await prisma.kit.findMany({});

  return NextResponse.json({ data: kits });
}

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const s3 = new S3Manager();
  // const session = await auth();
  // const currentUser = session?.user;

  // if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 400 });

  // const uploaderId = currentUser.id;
  // TODO: 테스트용 상수 제거
  const uploaderId = 'clwnjgnp10004dnxeusl9exo3';

  const { title, description, imageUrls, thumbnailImage, rewardImage, blurredImage, tags } = await request.json();

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
    const newKitUrls = await Promise.all(
      imageUrls.map(async (url: string, index: number) => {
        const targetKey = s3.extractS3Key(url);
        const newUrl = await s3.moveObject(targetKey, `${uploaderId}/${newKitId}/${index}`);

        return newUrl;
      }),
    );

    const newBlurUrl = await s3.moveObject(s3.extractS3Key(blurredImage), `${uploaderId}/${newKitId}/6`);

    const kit = await prisma.kit.create({
      data: {
        id: newKitId,
        title,
        description,
        stamps: {
          create: newKitUrls.slice(0, 6).map((url) => ({ image: url })),
        },
        rewardImage: newKitUrls[5],
        thumbnailImage: newKitUrls[0],
        blurredImage: newBlurUrl,
        tags,
        uploaderId,
      },
    });

    return NextResponse.json({ data: kit });
  } catch (error) {
    return NextResponse.json({ error: '키트를 생성하지 못했습니다.' }, { status: 500 });
  }
}
