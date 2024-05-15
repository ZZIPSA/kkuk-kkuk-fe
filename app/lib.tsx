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

export const getSignedNavBarItems = ({ profileImage = '/default-profile.svg' }: { profileImage?: string }): NavBarItemProps[] => [
  { href: '/kits/new', Inner: <Pencil /> },
  { href: '/rallies', Inner: <Stamp /> },
  {
    href: '/my',
    Inner: (
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={profileImage} />
      </Avatar>
    ),
  },
];

export const notSignedNavBarItems: NavBarItemProps[] = [
  {
    href: '/signin',
    Inner: <Button label="로그인" type="button" className="text-base px-4 py-2 h-fit rounded-lg" />,
  },
];
