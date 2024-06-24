import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/api/lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: { id: string; name: string; email: string; image: string };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Twitter({
      profile({ data: { id, name, email, profile_image_url } }) {
        return {
          id,
          name,
          email,
          image: profile_image_url?.replace(/_normal/, ''),
        };
      },
    }),
  ],
});

export const getMember = async () => (await auth())?.user;
export const ensureMember = async () => (await getMember()) ?? signIn();
