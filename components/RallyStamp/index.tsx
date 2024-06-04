import Image from 'next/image';
import { Check, Gift } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { RallyPreviewStamp } from '@/types/Stamp';
import { getConditions } from './lib';
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
  const border = {
    // 테두리 색상
    primary: !is.uncheckable && !is.reward, // 체크 가능한 기본 스탬프
    indigo: !is.uncheckable && is.reward, // 체크 가능한 보상 스탬프
    grey: is.uncheckable, // 체크 불가능한 스탬프
    solid: !is.uncheckable,
    dashed: is.uncheckable,
  };
  const filter = {
    // 필터
    grayscale: is.uncheckable,
  };
  const icon = {
    // 아이콘
    check: is.checked && {
      // 체크된 스탬프
      primary: is.default,
      indigo: is.reward,
    },
    gift: is.reward &&
      !(is.owned && is.checked) && {
        // 보상 스탬프
        indigo: !is.uncheckable,
        grey: is.uncheckable,
      },
  };
  const is = getConditions({ status, kind, owned });

  return (
    <div
      className={cn('relative aspect-square rounded-full', `order-${order}`, {
        'border-primary': border.primary,
        'border-indigo-500': border.indigo,
        'border-grey-200': border.grey,
        'border-solid border-2': border.solid,
        'border-dashed border': border.dashed,
      })}
    >
      <Image
        fill
        src={image}
        alt="Stamp"
        sizes="360"
        className={cn('rounded-full w-full aspect-square object-cover bg-background', {
          'filter grayscale': filter.grayscale,
        })}
      />
      {icon.check && (
        <Check
          className={cn('absolute right-0 bottom-0 size-[26%] p-1 stroke-white stroke-2 rounded-full fill-none', {
            'bg-primary': icon.check.primary,
            'bg-indigo-500': icon.check.indigo,
          })}
        />
      )}
      {icon.gift && (
        <Gift
          className={cn('absolute right-[25%] bottom-[25%] origin-center size-[50%]', {
            'fill-indigo-500': icon.gift.indigo,
            'fill-grey-400': icon.gift.grey,
          })}
        />
      )}
    </div>
  );
}
