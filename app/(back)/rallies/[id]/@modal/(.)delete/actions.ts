'use server';

import { redirect } from 'next/navigation';
import { ensureMember } from '@/auth';
import { API_URL } from '@/lib/constants';

export const deleteRally = async (form: FormData) => {
  const userId = (await ensureMember()).id;
  const rallyId = form.get('id') as string;
  fetch(`${API_URL}/api/rallies/${rallyId}`, { method: 'DELETE', body: JSON.stringify({ userId }) });
  redirect(`/rallies`);
};
