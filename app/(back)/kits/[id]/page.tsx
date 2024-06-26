import Link from 'next/link';
import KitCard, { KitCardVariants } from '@/components/KitCard';
import RallyPreview from './components/RallyPreview';
import StampsPreview from './components/StampsPreview';
import { getKitData } from './lib';
import { KitPageInfo } from './types';

interface KitPageProps extends KitPageInfo {}

export default async function KitPage({ params: { id } }: KitPageProps) {
  const { data: kit } = await getKitData(id);
  const { title, description, tags, thumbnailImage, uploader, stamps } = kit;

  return (
    <main className="w-full grid grid-cols-1">
      <KitCard
        id={id}
        title={title}
        description={description || ''}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
        variant={KitCardVariants.description}
      />
      <RallyPreview stamps={stamps} />
      <StampsPreview stamps={stamps} />
      <section className="flex justify-center px-4 pb-6 bg-grey-50">
        <Link href={`/kits/${id}/start`} className="w-full py-4 rounded-lg bg-primary font-bold text-white text-center ">
          랠리 시작하기
        </Link>
      </section>
    </main>
  );
}
