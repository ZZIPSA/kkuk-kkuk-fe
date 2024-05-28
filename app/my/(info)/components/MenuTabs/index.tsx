'use client';

import { usePathname } from 'next/navigation';
import { items } from './lib';
import MenuTab from './MenuTab';

export default function MenuTabs() {
  const path = usePathname();

  return (
    <section className="flex justify-center border-b border-gray-200 pt-2 sticky top-0">
      {items.map(({ label, href }) => (
        <MenuTab key={href} label={label} href={href} path={path} />
      ))}
    </section>
  );
}
