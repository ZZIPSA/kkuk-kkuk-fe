import { KitData } from '@/types/Kit';
import { notFound, redirect } from 'next/navigation';

export const getKitData = (id: string): Promise<{ data: KitData }> =>
  id.length < 7
    ? redirect(`/kits/${id.padStart(7, '0')}`)
    : fetch(`${process.env.API_URL}/api/kits/${id}`)
        .then((res) => res.json())
        .catch(() => notFound());
