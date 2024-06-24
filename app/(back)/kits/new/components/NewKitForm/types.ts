import type { z } from 'zod';
import type { Control, UseFieldArrayReturn } from 'react-hook-form';
import type { formSchema } from './schema';

export type FormValues = z.infer<typeof formSchema>;

export interface FormFields {
  ({ control }: { control: Control<FormValues> }): JSX.Element;
}

export interface FormFieldsProps {
  control: Control<FormValues>;
}
export type TagsField = UseFieldArrayReturn<FormValues, 'tags', 'id'>;
export interface FormFieldProps {
  control: Control<FormValues>;
}
export type StampsField = UseFieldArrayReturn<FormValues, 'stamps', 'id'>;
export interface CreateKitProps extends Pick<FormValues, 'title' | 'description'> {
  stamps: FormValues['stamps'][0]['url'][];
  tags: FormValues['tags'][0]['name'][];
}
