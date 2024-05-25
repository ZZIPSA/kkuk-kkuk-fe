import Link from 'next/link';
import KitCard from '@/components/KitCard';
import { KitCardInfo } from '@/types/Kit';
import { prisma } from '@/lib/prisma';

async function fetchKits(): Promise<KitCardInfo[]> {
  // const response = await fetch('http://localhost:3000/api/kits', {
  //   cache: 'no-store',
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to fetch kits');
  // }

  // const json = await response.json();
  // const { data } = json;
  const data = await prisma.kit.findUniqueOrThrow({
    where: {
      id: '0000031',
    },
  });

  // const result = {
  //   ...data,
  //   uploader: {
  //     nickname: data?.uploaderId,
  //     profileImage: 'profileImage',
  //   },
  // } satisfies {
  //   id: string;
  //   title: string;
  //   thumbnailImage: string;
  //   tags: string[];
  //   uploader: {
  //     nickname: string;
  //     profileImage: string;
  //   };
  // };

  return Array.from(
    { length: 10 },
    (_) =>
      ({
        ...data,
        thumbnailImage: '/default-thumbnail.jpg',
        uploader: {
          nickname: data?.uploaderId,
          profileImage: 'profileImage',
        },
      }) satisfies KitCardInfo,
  );
}

export default async function KitsPage() {
  const kits = await fetchKits();

  return (
    <main className="w-full p-4 pt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      <h1 className="text-xl font-bold text-foreground col-span-full">등록된 키트</h1>
      {kits?.map(({ id, title, thumbnailImage, tags, uploader }) => (
        <Link href={`/kits/${id}`} passHref>
          <KitCard id={id} key={id} title={title} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
        </Link>
      ))}
    </main>
  );
}
