import { XIcon } from 'lucide-react';
import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import Modal from '@/components/Modal';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFieldProps, FormValues } from '../types';
import { inputDeadline, presentDeadline } from './lib';
import DeadlineModalContent from './ModalContent';

interface DeadlineFieldProps extends FormFieldProps {
  setValue: UseFormSetValue<FormValues>;
}

export default function DeadlineField({ control, setValue }: DeadlineFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name="deadline"
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <FormLabel>
            완주 기한
            <span className="font-normal text-xs text-gray-400">(최소 일주일 이후 부터 설정 가능)</span>
          </FormLabel>
          <FormControl>
            <Input className="hidden" {...field} value={inputDeadline(value)} />
          </FormControl>
          <span className="relative">
            <Input placeholder="완주 기한 설정하기" value={presentDeadline(value)} onClick={() => setOpen(true)} />
            <XIcon
              className="absolute right-2 bottom-3 size-4 p-0.5 rounded-full bg-grey-100 text-background"
              onClick={() => setValue('deadline', undefined)}
              type="button"
            />
          </span>
          <FormDescription>
            완주 기한 설정시 난이도가 매우 올라가게 됩니다.
            <Modal open={open}>
              <DeadlineModalContent setOpen={setOpen} setValue={setValue} />
            </Modal>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
