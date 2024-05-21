import KitCard, { KitCardVariants } from '@/components/KitCard';
import { notFound } from 'next/navigation';
import RallyPreview from './components/RallyPreview';
import StampsPreview from './components/StampsPreview';
import Link from 'next/link';

export default async function KitPage({ params: { id } }: { params: { id: string } }) {
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${id}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader, stamps } = kit;

  return (
    <main className="grid grid-cols-1">
      <KitCard
        id={id}
        title={title}
        description={description ?? ''}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
        variant={KitCardVariants.description}
      />
      <RallyPreview stamps={stamps} />
      <StampsPreview stamps={stamps} />
      <section className="flex justify-center px-4 pb-6 bg-grey-50">
        <Link href="/kits/new" className="w-full py-4 rounded-lg bg-primary font-bold text-white text-center ">
          랠리 시작하기
        </Link>
      </section>
    </main>
  );
}
