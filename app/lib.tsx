import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/stories/Button';
import { NavBarItemProps } from './types';
import { Pencil, Stamp } from '@/lib/icons';

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

export const getSignedNavBarItems = ({ profileImage }: { profileImage: string | null }): NavBarItemProps[] => [
  { href: '/kits/new', Inner: <Pencil className="h-8 w-8 fill-foreground" /> },
  { href: '/rallies', Inner: <Stamp className="h-8 w-8 stroke-foreground" /> },
  {
    href: '/my',
    Inner: (
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={profileImage ?? '/default-profile.svg'} />
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
