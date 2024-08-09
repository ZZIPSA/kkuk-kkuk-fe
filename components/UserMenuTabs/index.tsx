'use client';

import { usePathname } from 'next/navigation';
import { getItems } from './lib';
import MenuTab from './MenuTab';

export default function UserMenuTabs({ id }: { id: string }) {
  const path = usePathname();

  return (
    <section className={styles.container}>
      {getItems(id).map(({ label, href }) => (
        <MenuTab key={href} label={label} href={href} path={path} />
      ))}
    </section>
  );
}

const styles = { container: 'flex w-full justify-stretch pt-2 sticky top-0' };
