import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FetchKits } from '@/types/Kit';

export function useFetchKits(fetchKits: FetchKits) {
  const [{ cursor, kits }, setKits] = useState<Awaited<ReturnType<FetchKits>>>({
    cursor: '',
    kits: [],
  });
  const [ended, setEnded] = useState(false);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!ended && inView)
      // 키트가 아직 끝나지 않았고, 뷰포트에 들어왔다면
      fetchKits({ cursor }) // 키트를 요청합니다.
        .then(({ cursor, kits }) => {
          setKits(({ kits: prev }) => ({
            cursor, // 새로운 커서를 등록합니다.
            kits: prev.concat(kits), // 새로운 키트를 추가합니다.
          }));
          if (!cursor) setEnded(true); // 커서가 없으면 더 이상 키트가 없다는 뜻입니다.
        });
  }, [inView, ended]);
  return { ref, kits, ended };
}
