import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import KitCard, { KitCardVariants } from '@/components/KitCard';
import RallyStartForm from './components/RallyStartForm';
import { getKitData } from '../lib';
import { KitPageInfo } from '../types';

export const metadata: Metadata = {
  title: `로 랠리 시작하기`,
};

export default async function RallyStartPage({ params: { id } }: KitPageInfo) {
  const { id: userId } = await ensureMember();
  const { data: kit } = await getKitData(id);
  const { title, description, tags, thumbnailImage, uploader } = kit;

  return (
    <main className="w-full py-6 px-4 flex flex-col gap-6">
      <KitCard
        variant={KitCardVariants.StartPage}
        id={id}
        title={title}
        description={description || ''}
        tags={tags}
        thumbnailImage={thumbnailImage}
        uploader={uploader}
      />
      <RallyStartForm starterId={userId} kitId={id} />
    </main>
  );
}
