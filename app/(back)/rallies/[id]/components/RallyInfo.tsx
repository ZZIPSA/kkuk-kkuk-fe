import { Progress } from '@/components/ui/progress';
import { RallyData } from '@/types/Rally';
import { rallyInfoStyles } from './styles';
import { getRallyInfoDates } from '../lib';

interface RallyInfoProps extends Pick<RallyData, 'title' | 'createdAt' | 'updatedAt' | 'status'> {
  deadline: Date;
  percentage: number;
}

export default function RallyInfo({ title, percentage, createdAt, updatedAt, deadline, status }: RallyInfoProps) {
  const { dDay, since, until, completed } = getRallyInfoDates({ createdAt, updatedAt, deadline, status, percentage });

  return (
    <section className={rallyInfoStyles.container}>
      <h1 className={rallyInfoStyles.title}>{title}</h1>
      <span className={rallyInfoStyles.percentage}>{percentage.toFixed(0)}%</span>
      <Progress value={percentage} className={rallyInfoStyles.progress} />
      {dDay !== null && <div className={rallyInfoStyles.dDay}>D-day {dDay}</div>}
      <p className={rallyInfoStyles.date}>
        <span className={rallyInfoStyles.startDate}>시작일: {since}</span>
        {until && <span>기한: {until}</span>}
        {completed && <span>완료일: {completed}</span>}
      </p>
    </section>
  );
}
