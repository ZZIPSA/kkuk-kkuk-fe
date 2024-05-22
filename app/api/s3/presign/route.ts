// app/api/generate-presigned-url/route.ts
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION!!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!!,
  },
});

export async function POST(request: Request) {
  const { fileName, fileType } = await request.json();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `local/stamps/${fileName}`,
    ContentType: fileType,
  };

  try {
    const command = new PutObjectCommand(params);
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 15 });

    return NextResponse.json({ presignedUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '업로드 URL을 생성하지 못했습니다.' }, { status: 500 });
  }
}
