import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/stories/Button';
import { NavBarItemProps } from './types';
import { Pencil, Settings, Stamp } from '@/lib/icons';
import { DEFAULT_PROFILE } from '@/lib/constants';
import { UserModel } from '@/types/models';

export const headerLogoItems: NavBarItemProps[] = [
  {
    href: '/',
    Inner: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="/kkuk-kkuk.svg" />
      </Avatar>
    ),
  },
];

export const getHeaderUserMenuItems = (user?: Pick<UserModel, 'profileImage'>): NavBarItemProps[] => [
  { href: '/kits/new', Inner: <Pencil className="h-8 w-8 fill-foreground" />, isGuest: false },
  { href: '/rallies', Inner: <Stamp className="h-8 w-8 stroke-foreground" />, isGuest: false },
  {
    href: '/my',
    Inner: (
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={user?.profileImage ?? DEFAULT_PROFILE} />
      </Avatar>
    ),
    isGuest: false,
    showAtMyPage: false,
  },
  { href: '/my/settings', Inner: <Settings className="h-8 w-8 fill-foreground" />, showAtMyPage: true },
  {
    href: '/signin',
    Inner: <Button label="로그인" type="button" className="text-base px-4 py-2 h-fit rounded-lg" />,
    isGuest: true,
  },
];
