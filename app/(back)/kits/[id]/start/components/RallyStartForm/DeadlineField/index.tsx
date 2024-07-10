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
            <div className="relative font-normal">
              <Input placeholder="완주 기한 설정하기" value={presentDeadline(value)} onClick={() => setOpen(true)} />
              {value && (
                <XIcon
                  className="absolute [transform:translate(-50%,-50%)] right-1 top-1/2 size-4 p-0.5 rounded-full bg-grey-100 text-background"
                  onClick={() => setValue('deadline', undefined)}
                  type="button"
                />
              )}
            </div>
          </FormLabel>
          <FormControl>
            <Input className="hidden" {...field} value={inputDeadline(value)} />
          </FormControl>
          <FormDescription>
            설정한 기한까지 완주하지 못하면 랠리를 더 이상 진행할 수 없습니다.
            <Modal open={open} className="p-0">
              <DeadlineModalContent setOpen={setOpen} setValue={setValue} />
            </Modal>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
