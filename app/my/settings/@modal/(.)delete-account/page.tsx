import { SadCat } from '@/lib/icons';
import Link from 'next/link';

export default function DeleteAccountModal() {
  return (
    <>
      <Backdrop />
      <article className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[328px] shadow-lg bg-background text-center p-6 flex flex-col gap-6 rounded-xl z-50">
        <SadCat className="size-18 m-auto" />
        <Description />
        <Buttons />
      </article>
    </>
  );
}

function Backdrop() {
  return <Link href="/my/settings" className="fixed top-0 bottom-0 left-0 right-0 bg-grey-400/20 backdrop-blur-sm z-50 ease-in" />;
}

function Description() {
  return (
    <p className="text-grey-400 text-sm">
      <h1 className="text-xl font-bold">정말로 탈퇴 하시겠어요? </h1>
      <br />
      회원 탈퇴시 참여했던 랠리 및<br /> 세트 목록은 복구 불가능해요!
    </p>
  );
}

function Buttons() {
  return (
    <div className="flex gap-2 justify-stretch">
      <Cancel />
      <Delete />
    </div>
  );
}

function Cancel() {
  return (
    <Link href="/my/settings" className="py-4 rounded-xl w-full border text-grey-400">
      취소하기
    </Link>
  );
}

function Delete() {
  return (
    <Link href="/my/delete-account" className="py-4 rounded-xl w-full bg-primary text-white">
      탈퇴하기
    </Link>
  );
}
