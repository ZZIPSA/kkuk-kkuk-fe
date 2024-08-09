import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import { fetchUserActiveRallies } from '@/lib/users';
import ActiveRallies from '@/components/ActiveRallies/page';

export const metadata: Metadata = {
  title: '진행중인 랠리',
};

export default async function JoinsPage() {
  const { id: userId } = await ensureMember();
  const rallies = await fetchUserActiveRallies(userId);

  return <ActiveRallies rallies={rallies} />;
}
