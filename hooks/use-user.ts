import { signIn, useSession } from 'next-auth/react';

export const useMember = () => useSession().data?.user;
export const useEnsuredMember = () => useMember() ?? (signIn() as never);
