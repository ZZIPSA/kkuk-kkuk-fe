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

export function Stamp({ image, variant = StampVariants.default, size = 100, order }: StampProps) {
  const rows = Math.floor(order / 3);
  const isReverse = rows % 2 === 1;
  order += isReverse ? 2 - (order % 3) * 2 : 0;
  return (
    <div className={cn('relative', `order-${order}`)}>
      <Image
        width={size}
        height={size}
        src={image}
        alt="Stamp"
        className={cn('rounded-full w-full', {
          'border-2 border-primary': variant !== StampVariants.monochrome,
          'filter grayscale border border-grey-200 border-dashed': variant === StampVariants.monochrome,
        })}
      />
      {variant === StampVariants.checked && (
        <Check className="absolute right-0 bottom-0 w-6 h-6 p-1 stroke-white bg-primary rounded-full fill-none" />
      )}
    </div>
  );
}
