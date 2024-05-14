import { Pencil, Stamp } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/stories/Button';
import { NavBarItemProps } from './types';

export const staticNavBarItems: NavBarItemProps[] = [
  {
    href: '/',
    Inner: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="/kkuk-kkuk.svg" />
      </Avatar>
    ),
  },
];

export const getSignedNavBarItems = ({ image }: { image?: string }): NavBarItemProps[] => [
  { href: '/kits/new', Inner: <Pencil /> },
  { href: '/rallies', Inner: <Stamp /> },
  {
    href: '/my',
    Inner: (
      <Avatar className="w-7 h-7 border">
        <AvatarImage src={image} />
      </Avatar>
    ),
  },
];

export const notSignedNavBarItems: NavBarItemProps[] = [
  {
    href: '/signin',
    Inner: <Button label="로그인" type="button" className="text-sm px-4 h-fit py-1.5 rounded-lg" />,
  },
];
