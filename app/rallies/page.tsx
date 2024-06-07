import RallyCard from '@/components/RallyCard';
import { JoinedRally } from '@/types/Rally';
import Link from 'next/link';

const dummy = Array.from({ length: 6 }, (_, i) => Array.from('01', (j) => Array.from('01', (k) => `${i}${j}${k}`)))
  .flat(2)
  .map(
    (id) =>
      ({
        id,
        status: 'active',
        stampCount: Number(id.at(0)),
        updatedAt: null,
        kit: {
          thumbnailImage: `https://picsum.photos/360?random=${id}`,
          title: `랠리 ${id}`,
          _count: {
            stamps: 6,
          },
        },
      }) satisfies JoinedRally,
  );

export default async function RalliesPage() {
  const { data: rallies }: { data: JoinedRally[] } = { data: dummy };
  // await fetch(process.env.API_URL + '/api/my/joins').then((res) => res.json());
  return (
    <main className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
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
    </main>
  );
}
