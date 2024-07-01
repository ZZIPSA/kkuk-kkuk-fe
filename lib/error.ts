import { resolveText } from '@/lib/response';
import { pipe } from '@fxts/core';

/**
 * 에러 응답 핸들러
 */
export const handleError = (err: Response) =>
  pipe(
    err,
    resolveText, // 에러 메시지 텍스트로 변환
    fillError, // 에러 객체 생성
  );
export const fillError = (error: unknown) => ({ error });
