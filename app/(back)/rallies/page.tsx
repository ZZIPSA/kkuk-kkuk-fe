import { Metadata } from 'next';
import Link from 'next/link';
import { ensureMember } from '@/auth';
import RallyCard from '@/components/RallyCard';
import { JoinedRally } from '@/types/Rally';

export const metadata: Metadata = {
  title: '나의 랠리',
};

export default async function RalliesPage() {
  const userId = (await ensureMember()).id;
  const { data: rallies }: { data: JoinedRally[] } = await fetch(`${process.env.API_URL}/api/my/rallies?userId=${userId}`).then((res) => res.json());
  return (
    <main className="w-full px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies.map(({ id, updatedAt, stampCount, title, kit: { thumbnailImage, stamps } }) => (
        <Link key={id} href={`/rallies/${id}`}>
          {stampCount === stamps.length ? (
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} updatedAt={updatedAt} />
          ) : (
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} stamps={stamps} />
          )}
        </Link>
      ))}
    </main>
  );
}
