'use client';

import { useState } from 'react';
import { StampsField } from '../types';
import StampPreview from './StampPreview';
import EmptyStamp from './EmptyStamp';
import { getStampLabelStyles, getStampSpanStyles, getStampSpanContents } from './lib';

interface StampInputProps {
  index: number;
  total: number;
  field: StampsField;
}
export default function StampInput({ index, total, field }: StampInputProps) {
  const [file, setFile] = useState<File>();
  const isFirst = index === 0;
  const isLast = index === total;
  const isUploaded = field.fields[index].url;
  const isEmpty = isUploaded === '';

  return (
    <label className={getStampLabelStyles(isFirst, isLast)}>
      <span className={getStampSpanStyles(isFirst, isLast, isEmpty)}>{getStampSpanContents(index, total)}</span>
      {isUploaded ? <StampPreview index={index} field={field} /> : <EmptyStamp index={index} total={total} />}
      <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0])} />
    </label>
  );
}
