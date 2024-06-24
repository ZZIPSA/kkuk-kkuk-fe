import { RallyStatus } from '@prisma/client';

export const extractImageIdFromUrl = (url: string) => url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
export const getStampsCreate = (keys: string[]) => ({
  create: keys
    .filter(removeReward) // rewardImage 제외
    .map(getStampCreateFromKey),
});
const removeReward = (_: string, i: number, { length }: string[]) => i !== length - 2;
const getStampCreateFromKey = (objectKey: string) => ({ id: extractImageIdFromKey(objectKey), objectKey });
const extractImageIdFromKey = (key: string) => key.substring(key.lastIndexOf('/') + 1);

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
