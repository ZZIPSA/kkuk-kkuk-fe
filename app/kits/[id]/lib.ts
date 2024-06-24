import { notFound, redirect } from 'next/navigation';
import sharp from 'sharp';
import { KitData } from '@/types/Kit';
import { S3Manager } from '@/lib/services/s3';
import { StampData } from '@/types/Stamp';
import { addBase64Prefix, convertResponseToArrayBuffer, convertBufferToBase64 } from '@/lib/utils';
import { cropImage320by320 } from '@/lib/sharp';

export const getKitData = (id: string): Promise<{ data: KitData }> =>
  fetch(`${process.env.API_URL}/api/kits/${id}`)
    .then((res) => res.json())
    .catch(() => notFound());

export const openGraphSizes = {
  image: 320,
  gap: 24,
  padding: 48,
};

/**
 * 스탬프에 src를 추가합니다.
 * { id, objectKey } 를 받아 \
 * { \
 *     id,\
 *     src: `data:image/png;base64,${base64}`\
 * }\
 * 형식으로 반환합니다.
 * @param stamps
 * @returns
 */
export const addSrcToStamps = (stamps: StampData[]) => Promise.all(stamps.map(addSrc));
const addSrc = async ({ id, objectKey }: StampData) => ({ id, src: await getImageAsPng(objectKey) });

/**
 * S3에 저장된 이미지를 320x320으로 자른 후 base64로 변환합니다.
 * @param key
 * @returns
 */
const getImageAsPng = async (key: string) =>
  new S3Manager()
    .getObjectUrl(key) // objectKey 로부터 signed URL을 가져옵니다.
    .then(fetch) // 이미지를 가져옵니다.
    .then(convertResponseToArrayBuffer) // ArrayBuffer로 변환합니다.
    .then(cropImage320by320) // 이미지를 320x320으로 자르고 PNG로 변환합니다.
    .then(convertBufferToBase64) // 이미지를 base64로 변환합니다.
    .then(addBase64Prefix); // base64 앞에 'data:image/png;base64,' 를 추가합니다.
