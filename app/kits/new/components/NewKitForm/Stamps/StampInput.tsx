'use client';

import { useState } from 'react';
import StampPreview from './StampPreview';
import EmptyStamp from './EmptyStamp';
import { getStampLabelStyles, getStampSpanStyles } from './lib';

export default function StampInput({ index, total }: { index: number; total: number }) {
  const [file, setFile] = useState<File>();
  const isFirst = index === 0;
  const isLast = index === total;
  const isEmpty = file === undefined;

  return (
    <label className={getStampLabelStyles(isFirst, isLast)}>
      <span className={getStampSpanStyles(isFirst, isLast, isEmpty)}>{isLast ? 'Reward' : `${index + 1}일째`}</span>
      {file !== undefined ? <StampPreview file={file} setFile={setFile} /> : <EmptyStamp index={index} total={total} />}
      <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0])} />
    </label>
  );
}
