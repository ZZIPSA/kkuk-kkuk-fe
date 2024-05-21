// 현재 해당 파일에 있는 코드는 모두 테스트용 코드입니다.
// Auth.js 도입 이후 모두 제거하고 필요한 코드를 추가해주세요.
// useSession 는 Auth.js 도입 이후 "next-auth/react" 에서 가져옵니다.

import { redirect } from 'next/navigation';

const user = {
  id: 'clwgzadff0000g6xsgbbpjip9',
  email: 'user1@example.com',
  emailVerified: null,
  profileImage: 'https://picsum.photos/360',
  nickname: 'User1',
};
export const auth = async () => ({ user: user as typeof user | undefined });
export const useSession = async () => ({ user: user as typeof user | undefined });
export const signIn = async () => redirect('/signin');
