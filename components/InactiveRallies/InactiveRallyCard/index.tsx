import Link from 'next/link';
import RallyCard from '@/components/RallyCard';
import { cn } from '@/lib/utils';
import { MyRally } from '@/types/Rally';
import CompletedLabel from './CompletedLabel';

interface InactiveRallyCardProps extends Pick<MyRally, 'id' | 'title' | 'updatedAt'> {
  completed: boolean;
  thumbnailImage: MyRally['kit']['thumbnailImage'];
}

export default function InactiveRallyCard({ id, title, completed, updatedAt, thumbnailImage }: InactiveRallyCardProps) {
  return (
    <Link key={id} href={`/rallies/${id}`} className={styles.link(completed)}>
      <RallyCard thumbnailImage={thumbnailImage} title={title} updatedAt={updatedAt} />
      <CompletedLabel completed={completed} />
    </Link>
  );
}

const styles = {
  link: (completed: boolean) => cn('relative', { 'group-has-[:checked]:hidden': !completed }),
};
