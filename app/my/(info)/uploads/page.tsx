import Link from 'next/link';
import { ensureMember } from '@/auth';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';

export default async function UploadsPage() {
  const { id: userId } = await ensureMember();
  const api = `${process.env.API_URL}/api/user/${userId}/kits`;
  const { data: kits }: { data: KitCardInfo[] } = await fetch(api).then((res) => res.json());

  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {kits.map(({ id, tags, thumbnailImage, title, uploader }) => (
        <Link key={id} href={`/kits/${id}`}>
          <KitCard id={id} tags={tags} thumbnailImage={thumbnailImage} title={title} uploader={uploader} />
        </Link>
      ))}
    </article>
  );
}