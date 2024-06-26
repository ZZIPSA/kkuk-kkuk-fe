import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMember } from '@/auth';
import { getRallyData, getRallyInfo } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import { RallyFooter } from './components/RallyFooter';

interface RallyPageProps {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: RallyPageProps): Promise<Metadata> {
  const {
    data: {
      title,
      starter: { name },
    },
  } = await getRallyData(id);
  return {
    title: `${name}님의 ${title} 랠리`,
  };
}

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  const viewerId = (await getMember())?.id;
  const {
    data: {
      title,
      status,
      createdAt,
      updatedAt,
      stampCount,
      starter: { id: starterId },
      kit: { stamps },
    },
    error,
  } = await getRallyData(id);
  if (error) return notFound();
  const { owned, isStampedToday, total, count, percentage } = getRallyInfo({ stamps, stampCount, updatedAt, starterId, viewerId });

  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo title={title} percentage={percentage} createdAt={createdAt} updatedAt={updatedAt} status={status} /* deadline={deadline} */ />
      <RallyStamps owned={owned} stamps={stamps} stampCount={count} total={total} isStampedToday={isStampedToday} />
      <RallyFooter owned={owned} status={status} stampCount={count} total={total} isStampedToday={isStampedToday} rallyId={id} />
    </main>
  );
}
