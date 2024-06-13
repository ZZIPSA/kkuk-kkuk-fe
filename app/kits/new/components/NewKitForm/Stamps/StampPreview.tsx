import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Trash } from '@/lib/icons';
import { stampPreviewStyles, stampPreviewImageStyles, stampTrashIconStyles } from './styles';

export default function StampPreview({ file, setFile }: { file: File; setFile: Dispatch<SetStateAction<File | undefined>> }) {
  return (
    <div className={stampPreviewStyles}>
      <Image src={URL.createObjectURL(file)} className={stampPreviewImageStyles} alt={file.name} fill sizes="360" priority />
      <Trash className={stampTrashIconStyles} onClick={() => setFile(undefined)} />
    </div>
  );
}
