import { CompletedRally } from '@/types/Rally';
import RallyCard from '@/components/RallyCard';
import Link from 'next/link';

export default async function CompletesPage() {
  const { data: rallies }: { data: CompletedRally[] } = await fetch(process.env.API_URL + '/api/my/completes').then((res) => res.json());
  console.log({ rallies });
  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies.map(({ id, updatedAt, kit: { thumbnailImage, title } }) => (
        <Link key={id} href={`/rallies/${id}`}>
          <RallyCard thumbnailImage={thumbnailImage} title={title} updatedAt={updatedAt} />
        </Link>
      ))}
    </article>
  );
}
