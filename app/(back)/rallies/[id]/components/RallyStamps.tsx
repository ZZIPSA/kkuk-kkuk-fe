import { RallyStamp } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';
import { rallyStampsStyles } from './styles';
import { RallyStampsInfo } from './types';
import { addStampPropsByIndex } from './lib';

interface RallyStampsProps extends RallyStampsInfo {
  stamps: RallyPreviewStamp[];
}

export default function RallyStamps({ stamps, total, count, owned, isStampedToday }: RallyStampsProps) {
  return (
    <article className={rallyStampsStyles.container}>
      <h2 className={rallyStampsStyles.title}>스탬프 랠리</h2>
      <section className={rallyStampsStyles.stamps}>
        {stamps.map(addStampPropsByIndex({ owned, count, total, isStampedToday })).map(({ id, objectKey, status, kind, owned }) => (
          <RallyStamp key={id} id={id} objectKey={objectKey} status={status} kind={kind} owned={owned} />
        ))}
      </section>
    </article>
  );
}
