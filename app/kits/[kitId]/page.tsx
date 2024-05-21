import KitCard, { KitCardVariants } from '@/components/KitCard';
import { notFound } from 'next/navigation';

export default async function KitPage({ params: { kitId } }: { params: { kitId: string } }) {
  console.log(`${process.env.API_URL}/api/kits/${kitId}`);
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${kitId}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader } = kit;

  return (
    <main className="grid grid-cols-1 px-4 py-6">
      <KitCard
        id={kitId}
        title={title}
        description={description ?? ''}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
        variant={KitCardVariants.description}
      />
    </main>
  );
}
