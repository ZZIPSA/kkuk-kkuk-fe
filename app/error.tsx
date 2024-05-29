'use client';

import { ErrorIcon } from '@/lib/icons';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="w-[100vw] h-[100vh] bg-grey-50 text-grey-200 text-center text-xs flex flex-col justify-center items-center gap-5">
      <ErrorIcon className="size-30" />
      <h1 className="font-bold text-xl">문제가 발생했습니다.</h1>
      <p>
        새로고침해도 문제가 지속될 시,
        <br />
        운영자에게 문의해주시기 바랍니다.
      </p>
      <button className="text-background bg-foreground py-1 px-2 rounded-full before:text-2xl before:content-['𝕏'] before:pr-1 flex items-center">
        팀 ㅈIPSA 트위터 확인하기
      </button>
    </main>
  );
}
