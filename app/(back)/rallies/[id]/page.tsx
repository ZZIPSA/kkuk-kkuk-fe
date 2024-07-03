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
  // TODO - get stampable from api
  const stampable = true;
  // TODO - get stampable from api
  const {
    title,
    status,
    // stampable,
    dueDate: deadline,
    createdAt,
    updatedAt,
    stampCount: count,
    starter: { id: starterId },
    kit: { stamps },
  } = await getRallyData(id);
  const { owned, total } = getRallyInfo({ stamps, updatedAt, starterId, viewerId, createdAt });

  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo title={title} status={status} count={count} total={total} createdAt={createdAt} updatedAt={updatedAt} deadline={deadline} />
      <RallyStamps owned={owned} stamps={stamps} count={count} total={total} stampable={stampable} />
      <RallyFooter owned={owned} status={status} count={count} total={total} stampable={stampable} rallyId={id} />
    </main>
  );
}
