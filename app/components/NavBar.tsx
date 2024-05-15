'use client';
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';

// import { auth } from "@/auth";
import { User } from '@/types/user';
import { getSignedNavBarItems, notSignedNavBarItems, staticNavBarItems as leftItems } from '../lib';

type DefaultUser = Pick<User, 'profileImage'>; // 테스트용
const defaultUser: DefaultUser = { profileImage: '/default-profile.svg' }; // 테스트용

export default function NavBar() {
  const [user, setUser] = useState<DefaultUser | null>(); // 테스트용
  const rightItems = user ? getSignedNavBarItems(user) : notSignedNavBarItems; // 테스트용
  return (
    <NavigationMenu className="max-w-full w-full justify-between">
      <NavigationMenuList>
        {leftItems.map(({ href, Inner }) => (
          <NavBarItem href={href} Inner={Inner} key={href} />
        ))}
      </NavigationMenuList>
      <NavigationMenuList
        onClick={
          // 테스트용
          () => setUser(user ? null : defaultUser)
        }
      >
        {rightItems.map(({ href, Inner }) => (
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
