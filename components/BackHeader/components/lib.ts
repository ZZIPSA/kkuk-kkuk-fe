import { fetchData } from '@/lib/response';
import { useEffect, useState } from 'react';

export const extractId = (path: string) => /\/(rallies|kits)\/(\w+)/.exec(path)?.[2] ?? '';

export function useRallyStarterId(rallyId: string) {
  const [starterId, setStarterId] = useState<string | null>(null);
  useEffect(() => {
    fetchData<{ starter: { id: string } }>(`/api/rallies/${rallyId}`) //
      .then(({ starter: { id } }) => setStarterId(id))
      .catch(() => setStarterId(null));
  }, [rallyId]);
  return starterId;
}
