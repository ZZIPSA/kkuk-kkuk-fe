import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormFields } from './types';

const Description: FormFields = ({ control }) => (
  <FormField
    control={control}
    name="description"
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>설명</FormLabel>
        <FormControl>
          <Textarea
            placeholder="키트에 대한 설명을 입력해주세요."
            className={cn({
              'border-red-500': !!fieldState.error,
            })}
            {...field}
          >
            {field.value}
          </Textarea>
        </FormControl>
        <FormMessage />
        <FormDescription>
          <span
            className={cn({
              'text-red-500': !!fieldState.error,
            })}
          >
            {field.value?.length ?? 0}
          </span>
        </FormDescription>
      </FormItem>
    )}
  />
);

export default Description;
