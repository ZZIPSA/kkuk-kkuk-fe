import { Picture, CirclePlus, Gift } from '@/lib/icons';
import {
  stampEmptyStampStyles,
  stampEmptyStampIconStyles,
  stampEmptyStampGiftIconStyles,
  stampEmptyStampPictureIconStyles,
  stampEmptyStampCirclePlusIconStyles,
} from './styles';

export default function EmptyStamp({ index, total }: { index: number; total: number }) {
  return (
    <div className={stampEmptyStampStyles}>
      <div className={stampEmptyStampIconStyles}>
        {index === total ? <Gift className={stampEmptyStampGiftIconStyles} /> : <Picture className={stampEmptyStampPictureIconStyles} />}
        <CirclePlus className={stampEmptyStampCirclePlusIconStyles} />
      </div>
      000 x 000 px
    </div>
  );
}
