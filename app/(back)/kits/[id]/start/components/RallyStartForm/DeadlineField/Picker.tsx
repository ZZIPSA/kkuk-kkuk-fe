import { Dispatch, SetStateAction } from 'react';
import Picker from 'react-mobile-picker';
import { syncPickerValue } from './lib';
import { DeadlinePickerValue } from './types';
import { cn } from '@/lib/utils';

interface DeadlinePickerProps {
  value: DeadlinePickerValue;
  setValue: Dispatch<SetStateAction<DeadlinePickerValue>>;
  today: Date;
  durings: string[];
  months: string[];
  datesByMonth: Record<string, string[]>;
}

const styles = {
  options: 'text-grey-100 font-bold',
  selected: 'text-primary',
};

export default function DeadlinePicker({ value, setValue, today, durings, months, datesByMonth }: DeadlinePickerProps) {
  return (
    <Picker value={value} onChange={(unSynced) => setValue(syncPickerValue(today)(unSynced))} wheelMode="normal" height={108}>
      <Picker.Column name="during">
        {durings.map((option) => (
          <Picker.Item key={option} value={option} className={cn(styles.options, { [styles.selected]: option === value.during })}>
            {option}일동안{(option === value.during && console.log(styles.selected)) || ''}
          </Picker.Item>
        ))}
      </Picker.Column>
      <Picker.Column name="month">
        {months.map((option) => (
          <Picker.Item key={option} value={option} className={cn(styles.options, { [styles.selected]: option === value.month })}>
            {option}월
          </Picker.Item>
        ))}
      </Picker.Column>

      <Picker.Column name="date">
        {datesByMonth[value.month]?.map((option) => (
          <Picker.Item key={option} value={option} className={cn(styles.options, { [styles.selected]: option === value.date })}>
            {option}일
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}
