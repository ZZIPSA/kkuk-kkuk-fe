import { getMember } from '@/auth';
import { getRallyData, getRallyInfo } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import RallyFooter from './components/RallyFooter';
import { RallyPageProps } from './types';
import ExtendModal from './components/ExtendModal';

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  const viewerId = (await getMember())?.id;
  const {
    title,
    status,
    stampable,
    dueDate: deadline,
    createdAt,
    updatedAt,
    completionDate,
    stampCount: count,
    starter: { id: starterId },
    kit: { id: kitId, stamps },
  } = await getRallyData(id);
  const { owned, total, failed } = getRallyInfo({ status, completionDate, stamps, starterId, viewerId });

  return (
    <main className="px-4 py-6 w-full bg-grey-50 flex flex-col gap-6">
      <RallyInfo
        title={title}
        status={status}
        count={count}
        total={total}
        createdAt={createdAt}
        updatedAt={updatedAt}
        deadline={deadline}
        completionDate={completionDate}
      />
      <RallyStamps owned={owned} stamps={stamps} count={count} total={total} stampable={stampable} />
      <RallyFooter owned={owned} status={status} count={count} total={total} stampable={stampable} rallyId={id} />
      {owned && failed && <ExtendModal id={id} kitId={kitId} />}
    </main>
  );
}
