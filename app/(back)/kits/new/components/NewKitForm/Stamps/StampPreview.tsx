import Image from 'next/image';
import { Trash } from '@/lib/icons';
import { StampsField } from '../types';
import { removeButtonHandler } from './lib';
import { stampPreviewStyles, stampPreviewImageStyles, stampTrashIconStyles, stampDeleteButtonStyles } from './styles';
import { Loading as LoadingSpinner } from '@/components/ui/loading';

interface StampPreviewProps {
  index: number;
  field: StampsField;
}
export default function StampPreview({ index, field }: StampPreviewProps) {
  const { url, blob } = field.fields[index];
  const isLoading = blob.length > 0 && url.length === 0;

  return (
    <div className={stampPreviewStyles}>
      <Image src={blob} className={stampPreviewImageStyles} alt={`${index + 1}번째 스탬프`} fill sizes="360" priority />
      <button onClick={removeButtonHandler(field, index)} className={stampDeleteButtonStyles}>
        <Trash className={stampTrashIconStyles} />
      </button>
      {isLoading && <Loading />}
    </div>
  );
}

export const Loading = () => (
  <>
    <div className="absolute size-full inset-0 bg-background/50" />
    <LoadingSpinner className="absolute size-full stroke-background" />
  </>
);
