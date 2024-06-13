'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';

import { FormValues } from './types';
import { FormSchema } from './schema';
import Stamps from './Stamps';
import Title from './Title';
import Description from './Description';
import Tags from './Tags';
import Submit from './Submit';

export default function NewKitForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    // TODO: Handle form submission
    console.log(data);
  }
  const stampsRef = form.register('stamps');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <Stamps control={form.control} stampsRef={stampsRef} />
        <Title control={form.control} />
        <Tags control={form.control} />
        <Description control={form.control} />
        <Submit state={form.formState} />
      </form>
    </Form>
  );
}
