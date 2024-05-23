// 현재 해당 파일에 있는 코드는 모두 테스트용 코드입니다.
// Auth.js 도입 이후 모두 제거하고 필요한 코드를 추가해주세요.
// useSession 는 Auth.js 도입 이후 "next-auth/react" 에서 가져옵니다.

import { redirect } from 'next/navigation';
import user from './user';

export const auth = async () => ({ data: { user: user! } });
export const signIn = async () => redirect('/signin');
