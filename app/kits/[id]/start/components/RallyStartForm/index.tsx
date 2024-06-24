'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import formSchema from './schema';
import type { FormValues } from './types';
import TitleField from './TitleField';
import DescriptionField from './DescriptionField';
import SubmitButton from './Submit';

interface RallyStartFormProps {
  starterId: string;
  kitId: string;
}

export default function RallyStartForm({ starterId, kitId }: RallyStartFormProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(values: FormValues) {
    const response = await fetch('/api/rallies', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        starterId,
        kitId,
      }),
    });
    if (response.ok) {
      const {
        data: { id: rallyId },
      } = await response.json();
      router.push(`/rallies/${rallyId}`);
    } else {
      // TODO: 에러 페이지로 이동
      console.error('에러가 발생했습니다.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-15">
        <TitleField control={form.control} />
        <DescriptionField control={form.control} />
        <SubmitButton state={form.formState} />
      </form>
    </Form>
  );
}
