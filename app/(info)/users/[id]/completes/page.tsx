import { Metadata } from 'next';
import { fetchUserInactiveRallies } from '@/lib/users';
import InactiveRallies from '@/components/InactiveRallies';
import { redirectIfMine } from '../lib';

export const metadata: Metadata = {
  title: '완료한 랠리',
};

export default async function CompletesPage({ params: { id: userId } }: { params: { id: string } }) {
  await redirectIfMine('/my/completes')(userId);
  const rallies = await fetchUserInactiveRallies(userId);

  return <InactiveRallies rallies={rallies} />;
}
