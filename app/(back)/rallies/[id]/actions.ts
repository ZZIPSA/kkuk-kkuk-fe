'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ensureMember } from '@/auth';
import { API_URL } from '@/lib/constants';

export const extendRally = async (form: FormData) => {
  const { id: userId } = await ensureMember();
  const rallyId = form.get('id');

  fetch(`${API_URL}/api/rallies/${rallyId}/extend`, { method: 'PATCH', body: JSON.stringify({ userId }) });
  revalidatePath(`/rallies/${rallyId}`);
  redirect(`/rallies/${rallyId}`);
};
