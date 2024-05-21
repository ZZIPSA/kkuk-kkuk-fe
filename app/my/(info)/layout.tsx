import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function MyLayout({ children }: { children: React.ReactNode }) {
  const { user } = await auth();
  if (!user) redirect('/signin');
  return <main>{children}</main>;
}
