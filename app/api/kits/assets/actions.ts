'use server';

import { blurImage, convertToWebP } from '@/lib/sharp';

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
 * 하나의 스탬프 단위로 파일을 선업로드합니다.
 *
 * @param base64File 유저가 업로드한 스탬프 이미지 파일 (Base64 문자열)
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function preuploadStamp(base64File: string, index: number): Promise<string> {
  return await processAndUpload(base64File, false, index);
}

/**
 * 블러 처리 및 webp 변환 후 S3에 업로드합니다.
 *
 * @param base64File 유저가 업로드한 스탬프 이미지 파일 (Base64 문자열)
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function uploadBlurImage(base64File: string, index: number): Promise<string> {
  return await processAndUpload(base64File, true, index);
}

/**
 * 파일을 처리하고 S3에 업로드합니다.
 *
 * @param file 유저가 업로드한 스탬프 이미지 파일
 * @param applyBlur 블러 처리를 할지 여부
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
async function processAndUpload(file: string, applyBlur: boolean, index: number): Promise<string> {
  if (!file) throw new Error('올바른 파일을 업로드 해주세요.');

  const arrayBuffer = base64ToArrayBuffer(file);
  const convertedFile = await convertToWebP(arrayBuffer);
  const finalFile = applyBlur ? await blurImage(convertedFile) : convertedFile;
  const finalIndex = applyBlur ? (index + 1).toString() : index.toString();
  const presignedUrl = await getPresignedUrl(finalIndex);

  await uploadWebp(finalFile, presignedUrl);

  return presignedUrl;
}

/**
 * S3 Presigned URL을 가져옵니다.
 *
 * @param fileName 업로드할 파일 이름
 * @returns Presigned URL
 */
async function getPresignedUrl(fileName: string): Promise<string> {
  const response = await fetch(`${process.env.API_URL}/api/s3/presign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName, fileType: 'webp' }),
  });

  if (!response.ok) {
    throw new Error('Failed to get presigned URL');
  }

  const { data: presignedUrl } = await response.json();

  return presignedUrl;
}

/**
 * 파일을 S3에 업로드합니다.
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
    throw new Error('Failed to upload file');
  }
}
