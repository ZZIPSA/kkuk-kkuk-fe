import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FetchedKits, FetchKits, RawFetchedKits } from '@/types/Kit';
import { pipe, prop } from '@fxts/core';
import { resolveJson } from '@/lib/response';
import { bind, Do, remain } from '@/lib/do';

export function useFetchKits(api: string) {
  const [ended, setEnded] = useState(false);
  const { ref, inView } = useInView();
  const [{ cursor, kits }, setKits] = useState<FetchedKits>({ cursor: '', kits: [] });
  useEffect(() => {
    const fetchKits = fetchKitsFrom(new URL(api, new URL('/api/kits', `${window.location.protocol}//${window.location.host}`)));
    if (!ended && inView)
      // 키트가 아직 끝나지 않았고, 뷰포트에 들어왔다면
      fetchKits({ cursor }) // 키트를 요청합니다.
        .then(({ kits }) => {
          setKits(({ kits: prev }) => ({
            cursor: kits.at(-1)?.id ?? '', // 새로운 커서를 등록합니다.
            kits: prev.concat(kits), // 새로운 키트를 추가합니다.
          }));
          if (cursor === '') setEnded(true); // 커서가 없으면 더 이상 키트가 없다는 뜻입니다.
        });
  }, [inView, ended]);
  return { ref, kits, ended };
}

const fetchKitsFrom =
  (api: URL): FetchKits =>
  (params) =>
    pipe(
      Do,
      bind('url', () => api),
      bind('params', () => new URLSearchParams(params)),
      addParams, // api에 파라미터 추가
      fetch, // 요청
      resolveJson<RawFetchedKits>, // JSON으로 변환
      pickKitsAndCursor, // 키트와 커서 추출
    );
const addParams = ({ url, params }: { url: URL; params: URLSearchParams }) => {
  const api = new URL(url);
  for (const [key, value] of Array.from(params.entries())) api.searchParams.append(key, value);
  return api;
};
const pickKitsAndCursor = (origin: RawFetchedKits) =>
  pipe(origin, bind('kits', prop('data')<RawFetchedKits>), bind('cursor', pickCursor), remain(['kits', 'cursor']));
const pickCursor = (origin: RawFetchedKits) => pipe(origin, prop('meta'), prop('nextCursor'));
