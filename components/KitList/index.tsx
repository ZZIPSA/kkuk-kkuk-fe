'use client';

import { forwardRef, Ref } from 'react';
import { useFetchKits } from './hooks';
import Spinner from '../Spinner';
import KitCards from './KitCards';
import ScrollTop from './ScrollTop';

export interface KitListProps {
  api: string;
}

export default function KitList({ api }: KitListProps) {
  const { ref, kits, ended } = useFetchKits(api);

  return (
    <article className="grid grid-cols-2 gap-2">
      <KitCards kits={kits} />
      {ended ? <ScrollTop /> : <Loading ref={ref} />}
    </article>
  );
}

const Loading = forwardRef((_, ref: Ref<HTMLDivElement>) => (
  <div className="col-span-full flex justify-center" ref={ref}>
    <Spinner />
  </div>
));
