'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';

import { defaultValues } from './lib';
import { formSchema } from './schema';
import { CreateKitProps, FormValues } from './types';
import Description from './Description';
import Stamps from './Stamps';
import SuccessModal from './SuccessModal';
import Submit from './Submit';
import Tags from './Tags';
import Title from './Title';

export default function NewKitForm() {
  const [kitId, setKitId] = useState<string>('');
  const isModalOpen = !!kitId;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  async function onSubmit(form: FormValues) {
    const data = {
      ...form,
      stamps: form.stamps.map(({ url }) => url),
      tags: form.tags.map(({ name }) => name),
    } satisfies CreateKitProps;
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
