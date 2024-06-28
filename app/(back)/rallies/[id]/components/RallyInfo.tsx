import { Progress } from '@/components/ui/progress';
import { /* convertMsToDate, */ dateIntl } from '@/lib/date';
import { RallyData } from '@/types/Rally';
import { rallyInfoStyles } from './styles';

interface RallyInfoProps extends Pick<RallyData, 'title' | 'createdAt' | 'updatedAt' | 'status'> {
  deadline: Date;
  percentage: number;
}

  // const today = new Date();
  const isActive = status === 'active';
  // const dDay = deadline.getTime() - today.getTime();
export default function RallyInfo({ title, percentage, createdAt, updatedAt, deadline, status }: RallyInfoProps) {

  return (
    <section className={rallyInfoStyles.container}>
      <h1 className={rallyInfoStyles.title}>{title}</h1>
      <span className={rallyInfoStyles.percentage}>{percentage.toFixed(0)}%</span>
      <Progress value={percentage} className={rallyInfoStyles.progress} />
      {/* {isActive && <div className={rallyInfoStyles.dDay}>D-day {convertMsToDate(dDay)}</div>} */}
      <p className={rallyInfoStyles.date}>
        <span className={rallyInfoStyles.startDate}>시작일: {dateIntl.format(new Date(createdAt))}</span>
        {!isActive && // TODO: 실패 시에는 표시하지 않아야 함
          updatedAt !== null && <span>종료일: {dateIntl.format(new Date(updatedAt))}</span>}
      </p>
    </section>
  );
}
