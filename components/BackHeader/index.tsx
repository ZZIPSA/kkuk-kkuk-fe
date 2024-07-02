'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { LeftArrow } from '@/lib/icons';
import { getInfoFromPath } from './lib';

export default function BackHeader() {
  const { title, back } = getInfoFromPath({ path: usePathname() });

  return (
    <header className="flex justify-center items-center px-4 py-2 w-full top-0 sticky bg-background z-40 font-bold">
      <NavigationMenu>
        <Link href={back} className="absolute left-0 p-2">
          <LeftArrow className="w-6 h-6 fill-foreground/80" />
        </Link>
        {title}
      </NavigationMenu>
    </header>
  );
}
