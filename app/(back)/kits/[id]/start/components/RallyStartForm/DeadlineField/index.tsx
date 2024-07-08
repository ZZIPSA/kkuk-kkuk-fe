import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { convertToDeadline, getDeadlineInfo, inputDeadline, presentDeadline } from './lib';
import { FormFieldProps, FormValues } from '../types';
import Picker from './Picker';
import { XIcon } from 'lucide-react';

interface DeadlineFieldProps extends FormFieldProps {
  setValue: UseFormSetValue<FormValues>;
}

export default function DeadlineField({ control, setValue }: DeadlineFieldProps) {
  const [open, setOpen] = useState(false);
  const { today, durings, datesByMonth, months } = getDeadlineInfo();
  const [pickerValue, setPickerValue] = useState({
    during: durings[0],
    month: months[0],
    date: datesByMonth[months[0]][0],
  });

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
              <Card className="border-none shadow-none flex flex-col gap-6">
                <CardHeader className="flex flex-col justify-start items-start p-0">
                  <CardTitle className="text-base">완주 기한을 선택하세요.</CardTitle>
                  <CardDescription className="text-left">완주 기한까지 완주하지 못하면 랠리를 더 이상 진행할 수 없습니다.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Picker value={pickerValue} setValue={setPickerValue} today={today} durings={durings} months={months} datesByMonth={datesByMonth} />
                </CardContent>
                <CardFooter className="flex justify-stretch gap-2 p-0">
                  <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                    취소하기
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setValue('deadline', convertToDeadline(today)(pickerValue));
                      setOpen(false);
                    }}
                  >
                    기한설정
                  </Button>
                </CardFooter>
              </Card>
            </Modal>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
