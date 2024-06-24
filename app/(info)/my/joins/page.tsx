import Link from 'next/link';
import { ensureMember } from '@/auth';
import RallyCard from '@/components/RallyCard';
import EmptyContent from '../components/EmptyContent';
import { MyRally, RallyStatus } from '@/types/Rally';

export default async function JoinsPage() {
  const { id: userId } = await ensureMember();
  const api = `${process.env.API_URL}/api/my/rallies?userId=${userId}`;
  const { data: rallies }: { data: MyRally[] } = await fetch(api).then((res) => res.json());
  if (rallies.length === 0) return <EmptyContent message="진행중인 랠리가 없어요!" />;

  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies
        .filter(({ status }) => status === RallyStatus.active)
        .map(({ id, stampCount, kit: { thumbnailImage, title, stamps } }) => (
          <Link key={id} href={`/rallies/${id}`}>
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} stamps={stamps} />
          </Link>
        ))}
    </article>
  );
}
