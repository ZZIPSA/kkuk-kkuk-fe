import type { Control } from 'react-hook-form';
import type { z } from 'zod';
import type formSchema from './schema';

export type FormValues = z.infer<typeof formSchema>;
export interface FormFieldProps {
  control: Control<z.infer<typeof formSchema>>;
}
