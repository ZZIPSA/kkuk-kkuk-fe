import { Metadata } from 'next';
import { fetchUserActiveRallies } from '@/lib/users';
import EmptyContent from '@/components/EmptyContent';
import ActiveRallies from '@/components/ActiveRallies/page';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '진행중인 랠리',
};

export default async function JoinsPage({ params: { id: userId } }: { params: { id: string } }) {
  redirectIfMine('/my/joins')(userId);
  const rallies = await fetchUserActiveRallies(userId);
  if (rallies.length === 0) return <EmptyContent message="진행중인 랠리가 없어요!" />;

  return <ActiveRallies rallies={rallies} />;
}
