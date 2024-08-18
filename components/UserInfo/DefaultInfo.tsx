import { UserData } from '@/types/User';
import RalliesCounts from './RalliesCounts';

export default function DefaultInfo({ name, rallies }: Pick<UserData, 'name' | 'rallies'>) {
  // const twitterAccount = accounts.find(({ provider }) => provider === 'twitter');

  return (
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
  );
}
