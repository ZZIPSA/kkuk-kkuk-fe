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
  const isFilled = field.fields[index].blob !== '';

  return (
    <label className={getStampLabelStyles(isFirst, isLast)} onClick={(e) => isFilled && e.preventDefault()}>
      <span className={getStampSpanStyles(isFirst, isLast, !isFilled)}>{getStampSpanContents(index, total)}</span>
      <input type="file" accept="image/*" hidden onChange={stampInputHandler(field, index)} />
      {isFilled ? <StampPreview index={index} field={field} /> : <EmptyStamp index={index} total={total} />}
    </label>
  );
}
