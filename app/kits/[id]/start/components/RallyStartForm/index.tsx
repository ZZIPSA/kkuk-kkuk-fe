'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/stories/Button';
import formSchema from './schema';
import TitleField from './TitleField';
import DescriptionField from './DescriptionField';

export default function RallyStartForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-15">
        <TitleField control={form.control} />
        <DescriptionField control={form.control} />
        <Button label="랠리 시작하기" type="submit" className="w-full" />
      </form>
    </Form>
  );
}
