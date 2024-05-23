import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';
import Link from 'next/link';

export default async function UploadsPage() {
  const { data: rallies }: { data: KitCardInfo[] } = await fetch(process.env.API_URL + '/api/my/uploads').then((res) => res.json());
  return (
    <article className="px-4 py-6 grid grid-cols-2 gap-x-2 gap-y-4">
      {rallies.map(({ id, tags, thumbnailImage, title, uploader }) => (
        <Link key={id} href={`/kits/${id}`}>
          <KitCard tags={tags} thumbnailImage={thumbnailImage} title={title} uploader={uploader} />
        </Link>
      ))}
    </article>
  );
}
