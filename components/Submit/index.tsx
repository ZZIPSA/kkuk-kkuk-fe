import type { FormState } from 'react-hook-form';
import { BasicButtonProps, BasicButton as Button } from '@/components/ui/button';
import type { ZodType } from 'zod';

interface SubmitProps<FormValues extends ZodType<any, any, any>> extends BasicButtonProps {
  state: FormState<FormValues>;
}

export default function Submit<FormValues extends ZodType<any, any, any>>({ children, state }: SubmitProps<FormValues>) {
  const disabled = !state.isValid || state.isSubmitting;
  return (
    <Button type="submit" disabled={disabled} className={styles.button}>
      {children}
    </Button>
  );
}
const styles = {
  button: 'bg-primary w-full',
  pencilPlus: 'fill-white',
};
