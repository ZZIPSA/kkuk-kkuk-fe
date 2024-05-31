import { NextResponse } from 'next/server';
import { S3Manager } from '@/lib/services/s3';
import { auth } from '@/auth';

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 검증 미들웨어 구현
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 403 });

  const userId = currentUser.id;

  if (!userId) return NextResponse.json({ error: '사용자 ID가 유효하지 않습니다.' }, { status: 403 });

  const { fileName } = await request.json();

  if (!fileName) {
    return NextResponse.json({ error: '파일 이름이 필요합니다.' }, { status: 400 });
  }

  const s3 = new S3Manager();

  try {
    const presignedUrl = await s3.getPresignedUrl(fileName, userId);

    return NextResponse.json({ data: presignedUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '업로드 URL을 생성하지 못했습니다.' }, { status: 500 });
  }
}
