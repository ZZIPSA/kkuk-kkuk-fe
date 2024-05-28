import { RallyModel, RallyStatus } from '@/types/models';

export default function RalliesCounts({ rallies }: { rallies: Pick<RallyModel, 'status'>[] }) {
  return (
    <div className="bg-grey-50 p-4 flex divide-x justify-center rounded-lg">
      <RalliesCount title="현재 진행 중인 랠리" count={rallies.filter(({ status }) => status === RallyStatus.active).length} />
      <RalliesCount title="완료한 랠리" count={rallies.filter(({ status }) => status === RallyStatus.inactive).length} />
    </div>
  );
}

function RalliesCount({ title, count }: { title: string; count: number }) {
  return (
    <div className="w-full text-center">
      <h2 className="text-sm text-grey-300 mb-2">{title}</h2>
      <span className="font-bold text-xl">{count}개</span>
    </div>
  );
}
