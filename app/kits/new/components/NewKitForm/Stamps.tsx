import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { StampsField } from './types';

const Stamps: StampsField = ({ control, stampsRef }) => (
  <FormField
    control={control}
    name="stamps"
    render={({ field: { onChange, ...field }, fieldState }) => (
      <FormItem>
        <FormLabel>스탬프</FormLabel>
        <FormDescription className={cn('grid grid-cols-2 gap-4')}>
          {field.value &&
            Array.from(field.value).map((file) => (
              <Image
                src={URL.createObjectURL(file)}
                className="rounded-md aspect-square w-full h-full object-cover"
                alt={file.name}
                key={file.name}
                width={100}
                height={100}
              />
            ))}
        </FormDescription>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            multiple
            className={cn({ 'border-red-500': fieldState.error })}
            {...stampsRef}
            onChange={(e) => onChange([...Array.from(e.target.files ?? [])])}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Stamps;
