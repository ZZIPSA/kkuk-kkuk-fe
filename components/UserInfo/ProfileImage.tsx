'use client';

import { Pencil } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE, MAKING_MESSAGE } from '@/lib/constants';
import { UserModel } from '@/types/models';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { UserInfoVariant } from './variants';
import { cn } from '@/lib/utils';

interface ProfileImageProps extends Pick<UserModel, 'image' | 'name'> {
  variant: UserInfoVariant;
}

export function ProfileImage({ image, name, variant }: ProfileImageProps) {
  return (
    <Avatar
      className={cn('border', {
        'size-16': variant === UserInfoVariant.default,
        'size-25': variant === UserInfoVariant.settings,
      })}
    >
      <AvatarImage src={image ?? DEFAULT_PROFILE} alt={name ?? ''} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}

export function ProfileEditButton() {
  return (
    <Pencil
      onClick={() => alert(MAKING_MESSAGE)}
      className="absolute bottom-0.5 right-0.5 w-6 h-6 p-0.5 rounded-full bg-foreground fill-background"
    />
  );
}
