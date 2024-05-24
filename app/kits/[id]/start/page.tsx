import { notFound } from 'next/navigation';
import KitCard, { KitCardVariants } from '@/components/KitCard';

export default async function KitStartPage({ params: { id } }: { params: { id: string } }) {
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${id}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader } = kit;

  return (
    <main className="py-6 px-4 flex flex-col gap-6">
      <KitCard
        variant={KitCardVariants.horizontal}
        id={id}
        title={title}
        description={description}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
      />
    </main>
  );
}
