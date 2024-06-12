import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { StampsField } from '../types';
import StampInput from './StampInput';

const LAST_INDEX = 5;

const Stamps: StampsField = ({ control, stampsRef }) => (
  <FormField
    control={control}
    name="stamps"
    render={({ field: { onChange } }) => (
      <FormItem>
        <FormLabel aria-required>스탬프 이미지 등록</FormLabel>
        <FormDescription className={cn('grid grid-cols-2 gap-4')}>
          <span className="col-span-full">
            1일차에 등록된 이미지는 대표이미지, 6일차에 등록된 이미지는 완주용 보상 이미지로 적용됩니다. 360 x 360px 이하, 150kb 이하의 이미지를
            등록할 수 있습니다.
          </span>
          {Array.from({ length: 6 }).map((_, i) => (
            <StampInput key={i} index={i} total={LAST_INDEX} />
          ))}
        </FormDescription>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            {...stampsRef}
            onChange={(e) => onChange([...Array.from(e.target.files ?? [])])}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Stamps;
