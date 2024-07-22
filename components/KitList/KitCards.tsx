import Link from 'next/link';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';

export default function KitCards({ kits }: { kits: KitCardInfo[] }) {
  return (
    <>
      {kits?.map(({ id, title, thumbnailImage, tags, uploader }) => (
        <Link href={`/kits/${id}`} passHref key={id}>
          <KitCard id={id} key={id} title={title} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
        </Link>
      ))}
    </>
  );
}
