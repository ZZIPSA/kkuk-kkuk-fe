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
          <FormLabel>상세 목표</FormLabel>
          <FormControl>
            <Textarea placeholder="상세 목표를 입력해주세요." className="h-32" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
