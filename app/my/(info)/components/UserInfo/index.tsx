import { Badge } from '@/components/ui/badge';
import { MyPageResult } from '@/types/User';
import ProfileImage from './ProfileImage';
import RalliesCounts from './RalliesCounts';
import { AccountModel } from '@/types/models';
type UserInfoProps = Pick<MyPageResult, 'profileImage' | 'nickname' | 'rallies'> & {
  twitterAccount?: AccountModel;
};

export default function UserInfo({ profileImage, nickname, twitterAccount, rallies }: UserInfoProps) {
  return (
    <section className="flex flex-col py-6 px-4 gap-4">
      <div className="grid grid-cols-[64px_auto] w-full gap-x-2">
        <ProfileImage profileImage={profileImage} nickname={nickname} />
        <h1 className="font-bold w-full">{nickname}</h1>
        {twitterAccount && (
          <Badge variant="secondary" className="w-fit text-xs font-normal gap-2">
            <span className="text-2xl">𝕏</span>@{twitterAccount.userId}
          </Badge>
        )}
      </div>
      <RalliesCounts rallies={rallies} />
    </section>
  );
}
