import { S3Manager } from '@/lib/services/s3';

export const joinSlash = (a: string) => (b: string) => `${a}/${b}`;
export const extractImageId = (url: string) => url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));

/**
 * S3 Presigned URL 취득
 *
 * @param key 업로드할 파일의 S3 key
 * @returns Presigned URL
 */
export async function getPresignedUrl(key: string): Promise<string> {
  const s3 = new S3Manager();
  const presignedUrl = s3.getPresignedUrl(key);

  return presignedUrl;
}

/**
 * 파일을 S3에 업로드
 *
 * @param webp 업로드할 파일 버퍼
 * @param url 업로드할 presigned URL
 */
export async function uploadWebp(webp: Buffer, url: string): Promise<void> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/webp' },
    body: webp,
  });

  if (!response.ok) {
    // NOTE: 필요시 에러코드 추가
    throw new Error('파일을 업로드하지 못했습니다.');
  }
}
