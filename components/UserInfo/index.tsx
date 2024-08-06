import { ensureMember } from '@/auth';
import { UserInfoResult } from '@/types/User';
import { cva, type VariantProps } from 'class-variance-authority';
import { ProfileImage, ProfileEditButton } from './ProfileImage';
import RalliesCounts from './RalliesCounts';
import { UserInfoVariant } from './variants';
import NicknameInput from './NicknameInput';

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
}

export default async function UserInfo({ variant = UserInfoVariant.default }: UserInfoProps) {
  const { id: userId } = await ensureMember();
  // TODO: 파람을 전송하지 않도록 수정
  const api = `${process.env.API_URL}/api/me?userId=${userId}`;
  const {
    data: { image, name, accounts, rallies },
  }: { data: UserInfoResult } = await fetch(api).then((res) => res.json());
  // const twitterAccount = accounts.find(({ provider }) => provider === 'twitter');
const variant = {
  [UserInfoVariant.default]: 'gap-y-4',
  [UserInfoVariant.settings]: 'grid-rows-[1_auto] justify-items-center gap-4',
};

const userInfoVariants = cva('flex flex-col items-center py-6 px-4 gap-4 bg-background', {
  variants: { variant },
  defaultVariants: { variant: UserInfoVariant.default },
});

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
