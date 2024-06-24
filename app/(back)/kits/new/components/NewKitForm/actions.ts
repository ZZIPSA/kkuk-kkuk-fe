'use server';

import cuid from 'cuid';
import sharp from 'sharp';
import { prisma } from '@/app/api/lib/prisma';
import { ensureMember } from '@/auth';
import { KitCreate } from '@/types/Kit';
import { S3Manager } from '@/lib/services/s3';
import { joinSlash } from '@/lib/utils';
import { extractImageId, replaceBlurred as replaceLast } from './lib';
import { CreateKitProps } from './types';

export async function createKit({ title, stamps: stampsUrls, tags, description }: CreateKitProps) {
  const uploaderId = (await ensureMember()).id;
  if (!uploaderId) throw new Error('로그인이 필요합니다.');

  const id = await getKitId();
  const addKitId = joinSlash(id);
  const imageIds = stampsUrls.map(extractImageId);

  const rewardId = imageIds.at(-1)!;
  const blurredUrl = await getBlurredImageURL(rewardId);
  const s3 = new S3Manager();
  await s3.moveToLongTermStorage([...stampsUrls, blurredUrl], id);

  const blurredId = extractImageId(blurredUrl);
  const [thumbnailImage, rewardImage, blurredImage] = [imageIds[0]!, rewardId, blurredId].map(addKitId);
  const stamps = { create: imageIds.map(replaceLast(blurredId)).map((id) => ({ id, objectKey: addKitId(id) })) };
  const data = { id, title, description, tags, stamps, thumbnailImage, rewardImage, blurredImage, uploaderId } satisfies KitCreate;
  await prisma.kit.create({ data, include: { stamps: { select: { id: true } } } });
  return id;
}

async function getKitId() {
  const lastKit = await prisma.kit.findFirst({ orderBy: { id: 'desc' }, select: { id: true } });
  const lastId = lastKit?.id || '0';
  const kitId = String(Number(lastId) + 1).padStart(7, '0');
  return kitId;
}

async function getBlurredImageURL(id: string) {
  const key = `tmp/${id}`;
  const s3 = new S3Manager();
  const signedUrl = await s3.getObjectUrl(key);
  const buffer = await fetch(signedUrl).then((res) => res.arrayBuffer());
  const blurredBuffer = await blurImage(buffer);
  const blurredUrl = await getPresignedUrl(cuid());
  await uploadWebp(blurredBuffer, blurredUrl);
  return blurredUrl;
}

async function blurImage(buffer: Buffer | Uint8Array | ArrayBuffer) {
  // console.log('buffer', sharp(buffer).blur(20));
  return sharp(buffer).blur(20).toBuffer();
}

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
