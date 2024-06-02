import { Progress } from '@/components/ui/progress';
import { getMsToDate, dateIntl } from '@/lib/date';
import { RallyStatus } from '@/types/Rally';

interface RallyInfoProps {
  title: string;
  percentage: number;
  createdAt: Date;
  updatedAt: Date | null;
  deadline: Date;
  status: RallyStatus;
}

export default function RallyInfo({ title, percentage, createdAt, updatedAt, deadline, status }: RallyInfoProps) {
  const today = new Date();
  const isActive = status === 'active';
  const dDay = deadline.getTime() - today.getTime();

  return (
    <section className="bg-background p-6 rounded-2xl relative">
      <h1 className="font-bold text-xl mb-4">{title}</h1>
      <span className="font-bold">{percentage.toFixed(0)}%</span>
      <Progress value={percentage} className="mb-1 h-3" />
      {isActive && (
        <div className="absolute right-8 bottom-10 text-xs text-background py-1 text-center bg-rally-flag bg-cover h-[38px] aspect-[60/38]">
          D-day {getMsToDate(dDay)}
        </div>
      )}
      <p className="text-xs flex justify-around">
        <span className="mr-auto">시작일: {dateIntl.format(new Date(createdAt))}</span>
        {!isActive && // TODO: 실패 시에는 표시하지 않아야 함
          updatedAt !== null && <span>종료일: {dateIntl.format(new Date(updatedAt))}</span>}
      </p>
    </section>
  );
}
