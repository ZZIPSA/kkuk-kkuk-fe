import { Metadata } from 'next';
import { fetchUserInactiveRallies } from '@/lib/users';
import EmptyContent from '@/components/EmptyContent';
import InactiveRallies from '@/components/InactiveRallies';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '완료한 랠리',
};

export default async function CompletesPage({ params: { id: userId } }: { params: { id: string } }) {
  redirectIfMine('/my/completes')(userId);
  const rallies = await fetchUserInactiveRallies(userId);
  if (rallies.length === 0) return <EmptyContent message="완료한 랠리가 없어요!" />;

  return <InactiveRallies rallies={rallies} />;
}
