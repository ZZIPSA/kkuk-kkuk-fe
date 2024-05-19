import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { StampsField } from './types';
import { Trash } from '@/lib/icons';

const Stamps: StampsField = ({ control, stampsRef }) => (
  <FormField
    control={control}
    name="stamps"
    render={({ field: { onChange, ...field }, fieldState }) => (
      <FormItem>
        <FormLabel>스탬프 이미지 등록</FormLabel>
        <FormDescription className={cn('grid grid-cols-2 gap-4')}>
          <span className="col-span-full">첫번째로 등록된 이미지는 대표이미지 , 마지막 등록된 이미지는 완주용 보상 이미지로 적용됩니다.</span>
          {field.value &&
            Array.from(field.value)
              .filter((_, i) => i < 6)
              .map((file) => (
                <div key={file.name} className="">
                  <Image
                    src={URL.createObjectURL(file)}
                    className="rounded-md aspect-square w-full h-full object-cover"
                    alt={file.name}
                    width={100}
                    height={100}
                  />
                  <Trash
                    className="float-right relative w-8 h-8 -top-9 right-1 cursor-pointer"
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
