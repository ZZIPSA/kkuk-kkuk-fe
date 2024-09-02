import { redirect } from 'next/navigation';
import { KitPageInfo } from '../types';

export default function DeleteRallyPage({ params: { id } }: KitPageInfo) {
  return redirect(`/kits/${id}`);
}
