import { Progress } from '@/components/ui/progress';
import { RallyData } from '@/types/Rally';
import { rallyInfoStyles as styles } from './styles';
import { getRallyDates, GetRallyDatesProps } from '../lib';

interface RallyInfoProps extends Pick<RallyData, 'title' | 'createdAt' | 'updatedAt' | 'status'>, GetRallyDatesProps {}

export default function RallyInfo({ title, createdAt, updatedAt, deadline, status, count, total }: RallyInfoProps) {
  const { dDay, since, completedAt, percentage } = getRallyDates({ createdAt, updatedAt, deadline, status, count, total });

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.percentage}>{percentage.toFixed(0)}%</span>
      <Progress value={percentage} className={styles.progress} />
      {dDay !== null && <div className={styles.dDay}>D-{dDay}</div>}
      <p className={styles.date}>
        <span className={styles.startDate}>시작일: {since}</span>
        {completedAt && <span>완료일: {completedAt}</span>}
      </p>
    </section>
  );
}
