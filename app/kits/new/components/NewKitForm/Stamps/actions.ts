'use server';

import { ensureMember } from '@/auth';
import { S3Manager } from '@/lib/services/s3';
import { convertToWebP } from '@/lib/sharp';
import cuid from 'cuid';

/**
 * 파일을 처리하고 S3에 업로드
 * @param form 유저가 업로드한 스탬프 이미지 파일이 담긴 FormData
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function preupload(form: FormData): Promise<string> {
  await ensureMember(); // 로그인 확인
  const file = form.get('file') as File; // FormData 에서 파일 추출
  if (!file) throw new Error('올바른 파일을 업로드 해주세요.');

  const webp = await file
    .arrayBuffer() // 버퍼로 변환
    .then(convertToWebP); // webp로 변환
  const presignedUrl = await getPresignedUrl(cuid()); // S3에 업로드할 presigned URL 취득
  await uploadWebp(webp, presignedUrl); // S3에 webp 파일 업로드

  return presignedUrl; // 업로드 완료된 S3 Presigned URL 반환
}

/**
 * S3 Presigned URL 취득
 *
 * @param key 업로드할 파일의 S3 key
 * @returns Presigned URL
 */
function getPresignedUrl(key: string): Promise<string> {
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
async function uploadWebp(webp: Buffer, url: string): Promise<void> {
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
