'use client';

import Link from 'next/link';
import { useSession } from '@/auth/react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { getHeaderUserMenuItems, headerLogoItems } from '../lib';

export default function NavBar() {
  const {
    data: { user },
  } = useSession();
  const headerUserMenuItems = getHeaderUserMenuItems(user); // 테스트용
  return (
    <NavigationMenu className="max-w-full w-full justify-between">
      <NavigationMenuList>
        {headerLogoItems.map(({ href, Inner }) => (
          <NavBarItem href={href} Inner={Inner} key={href} />
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
        {headerUserMenuItems
          .filter(({ isGuest }) => !!user !== !!isGuest)
          .map(({ href, Inner }) => (
            <NavBarItem href={href} Inner={Inner} key={href} />
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavBarItem({ href, Inner }: { href: string; Inner: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <Link href={href} passHref>
        {Inner}
      </Link>
    </NavigationMenuItem>
  );
}
