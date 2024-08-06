import type { FormState } from 'react-hook-form';
import type { FormValues } from './types';
import { Button, ButtonVariant } from '@/components/ui/button';

export default function Submit({ state }: { state: FormState<FormValues> }) {
  const disabled = !state.isDirty || !state.isValid || state.isSubmitting;
  const variant: ButtonVariant = disabled ? 'disabled' : 'default';

  return (
    <Button type="submit" disabled={disabled} className="fixed w-[min(calc(100%-2rem),688px)] min-w-[328px] bottom-4" variant={variant}>
      수정하기
    </Button>
  );
}
