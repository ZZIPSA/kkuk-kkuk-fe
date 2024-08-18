import { redirect } from 'next/navigation';
import { pipe } from '@fxts/core';
import { compareViewer } from '@/lib/auth';
import { purify, swap } from '@/lib/either';

export const redirectIfMine = (redirectTo: string) => (ownerId: string) =>
  pipe(
    compareViewer(ownerId), // 로그인한 사용자와 주어진 ID가 같은지 확인합니다.
    swap, // 같은 경우를 Left로 처리합니다.
    purify(() => redirect(redirectTo)), // 같다면 /my/[page] 로 리다이렉트합니다.
  );
