import type { Control } from 'react-hook-form';
import type { z } from 'zod';
import type formSchema from './schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function TitleField({ control }: { control: Control<z.infer<typeof formSchema>> }) {
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
