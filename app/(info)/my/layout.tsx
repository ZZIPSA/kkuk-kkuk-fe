import UserInfo from '@/components/UserInfo';
import MenuTabs from './components/MenuTabs';

export default async function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <UserInfo />
      <MenuTabs />
      {children}
    </main>
  );
}
