import { Metadata } from 'next';
import Link from 'next/link';
import { ensureMember } from '@/auth';
import RallyCard from '@/components/RallyCard';
import { fetchUserActiveRallies } from '@/lib/users';
import { RallyStatus } from '@/types/Rally';
import EmptyContent from '@/components/EmptyContent';

export const metadata: Metadata = {
  title: '진행중인 랠리',
};

export default async function JoinsPage() {
  const { id: userId } = await ensureMember();
  const rallies = await fetchUserActiveRallies(userId);
  if (rallies.length === 0) return <EmptyContent message="진행중인 랠리가 없어요!" />;

  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies
        .filter(({ status }) => status === RallyStatus.active)
        .map(({ id, stampCount, title, kit: { thumbnailImage, stamps } }) => (
          <Link key={id} href={`/rallies/${id}`}>
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} stamps={stamps} />
          </Link>
        ))}
    </article>
  );
}
