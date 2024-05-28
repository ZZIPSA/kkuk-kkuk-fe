'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMember } from '@/hooks/use-user';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { filterByGuestOrMember, filterByPath, getHeaderUserMenuItems, headerLogoItems } from './lib';

export default function NavBar() {
  const user = useMember();
  const path = usePathname();
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
          .filter(filterByGuestOrMember(user))
          .filter(filterByPath(path))
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
