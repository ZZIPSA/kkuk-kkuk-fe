import Link from 'next/link';
import { auth, signIn } from '@/auth';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';

export default async function UploadsPage() {
  const {
    data: { user },
  } = await auth();
  if (!user) return signIn();
  const api = `${process.env.API_URL}/api/user/${user.id}/kits`;
  const { data: rallies }: { data: KitCardInfo[] } = await fetch(api).then((res) => res.json());

  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies.map(({ id, tags, thumbnailImage, title, uploader }) => (
        <Link key={id} href={`/kits/${id}`}>
          <KitCard id={id} tags={tags} thumbnailImage={thumbnailImage} title={title} uploader={uploader} />
        </Link>
      ))}
    </article>
  );
}
