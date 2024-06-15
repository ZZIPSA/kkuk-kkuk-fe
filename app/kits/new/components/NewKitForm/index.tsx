'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';

import Description from './Description';
import { FormSchema } from './schema';
import Stamps from './Stamps';
import SuccessModal from './SuccessModal';
import Tags from './Tags';
import Submit from './Submit';
import Title from './Title';
import { FormValues } from './types';
import { defaultValues } from './Stamps/lib';

export default function NewKitForm() {
  const [kitId, setKitId] = useState<string>('');
  const isModalOpen = !!kitId;
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  function onSubmit(data: FormValues) {
    // TODO: Handle form submission
    console.log(data);
    setKitId('success');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <Stamps control={form.control} />
        <Title control={form.control} />
        <Tags control={form.control} />
        <Description control={form.control} />
        <Submit state={form.formState} />
      </form>

      <SuccessModal kitId={kitId} open={isModalOpen} />
    </Form>
  );
}
