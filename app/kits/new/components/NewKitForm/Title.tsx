import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BasicInput as Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormFields } from './types';

const Title: FormFields = ({ control }) => (
  <FormField
    control={control}
    name="title"
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>제목</FormLabel>
        <FormControl>
          <Input
            placeholder="제목을 입력해주세요."
            className={cn({
              'border-red-500': !!fieldState.error,
            })}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Title;
