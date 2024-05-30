import type { Control } from 'react-hook-form';
import type { z } from 'zod';
import type formSchema from './schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export default function DescriptionField({ control }: { control: Control<z.infer<typeof formSchema>> }) {
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
