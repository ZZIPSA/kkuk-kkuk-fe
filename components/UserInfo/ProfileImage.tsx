'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE } from '@/lib/constants';
import { UserModel } from '@/types/models';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { UserInfoVariant } from './variants';
import { cn } from '@/lib/utils';

interface ProfileImageProps extends Pick<UserModel, 'image' | 'name'> {
  variant: UserInfoVariant;
}

export default function ProfileImage({ image, name, variant }: ProfileImageProps) {
  return (
    <Avatar
      className={cn('border', {
        'size-16': variant === UserInfoVariant.default,
        'size-25': variant === UserInfoVariant.settings,
      })}
    >
      {/*
        NOTE: Twitter API에서 받아온 이미지 URL에서 _normal을 제거 -> 고화질 이미지로 변경
        TODO: 추후 트위터 이미지만 변경하도록 수정 or 프로필 이미지를 서버에 저장
      */}
      <AvatarImage src={image?.replace('_normal', '') ?? DEFAULT_PROFILE} alt={name ?? ''} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
