import { useFieldArray } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleTagsKeyDown } from './lib';
import { tagsStyles as styles } from './styles';
import { TagsField, FormFieldProps } from './types';

export default function Tags({ control }: FormFieldProps) {
  const field = useFieldArray({ control, name: 'tags' });
  return (
    <FormField
      control={control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel>태그</FormLabel>
          <FormControl>
            <Input type="text" className={styles.input} pattern="\S{2,10}" minLength={2} maxLength={10} onKeyDown={handleTagsKeyDown(field)} />
          </FormControl>
          <FormDescription className={styles.description}>
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
    <span key={id} className={styles.tag}>
      #{name}
      <button onClick={() => field.remove(field.fields.findIndex((field) => field.id === id))}>
        <XIcon className={styles.delete} />
      </button>
    </span>
  );
}
