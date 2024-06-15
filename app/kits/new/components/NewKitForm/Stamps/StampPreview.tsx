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
  // TODO: 실제 배포시에는 blob 만 이용
  // 현재는 S3에 올라가는 것을 확인하기 위해 url을 이용
  const { url /* blob */ } = field.fields[index];
  const src = url.startsWith('blob:') ? url : '/api/image/' + url.split('/').slice(4).join('/');

  return (
    <div className={stampPreviewStyles}>
      <Image src={src} className={stampPreviewImageStyles} alt={`${index + 1}번째 스탬프`} fill sizes="360" priority />
      <button onClick={removeButtonHandler(field, index)} className={stampDeleteButtonStyles}>
        <Trash className={stampTrashIconStyles} />
      </button>
    </div>
  );
}

export const Loading = () => (
  <>
    <div className="absolute size-full inset-0 bg-background/50" />
    <LoadingSpinner className="absolute size-full stroke-background" />
  </>
);
