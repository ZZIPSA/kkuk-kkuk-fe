import { Picture, CirclePlus, Gift } from '@/lib/icons';
import {
  stampEmptyStampStyles,
  stampEmptyStampIconStyles,
  stampEmptyStampGiftIconStyles,
  stampEmptyStampPictureIconStyles,
  stampEmptyStampCirclePlusIconStyles,
} from './styles';

export default function EmptyStamp({ index, total }: { index: number; total: number }) {
  const isLast = index === total;

  return (
    <div className={stampEmptyStampStyles}>
      <div className={stampEmptyStampIconStyles}>
        {isLast ? <Gift className={stampEmptyStampGiftIconStyles} /> : <Picture className={stampEmptyStampPictureIconStyles} />}
        <CirclePlus className={stampEmptyStampCirclePlusIconStyles} />
      </div>
    </div>
  );
}
