'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavBar({
  leftItems,
  rightItems,
}: {
  leftItems: { href: string; Inner: React.ReactNode }[];
  rightItems: { href: string; Inner: React.ReactNode }[];
}) {
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
