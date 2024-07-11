import type { Metadata } from 'next';
import KitList, { getAllKits } from '@/components/KitList';

export const metadata: Metadata = {
  title: '키트 목록',
};

export default async function KitsPage() {
  return (
    <main className="p-4 pt-6 w-full flex flex-col gap-2">
      <h1 className="text-xl font-bold">등록된 키트</h1>
      <KitList fetchKits={getAllKits} />
    </main>
  );
}
