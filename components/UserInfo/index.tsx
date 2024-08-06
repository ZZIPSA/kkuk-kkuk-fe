import { cva, type VariantProps } from 'class-variance-authority';
import { pipe } from '@fxts/core';
import { resolveData } from '@/lib/response';
import { UserData } from '@/types/User';
import { ProfileImage, ProfileEditButton } from './ProfileImage';
import RalliesCounts from './RalliesCounts';
import { UserInfoVariant } from './variants';
import NicknameInput from './NicknameInput';
import { getUserApi } from '@/lib/api';

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  id: string;
}

const variant = {
  [UserInfoVariant.default]: 'gap-y-4',
  [UserInfoVariant.settings]: 'grid-rows-[1_auto] justify-items-center gap-4',
};

const userInfoVariants = cva('flex flex-col items-center py-6 px-4 gap-4 bg-background', {
  variants: { variant },
  defaultVariants: { variant: UserInfoVariant.default },
});

export default async function UserInfo({ id, variant = UserInfoVariant.default }: UserInfoProps) {
  const { image, name, accounts, rallies } = await pipe(id, getUserApi, fetch, resolveData<UserData>);
  // const twitterAccount = accounts.find(({ provider }) => provider === 'twitter');
  return (
    <section className={userInfoVariants({ variant })}>
      <span className="row-span-2 relative">
        <ProfileImage image={image} name={name} variant={variant} />
        {variant === UserInfoVariant.settings && <ProfileEditButton />}
      </span>
      {variant === UserInfoVariant.default && (
        <>
          <h1 className="font-bold text-xl">{name}</h1>
          {/* NOTE: 페이즈 1에서 구현 
            {twitterAccount && (
              <Badge variant="secondary" className="w-fit text-xs font-normal gap-2">
                <span className="text-2xl">𝕏</span>@{twitterAccount.providerAccountId}
              </Badge>
            )}
          */}
          {/* NOTE: DB에 User.description이 추가되면 구현
            <p className="text-sm">{description}</p>
          */}
          <RalliesCounts rallies={rallies ?? []} />
        </>
      )}
      {/* // TODO: name의 nullable을 허용하지 않도록 수정 */}
      {variant === UserInfoVariant.settings && <NicknameInput name={name ?? ''} />}
    </section>
  );
}
