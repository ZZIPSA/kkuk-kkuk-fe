import { ensureMember } from '@/auth';
import UserInfo from '@/components/UserInfo';
import MenuTabs from './components/MenuTabs';

export default async function MyLayout({ children }: { children: React.ReactNode }) {
  const { id } = await ensureMember();

  return (
    <main className="w-full">
      <UserInfo id={id} />
      <MenuTabs />
      {children}
    </main>
  );
}
