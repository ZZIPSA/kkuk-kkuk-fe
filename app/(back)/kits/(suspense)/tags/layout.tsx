'use client';

import { Suspense } from 'react';
import { useCount, useTags } from './hooks';

export default function TagsLayout({ children }: { children: React.ReactNode }) {
  const tags = useTags();
  return (
    <main>
      <Title tags={tags} />
      {children}
    </main>
  );
}

function Title({ tags }: { tags: string[] }) {
  const count = useCount(tags);

  return (
    <h1 className={styles.title.default}>
      {tags.map<React.ReactNode>((tag) => <Span key={tag}>'#{tag}'</Span>).reduce((prev, curr) => [prev, ', ', curr])} 검색된 키트{' '}
      <Span>{count}</Span>개
    </h1>
  );
}
const Span = ({ children }: { children: React.ReactNode }) => <span className={styles.title.primary}>{children}</span>;

const styles = {
  title: {
    default: 'font-bold',
    primary: 'text-primary',
  },
};
