import { MyRally } from '@/types/Rally';
import { getInfo } from './lib';
import InactiveRallyCard from '../InactiveRallyCard';
import ShowCompletedOnly from '../ShowCompletedOnly';

export default function InactiveRallies({ rallies }: { rallies: MyRally[] }) {
  return (
    <section className={styles.container}>
      <ShowCompletedOnly />
      {rallies.map(getInfo).map(({ id, title, completed, updatedAt, kit: { thumbnailImage } }) => (
        <InactiveRallyCard key={id} id={id} title={title} completed={completed} updatedAt={updatedAt} thumbnailImage={thumbnailImage} />
      ))}
    </section>
  );
}

const styles = {
  container: 'px-4 py-3 grid grid-cols-2 gap-x-2 gap-y-4 group',
};
