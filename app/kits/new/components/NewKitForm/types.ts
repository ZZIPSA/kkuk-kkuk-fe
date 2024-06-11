import type { z } from 'zod';
import type { Control, UseFormRegisterReturn } from 'react-hook-form';
import type { FormSchema } from './schema';

export type FormValues = z.infer<typeof FormSchema>;

export interface FormFields {
  ({ control }: { control: Control<FormValues> }): JSX.Element;
}

export interface StampsField {
  ({ control, stampsRef }: { control: Control<FormValues>; stampsRef: UseFormRegisterReturn<'stamps'> }): JSX.Element;
}
