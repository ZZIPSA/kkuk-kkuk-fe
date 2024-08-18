'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormValues } from './types';
import formSchema from './schema';
import DescriptionField from './DescriptionField';
import NameField from './NameField';
import Submit from './Submit';
import { updateUserInfo } from './actions';

interface UserInfoFormProps {
  id: string;
  name: string;
  description: string;
}

export default function UserInfoForm({ id, name, description }: UserInfoFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { id, name, description },
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <form className="w-full space-y-4" action={updateUserInfo}>
        <input type="hidden" {...form.register('id')} />
        <NameField control={form.control} />
        <DescriptionField control={form.control} />
        <Submit state={form.formState} />
      </form>
    </Form>
  );
}
