import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFields } from './types';

const Tags: FormFields = ({ control }) => (
  <FormField
    control={control}
    name="tags"
    render={({}) => (
      <FormItem>
        <FormLabel>태그</FormLabel>
        <FormControl>
          <Input type="text" className="w-full" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Tags;
