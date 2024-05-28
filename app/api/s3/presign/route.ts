import { NextResponse } from 'next/server';
import { S3Manager } from '@/lib/services/s3';

export async function POST(request: Request) {
  const userId = 'clwnjgnp10004dnxeusl9exo3';
  const { fileName } = await request.json();
  const s3 = new S3Manager();

  try {
    const presignedUrl = await s3.getPresignedUrl(fileName, userId);

    return NextResponse.json({ data: presignedUrl });
  } catch (error) {
    return NextResponse.json({ error: '업로드 URL을 생성하지 못했습니다.' }, { status: 500 });
  }
}
