import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormFieldProps } from './types';

export default function DescriptionField({ control }: FormFieldProps) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>자기 소개</FormLabel>
          <FormControl>
            <Textarea placeholder="자기 소개를 입력해주세요." className="h-32" maxLength={160} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
