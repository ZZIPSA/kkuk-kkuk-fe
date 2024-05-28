import { signIn, useSession } from 'next-auth/react';

export const useMember = () => useSession().data?.user;
export const useUserOnly = () => useMember() ?? (signIn() as never);
