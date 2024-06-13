import Image from 'next/image';
import { RallyPreviewStamp } from '@/types/Stamp';
import { Gift } from '@/lib/icons';

type StampPreviewProps = { stamps: RallyPreviewStamp[] };

export default function StampsPreview({ stamps }: StampPreviewProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>스탬프 목록</h2>
      <div className={styles.stamps}>
        {stamps.map(({ id, objectKey }, index, { length }) => (
          <div key={id} className={styles.stamp}>
            <Image src={encodeURI(`/api/image/${objectKey}`)} fill alt="Stamp" className={styles.image} sizes="240" priority />
            {index === length - 1 && <Gift className={styles.gift} />}
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: 'bg-grey-50 px-4 pb-6 flex flex-col gap-4',
  title: 'font-bold',
  stamps: 'grid grid-cols-3 auto-rows-auto gap-2',
  stamp: 'w-full aspect-square relative',
  image: 'rounded-lg aspect-square object-cover',
  gift: 'absolute origin-center size-full p-[25%] fill-grey-400',
};
