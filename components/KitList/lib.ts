import { PAGE_SIZE } from '@/app/api/lib/constants';
import { FetchKits } from '@/types/Kit';

export const getAllKits: FetchKits = ({ cursor }) =>
  fetch(
    //`/api/kits?pageSize=10&cursor=${cursor}`
    `/api/kits?${new URLSearchParams({ pageSize: String(PAGE_SIZE), cursor })}`,

    {
      cache: cursor
        ? 'default' // 커서가 있으면 캐시를 사용합니다.
        : 'no-store', // 커서가 없으면 캐시를 사용하지 않습니다.
    },
  )
    .then((response) => response.json())
    .then(({ data, meta }) => ({
      kits: data,
      cursor: meta.nextCursor,
    }));
