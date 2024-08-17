'use client';

import type { GET } from '@/app/api/kits/tags/route';
import KitList from '@/components/KitList';
import { useTags } from './hooks';

export default function TagsPage() {
  const tags = useTags();
  const params = tags.map((tag) => `tag=${tag}`).join('&');
  // NOTE - 일차적으로 태그가 없을 경우 에러를 던지도록 설정
  // TODO - 태그 페이지에 대한 논의: 태그가 없을 경우에 대한 처리 방법
  // ex) 태그가 없을 경우 태그를 인기순으로 보여주는 건 어떨지?
  if (!tags) throw new Error('tag is required');
  /** {@link GET API} */
  const api = `/api/kits/tags?${params}`;

  return <KitList api={api} />;
}
