'use client';

import { usePathname } from 'next/navigation';
import { items } from './lib';
import MenuTab from './MenuTab';

export default function MenuTabs() {
  const path = usePathname();

  return (
    <section className={styles.container}>
      {items.map(({ label, href }) => (
        <MenuTab key={href} label={label} href={href} path={path} />
      ))}
    </section>
  );
}

const styles = { container: 'flex w-full justify-stretch pt-2 sticky top-0' };
