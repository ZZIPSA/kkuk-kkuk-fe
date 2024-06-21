import type { Metadata } from 'next';
import Link from 'next/link';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';

export const metadata = {
  title: '키트 목록',
} satisfies Metadata;

async function fetchKits(): Promise<KitCardInfo[]> {
  const response = await fetch(`${process.env.API_URL}/api/kits`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch kits');
  }

  const json = await response.json();
  const { data } = json;

  return data;
}

export default async function KitsPage() {
  const kits = await fetchKits();

  return (
    <main className="p-4 pt-6 w-full grid grid-cols-2 gap-2">
      <h1 className="text-xl font-bold text-foreground col-span-full">등록된 키트</h1>
      {kits?.map(({ id, title, thumbnailImage, tags, uploader }) => (
        <Link href={`/kits/${id}`} passHref key={id}>
          <KitCard id={id} key={id} title={title} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
        </Link>
      ))}
    </main>
  );
}
