import type { Metadata } from 'next';
import { KitCardInfo } from '@/types/Kit';
import KitList from '@/components/KitList';

export const metadata: Metadata = {
  title: '키트 목록',
};

async function fetchKits(): Promise<KitCardInfo[]> {
  const response = await fetch(`${process.env.API_URL}/api/kits`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch kits');
  }

  const json = await response.json();
  const { data } = json;

  return data;
}

export default async function KitsPage() {
  const kits = await fetchKits();

  return (
    <main className="p-4 pt-6 w-full flex flex-col gap-2">
      <h1 className="text-xl font-bold">등록된 키트</h1>
      <KitList kits={kits} />
    </main>
  );
}
