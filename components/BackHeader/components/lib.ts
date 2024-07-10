import { purify } from '@/lib/either';
import { resolveJson, validResponse } from '@/lib/response';
import { FetchedRallyData } from '@/types/Rally';
import { pipe } from '@fxts/core';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export const extractId = (path: string) => /\/(rallies|kits)\/(\w+)/.exec(path)?.[2] ?? '';

export function useRallyStarterId(id: string) {
  const [data, setData] = useState<FetchedRallyData | null>(null);
  useEffect(() => {
    getRallyData(id).then(({ data }) => setData(data));
  }, [id]);
  return data?.starter?.id;
}

const getRallyData = async (id: string) =>
  pipe(id, (id) => `/api/rallies/${id}`, fetch, validResponse, purify(notFound), resolveJson<{ data: FetchedRallyData }>);
