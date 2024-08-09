import { Metadata } from 'next';
import Link from 'next/link';
import { ensureMember } from '@/auth';
import KitCard from '@/components/KitCard';
import { fetchUserKits } from '@/lib/users';
import EmptyContent from '../components/EmptyContent';

export const metadata: Metadata = {
  title: '업로드한 키트',
};

export default async function UploadsPage() {
  const { id: userId } = await ensureMember();
  const kits = await fetchUserKits(userId);
  if (kits.length === 0) return <EmptyContent message="업로드한 키트가 없어요!" />;

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
