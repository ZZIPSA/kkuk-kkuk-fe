import { cva, type VariantProps } from 'class-variance-authority';
import { pipe } from '@fxts/core';
import { getUserApi } from '@/lib/api';
import { resolveData } from '@/lib/response';
import { UserData } from '@/types/User';
import DefaultInfo from './DefaultInfo';
import NicknameInput from './NicknameInput';
import { ProfileImage, ProfileEditButton } from './ProfileImage';
import { UserInfoVariant } from './variants';

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  id: string;
}

const variant = {
  [UserInfoVariant.default]: '',
  [UserInfoVariant.settings]: 'grid-rows-[1_auto] justify-items-center gap-4',
};

const userInfoVariants = cva('flex flex-col items-center py-6 px-4 gap-4 bg-background', {
  variants: { variant },
  defaultVariants: { variant: UserInfoVariant.default },
});

export default async function UserInfo({ id, variant = UserInfoVariant.default }: UserInfoProps) {
  const { image, name, accounts, rallies } = await pipe(id, getUserApi, fetch, resolveData<UserData>);
  return (
    <section className={userInfoVariants({ variant })}>
      <span className="row-span-2 relative">
        <ProfileImage image={image} name={name} variant={variant} />
        {variant === UserInfoVariant.settings && <ProfileEditButton />}
      </span>
      {variant === UserInfoVariant.default && <DefaultInfo name={name} rallies={rallies ?? []} />}
      {/* // TODO: name의 nullable을 허용하지 않도록 수정 */}
      {variant === UserInfoVariant.settings && <NicknameInput name={name ?? ''} />}
    </section>
  );
}
