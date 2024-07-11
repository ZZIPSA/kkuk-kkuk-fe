'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { LeftArrow } from '@/lib/icons';
import { getInfoFromPath } from './lib';
import { SessionProvider } from 'next-auth/react';
import SettingMenu from './components/SettingMenu';

export default function BackHeader() {
  const { title, back } = getInfoFromPath({ path: usePathname() });

  return (
    <header className="flex justify-center px-4 py-2 w-full top-0 sticky bg-background z-40">
      <NavigationMenu className="flex justify-between items-center">
        <NavigationMenuList>
          <Link href={back}>
            <LeftArrow className="w-6 h-6 fill-foreground/80" />
          </Link>
        </NavigationMenuList>
        <NavigationMenuList className="font-bold">{title}</NavigationMenuList>
        <NavigationMenuList>
          <SessionProvider>
            <SettingMenu />
            {/* <DeleteKitButton /> */}
          </SessionProvider>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
