import { notFound } from 'next/navigation';
import { ensureMember } from '@/auth';
import KitCard, { KitCardVariants } from '@/components/KitCard';
import RallyStartForm from './components/RallyStartForm';

export default async function RallyStartPage({ params: { id } }: { params: { id: string } }) {
  const { id: userId } = await ensureMember();
  if (!userId) return;
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${id}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader } = kit;

  return (
    <main className="w-full py-6 px-4 flex flex-col gap-6">
      <KitCard
        variant={KitCardVariants.StartPage}
        id={id}
        title={title}
        description={description}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
      />
      <RallyStartForm starterId={userId} kitId={id} />
    </main>
  );
}
