import { StampsField } from '../types';
import { getStampLabelStyles, getStampSpanStyles, getStampSpanContents, stampInputHandler } from './lib';
import StampPreview from './StampPreview';
import EmptyStamp from './EmptyStamp';

interface StampInputProps {
  index: number;
  total: number;
  field: StampsField;
}
export default function StampInput({ index, total, field }: StampInputProps) {
  const isFirst = index === 0;
  const isLast = index === total;
  const isUploaded = field.fields[index].url;
  const isEmpty = isUploaded === '';

  return (
    <label className={getStampLabelStyles(isFirst, isLast)}>
      <span className={getStampSpanStyles(isFirst, isLast, isEmpty)}>{getStampSpanContents(index, total)}</span>
      {isUploaded ? <StampPreview index={index} field={field} /> : <EmptyStamp index={index} total={total} />}
      <input type="file" accept="image/*" hidden onChange={stampInputHandler(field, index)} />
    </label>
  );
}
