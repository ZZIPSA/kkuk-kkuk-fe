import { cn } from '@/lib/utils';

export default function CompletedLabel({ completed }: { completed: boolean }) {
  const label = completed ? '완주' : '실패';
  return <span className={styles(completed)}>{label}</span>;
}

const styles = (completed: boolean) =>
  cn('absolute top-2 left-2 px-3 py-2 rounded-lg font-bold border border-current text-sm', {
    'text-primary bg-primary-100': completed,
    'text-grey-100 bg-gray-50': !completed,
  });
