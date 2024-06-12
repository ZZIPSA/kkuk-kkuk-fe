import Image from 'next/image';
import { Trash } from '@/lib/icons';
import { StampsField } from '../types';
import { stampPreviewStyles, stampPreviewImageStyles, stampTrashIconStyles } from './styles';

interface StampPreviewProps {
  index: number;
  field: StampsField;
}
export default function StampPreview({ index, field }: StampPreviewProps) {
  return (
    <div className={stampPreviewStyles}>
      <Image src={URL.createObjectURL(file)} className={stampPreviewImageStyles} alt={file.name} fill sizes="360" priority />
      <Trash className={stampTrashIconStyles} onClick={() => setFile(undefined)} />
    </div>
  );
}
