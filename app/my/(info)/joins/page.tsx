import { JoinedRally } from '@/types/Rally';
import Link from 'next/link';
import RallyCard from '@/components/RallyCard';

export default async function JoinsPage() {
  const { data: rallies }: { data: JoinedRally[] } = await fetch(process.env.API_URL + '/api/my/joins').then((res) => res.json());
  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies.map(
        ({
          id,
          stampCount,
          kit: {
            thumbnailImage,
            title,
            _count: { stamps },
          },
        }) => (
          <Link key={id} href={`/rallies/${id}`}>
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} stamps={stamps} />
          </Link>
        ),
      )}
    </article>
  );
}
