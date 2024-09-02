'use server';

import { redirect } from 'next/navigation';
import { ensureMember } from '@/auth';
import { API_URL } from '@/lib/constants';

export const deleteKit = async (form: FormData) => {
  const uploaderId = (await ensureMember()).id;
  const kitId = form.get('id') as string;
  fetch(`${API_URL}/api/kits/${kitId}`, { method: 'DELETE', body: JSON.stringify({ uploaderId }) });
  redirect(`/my/uploads`);
};
