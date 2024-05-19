import { kitCardSelect, prisma } from '@/lib/prisma';
import KitCard from '@/components/KitCard';
import { KitCardsInfo } from '@/types/kit';

export default async function KitsPage() {
  const kits: KitCardsInfo = await prisma.kit.findMany({ select: kitCardSelect });
  return (
    <main className="w-full p-4 pt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
      <h1 className="text-xl font-bold text-foreground col-span-full">등록된 키트</h1>
      {kits?.map(({ id, title, thumbnailImage, tags, uploader }) => (
        <KitCard id={id} key={id} title={title} thumbnailImage={thumbnailImage} tags={tags} uploader={uploader} />
      ))}
    </main>
  );
}
