import { pipe, prop } from '@fxts/core';
import { getMember } from '@/auth';
import { eq } from '@/lib/utils';
import { lift } from './either';

export const compareViewer = (ownerId: string) =>
  pipe(
    getMember(), // 로그인한 사용자 정보를 가져옵니다.
    prop('id'), // 로그인한 사용자의 ID를 가져옵니다.
    lift(eq(ownerId)), // 로그인한 사용자의 ID와 주어진 ID가 같은지 확인합니다.
  );
