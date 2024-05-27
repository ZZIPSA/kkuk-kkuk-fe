import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { S3Manager } from '@/lib/services/s3';

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
    // blur 이미지 등 메타데이터는 별도 이동 필요
    const newKitUrls = await Promise.all(
      imageUrls.map(async (url: string, index: number) => {
        const targetKey = s3.extractS3Key(url);
        const newUrl = `${uploaderId}/${newKitId}/${index}`;

        await s3.moveObject(targetKey, newUrl);
        // http 붙여야함
        return newUrl;
      }),
    );

    const newBlurUrl = await s3.copyObject(s3.extractS3Key(blurredImage), `${uploaderId}/${newKitId}/6`);

    const kit = await prisma.kit.create({
      data: {
        id: newKitId,
        title,
        description,
        stamps: {
          create: newKitUrls.map((url) => ({ image: url })),
        },
        rewardImage,
        thumbnailImage,
        blurredImage,
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
