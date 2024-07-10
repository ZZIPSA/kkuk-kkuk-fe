'use server';

import { ensureMember } from '@/auth';

export const deleteRally = async (form: FormData) => {
  const userId = (await ensureMember()).id;
  const rallyId = form.get('id') as string;

  console.log(`Deleting rally ${rallyId} for user ${userId}`);
  console.log(`TODO: Implement rally deletion`);
};
