import KitCard, { KitCardVariants } from '@/components/KitCard';
import { notFound } from 'next/navigation';
import RallyPreview from './components/RallyPreview';
import StampsPreview from './components/StampsPreview';

export default async function KitPage({ params: { id } }: { params: { id: string } }) {
  console.log(`${process.env.API_URL}/api/kits/${id}`);
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
    </main>
  );
}
