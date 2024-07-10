'use client';

import { FetchKits } from '@/types/Kit';
import { useFetchKits } from './lib';
import KitCards from './KitCards';
import ScrollTop from './ScrollTop';
export { getAllKits } from './lib';

export type KitListProps = {
  fetchKits: FetchKits;
};

export default function KitList({ fetchKits }: KitListProps) {
  const { ref, kits, ended } = useFetchKits(fetchKits);

  return (
    <article className="grid grid-cols-2 gap-2">
      <KitCards kits={kits} />
      {ended ? <ScrollTop /> : <div ref={ref} />}
    </article>
  );
}
