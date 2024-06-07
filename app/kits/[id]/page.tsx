import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import KitCard, { KitCardVariants } from '@/components/KitCard';
import RallyPreview from './components/RallyPreview';
import StampsPreview from './components/StampsPreview';

export default async function KitPage({ params: { id } }: { params: { id: string } }) {
  // id 가 7자리 미만이면 0으로 채워서 7자리로 만들어 리다이렉트
  if (id.length < 7) return redirect(`/kits/${id.padStart(7, '0')}`);
  const { data: kit } = await fetch(`${process.env.API_URL}/api/kits/${id}`).then((res) => res.json());
  if (!kit) return notFound();
  const { title, description, tags, thumbnailImage, uploader, stamps } = kit;

  return (
    <main className="w-full grid grid-cols-1">
      <KitCard
        id={id}
        title={title}
        description={description}
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
