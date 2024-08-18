import { Metadata } from 'next';
import { fetchUserActiveRallies } from '@/lib/users';
import ActiveRallies from '@/components/ActiveRallies/page';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '진행중인 랠리',
};

export default async function JoinsPage({ params: { id: userId } }: { params: { id: string } }) {
  await redirectIfMine('/my/joins')(userId);
  const rallies = await fetchUserActiveRallies(userId);

  return <ActiveRallies rallies={rallies} />;
}
