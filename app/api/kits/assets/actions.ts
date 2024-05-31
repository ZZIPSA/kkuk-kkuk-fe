'use server';

import { auth } from '@/auth';
import { blurImage, convertToWebP } from '@/lib/sharp';

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
 * 하나의 스탬프 단위로 파일을 선업로드
 *
 * @param base64File 유저가 업로드한 스탬프 이미지 파일 (Base64 문자열)
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function preuploadStamp(base64File: string, index: number): Promise<string> {
  return await processAndUpload(base64File, false, index);
}

/**
 * 블러 처리 및 webp 변환 후 S3에 업로드
 *
 * @param base64File 유저가 업로드한 스탬프 이미지 파일 (Base64 문자열)
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
export async function preuploadStampWithBlur(base64File: string, index: number): Promise<string> {
  return await processAndUpload(base64File, true, index);
}

/**
 * 파일을 처리하고 S3에 업로드
 *
 * @param file 유저가 업로드한 스탬프 이미지 파일
 * @param applyBlur 블러 처리를 할지 여부
 * @param index 파일 인덱스
 * @returns 업로드 완료된 S3 Presigned URL
 */
async function processAndUpload(file: string, applyBlur: boolean, index: number): Promise<string> {
  if (!file) throw new Error('올바른 파일을 업로드 해주세요.');

  const arrayBuffer = base64ToArrayBuffer(file);
  const webpFile = await convertToWebP(arrayBuffer);
  const convertedFile = applyBlur ? await blurImage(webpFile) : webpFile;
  const lastIndex = (applyBlur ? index + 1 : index).toString();
  const presignedUrl = await getPresignedUrl(lastIndex);

  await uploadWebp(convertedFile, presignedUrl);

  return presignedUrl;
}

/**
 * S3 Presigned URL 취득
 *
 * @param fileName 업로드할 파일 이름
 * @returns Presigned URL
 */
async function getPresignedUrl(fileName: string): Promise<string> {
  const session = await auth();
  const response = await fetch(`${process.env.API_URL}/api/s3/presign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // FIXME: actions에서 API요청을 하는 경우 헤더 설정이 필요해지는 에러 수정
      Cookie: `authjs.session-token=${session.sessionToken}`,
    },
    body: JSON.stringify({ fileName, fileType: 'webp' }),
  });

  if (!response.ok) {
    throw new Error('미리 서명된 URL을 생성하지 못했습니다.');
  }

  const { data: presignedUrl } = await response.json();

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
    throw new Error('파일을 업로드하지 못했습니다.');
  }
}
