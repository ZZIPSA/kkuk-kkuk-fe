'use server';

// TODO: 키트로직 완료 후 삭제
import { S3Manager } from '@/lib/services/s3';
import { blurImage, convertToWebP } from '@/lib/sharp';
import cuid from 'cuid';

// TODO: 유틸로 뺴기
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = Buffer.from(base64, 'base64').toString('binary');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 *
 * @param file 유저가 업로드한 스탬프 이미지 파일
 * @param applyBlur 블러 처리를 할지 여부
 * @returns 변환이 완료된 Buffer 파일
 */
async function convertFileWithOption(file: string, applyBlur: boolean): Promise<Buffer> {
  const arrayBuffer = base64ToArrayBuffer(file);
  const webpFile = await convertToWebP(arrayBuffer);
  const convertedFile = applyBlur ? await blurImage(webpFile) : webpFile;

  return convertedFile;
}

/**
 * 파일을 처리하고 S3에 업로드
 *
 * @param file 유저가 업로드한 스탬프 이미지 파일
 * @param applyBlur 블러 처리를 할지 여부
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function convertAndPreupload(file: string, applyBlur: boolean): Promise<string> {
  if (!file) throw new Error('올바른 파일을 업로드 해주세요.');

  const stampId = cuid();
  const convertedFile = await convertFileWithOption(file, applyBlur);
  const presignedUrl = await getPresignedUrl(stampId);

  await uploadWebp(convertedFile, presignedUrl);

  return presignedUrl;
}

/**
 * S3 Presigned URL 취득
 *
 * @param key 업로드할 파일의 S3 key
 * @returns Presigned URL
 */
async function getPresignedUrl(key: string): Promise<string> {
  const s3 = new S3Manager();
  const presignedUrl = s3.getPresignedUrl(key);

  return presignedUrl;
}

/**
 * 파일을 S3에 업로드
 *
 * @param webpFile 업로드할 파일 버퍼
 * @param presignedUrl 업로드할 presigned URL
 */
async function uploadWebp(webpFile: Buffer, presignedUrl: string): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/webp',
    },
    body: webpFile,
  });

  if (!response.ok) {
    // NOTE: 필요시 에러코드 추가
    throw new Error('파일을 업로드하지 못했습니다.');
  }
}
