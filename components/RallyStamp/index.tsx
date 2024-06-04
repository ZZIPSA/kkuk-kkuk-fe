import Image from 'next/image';
import { Check, Gift } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { RallyPreviewStamp } from '@/types/Stamp';
import { getConditions, getElementConditions, getStyles } from './lib';
import { StampInfo } from './types';

interface StampProps extends RallyPreviewStamp, StampInfo {
  order: number;
}

const STAMP_BY_ROW = 3;
/**
 * ![상태, 종류, 소유에 따른 스타일](https://github.com/ZZIPSA/kkuk-kkuk-fe/assets/61987505/d79f57e0-ec77-41a2-807a-87bf38807d81)
 */
export function RallyStamp({ image, status, kind, owned, order }: StampProps) {
  const rows = Math.floor(order / STAMP_BY_ROW);
  const isReverse = rows % 2 === 1;
  order += isReverse ? STAMP_BY_ROW - 1 - (order % STAMP_BY_ROW) * 2 : 0;
  const is = getElementConditions(getConditions({ status, kind, owned }));
  const styles = getStyles(is);

  return (
    <div className={cn(styles.container, `order-${order}`)}>
      <Image fill src={image} alt="Stamp" sizes="360" className={styles.image} />
      {is.icon.check && <Check className={styles.check} />}
      {is.icon.gift && <Gift className={styles.gift} />}
    </div>
  );
}
export { StampStatus, StampKind } from './types';
