import { useState, Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Picker from './Picker';
import { convertToDeadline, getDeadlineInfo } from './lib';
import { FormValues } from '../types';

interface DeadlineModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<FormValues>;
}

export default function DeadlineModalContent({ setOpen, setValue }: DeadlineModalProps) {
  const { today, durings, datesByMonth, months } = getDeadlineInfo();
  const [pickerValue, setPickerValue] = useState({
    during: durings[0],
    month: months[0],
    date: datesByMonth[months[0]][0],
  });

  return (
    <Card className="border-none shadow-none flex flex-col gap-6">
      <CardHeader className="flex flex-col justify-start items-start">
        <CardTitle className="text-base">완주 기한을 선택하세요.</CardTitle>
        <CardDescription className="text-left">설정한 기한까지 완주하지 못하면 랠리를 더 이상 진행할 수 없습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Picker value={pickerValue} setValue={setPickerValue} today={today} durings={durings} months={months} datesByMonth={datesByMonth} />
      </CardContent>
      <CardFooter className="flex justify-stretch gap-2">
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
  );
}
