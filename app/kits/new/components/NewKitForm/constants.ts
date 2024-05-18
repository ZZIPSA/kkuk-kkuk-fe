/**
 * 임의 지정
 * 버셀 엣지 쓸 때는 요청 body 4MB 제한이 있으니 수정 해야될 수도
 * https://vercel.com/docs/functions/runtimes#request-body-size
 */
/** under 150KB */
export const MAX_STAMP_SIZE = 150 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
