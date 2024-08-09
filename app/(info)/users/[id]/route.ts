import { redirect } from 'next/navigation';

export const GET = async (_: Request, { params: { id } }: { params: { id: string } }) => redirect(`/users/${id}/joins`);
