import Link from 'next/link';
import { auth, signIn } from '@/auth';
import RallyCard from '@/components/RallyCard';
import { MyRally, RallyStatus } from '@/types/Rally';

export default async function JoinsPage() {
  const {
    data: { user },
  } = await auth();
  if (!user) return signIn();
  const api = `${process.env.API_URL}/api/user/${user.id}/rallies`;
  const { data: rallies }: { data: MyRally[] } = await fetch(api).then((res) => res.json());

  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies
        .filter(({ status }) => status === RallyStatus.active)
        .map(
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
