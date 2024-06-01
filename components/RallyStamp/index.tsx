import Image from 'next/image';
import { Check } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { RallyPreviewStamp } from '@/types/Stamp';

export enum StampVariants {
  default = 'default',
  checked = 'checked',
  monochrome = 'monochrome',
}

interface StampProps extends RallyPreviewStamp {
  variant?: StampVariants;
  size?: number;
  order: number;
}

const STAMP_BY_ROW = 3;

export function Stamp({ image, variant = StampVariants.default, order }: StampProps) {
  const rows = Math.floor(order / STAMP_BY_ROW);
  const isReverse = rows % 2 === 1;
  order += isReverse ? STAMP_BY_ROW - 1 - (order % STAMP_BY_ROW) * 2 : 0;
  return (
    <div className={cn('relative aspect-square', `order-${order}`)}>
      <Image
        fill
        src={image}
        alt="Stamp"
        className={cn('rounded-full w-full aspect-square object-cover bg-background', {
          'border-2 border-primary': variant !== StampVariants.monochrome,
          'filter grayscale border border-grey-200 border-dashed': variant === StampVariants.monochrome,
        })}
      />
      {variant === StampVariants.checked && (
        <Check className="absolute right-0 bottom-0 w-[26%] h-[26%] p-1 stroke-white stroke-2 bg-primary rounded-full fill-none" />
      )}
    </div>
  );
}
