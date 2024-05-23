import { MyRally } from '@/types/Rally';
import RallyCard from '@/components/RallyCard';
import Link from 'next/link';

export default async function JoinsPage() {
  const { data: rallies }: { data: MyRally[] } = await fetch(process.env.API_URL + '/api/my/joins').then((res) => res.json());
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
          <Link key={id} href={`/rally/${id}`}>
            <RallyCard stampCount={stampCount} thumbnailImage={thumbnailImage} title={title} stamps={stamps} />
          </Link>
        ),
      )}
    </article>
  );
}
