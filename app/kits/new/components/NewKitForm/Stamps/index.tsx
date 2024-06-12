import { useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FormFieldsProps } from '../types';
import StampInput from './StampInput';

export default function Stamps({ control }: FormFieldsProps) {
  const field = useFieldArray({ control, name: 'stamps' });
  return (
    <FormField
      control={control}
      name="stamps"
      render={() => (
        <FormItem>
          <FormLabel aria-required>스탬프 이미지 등록</FormLabel>
          <FormDescription className={cn('grid grid-cols-2 gap-4')}>
            <span className="col-span-full">
              1일차에 등록된 이미지는 대표이미지, 6일차에 등록된 이미지는 완주용 보상 이미지로 적용됩니다. 360 x 360px 이하, 150kb 이하의 이미지를
              등록할 수 있습니다.
            </span>
            {field.fields.map(({ id }, index, { length }) => (
              <StampInput key={id} index={index} total={length - 1} field={field} />
            ))}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
