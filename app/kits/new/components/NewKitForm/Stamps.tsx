import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { StampsField } from './types';
import { Trash } from '@/components/icons';

const Stamps: StampsField = ({ control, stampsRef }) => (
  <FormField
    control={control}
    name="stamps"
    render={({ field: { onChange, ...field }, fieldState }) => (
      <FormItem>
        <FormLabel aria-required>스탬프</FormLabel>
        <FormDescription className={cn('grid grid-cols-2 gap-4')}>
          <span className="col-span-full">첫번째로 등록된 이미지는 대표이미지 , 마지막 등록된 이미지는 완주용 보상 이미지로 적용됩니다.</span>
          {field.value &&
            Array.from(field.value)
              .filter((_, i) => i < 6)
              .map((file) => (
                <div key={file.name} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    className="rounded-2xl aspect-square w-full object-cover"
                    alt={file.name}
                    width={100}
                    height={100}
                  />
                  <Trash
                    className="absolute w-8 h-8 right-1 bottom-1 cursor-pointer"
                    onClick={() => {
                      onChange(field.value.filter((f) => f !== file));
                    }}
                  />
                </div>
              ))}
        </FormDescription>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
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
