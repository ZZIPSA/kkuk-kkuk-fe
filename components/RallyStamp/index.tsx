import Image from 'next/image';
import { Check, Gift } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { RallyPreviewStamp } from '@/types/Stamp';
import { getConditions, getElementConditions } from './lib';
import { stampContainerStyles, stampImageStyles, stampCheckIconStyles, stampGiftIconStyles } from './styles';
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
  const is = getConditions({ status, kind, owned });
  const { border, filter, icon } = getElementConditions(is);

  return (
    <div
      className={cn(stampContainerStyles.default, `order-${order}`, {
        [stampContainerStyles.primary]: border.primary,
        [stampContainerStyles.indigo]: border.indigo,
        [stampContainerStyles.grey]: border.grey,
        [stampContainerStyles.solid]: border.solid,
        [stampContainerStyles.dashed]: border.dashed,
      })}
    >
      <Image
        fill
        src={image}
        alt="Stamp"
        sizes="360"
        className={cn(stampImageStyles.default, {
          [stampImageStyles.grayscale]: filter.grayscale,
        })}
      />
      {icon.check && (
        <Check
          className={cn(stampCheckIconStyles.default, {
            [stampCheckIconStyles.primary]: icon.check.primary,
            [stampCheckIconStyles.indigo]: icon.check.indigo,
          })}
        />
      )}
      {icon.gift && (
        <Gift
          className={cn(stampGiftIconStyles.default, {
            [stampGiftIconStyles.indigo]: icon.gift.indigo,
            [stampGiftIconStyles.grey]: icon.gift.grey,
          })}
        />
      )}
    </div>
  );
}
export { StampStatus, StampKind } from './types';
