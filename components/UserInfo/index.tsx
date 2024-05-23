import { UserInfoResult } from '@/types/User';
import { Badge } from '@/components/ui/badge';
import ProfileImage from './ProfileImage';
import RalliesCounts from './RalliesCounts';
import { cn } from '@/lib/utils';
import { UserInfoVariant } from './variants';

interface UserInfoProps {
  variant?: UserInfoVariant;
}

export default async function UserInfo({ variant = UserInfoVariant.default }: UserInfoProps) {
  const {
    data: { profileImage, nickname, accounts, rallies },
  }: { data: UserInfoResult } = await fetch(process.env.API_URL + '/api/my').then((res) => res.json());
  const twitterAccount = accounts.find(({ provider }) => provider === 'twitter');

  return (
    <section className="flex flex-col py-6 px-4 gap-4">
      <div
        className={cn('w-full grid', {
          'grid-cols-[64px_auto] gap-x-2': variant === UserInfoVariant.default,
          'grid-rows-2 justify-items-center gap-4': variant === UserInfoVariant.settings,
        })}
      >
        <ProfileImage profileImage={profileImage} nickname={nickname} />
        {variant === UserInfoVariant.default && <h1 className="font-bold w-full">{nickname}</h1>}
        {twitterAccount && (
          <Badge variant="secondary" className="w-fit text-xs font-normal gap-2">
            <span className="text-2xl">𝕏</span>@{twitterAccount.userId}
          </Badge>
        )}
      </div>
      {variant === UserInfoVariant.default && <RalliesCounts rallies={rallies} />}
    </section>
  );
}
