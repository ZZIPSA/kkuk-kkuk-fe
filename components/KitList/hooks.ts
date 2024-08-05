import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FetchedKits } from '@/types/Kit';
import { fetchKitsFrom, getCursor, getEnd } from './lib';

interface FetchKitsState extends FetchedKits {
  ended: boolean;
}

export function useFetchKits(api: string) {
  const { ref, inView } = useInView({ threshold: 0 });
  const [{ cursor, kits, ended }, setKits] = useState<FetchKitsState>({ cursor: '', kits: [], ended: false });
  const fetchKits = fetchKitsFrom(api);
  useEffect(() => {
    if (!ended && inView)
      // 키트가 아직 끝나지 않았고, 뷰포트에 들어왔다면
      fetchKits({ cursor }) // 키트를 요청합니다.
        .then((news) =>
          setKits(({ kits: prev }) => ({
            kits: [...prev, ...news], // 기존 키트 목록에 새로운 키트를 추가하고
            cursor: getCursor(news), // 마지막 키트의 id를 새로운 커서로 설정하고
            ended: getEnd(news), // 새로운 키트가 없으면 API 요청을 중단합니다.
          })),
        );
  }, [inView, ended, cursor]);
  return { ref, kits, ended };
}
