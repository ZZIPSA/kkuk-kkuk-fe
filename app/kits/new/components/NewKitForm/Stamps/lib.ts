import { cn } from '@/lib/utils';
import { StampsField } from '../types';
import { preupload } from './actions';
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

export const defaultValues = { stamps: Array.from({ length: 6 }, () => ({ url: '', blob: '' })) };

export const getFormData = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return form;
};

export const removeButtonHandler = (field: StampsField, index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
  field.update(index, { url: '', blob: '' });
};

export const stampInputHandler = (field: StampsField, index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // 파일 추출
  if (file) {
    const blob = URL.createObjectURL(file); // 블롭 생성
    field.update(index, { url: blob, blob }); // 임시로 블롭을 저장
    try {
      const url = await preupload(getFormData(file)); // FormData 화해서 S3에 업로드
      field.update(index, { url, blob }); // S3 URL로 업데이트
    } catch (error) {
      field.update(index, { url: '', blob: '' }); // 실패시 초기화
      alert(`${index + 1} 번째 파일을 업로드 하지 못했습니다.`);
    }
  }
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
