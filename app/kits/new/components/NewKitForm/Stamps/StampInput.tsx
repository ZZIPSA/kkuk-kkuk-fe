'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  stampInputLabelStyles,
  notFirstOrLastStampStyles,
  firstStampStyles,
  lastStampStyles,
  lastEmptyStampStyles,
  lastStampPreviewStyles,
} from './styles';
import StampPreview from './StampPreview';
import EmptyStamp from './EmptyStamp';

export default function StampInput({ index, total }: { index: number; total: number }) {
  const [file, setFile] = useState<File>();

  return (
    <label
      className={cn(stampInputLabelStyles, {
        [notFirstOrLastStampStyles]: index !== 0 && index !== total,
        [firstStampStyles]: index === 0,
        [lastStampStyles]: index === total,
        [lastEmptyStampStyles]: index === total && file === undefined,
        [lastStampPreviewStyles]: index === total && file !== undefined,
      })}
    >
      {file !== undefined ? <StampPreview file={file} setFile={setFile} /> : <EmptyStamp index={index} total={total} />}
      <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0])} />
    </label>
  );
}
