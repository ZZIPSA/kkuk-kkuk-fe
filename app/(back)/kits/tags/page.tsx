'use client';

import type { GET } from '@/app/api/kits/tags/route';
import KitList from '@/components/KitList';
import React from 'react';
import { useTags } from './hooks';

export default function TagsPage() {
  const tags = useTags();
  const params = tags.map((tag) => `tag=${tag}`).join('&');
  if (!tags) throw new Error('tag is required');
  /** {@link GET API} */
  const api = `/api/kits/tags?${params}`;

  return <KitList api={api} />;
}
