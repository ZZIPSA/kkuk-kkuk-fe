import type { GET } from '@/app/api/kits/tags/count/route';
import { resolveJson } from '@/lib/response';
import { join, map, pipe, prop } from '@fxts/core';

export const fetchKitsByTags = async (tags: string[]) =>
  pipe(
    tags,
    getTagsParams, // tag[] => `tag=${tag1}&tag=${tag2}&...`
    addParamsToApi, // /api/kits/tags/count?tag=tag1&tag=tag2&...
    fetch, // api 요청
    resolveJson<{ data: number }>, // JSON 파싱
    prop('data'), // data 프로퍼티 반환
  );
const getTagsParams = (tags: string[]) =>
  pipe(
    tags,
    map((tag) => `tag=${tag}`),
    join('&'),
  );
/** {@link GET API} */
const addParamsToApi = (params: string) => `/api/kits/tags/count?${params}`;
