import { useFieldArray } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TagsField, FormFieldProps } from './types';
import { handleTagsKeyDown } from './lib';

export default function Tags({ control }: FormFieldProps) {
  const field = useFieldArray({ control, name: 'tags' });
  return (
    <FormField
      control={control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel aria-required>태그</FormLabel>
          <FormControl>
            <Input type="text" className="w-full" pattern="\S{2,10}" minLength={2} maxLength={10} onKeyDown={handleTagsKeyDown(field)} />
          </FormControl>
          <FormDescription className="flex gap-2 w-full overflow-scroll">
            {field.fields.map(({ name, id }) => (
              <Tag key={id} id={id} name={name} field={field} />
            ))}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function Tag({ id, name, field }: { id: string; name: string; field: TagsField }) {
  return (
    <span key={id} className="border border-primary w-fit rounded-full px-2 py-1 align-middle inline-flex break-keep text-nowrap">
      #{name}
      <button onClick={() => field.remove(field.fields.findIndex((field) => field.id === id))}>
        <XIcon className="size-4" />
      </button>
    </span>
  );
}
