import { MyPageResult } from '@/types/User';
import UserInfo from './components/UserInfo';

export default async function MyLayout({ children }: { children: React.ReactNode }) {
  const {
    data: { profileImage, nickname, accounts, rallies },
  }: { data: MyPageResult } = await fetch(process.env.API_URL + '/api/my').then((res) => res.json());
  const twitterAccount = accounts.find(({ provider }) => provider === 'twitter');

  return (
    <main>
      <UserInfo profileImage={profileImage} nickname={nickname} twitterAccount={twitterAccount} rallies={rallies} />
      {children}
    </main>
  );
}
