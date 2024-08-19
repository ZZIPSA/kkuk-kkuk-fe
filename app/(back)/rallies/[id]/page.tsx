import { getMember } from '@/auth';
import { getRallyData, getRallyInfo } from './lib';
import RallyInfo from './components/RallyInfo';
import RallyStamps from './components/RallyStamps';
import RallyFooter from './components/RallyFooter';
import { RallyPageProps } from './types';
import ExtendModal from './components/ExtendModal';

export const revalidate = 1;

export default async function RallyPage({ params: { id } }: RallyPageProps) {
  const viewerId = (await getMember())?.id;
  const {
    title,
    status,
    stampable,
    dueDate,
    createdAt,
    updatedAt,
    completionDate,
    extendedDueDate,
    stampCount: count,
    starter: { id: starterId },
    kit: { id: kitId, stamps, rewardImage, deletedAt: kitDeletedAt },
  } = await getRallyData(id);
  const { deadline, owned, total, failed, extendable, startable } = getRallyInfo({
    status,
    completionDate,
    stamps,
    starterId,
    viewerId,
    kitDeletedAt,
    dueDate,
    extendedDueDate,
  });

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
      <RallyStamps
        owned={owned}
        stamps={stamps}
        count={count}
        total={total}
        stampable={stampable}
        rewardImage={rewardImage}
        completionDate={completionDate}
      />
      <RallyFooter owned={owned} status={status} count={count} total={total} stampable={stampable} rallyId={id} />
      {owned && failed && <ExtendModal id={id} kitId={kitId} extendable={extendable} startable={startable} />}
    </main>
  );
}
