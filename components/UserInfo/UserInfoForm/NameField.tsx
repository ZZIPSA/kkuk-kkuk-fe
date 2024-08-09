import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFieldProps } from './types';

export default function NameField({ control }: FormFieldProps) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>닉네임</FormLabel>
          <FormControl>
            <Input placeholder="닉네임을 입력해주세요." minLength={2} maxLength={12} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
