import type { z } from 'zod';
import type { Control, UseFieldArrayReturn } from 'react-hook-form';
import type { FormSchema } from './schema';

export type FormValues = z.infer<typeof FormSchema>;

export interface FormFields {
  ({ control }: { control: Control<z.infer<typeof FormSchema>> }): JSX.Element;
}

export interface FormFieldsProps {
  control: Control<FormValues>;
}
export type StampsField = UseFieldArrayReturn<FormValues, 'stamps', 'id'>;
