import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchKitsByTags } from './lib';
import { pipe } from '@fxts/core';

export const useTags = () => useSearchParams().getAll('tag').filter(Boolean);

export const useCount = (tags: string[]) => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    pipe(tags, fetchKitsByTags, setCount);
  }, [tags]);
  return count;
};
