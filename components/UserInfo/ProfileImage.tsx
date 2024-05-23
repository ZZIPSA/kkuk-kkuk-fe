'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE } from '@/lib/constants';
import { UserModel } from '@/types/models';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { UserInfoVariant } from './variants';
import { cn } from '@/lib/utils';

interface ProfileImageProps extends Pick<UserModel, 'profileImage' | 'nickname'> {
  variant: UserInfoVariant;
}

export default function ProfileImage({ profileImage, nickname, variant }: ProfileImageProps) {
  return (
    <Avatar
      className={cn('border', {
        'size-16 row-span-2': variant === UserInfoVariant.default,
        'size-25': variant === UserInfoVariant.settings,
      })}
    >
      <AvatarImage src={profileImage ?? DEFAULT_PROFILE} alt={nickname ?? ''} />
      <AvatarFallback>{nickname}</AvatarFallback>
    </Avatar>
  );
}
