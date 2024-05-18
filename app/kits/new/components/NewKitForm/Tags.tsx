import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormFields } from './types';

const Tags: FormFields = ({ control }) => (
  <FormField
    control={control}
    name="tags"
    render={({}) => (
      <FormItem>
        <FormLabel>태그</FormLabel>
        <FormControl>{/* TODO: Tags */}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Tags;
