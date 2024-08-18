import type { FormState } from 'react-hook-form';
import type { ZodType } from 'zod';
import { ButtonProps, Button, ButtonVariant } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubmitProps<FormValues extends ZodType<any, any, any>> extends ButtonProps {
  state: FormState<FormValues>;
}

export default function Submit<FormValues extends ZodType<any, any, any>>({ children, state, className }: SubmitProps<FormValues>) {
  const disabled = !state.isValid || state.isSubmitting;
  const variant: ButtonVariant = disabled ? 'disabled' : 'default';

  return (
    <Button type="submit" disabled={disabled} className={cn(styles.button, className)} variant={variant}>
      {children}
    </Button>
  );
}
const styles = {
  button: 'w-full',
};
