import { redirect } from 'next/navigation';
import { RallyPageProps } from '../types';

export default function DeleteRallyPage({ params: { id } }: RallyPageProps) {
  return redirect(`/rallies/${id}`);
}
