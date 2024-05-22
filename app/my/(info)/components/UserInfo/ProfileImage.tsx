'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE } from '@/lib/constants';
import { UserModel } from '@/types/models';
import { AvatarFallback } from '@radix-ui/react-avatar';
type ProfileImageProps = Pick<UserModel, 'profileImage' | 'nickname'>;
export default function ProfileImage({ profileImage, nickname }: ProfileImageProps) {
  return (
    <Avatar className="w-16 h-16 border row-span-2">
      <AvatarImage src={profileImage ?? DEFAULT_PROFILE} alt={nickname ?? ''} />
      <AvatarFallback>{nickname}</AvatarFallback>
    </Avatar>
  );
}
