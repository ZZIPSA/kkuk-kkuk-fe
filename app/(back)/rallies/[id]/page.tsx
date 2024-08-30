import { getMember } from '@/auth';
import { appendRallyInfo, flattenRallyData, getRallyData } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import RallyFooter from './components/RallyFooter';
import { RallyPageProps } from './types';
import ExtendModal from './components/ExtendModal';
import { notFound } from 'next/navigation';

export const revalidate = 1;

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  const viewerId = (await getMember())?.id;
  const raw = await getRallyData(id);
  raw.title ?? notFound();
  const data = flattenRallyData(raw);
  const info = appendRallyInfo({ ...data, viewerId });
  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo {...info} />
      <RallyStamps {...info} />
      <RallyFooter {...info} />
      <ExtendModal {...info} />
    </main>
  );
}
