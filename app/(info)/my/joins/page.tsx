import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import { fetchUserActiveRallies } from '@/lib/users';
import ActiveRallies from '@/components/ActiveRallies/page';
import EmptyContent from '@/components/EmptyContent';

export const metadata: Metadata = {
  title: '진행중인 랠리',
};

export default async function JoinsPage() {
  const { id: userId } = await ensureMember();
  const rallies = await fetchUserActiveRallies(userId);
  if (rallies.length === 0) return <EmptyContent message="진행중인 랠리가 없어요!" />;

  return <ActiveRallies rallies={rallies} />;
}
