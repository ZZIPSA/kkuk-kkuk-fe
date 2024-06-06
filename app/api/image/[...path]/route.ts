import { NextRequest, NextResponse } from 'next/server';
import { S3Manager } from '@/lib/services/s3';

type GetProxyParams = {
  params: { path: string[] };
};
export async function GET(req: NextRequest, { params }: GetProxyParams) {
  const { path } = params;
  const key = path.join('/');
  const s3 = new S3Manager();
  const signedUrl = await s3.getObjectUrl(key);

  const response = await fetch(signedUrl);

  return new NextResponse(response.body, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
