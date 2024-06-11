'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { PencilPlus } from '@/lib/icons';

import Description from './Description';
import { FormSchema } from './schema';
import Stamps from './Stamps';
import SuccessModal from './SuccessModal';
import Tags from './Tags';
import Title from './Title';
import { FormValues } from './types';

export default function NewKitForm() {
  const [kitId, setKitId] = useState<string>('');
  const isModalOpen = !!kitId;
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  function onSubmit(data: FormValues) {
    // TODO: Handle form submission
    console.log(data);
    setKitId('success');
  }
  const stampsRef = form.register('stamps');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <Stamps control={form.control} stampsRef={stampsRef} />
        <Title control={form.control} />
        <Tags control={form.control} />
        <Description control={form.control} />
        <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl">
          <PencilPlus className="size-6 fill-white inline" /> 키트 만들기
        </button>
      </form>

      {/* TODO: 배포 시 제거 */}
      <ModalButtonForTest open={isModalOpen} onClick={() => setKitId((id) => (id ? '' : 'success'))} />
      {/* TODO: 배포 시 제거 */}

      <SuccessModal kitId={kitId} open={isModalOpen} />
    </Form>
  );
}

// TODO: 배포 시 제거
const ModalButtonForTest = ({ open, onClick }: { open: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="fixed bottom-4 right-4 w-fit bg-teal-400 text-white rounded-xl py-4 z-[51]">
    {open ? 'close' : 'open'} modal
  </button>
);
