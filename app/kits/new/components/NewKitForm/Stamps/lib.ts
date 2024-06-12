import { cn } from '@/lib/utils';
import {
  stampSpanStyles,
  defaultStampSpanStyles,
  firstStampSpanStyles,
  lastStampSpanStyles,
  lastStampPreviewSpanStyles,
  notLastStampSpanStyles,
  lastEmptyStampSpanStyles,
  defaultStampStyles,
  firstStampStyles,
  lastStampStyles,
  stampInputLabelStyles,
} from './styles';
import { StampsField } from '../types';

export const defaultValues = { stamps: Array.from({ length: 6 }, () => ({ url: '' })) };

export const getFormData = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return form;
};

export const removeButtonHandler = (field: StampsField, index: number) => (e: MouseEvent) => {
  e.preventDefault();
  field.update(index, { url: '', blob: '' });
};

export const getStampLabelStyles = (isFirst: boolean, isLast: boolean) =>
  cn(stampInputLabelStyles, {
    [defaultStampStyles]: !(isLast || isFirst),
    [firstStampStyles]: isFirst,
    [lastStampStyles]: isLast,
  });

export const getStampSpanStyles = (isFirst: boolean, isLast: boolean, isEmpty: boolean) =>
  cn(stampSpanStyles, {
    [notLastStampSpanStyles]: !isLast,
    [defaultStampSpanStyles]: !(isLast || isFirst),
    [firstStampSpanStyles]: isFirst,
    [cn(lastStampSpanStyles, {
      [lastEmptyStampSpanStyles]: isEmpty,
      [lastStampPreviewSpanStyles]: !isEmpty,
    })]: isLast,
  });

export const getStampSpanContents = (index: number, total: number) => (index === total ? 'Reward' : `${index + 1}일차`);
