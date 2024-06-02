import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Twitter],
});

export const getMember = async () => (await auth())?.user;
export const ensureMember = async () => (await getMember()) ?? signIn();
