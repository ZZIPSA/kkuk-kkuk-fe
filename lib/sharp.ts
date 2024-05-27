'use server';

import sharp from 'sharp';

/**
 * 이미지 블러 처리 함수
 * @param buffer - 변환할 이미지 버퍼
 * @returns 블러 처리된 이미지 버퍼
 */
export async function blurImage(buffer: Buffer | Uint8Array | ArrayBuffer): Promise<Buffer> {
  return await sharp(buffer).blur(30).toBuffer();
}

/**
 * 이미지를 WebP 포맷으로 변환하는 함수
 * @param buffer - 변환할 이미지 버퍼
 * @returns WebP 포맷으로 변환된 이미지 버퍼
 */
export async function convertToWebP(buffer: Buffer | Uint8Array | ArrayBuffer): Promise<Buffer> {
  return await sharp(buffer).toFormat('webp').toBuffer();
}
