'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/stories/Button';

import { FormValues } from './types';
import { FormSchema } from './schema';
import Stamps from './Stamps';
import Title from './Title';
import Description from './Description';
import Tags from './Tags';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Stamps control={form.control} stampsRef={stampsRef} />
        <Title control={form.control} />
        <Tags control={form.control} />
        <Description control={form.control} />
        <Button label={'Submit'} type="submit" />
      </form>
    </Form>
  );
}
