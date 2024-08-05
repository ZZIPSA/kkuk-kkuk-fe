import cuid from 'cuid';
import { NextRequest } from 'next/server';
import { Prisma, RallyStatus } from '@prisma/client';
import { blurImage } from '@/lib/sharp';
import { S3Manager } from '@/lib/services/s3';
import { kitSelect, prisma } from '@/app/api/lib/prisma';
import { SortOrder } from '@/app/api/lib/types';
import { PAGE_SIZE } from './constants';
import { pipe, prop } from '@fxts/core';

export const extractImageIdFromUrl = (url: string) => url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
export const getStampsCreate = (keys: string[]) => ({
  create: keys
    .filter(removeReward) // rewardImage 제외
    .map(getStampCreateFromKey),
});
const removeReward = (_: string, i: number, { length }: string[]) => i !== length - 2;
const getStampCreateFromKey = (objectKey: string) => ({ id: extractImageIdFromKey(objectKey), objectKey });
const extractImageIdFromKey = (key: string) => key.substring(key.lastIndexOf('/') + 1);

export async function getPagedKits(pageSize: number, cursor: string | null, order: SortOrder) {
  const take = pageSize;
  const kits = await prisma.kit.findMany({
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: order },
    select: kitSelect,
    where: { deletedAt: null },
  });

  const totalKits = await prisma.kit.count();
  const totalPages = Math.ceil(totalKits / pageSize);
  const nextCursor = kits.at(-1)?.id;

  return {
    kits,
    meta: {
      nextCursor,
      pageSize,
      totalKits,
      totalPages,
    },
  };
}

export async function getAllKits(order: SortOrder) {
  const kits = await prisma.kit.findMany({
    orderBy: {
      createdAt: order,
    },
    select: kitSelect,
    where: { deletedAt: null },
  });
  const totalKits = await prisma.kit.count();

  return { kits, totalKits };
}

/**
 * 가장 마지막 Kit의 id를 가져와 새로운 Kit의 id를 생성합니다.
 * Kit 가 없을 경우 0000001을 반환합니다.
 *
 * @returns kitId
 */
export async function getNewKitId() {
  const lastKit = await prisma.kit.findFirst({ orderBy: { id: 'desc' }, select: { id: true } });
  const lastId = lastKit?.id || '0';
  const kitId = String(Number(lastId) + 1).padStart(7, '0');
  return kitId;
}

/**
 * 리워드 이미지 ID를 받아 블러 처리된 이미지 URL을 반환합니다.
 *
 * @param id 리워드 이미지 ID
 * @returns 블러 처리된 이미지 URL
 */
export async function getBlurredImageURL(id: string) {
  const s3 = new S3Manager();
  const signedUrl = await s3.getObjectUrl(`tmp/${id}`);
  const buffer = await fetch(signedUrl).then((res) => res.arrayBuffer());
  const blurredBuffer = await blurImage(buffer);
  const blurredUrl = await s3.getPresignedUrl(cuid());
  await uploadWebp(blurredBuffer, blurredUrl);
  return blurredUrl;
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

export function getRallyStatus(stampCount: number): RallyStatus {
  return stampCount === 6 ? RallyStatus.inactive : RallyStatus.active;
}

export const get =
  <K>(key: K) =>
  <T>(getable: { get: (key: K) => T }) =>
    getable.get(key);

export const getAll =
  <K>(key: K) =>
  <T>(getable: { getAll: (key: K) => T }) =>
    getable.getAll(key);
/** 정수로 파싱, 불가능할 경우 PAGE_SIZE 상수 */
export const parseTake = (take: string | null) => parseInt(take ?? '') || PAGE_SIZE;
/** URL에서 쿼리를 추출합니다. */
export const getSearchParams = (request: NextRequest) => pipe(request, prop('nextUrl'), prop('searchParams'));
