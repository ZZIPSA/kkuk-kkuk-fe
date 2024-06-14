import type { FormState } from 'react-hook-form';
import Button from '@/components/Submit';
import type { FormValues } from './types';

export default function Submit({ state }: { state: FormState<FormValues> }) {
  return <Button state={state}>랠리 시작하기</Button>;
}
