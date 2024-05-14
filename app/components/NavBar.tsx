'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// import { auth } from "@/auth";
import { getSignedNavBarItems, notSignedNavBarItems, staticNavBarItems as leftItems } from '../lib';

export default function NavBar() {
  const { user } = {
    // user: false, // 비로그인 상태
    user: { profileImage: '/kkuk-kkuk.svg' }, // 로그인 상태
  }; // await auth();
  const rightItems = user ? getSignedNavBarItems(user) : notSignedNavBarItems;
  return (
    <NavigationMenu className="max-w-full w-full justify-between">
      <NavigationMenuList>
        {leftItems.map(({ href, Inner }) => (
          <NavBarItem href={href} Inner={Inner} key={href} />
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
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
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{Inner}</NavigationMenuLink>
      </Link>{' '}
    </NavigationMenuItem>
  );
}
