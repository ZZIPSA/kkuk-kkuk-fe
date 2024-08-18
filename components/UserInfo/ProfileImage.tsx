'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Pencil } from 'lucide-react';
import React from 'react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE, MAKING_MESSAGE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { UserModel } from '@/types/models';
import { UserInfoVariant } from './variants';

interface ProfileImageProps
  extends Pick<UserModel, 'image' | 'name'>,
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof profileImageVariants> {}

const variant = {
  [UserInfoVariant.default]: 'size-16',
  [UserInfoVariant.settings]: 'size-25',
};

const profileImageVariants = cva('border', {
  variants: { variant },
  defaultVariants: { variant: UserInfoVariant.default },
});

export function ProfileImage({ image, name, variant, className }: ProfileImageProps) {
  return (
    <Avatar className={cn(profileImageVariants({ variant }), className)}>
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
