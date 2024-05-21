'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
// import { auth } from "@/auth";
import { getHeaderUserMenuItems, headerLogoItems } from '../lib';
import { UserModel } from '@/types/models';

type DefaultUser = Pick<UserModel, 'profileImage'>; // 테스트용
const defaultUser: DefaultUser = { profileImage: '/default-profile.svg' }; // 테스트용

export default function NavBar() {
  const [user, setUser] = useState<DefaultUser>(); // 테스트용
  const headerUserMenuItems = getHeaderUserMenuItems(user); // 테스트용
  return (
    <NavigationMenu className="max-w-full w-full justify-between">
      <NavigationMenuList>
        {headerLogoItems.map(({ href, Inner }) => (
          <NavBarItem href={href} Inner={Inner} key={href} />
        ))}
      </NavigationMenuList>
      <NavigationMenuList
        onClick={
          // 테스트용
          () => setUser(user ? undefined : defaultUser)
        }
      >
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
