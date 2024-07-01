import type { Metadata } from 'next';
import { getMember } from '@/auth';
import { getRallyData, getRallyInfo } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import RallyFooter from './components/RallyFooter';

interface RallyPageProps {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: RallyPageProps): Promise<Metadata> {
  const {
    title,
    starter: { name },
  } = await getRallyData(id);
  return {
    title: `${name}님의 ${title} 랠리`,
  };
}

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  const viewerId = (await getMember())?.id;
  // TODO - get deadline from api
  const today = new Date();
  const deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8);
  // TODO - get deadline from api
  // TODO - get stampable from api
  const stampable = true;
  // TODO - get stampable from api
  const data = await getRallyData(id);
  const {
    title,
    status,
    /* stampable, */
    /* deadline, */
    createdAt,
    updatedAt,
    stampCount: count,
    starter: { id: starterId },
    kit: { stamps },
  } = data;
  const { owned, total, percentage } = getRallyInfo({ stamps, count, updatedAt, starterId, viewerId, createdAt });

  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo title={title} percentage={percentage} createdAt={createdAt} updatedAt={updatedAt} status={status} deadline={deadline} />
      <RallyStamps owned={owned} stamps={stamps} count={count} total={total} stampable={stampable} />
      <RallyFooter owned={owned} status={status} count={count} total={total} stampable={stampable} rallyId={id} />
    </main>
  );
}
