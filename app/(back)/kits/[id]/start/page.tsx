import { Metadata } from 'next';
import { ensureMember } from '@/auth';
import KitCard, { KitCardVariants } from '@/components/KitCard';
import RallyStartForm from './components/RallyStartForm';
import { getKitData } from '../lib';
import { KitPageInfo } from '../types';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: { absolute: `꾹꾹 | 랠리 시작하기` },
};

export default async function RallyStartPage({ params: { id } }: KitPageInfo) {
  const { id: userId } = await ensureMember();
  const { description, ...kit } = (await getKitData(id)) ?? notFound();

  return (
    <main className="w-full py-6 px-4 flex flex-col gap-6">
      <KitCard {...kit} description={description || ''} variant={KitCardVariants.StartPage} />
      <RallyStartForm starterId={userId} kitId={id} />
    </main>
  );
}
