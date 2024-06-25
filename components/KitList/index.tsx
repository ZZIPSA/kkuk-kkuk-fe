import Link from 'next/link';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';

export default async function KitList({ kits }: { kits: KitCardInfo[] }) {
  return (
    <article className="grid grid-cols-2 gap-2">
      {kits?.map(({ id, title, thumbnailImage, tags, uploader }) => (
        <Link href={`/kits/${id}`} passHref key={id}>
          <KitCard id={id} key={id} title={title} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
        </Link>
      ))}
    </article>
  );
}
