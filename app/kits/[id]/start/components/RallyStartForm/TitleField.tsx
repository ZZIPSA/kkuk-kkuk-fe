import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFieldProps } from './types';

export default function TitleField({ control }: FormFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel aria-required>이번 랠리 목표</FormLabel>
          <FormControl>
            <Input required placeholder="랠리 목표를 입력해주세요." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
