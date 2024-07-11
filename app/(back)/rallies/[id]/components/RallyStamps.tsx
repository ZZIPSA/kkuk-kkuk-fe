import { RallyStamp } from '@/components/RallyStamp';
import { RallyPreviewStamp } from '@/types/Stamp';
import { rallyStampsStyles } from './styles';
import { RallyStampsInfo } from './types';
import { addStampPropsByIndex } from './lib';

interface RallyStampsProps extends RallyStampsInfo {
  stamps: RallyPreviewStamp[];
  completionDate: Date | null;
  rewardImage: string;
}

export default function RallyStamps({ stamps, total, count, owned, stampable, rewardImage, completionDate }: RallyStampsProps) {
  return (
    <article className={rallyStampsStyles.container}>
      <h2 className={rallyStampsStyles.title}>스탬프 랠리</h2>
      <section className={rallyStampsStyles.stamps}>
        {stamps.map(addStampPropsByIndex({ owned, count, total, stampable })).map(({ id, objectKey, status, kind, owned }, index) => {
          if (index === total - 1 && completionDate) objectKey = rewardImage;
          return <RallyStamp key={id} id={id} objectKey={objectKey} status={status} kind={kind} owned={owned} />;
        })}
      </section>
    </article>
  );
}
