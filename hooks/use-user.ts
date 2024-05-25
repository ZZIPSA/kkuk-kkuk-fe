import { signIn, useSession } from 'next-auth/react';

export const useUser = () => useSession().data?.user;
export const useUserOnly = () => useUser() ?? (signIn() as never);
